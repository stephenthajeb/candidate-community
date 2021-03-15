import React, { useContext } from 'react'
import { Route, Redirect } from 'react-router-dom'
import { firebaseAuth } from '../provider/AuthProvider'

const PrivateRoute = ({ component: Component, ...rest }) => {
  const { token } = useContext(firebaseAuth)

  return (
    <Route
      {...rest}
      render={(props) =>
        !token ? <Redirect to="/signin" /> : <Component {...props} />
      }
    />
  )
}

export default PrivateRoute
