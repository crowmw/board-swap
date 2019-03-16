import React from 'react'

export default React.createContext({
  token: null,
  tokenExpiration: null,
  role: null,
  userId: null,
  login: (email, password) => { }
})