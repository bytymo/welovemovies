const knex = require('../db/connection')

const reviewsAndCritics = knex('reviews as r')
  .join('movies as m', 'm.movie_id', 'r.movie_id')
  .join('critics as c', 'c.critic_id', 'r.critic_id')
  .select(
    'r.*',
    'c.critic_id as critic:critic_id',
    'c.preferred_name as critic:preferred_name',
    'c.surname as critic:surname',
    'c.organization_name as critic:organization_name'
  )

const read = (reviewId) =>
  knex('reviews as r')
    .join('movies as m', 'm.movie_id', 'r.movie_id')
    .join('critics as c', 'c.critic_id', 'r.critic_id')
    .select(
      'r.*',
      'c.critic_id as critic:critic_id',
      'c.preferred_name as critic:preferred_name',
      'c.surname as critic:surname',
      'c.organization_name as critic:organization_name'
    )
    .where({ review_id: reviewId })
    .first()

const update = (reviewId, updatedReview) =>
  reviewsAndCritics
    .where({ 'r.review_id': reviewId })
    .update(updatedReview, '*')
    .then(() => read(reviewId))

const destroy = (reviewId) =>
  knex('reviews').where({ review_id: reviewId }).del()

const list = (movieId) => reviewsAndCritics.where({ 'm.movie_id': movieId })

module.exports = {
  read,
  update,
  destroy,
  list,
}
