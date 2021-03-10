const service = require('./movies.service')
const treeize = require('../utils/treeize')

async function movieExists(req, res, next) {
  const error = { status: 404, message: `Movie cannot be found.` }
  const { movieId } = req.params
  if (!movieId) return next(error)

  let movie = await service.read(movieId)
  if (!movie) return next(error)
  res.locals.movie = movie
  next()
}

async function list(req, res, next) {
  const { is_showing } = req.query

  let list = await service.list()
  list = treeize(list)

  let showingList = await service.isShowing()
  showingList = treeize(showingList)

  if (is_showing !== true) {
    res.json({ data: list })
  } else {
    res.json({ data: showingList })
  }
}

async function read(req, res, next) {
  const { movie } = res.locals
  res.json({ data: movie })
}

module.exports = {
  read: [movieExists, read],
  list,
  movieExists,
}
