const express = require('express')
const router = express.Router()
const CustomAPIError = require('../middleware/custom-api')

const Budget = require('../model/Budget')
const { body, param, validationResult } = require('express-validator')

// READ ROUTE
router.get('/', async (req, res) => {
  let budget = await Budget.find({})
  return res.json(budget)
})

// READ SPECIFIC BUDGET
router.get('/:id', [
  param('id').isMongoId()
], async (req, res, next) => {
  try {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
      throw new CustomAPIError('invalid id', 400)
    }

    let budget = await Budget.findById({ _id: req.params.id })
    if (!budget) {
      throw new CustomAPIError('no doucment with that id', 404)
    }
    return res.status(200).json(budget)
  } catch (error) {
    return next(error)
  }

})

// CREATE ROUTE
router.post('/', [
  body('amount').not().isEmpty(),
  body('detail').not().isEmpty()
], async (req, res, next) => {
  try {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
      throw new CustomAPIError('invalid value', 400)
    }

    let budget = new Budget({
      amount: req.body.amount,
      detail: req.body.detail
    })

    await budget.save()
    return res.json({ msg: budget })
  } catch (error) {
    return next(error)
  }
})

// UPDATE ROUTE
router.put('/:id', [
  param('id').isMongoId(),
  body('amount').not().isEmpty()
], async (req, res, next) => {
  try {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
      throw new CustomAPIError('invalid value', 400)
    }

    let budget = await Budget.findById({ _id: req.params.id })
    if (budget) {
      budget = await Budget.findOneAndUpdate({ _id: req.params.id }, { amount: req.body.amount }, { new: true })
      await budget.save()
      return res.json({ msg: budget })
    } else {
      throw new CustomAPIError('no doucment with that id', 404)
    }
  } catch (error) {
    return next(error)
  }
})

// DELETE ROUTE
router.delete('/:id', [
  param('id').isMongoId()
], async (req, res, next) => {
  try {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
      throw new CustomAPIError('invalid value', 400)
    }

    let budget = await Budget.findById({ _id: req.params.id })
    if (budget) {
      budget = await Budget.findByIdAndDelete({ _id: req.params.id })
      return res.status(200).json({ msg: 'deleted' })
    } else {
      throw new CustomAPIError('no doucment with that id', 404)
    }
  } catch (error) {
    return next(error)
  }
})

module.exports = router