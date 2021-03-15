import React, { useContext, useState } from 'react'
import { Form, Button } from 'react-bootstrap'
import fb from '../firebase/firebaseConfig'
import { firebaseAuth } from '../provider/AuthProvider'
import FormType from './FormComponent/FormType'

const initialInputs = { email: '', password: '' }

// Todo: add optional fields input
const SignIn = () => {
  const [inputs, setInputs] = useState(initialInputs)
  const { email, password } = inputs
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

  const { setToken } = useContext(firebaseAuth)

  const signIn = (email, password) => {
    fb.auth()
      .signInWithEmailAndPassword(email, password)
      .then(async (res) => {
        const token = await Object.entries(res.user)[5][1].b
        //set token to localStorage
        await localStorage.setItem('token', token)
        setToken(token)
      })
      .catch((err) => {
        console.log(err.message)
      })
  }

  const onSubmit = async (e) => {
    e.preventDefault()
    try {
      await signIn(email, password)
    } catch (err) {
      console.log(err)
    }
  }
  return (
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
