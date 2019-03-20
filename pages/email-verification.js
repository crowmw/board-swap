import React, { Component } from 'react'
import Link from 'next/link'
import { connect } from 'react-redux'
import actions from '../redux/actions/actions'

class EmailVerification extends Component {
  static async getInitialProps({ query: { username, t }, store }) {
    const result = await store.dispatch(actions.verifyEmail({ username, token: t }))
  }

  handleResend = () => {
    store.dispatch(actions.resendEmailVerification(this.props.profile.userId))
  }

  render() {
    return (
      <div>
        <Link href='/'><a>Home</a></Link>
        <p>Twój adres email został zweryfikowany!</p>
        <a href='#' onClick={this.handleResend}>Wyślij link ponownie!</a>
      </div>
    )
  }
}

export default connect(state => state, actions)(EmailVerification)