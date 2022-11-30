const express = require('express')
const router = express.Router()

const Budget = require('../model/Budget')
const { body, param, validationResult } = require('express-validator')

// READ ROUTE
router.get('/', async (req, res) => {
  let budget = await Budget.find({})
  return res.json(budget)
})

// CREATE ROUTE
router.post('/', [
  body('amount').not().isEmpty(),
  body('detail').not().isEmpty()
], async (req, res) => {

  const errors = validationResult(req)

  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() })
  }

  let budget = new Budget({
    amount: req.body.amount,
    detail: req.body.detail
  })

  try {
    await budget.save()
    return res.json({ msg: budget })
  } catch (error) {
    return res.status(404).json({ error })
  }
})

// UPDATE ROUTE
router.put('/:id', [
  param('id').isMongoId()
], async (req, res) => {
  const errors = validationResult(req)
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() })
  }

  try {
    let budget = await Budget.findById({ _id: req.params.id })
    if (budget) {
      budget = await Budget.findOneAndUpdate({ _id: req.params.id }, req.body, { new: true })
      await budget.save()
      return res.json({ msg: budget })
    } else {
      return res.status(404).json({ msg: 'no document with that id' })
    }
  } catch (error) {
    return res.status(404).json({ return: true, error })
  }
})

// DELETE ROUTE
router.delete('/:id', [
  param('id').isMongoId()
], async (req, res) => {
  const errors = validationResult(req)
  if (!errors.isEmpty()) {
    return res.status(400).json({ return: true, errors: errors.array() })
  }

  try {
    let budget = await Budget.findById({ _id: req.params.id })
    if (budget) {
      budget = await Budget.findByIdAndDelete({ _id: req.params.id })
      return res.status(200).json({ msg: 'deleted' })
    } else {
      return res.status(404).json({ msg: 'no document with that id' })
    }
  } catch (error) {
    return res.status(404).json({ return: true, error })
  }
})

module.exports = router