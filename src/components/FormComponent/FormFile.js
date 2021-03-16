import React from 'react'
import { Form } from 'react-bootstrap'

const FormFile = ({ field, onChangeHandler }) => {
  // Todo: Custom
  return (
    <Form.Group>
      <Form.Label>{field.label}</Form.Label>
      <Form.File
        label={field.placeholder}
        name={field.name}
        accept={field.accept}
        required={field.required}
        onChange={(e) => onChangeHandler(e)}
        // custom
      />
    </Form.Group>
  )
}

export default FormFile
