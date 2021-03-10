const knex = require('../db/connection')

const list = () =>
  knex('theaters as t')
    .join('movies_theaters as mt', 't.theater_id', 'mt.theater_id')
    .join('movies as m', 'm.movie_id', 'mt.movie_id')
    .select(
      't.theater_id',
      't.name',
      't.address_line_1',
      't.address_line_2',
      't.city',
      't.state',
      't.zip',
      'm.movie_id as movies:movie_id',
      'm.title as movies:title',
      'm.runtime_in_minutes as movies:runtime_in_minutes',
      'm.rating as movies:rating',
      'm.description as movies:description',
      'm.image_url as movies:image_url',
      'mt.is_showing as movies:is_showing',
      'mt.theater_id as movies:theater_id'
    )

module.exports = {
  list,
}
