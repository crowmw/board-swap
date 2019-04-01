const getCategories = state => state.categories.byId

const getCategory = (state, id) => {
  const categories = getCategories(state)
  return categories && categories[id]
}

const getCategoryName = (state, id) => {
  const category = getCategory(state, id)
  return category && category.name
}

export default {
  getCategories,
  getCategory,
  getCategoryName
}