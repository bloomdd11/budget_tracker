const express = require('express')
const app = express()
const PORT = 3000 || process.env.PORT
const routes = require('./routes/budgetRoute')

// middleware
app.use(express.json()) // to parse incoming request with JSON payloads

// routes
app.get('/', (req, res) => {
  return res.json({ msg: 'hello world' })
})

app.use('/api/v1', routes)

const start = async () => {
  try {
    await require('./db')() // connect local mongodb
    app.listen(PORT, () => console.log(`server is running at port ${PORT}`))
  } catch (error) {
    console.log(erro);
  }
}

// start
start()