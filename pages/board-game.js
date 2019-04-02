import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import selectors from '../redux/selectors/selectors'
import actions from '../redux/actions/actions'
import { Header, Image, Label } from 'semantic-ui-react'

const BoardGamePage = ({ slug, boardGame: { thumbnail, name } }) => {
  return (
    <>
      <div style={{ display: 'flex', flexFlow: 'column', alignItems: 'center', width: '100%' }}>
        <img src={thumbnail} />
        <h2>{name}</h2>
      </div>
    </>
  )
}

BoardGamePage.getInitialProps = async ({ store, query: { slug } }) => {
  const res = await actions.fetchBoardGame(slug)
  return { slug, boardGame: res.boardGame }
}

BoardGamePage.propTypes = {
  slug: PropTypes.string.isRequired
}

const mapStateToProps = (state, { slug }) => ({
  boardGame: selectors.getBoardGameBySlug(state, slug)
})

export default BoardGamePage