import { schema } from 'normalizr'

const category = new schema.Entity('category', {}, {
  idAttribute: '_id'
})

const boardGame = new schema.Entity('boardGame', {
  category: [category]
}, { idAttribute: '_id' })

export default {
  category,
  boardGame
}