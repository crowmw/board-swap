import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import Layout from '../components/Layout'
import selectors from '../redux/selectors/selectors'
import actions from '../redux/actions/actions'

const BoardGamePage = ({ slug, boardGame }) => {
  console.log(boardGame)
  return (
    <Layout>
      {slug}
      {JSON.stringify(boardGame)}
    </Layout>
  )
}

BoardGamePage.getInitialProps = async ({ store, query: { slug } }) => {
  await store.dispatch(actions.fetchBoardGame(slug))
  return { slug }
}

BoardGamePage.propTypes = {
  slug: PropTypes.string.isRequired
}

const mapStateToProps = (state, { slug }) => ({
  boardGame: selectors.getBoardGameBySlug(state, slug)
})

export default connect(mapStateToProps)(BoardGamePage)