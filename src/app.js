if (process.env.USER) require('dotenv').config()
const express = require('express')
const app = express()
const movieRouter = require('./movies/movies.router')
const theaterRouter = require('./theaters/theaters.router')
const reviewsRouter = require('./reviews/reviews.router')
const cors = require('cors')

app.use(cors())
app.use(express.json())

app.use('/reviews', reviewsRouter)
app.use('/movies', movieRouter)
app.use('/theaters', theaterRouter)

// Not found handler
app.use((req, res, next) => {
  return next({ status: 404, message: `${req.originalUrl} cannot be found.` })
})

// Error handler
app.use((error, req, res, next) => {
  console.error('Error handler: ', error)
  const { status = 500, message = 'Something went wrong!' } = error
  res.status(status).json({ error: message })
})

module.exports = app
