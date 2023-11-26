require('dotenv').config()

const express = require('express')
const complaintRoutes = require('./routes/complaints')

// * express app
const app = express()

// * middleware
app.use(express.json())

app.use((req, res, next) => {
  console.log(req.path, req.method)
  next()
})

// * routes
app.use('/api/complaints/', complaintRoutes)

// * listening requests
app.listen(process.env.PORT, () => {
  console.log(`listening on port: ${process.env.PORT}`)
})
