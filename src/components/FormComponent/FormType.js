import FormSelect from './FormSelect'
import FormInput from './FormInput'
import FormFile from './FormFile'
import FormCheck from './FormCheck'
import FormTextArea from './FormTextArea'

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
  if (field.componentType === 'check') {
    return <FormCheck field={field} onChangeHandler={onChangeHandler} />
  }
  if (field.componentType === 'textarea') {
    return <FormTextArea field={field} onChangeHandler={onChangeHandler} />
  }
}

export default FormType
