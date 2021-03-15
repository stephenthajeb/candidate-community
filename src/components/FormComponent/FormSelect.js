import React from 'react'
import { Form } from 'react-bootstrap'

const FormSelect = ({ field, onChangeHandler }) => {
  return (
    <Form.Group>
      <Form.Label>{field.label}</Form.Label>
      <Form.Control
        as="select"
        onChange={(e) => onChangeHandler(e)}
        name={field.name}
        value={field.value}
        placeholder={field.placeholder}
        required={field.required}
      >
        <option value="">Pilih</option>
        {field.options.map((optionItem) => (
          <option value={optionItem.value} key={optionItem.label}>
            {optionItem.label}
          </option>
        ))}
      </Form.Control>
    </Form.Group>
  )
}

export default FormSelect
