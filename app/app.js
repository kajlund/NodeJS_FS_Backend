const express = require('express')
const cors = require('cors')

const app = express()

// Middleware to handle incoming JSON payloads
app.use(express.json())
// Middleware for url encoding
app.use(express.urlencoded({extended:true}))
// Middleware for handling CORS policy
app.use(cors())
// app.use((req, res, next) => {
//   res.header('Access-Control-Allow-Origin', '*')
//   res.header('Access-Control-Allow-Headers', 'Content-Type,Accept,Authorization,Origin,X-Requested-With')
//   if (req.method === 'OPTIONS') {
//     res.header('Access-Control-allow-Methods', 'GET,POST,PUT,PATCH,DELETE')
//   }
//   next()
// })

// Helper endpoints for service check
app.get('/', (req, res) => {
  res.status(200).json({ message: 'Service running OK'})
})

app.get('/ping', (req, res) => {
  res.status(200).send('Pong')
})

// Route handlers

// 404 Handler
app.use((req, res, next) => {
  const error = new Error('Not Found')
  error.status = 404
  next(error)
})

// Error Handler
app.use((error, req, res, next) => {
  res.status(error.status || 500).json({
    error: {
    message: error.message,
    status: error.status }
  })
})

module.exports = app
