import React, { useContext, useState } from 'react'
import { Modal, Form, Button } from 'react-bootstrap'
import { submitExpData } from '../firebase/utils'
import { AlertContext } from '../provider/AlertProvider'
import FormType from './FormComponent/FormType'
const WorkExpForm = ({ showModal, hideModal, data, idx }) => {
  // Start date
  // End date (allow a current position option)
  // Job title
  // Company
  // Company logo
  // Job description
  const initialState = {
    title: '',
    start: '',
    end: '',
    company: '',
    isStillWorking: false,
    companyLogo: null,
    desc: '',
  }

  const [inputs, setInputs] = useState(data ? data : initialState)
  const { start, end, company, isStillWorking, companyLogo, desc } = inputs
  const logoAllowedType = ['image/png']
  const { addAlert } = useContext(AlertContext)
  const formFields = [
    {
      label: 'Start date',
      componentType: 'input',
      name: 'start',
      type: 'date',
      value: start,
      required: true,
    },
    {
      label: 'Still Work Here ? (Leave the end date if you checked this)',
      componentType: 'check',
      name: 'isStillWork',
      type: 'checkbox',
      value: isStillWorking,
      required: false,
    },
    {
      label: 'End date',
      componentType: 'input',
      name: 'end',
      type: 'date',
      value: end,
      required: false,
    },
    {
      label: 'Company',
      componentType: 'input',
      name: 'company',
      type: 'text',
      value: company,
      placeholder: 'eg: Google',
      required: true,
    },
    {
      label: 'Company`s Logo',
      componentType: 'file',
      name: 'companyLogo',
      accept: logoAllowedType,
      value: companyLogo,
      placeholder: companyLogo
        ? companyLogo.name
        : 'eg: google.jpg with max 2Mb',
      required: true,
    },
    {
      label: 'Your job description on this role',
      componentType: 'textarea',
      name: 'desc',
      type: 'text',
      value: desc,
      placeholder: 'I build front-end side application ....',
      required: true,
    },
  ]

  const onChangeHandler = (e) => {
    if (e.target.name === 'companyLogo') {
      setInputs({ ...inputs, companyLogo: e.target.files[0] })
    } else {
      setInputs({ ...inputs, [e.target.name]: e.target.value })
    }
  }
  const onSubmit = async (e) => {
    e.preventDefault()
    try {
      if (!isStillWorking && !end)
        throw new Error('Please choose your end date for this job experience')
      console.log(idx)
      await submitExpData(inputs, idx)
      hideModal()
    } catch (err) {
      addAlert('danger', err.message)
      console.log(err)
    }
  }

  return (
    <Modal show={showModal} centered backdrop="static" size="lg">
      <Modal.Header className="bg-secondary text-white">
        <Modal.Title className="font-weight-bold">
          {data ? 'Edit Work Experience Form' : 'Add New Experience form'}
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form
          onSubmit={(e) => {
            onSubmit(e)
          }}
        >
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

export default WorkExpForm
