const Category = require('../models/Category')
const prepareId = require('../utils/graphqlUtils').prepareId

module.exports = {
  fetchCategory: async (id) => {
    const category = await Category.findOne({ _id: id })
    if (!category) throw new Error('Category not found')
    return prepareId(category)
  },
  fetchCategories: async () => {
    const categories = await Category.find({})
    if (!categories) throw new Error('Categories not found')
    return categories.map(prepareId)
  },
}