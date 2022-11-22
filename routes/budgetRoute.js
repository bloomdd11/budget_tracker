const express = require('express')
const router = express.Router()

router.get('/', (req, res) => {
  return res.json({ msg: 'get request' })
})
router.post('/', (req, res) => {
  return res.json({ msg: 'post request' })
})

module.exports = router