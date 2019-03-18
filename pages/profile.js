import React from 'react'
import Link from 'next/link'


class Profile extends React.Component {
  render() {
    const { user } = this.props

    if (user) {
      return (
        <div>
          <Link href="/">
            <a>Home</a>
          </Link>
          <p>My Profile</p>
          {user.github.id ? 'GitHub Connected' : 'GitHub Not Linked'}
          <p> Fullname: {user.fullname || user.github.name}</p>
          <p> Email: {user.email || user.github.email}</p>
        </div>
      )
    }

    return <div>Not found!</div>
  }
}

export default Profile
