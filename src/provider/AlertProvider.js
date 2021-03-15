import React, { createContext, useState, useCallback } from 'react'
import { Alert } from 'react-bootstrap'

export const AlertContext = createContext(null)

export const AlertProvider = ({ children }) => {
  const [alert, setAlert] = useState({
    show: false,
    message: '',
    type: '',
  })
  const addAlert = (type, message) => {
    setAlert({ show: true, message, type })
    setTimeout(() => setAlert({ show: false }), 3000)
  }

  const alertContextValue = {
    alert,
    addAlert: useCallback((message, type) => addAlert(message, type), []),
  }

  return (
    <AlertContext.Provider value={alertContextValue}>
      {alert.show ? <Alert variant={alert.type}>{alert.message}</Alert> : null}
      {children}
    </AlertContext.Provider>
  )
}
