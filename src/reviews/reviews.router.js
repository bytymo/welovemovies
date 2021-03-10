const router = require('express').Router({ mergeParams: true })
const controller = require('./reviews.controller')
const methodNotAllowed = require('../error/methodNotAllowed')

router
  .route('/:reviewId')
  .put(controller.update)
  .delete(controller.destroy)
  .all(methodNotAllowed)

router.route('/').get(controller.list).all(methodNotAllowed)

module.exports = router
