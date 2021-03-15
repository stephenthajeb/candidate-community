import React from 'react'
import { Form } from 'react-bootstrap'

const FormCheck = ({ field, onChangeHandler }) => {
  return (
    <Form.Group>
      <Form.Check
        onChange={(e) => onChangeHandler(e)}
        inline
        label={field.label}
        type={field.type}
        name={field.name}
        value={field.value}
        required={field.required}
      />
    </Form.Group>
  )
}

export default FormCheck
