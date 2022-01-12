const express = require('express')
const app = express()
const port = 3000

app.get('/', (req, res) => {
  res.send("Hollow World")
})

app.listen(port, () => {
  console.log(`APP is running on port:${port}`)
})