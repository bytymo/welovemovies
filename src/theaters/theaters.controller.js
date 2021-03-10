const service = require('./theaters.service')
const treeize = require('../utils/treeize')

async function list(_, res) {
  let list = await service.list()
  list = treeize(list)

  res.json({ data: list })
}

module.exports = {
  list,
}
