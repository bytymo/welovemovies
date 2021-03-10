const Treeize = require('treeize')

function treeize(data) {
  const isArray = Array.isArray(data)
  data = isArray ? data : [data]

  try {
    const tree = new Treeize()

    tree.grow(data)

    return isArray ? tree.getData() : tree.getData()[0]
  } catch (error) {
    return new Error('There is a problem with treeizing the data.')
  }
}

module.exports = treeize
