import React from 'react'
import Link from 'next/link'
import Router from 'next/router'
import { connect } from 'react-redux'
import initialize from '../lib/initialize'
import selectors from '../redux/selectors/selectors'

class Profile extends React.Component {
  static async getInitialProps(ctx) {
    initialize(ctx)
  }

  render() {
    console.log('RENDER!!!!')
    return (
      <div>
        <Link href="/">
          <a>Home</a>
        </Link>
        <p>My Profile</p>
        <ul>
          <li>Username: {this.props.username}</li>
          <li>Email: {this.props.email}</li>
          <li>BGG Username: {this.props.bggUsername}</li>
          <li>City: {this.props.city}</li>
        </ul>
      </div>
    )
  }
}


const mapStateToProps = state => ({
  username: selectors.getProfileUsername(state),
  email: selectors.getProfileEmail(state),
  bggUsername: selectors.getProfileBggUsername(state),
  city: selectors.getProfileCity(state)
})

export default connect(mapStateToProps)(Profile)
