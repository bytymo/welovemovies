const knex = require('../db/connection')

const moviesReviewsAndMoviesTheaters = knex('movies as m')
  .join('reviews as r', 'm.movie_id', 'r.movie_id')
  .join('movies_theaters as mt', 'm.movie_id', 'mt.movie_id')
  .select(
    'm.movie_id as id',
    'm.title',
    'm.runtime_in_minutes',
    'm.rating',
    'm.description',
    'm.image_url',
    'r.review_id as reviews:id',
    'r.content as reviews:content',
    'r.score as reviews:score',
    'r.critic_id as reviews:critic_id',
    'r.movie_id as reviews:movie_id'
  )

const list = () => moviesReviewsAndMoviesTheaters

const isShowing = () =>
  moviesReviewsAndMoviesTheaters
    .select('mt.is_showing')
    .where({ 'mt.is_showing': true })

const read = (movieId) =>
  knex('movies').select('*').where({ movie_id: movieId }).first()

module.exports = {
  list,
  read,
  isShowing,
}
