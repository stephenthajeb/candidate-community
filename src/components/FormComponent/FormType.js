import FormSelect from './FormSelect'
import FormInput from './FormInput'
import FormFile from './FormFile'

const FormType = ({ field, onChangeHandler }) => {
  if (field.componentType === 'select') {
    return <FormSelect field={field} onChangeHandler={onChangeHandler} />
  }
  if (field.componentType === 'input') {
    return <FormInput field={field} onChangeHandler={onChangeHandler} />
  }
  if (field.componentType === 'file') {
    return <FormFile field={field} onChangeHandler={onChangeHandler} />
  }
}

export default FormType
