const mongoose = require('mongoose')
const getMMT = require('../getMMT')

const budgetSchema = new mongoose.Schema({
  time: {
    type: Date,
    default: Date.now,
  },
  amount: {
    type: Number,
    required: true,
  },
  detail: {
    type: String,
    required: true,
  }
})

module.exports = mongoose.model('Budget', budgetSchema)