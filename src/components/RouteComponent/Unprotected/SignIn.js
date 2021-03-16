import React, { useContext, useState } from 'react'
import { Form, Button } from 'react-bootstrap'
import { Redirect } from 'react-router-dom'
import { AlertContext } from '../../../provider/AlertProvider'
import { firebaseAuth } from '../../../provider/AuthProvider'
import FormType from '../../FormComponent/FormType'
import { signIn } from '../../../firebase/utils'

const initialInputs = { email: '', password: '' }

const SignIn = () => {
  const [inputs, setInputs] = useState(initialInputs)
  const { email, password } = inputs
  const { token, setToken } = useContext(firebaseAuth)
  const { addAlert } = useContext(AlertContext)
  const inputFields = [
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
      await signIn(email, password)
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
        Sign In
      </Button>
    </Form>
  )
}

export default SignIn
