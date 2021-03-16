import React from 'react'
import { Form } from 'react-bootstrap'

const FormFile = ({ field, onChangeHandler }) => {
  // Todo: Custom
  return (
    <Form.Group>
      <Form.File
        label={field.label}
        name={field.name}
        accept={field.accept}
        required={field.required}
        onChange={(e) => onChangeHandler(e)}
      />
      <Form.Text className="text-muted">{field.placeholder}</Form.Text>
    </Form.Group>
  )
}

export default FormFile
