import React, { useState, useContext } from 'react'
import { Form, Button } from 'react-bootstrap'
import { Redirect } from 'react-router'
import { AlertContext } from '../../../provider/AlertProvider'
import { firebaseAuth } from '../../../provider/AuthProvider'
import FormType from '../../FormComponent/FormType'
import { registerToFirebase } from '../../../firebase/utils'

const initialInputs = {
  username: '',
  email: '',
  password: '',
}

const Register = () => {
  const [inputs, setInputs] = useState(initialInputs)
  const { token, setToken } = useContext(firebaseAuth)
  const { addAlert } = useContext(AlertContext)

  const { email, password, username } = inputs
  const inputFields = [
    {
      label: 'Your Username',
      componentType: 'input',
      name: 'username',
      type: 'text',
      value: username,
      placeholder: 'eg: stephenthajeb',
      required: true,
    },
    {
      label: 'Your Email',
      componentType: 'input',
      name: 'email',
      type: 'email',
      value: email,
      placeholder: 'eg: abc@gmail.com',
      required: true,
    },
    {
      label: 'Your Password',
      componentType: 'input',
      name: 'password',
      type: 'password',
      value: password,
      placeholder: 'eg: 123456',
      required: true,
    },
  ]
  const onChangeHandler = (e) =>
    setInputs({ ...inputs, [e.target.name]: e.target.value })
  const onSubmit = async (e) => {
    e.preventDefault()
    try {
      if (password.trim().length < 6)
        throw new Error('Password consist of minimal 6 character')
      await registerToFirebase({ username, email, password })
      await setToken(localStorage.getItem('token'))
    } catch (err) {
      addAlert('danger', err.message)
    }
  }
  return token ? (
    <>
      <Redirect to="/" />
    </>
  ) : (
    <Form onSubmit={onSubmit}>
      {inputFields.map((field) => (
        <FormType
          key={field.name}
          field={field}
          onChangeHandler={onChangeHandler}
        />
      ))}
      <Button type="submit" variant="success">
        Register
      </Button>
    </Form>
  )
}

export default Register
