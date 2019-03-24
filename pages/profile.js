import React from 'react'
import PropTypes from 'prop-types'
import Link from 'next/link'
import { connect } from 'react-redux'
import initialize from '../lib/initialize'
import selectors from '../redux/selectors/selectors'

class Profile extends React.Component {
  propTypes = {
    username: PropTypes.string,
    email: PropTypes.string,
    bggUsername: PropTypes.string,
    city: PropTypes.string,
  }

  static defaultProps = {
    username: '',
    email: '',
    bggUsername: '',
    city: '',
  }

  static async getInitialProps(ctx) {
    initialize(ctx)
  }

  render() {
    const {
      username, email, bggUsername, city,
    } = this.props
    return (
      <div>
        <Link href="/">
          <a>Home</a>
        </Link>
        <p>My Profile</p>
        <ul>
          <li>
            <span>
              Username:
              {username}
            </span>
          </li>
          <li>
            <span>
              Email:
              {email}
            </span>
          </li>
          <li>
            <span>
              BGG Username:
              {bggUsername}
            </span>
          </li>
          <li>
            <span>
              City:
              {city}
            </span>
          </li>
        </ul>
      </div>
    );
  }
}


const mapStateToProps = state => ({
  username: selectors.getProfileUsername(state),
  email: selectors.getProfileEmail(state),
  bggUsername: selectors.getProfileBggUsername(state),
  city: selectors.getProfileCity(state),
})

export default connect(mapStateToProps)(Profile)
