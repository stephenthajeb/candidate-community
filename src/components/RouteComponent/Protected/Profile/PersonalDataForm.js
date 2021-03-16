import React, { useState, useEffect } from 'react'
import { Modal, Form, Button } from 'react-bootstrap'
import { submitPersonalData } from '../../../../firebase/utils'
import FormType from '../../../FormComponent/FormType'

const PersonalDataForm = ({ showModal, hideModal, data }) => {
  const initialState = {
    name: '',
    age: '',
    profile: null,
  }
  const [inputs, setInputs] = useState(data ? data : initialState)
  const { name, age, profile } = inputs
  const profileAllowedType = ['image/png']

  useEffect(() => {
    console.log(profile)
  }, [profile])

  const formFields = [
    {
      label: 'Your profile picture',
      componentType: 'file',
      name: 'profile',
      value: profile,
      accept: profileAllowedType,
      placeholder: profile ? profile.name : 'eg: profile.jpg with max 2Mb',
      required: true,
    },
    {
      label: 'Your name',
      componentType: 'input',
      name: 'name',
      type: 'text',
      value: name,
      placeholder: 'eg: Stephen Thajeb',
      required: true,
    },
    {
      label: 'Your age',
      componentType: 'input',
      name: 'age',
      type: 'number',
      value: age,
      placeholder: 'eg: 20',
      required: true,
    },
  ]

  const onChangeHandler = (e) => {
    if (e.target.name === 'profile') {
      setInputs({ ...inputs, profile: e.target.files[0] })
    } else {
      setInputs({ ...inputs, [e.target.name]: e.target.value })
    }
  }

  const isProfileValid = () => {
    return profile.size <= 2097152 && profileAllowedType.includes(profile.type) //2MB and png
  }

  const onSubmit = async (e) => {
    try {
      e.preventDefault()
      if (!profile || !isProfileValid()) {
        throw new Error('Profile image max 2Mb in png format')
      }
      await submitPersonalData(name, age, profile)
      hideModal()
    } catch (err) {
      console.log(err.message)
    }
  }

  return (
    <Modal show={showModal} centered backdrop="static" size="lg">
      <Modal.Header className="bg-secondary text-white">
        <Modal.Title className="font-weight-bold">
          Edit Personal Data
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={onSubmit}>
          {formFields.map((field) => (
            <FormType
              key={field.name}
              field={field}
              onChangeHandler={onChangeHandler}
            />
          ))}
          <div className="float-right mt-3">
            <Button onClick={hideModal} type="button" variant="danger">
              Cancel
            </Button>
            <Button type="submit" className="ml-2" variant="success">
              Save
            </Button>
          </div>
        </Form>
      </Modal.Body>
    </Modal>
  )
}

export default PersonalDataForm
