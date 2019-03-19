import React from 'react'
import Link from 'next/link'
import { connect } from 'react-redux'
import initialize from '../lib/initialize'
import selectors from '../redux/selectors/selectors'

class Profile extends React.Component {
  static async getInitialProps(ctx) {
    initialize(ctx)
  }

  render() {
    const { signedIn } = this.props

    if (signedIn) {
      return (
        <div>
          <Link href="/">
            <a>Home</a>
          </Link>
          <p>My Profile</p>
          <p> username: </p>
          <p> Email: </p>
        </div>
      )
    }

    return <div>Not found!</div>
  }
}

const mapStateToProps = state => ({
  signedIn: selectors.getIsSignedIn(state)
})

export default connect(mapStateToProps)(Profile)
