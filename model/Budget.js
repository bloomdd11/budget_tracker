const mongoose = require('mongoose')
const getMMT = require('./getMMT')

// const getID = () => {
//   return (
//     [...Array(16)].map((e) => (Math.random() * 16 | 0).toString(16)).join('')
//   )
// }

const budgetSchema = new mongoose.Schema({
  time: {
    type: Date,
    default: getMMT(),
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