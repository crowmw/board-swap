const Category = require('../models/Category')
const prepareId = require('../utils/graphqlUtils').prepareId

module.exports = {
  fetchCategory: async (id) => {
    const category = await Category.findOne({ _id: id })
    if (!category) throw new Error('Category not found')
    return prepareId(category)
  },
  fetchCategoryByName: async (name) => {
    const category = await Category.findOne({ name: name })
    if (!category) throw new Error('Category not found')
    return prepareId(category)
  },
  fetchCategories: async () => {
    const categories = await Category.find({})
    if (!categories) throw new Error('Categories not found')
    return categories.map(prepareId)
  },
  createCategory: async ({ name, description }) => {
    try {
      const category = await Category.findOne({ name: name })
      if (category) throw new Error('Category that named already exists')
      const newCategory = Category({
        name, description
      })
      const result = await newCategory.save()
      return result
    } catch (err) {
      throw err
    }
  },
  addBoardGameToCategory: async (categoryId, boardGameId) => {
    try {
      const category = await Category.findOne({ _id: categoryId })
      if (!category) throw new Error('Category does not exists', categoryId)
      category.boardGames.push(boardGameId)
      return await category.save()
    } catch (err) {
      throw err
    }
  }
}