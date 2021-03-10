const router = require('express').Router()
const methodNotAllowed = require('../error/methodNotAllowed')
const controller = require('./movies.controller')
const reviewRouter = require('../reviews/reviews.router')
const theaterRouter = require('../theaters/theaters.router')

router.use('/:movieId/reviews', controller.movieExists, reviewRouter)
router.use('/:movieId/theaters', controller.movieExists, theaterRouter)

router.route('/:movieId').get(controller.read).all(methodNotAllowed)

router.route('/').get(controller.list).all(methodNotAllowed)

module.exports = router
