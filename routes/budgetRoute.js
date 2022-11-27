const express = require('express')
const router = express.Router()

const Budget = require('../model/Budget')
const { body, param, validationResult } = require('express-validator')

router.get('/', async (req, res) => {
  let budget = await Budget.find({})
  return res.json(budget)
})
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

module.exports = router