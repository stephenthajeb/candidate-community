import React, { useState, useContext } from 'react'
import { Form, Button } from 'react-bootstrap'
import { Redirect } from 'react-router'
import fb from '../../../firebase/firebaseConfig'
import { AlertContext } from '../../../provider/AlertProvider'
import { firebaseAuth } from '../../../provider/AuthProvider'
import FormType from '../../FormComponent/FormType'

const initialInputs = {
  username: '',
  email: '',
  password: '',
}

// Todo: add alertbox
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

  const registerToFirebase = async ({ username, email, password }) => {
    const snapshot = await fb
      .database()
      .ref('accessibility')
      .child(username)
      .get()
    if (snapshot.exists()) throw new Error('Failed. username taken')

    fb.auth()
      .createUserWithEmailAndPassword(email, password)
      .then(async (res) => {
        const token = await Object.entries(res.user)[5][1].b
        await localStorage.setItem('token', token)
        setToken(token)

        // store the user data
        fb.database().ref(`users/${res.user.uid}`).set({
          email: email,
          username: username,
        })

        // store the user data accessibility with default to private
        fb.database().ref(`accessibility/${username}`).set({
          name: false,
          age: false,
          profilePicture: false,
          workExperiences: false,
        })
      })
  }

  const onSubmit = async (e) => {
    e.preventDefault()
    try {
      if (password.trim().length < 6)
        throw new Error('Password consist of minimal 6 character')
      await registerToFirebase({ username, email, password })
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