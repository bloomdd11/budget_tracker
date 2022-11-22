const express = require('express')
const app = express()
const PORT = 3000 || process.env.PORT

// middleware
app.use(express.json()) // to parse incoming request with JSON payloads

// routes
app.get('/', (req, res) => {
  return res.json({ msg: 'hello world' })
})

app.listen(PORT, () => console.log(`server is running at port ${PORT}`))