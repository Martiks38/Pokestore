import { useContext } from 'react'
import { FormCtx } from 'context/form'

function useForm() {
  const { state, handleBlur, handleChange, handleSubmit } = useContext(FormCtx)

  return { formState: state, handleBlur, handleChange, handleSubmit }
}

export default useForm
