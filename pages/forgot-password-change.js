import React, { useState } from 'react'
import Link from 'next/link'
import { connect } from 'react-redux'
import actions from '../redux/actions/actions'

const ForgotPasswordChange = (props) => {
  const [password, setPassword] = useState('')

  return (
    <div>
      <Link href='/'><a>Home</a></Link>
      <p>Zmień swoje hasło</p>
      <input
        type="password"
        onInput={e => setPassword(e.target.value)}
        placeholder="******"
      />
      <button onClick={() => props.changeForgottenPassword({ password, token: props.token })}>Zmień hasło</button>
    </div>
  )
}

ForgotPasswordChange.getInitialProps = ({ query: { t } }) => {
  return { token: t }
}

export default connect(state => state, actions)(ForgotPasswordChange)