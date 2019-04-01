import React from 'react'
import { connect } from 'react-redux'

import Layout from '../components/Layout'
import BoardGamesList from '../components/BoardGamesList'
import actions from '../redux/actions/actions'
import selectors from '../redux/selectors/selectors'

const BoardGames = ({ boardGames }) => {
  return (
    <Layout>
      <BoardGamesList boardGames={boardGames} />
    </Layout>
  )
}

BoardGames.getInitialProps = async ({ store }) => {
  await store.dispatch(actions.fetchBoardGames({ first: 20 }))
}

const mapStateToProps = state => ({
  boardGames: selectors.getBoardGamesWithCategories(state)
})

export default connect(mapStateToProps, actions)(BoardGames)