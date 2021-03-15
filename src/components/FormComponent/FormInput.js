import React from 'react'
import { Form } from 'react-bootstrap'
const FormInput = ({ field, onChangeHandler }) => {
  return (
    <Form.Group>
      <Form.Label>{field.label}</Form.Label>
      <Form.Control
        onChange={(e) => onChangeHandler(e)}
        type={field.type}
        name={field.name}
        value={field.value}
        placeholder={field.placeholder}
        required={field.required}
      />
    </Form.Group>
  )
}

export default FormInput
