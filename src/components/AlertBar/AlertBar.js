import React, { useContext } from 'react'
import { Alert } from 'react-bootstrap'
import { AlertContext } from '../../provider/AlertProvider'
const AlertBar = () => {
  const { alert } = useContext(AlertContext)
  return alert.show ? <Alert variant={alert.type}>{alert.message}</Alert> : null
}

export default AlertBar
