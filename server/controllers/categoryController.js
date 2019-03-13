const Category = require('../models/Category')

const prepareId = (o) => {
  o._id = o._id.toString()
  return o
}

module.exports = {
  fetchCategory: (id) => {
    return Category.findOne({ _id: id }, (err, cat) => {
      if (err) return err
      if (cat) {
        return prepareId(cat)
      }
      return cat
    })
  },
  fetchCategories: () => {
    return Category.find({}, (err, cats) => {
      if (err) return err
      if (cats) {
        return cats.map(prepareID)
      }
      return cats
    })
  },
}