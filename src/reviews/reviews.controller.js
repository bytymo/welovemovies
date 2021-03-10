const service = require('./reviews.service')
const treeize = require('../utils/treeize')

async function reviewExists(req, res, next) {
  const error = { status: 404, message: `Review cannot be found.` }
  const { reviewId } = req.params
  if (!reviewId) return next(error)

  let review = await service.read(reviewId)
  if (!review) return next(error)

  res.locals.review = review
  next()
}

async function update(req, res, next) {
  const { reviewId } = req.params
  const review = res.locals.review
  const newData = req.body.data
  let updatedReview = { ...review }

  updatedReview = treeize(await service.update(reviewId, newData))

  res.json({ data: updatedReview })
}

async function destroy(req, res, next) {
  const { reviewId } = req.params
  await service.destroy(reviewId)
  res.sendStatus(204)
}

async function list(req, res, next) {
  const { movie_id } = await res.locals.movie
  let movieId = await service.list(movie_id)
  movieId = treeize(movieId)
  res.json({ data: movieId })
}

module.exports = {
  update: [reviewExists, update],
  destroy: [reviewExists, destroy],
  list,
}
