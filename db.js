const mongoose = require('mongoose')

module.exports = function () {
  mongoose.connect("mongodb://localhost/budget_tracker")
}