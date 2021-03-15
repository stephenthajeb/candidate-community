import React from 'react'
import { Form } from 'react-bootstrap'

const FormTextArea = ({ field, onChangeHandler }) => {
  return (
    <Form.Group>
      <Form.Label>{field.label}</Form.Label>
      <Form.Control
        as="textarea"
        rows="5"
        onChange={onChangeHandler}
        value={field.value}
        type={field.type}
        name={field.name}
        placeholder={field.placeholder}
        required={field.required}
        style={{ width: '100%' }}
      />
    </Form.Group>
  )
}

export default FormTextArea
