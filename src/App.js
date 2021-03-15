import React from 'react'
import { BrowserRouter, Route, Switch } from 'react-router-dom'
import Register from './components/Register'
import './App.css'
import SignIn from './components/SignIn'
import CustomNavbar from './components/Navbar/Navbar'
import AuthProvider from './provider/AuthProvider'
import Community from './components/Community'
import Profile from './components/Profile'

function App() {
  console.log(process.env.REACT_APP_FIREBASE_APP_ID)
  return (
    <AuthProvider>
      <BrowserRouter>
        <CustomNavbar />
        <section className="container">
          <Switch>
            <Route exact path="/" component={Community} />
            <Route exact path="/profile" component={Profile} />
            {/* <Route exact path="/users/:username" component={Profile} /> */}
            <Route exact path="/register" component={Register} />
            <Route exact path="/signin" component={SignIn} />
          </Switch>
        </section>
      </BrowserRouter>
    </AuthProvider>
  )
}

export default App
