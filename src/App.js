import React from 'react'
import { BrowserRouter, Route, Switch } from 'react-router-dom'
import './App.css'
import { AlertProvider } from './provider/AlertProvider'
import AuthProvider from './provider/AuthProvider'
import CustomNavbar from './components/Navbar/CustomNavbar'
import AlertBar from './components/AlertBar/AlertBar'
import UserDetail from './components/RouteComponent/Protected/UserDetail'
import Profile from './components/RouteComponent/Protected/Profile/Profile'
import Community from './components/RouteComponent/Unprotected/Community'
import Register from './components/RouteComponent/Unprotected/Register'
import SignIn from './components/RouteComponent/Unprotected/SignIn'
import PrivateRoute from './components/RouteComponent/Protected/Profile/PrivateRoute'
import Settings from './components/RouteComponent/Protected/AccountSettings/Settings'

function App() {
  // Todo: Alert layout
  return (
    <AlertProvider>
      <AuthProvider>
        <BrowserRouter>
          <CustomNavbar />
          <section className="container mt-5 mb-5">
            <AlertBar />
            <Switch>
              <Route exact path="/" component={Community} />
              <Route exact path="/register" component={Register} />
              <Route exact path="/signin" component={SignIn} />
              <PrivateRoute exact path="/settings" component={Settings} />
              <PrivateRoute exact path="/profile" component={Profile} />
              <PrivateRoute
                exact
                path="/users/:username"
                component={UserDetail}
              />
            </Switch>
          </section>
        </BrowserRouter>
      </AuthProvider>
    </AlertProvider>
  )
}

export default App
