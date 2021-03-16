import React, { useState } from 'react'

export const firebaseAuth = React.createContext()

const AuthProvider = (props) => {
  const [token, setToken] = useState(window.localStorage.token || null)

  return (
    <firebaseAuth.Provider value={{ token, setToken }}>
      {props.children}
    </firebaseAuth.Provider>
  )
}
export default AuthProvider
