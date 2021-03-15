import React from 'react'
import { BrowserRouter, Route, Switch } from 'react-router-dom'
import Register from './components/Register'
import './App.css'
import SignIn from './components/SignIn'
import CustomNavbar from './components/Navbar/Navbar'
import AuthProvider from './provider/AuthProvider'
import Community from './components/Community'
import Profile from './components/Profile'
import PrivateRoute from './components/PrivateRoute'
import { AlertProvider } from './provider/AlertProvider'

function App() {
  // Todo: Alert layout
  return (
    <AlertProvider>
      <AuthProvider>
        <BrowserRouter>
          <CustomNavbar />
          <section className="container">
            <Switch>
              <Route exact path="/" component={Community} />
              <Route exact path="/register" component={Register} />
              <Route exact path="/signin" component={SignIn} />
              <PrivateRoute exact path="/profile" component={Profile} />
              {/* <PrivateRoute exact path="/users/:id" component={Profile} /> */}
            </Switch>
          </section>
        </BrowserRouter>
      </AuthProvider>
    </AlertProvider>
  )
}

export default App
