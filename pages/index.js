import React from 'react'
import Link from 'next/link'

import { connect } from 'react-redux'

import selector from '../redux/selectors/selectors'
import actions from '../redux/actions/actions'

import { Button } from 'semantic-ui-react'

class Index extends React.Component {
  // static getInitialProps = async ({ store }) => {
  //   await store.dispatch(actions.fetchBoardGames())
  // }

  signoutHandler = () => {
    this.props.signout()
  }

  //should return signin / signup pages
  render() {
    const { signedIn } = this.props
    if (signedIn) {
      return (
        <>
          <h1> Hello! </h1>
          <a href='#' onClick={this.signoutHandler}>Logout</a>
          <br />
          <Link href="/profile">
            <Button>Go to Profile</Button>
          </Link>
          <Link href="/board-games">
            <Button>BoardGames</Button>
          </Link>
        </>
      )
    }

    return (
      <>
        <h1> Auth Example with Next.js and Apollo </h1>
        <Link href="/signin">
          <a>Sign In</a>
        </Link>{' '}
        or{' '}
        <Link href="/signup">
          <a>Sign Up</a>
        </Link>{' '}
        <Link href="/profile">
          <a>Profile</a>
        </Link>{' '}
        <Link href="/board-games">
          <Button>BoardGames</Button>
        </Link>
        to view hidden resources
        </>
    )
  }
}

const mapStateToProps = state => ({
  signedIn: selector.getIsSignedIn(state)
})

export default connect(mapStateToProps, actions)(Index)
