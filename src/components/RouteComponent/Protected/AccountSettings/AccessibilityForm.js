import React, { useContext, useState } from 'react'
import { Form, Modal, Button } from 'react-bootstrap'
import { submitAccessibilitySettings } from '../../../../firebase/utils'
import { AlertContext } from '../../../../provider/AlertProvider'
import FormCheck from '../../../FormComponent/FormCheck'

// Default set to all false (all private)
const initialState = {
  name: false,
  age: false,
  profilePicture: false,
  workExperiences: false,
}

const AccessibilityForm = ({ showModal, hideModal }) => {
  const [inputs, setInputs] = useState(initialState)
  const { addAlert } = useContext(AlertContext)

  const onSubmit = async (e) => {
    e.preventDefault()
    try {
      await submitAccessibilitySettings(inputs)
      hideModal()
    } catch (err) {
      hideModal()
      addAlert('danger', err.message)
    }
  }
  const onChangeHandler = (e) => {
    setInputs({ ...inputs, [e.target.name]: !inputs[e.target.name] })
  }

  const { name, age, profilePicture, workExperiences } = inputs

  const fields = [
    {
      label: 'Profile. Set data visibility to public?',
      name: 'profilePicture',
      type: 'checkbox',
      value: profilePicture,
      required: false,
    },
    {
      label: 'Name. Set data visibility to public?',
      name: 'name',
      type: 'checkbox',
      value: name,
      required: false,
    },
    {
      label: 'Age. Set data visibility to public?',
      name: 'age',
      type: 'checkbox',
      value: age,
      required: false,
    },
    {
      label: 'Work Experiences. Set data visibility to public?',
      name: 'workExperiences',
      type: 'checkbox',
      value: workExperiences,
      required: false,
    },
  ]

  return (
    <Modal show={showModal} centered backdrop="static" size="lg">
      <Modal.Header className="bg-secondary text-white">
        <Modal.Title className="font-weight-bold">
          Edit Data Accessibility Settings
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={onSubmit}>
          {fields.map((field) => (
            <FormCheck
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

export default AccessibilityForm
