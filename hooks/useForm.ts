import { FormCtx } from 'context/form'
import { useContext } from 'react'

function useForm() {
  const { state, handleBlur, handleChange, handleSubmit } = useContext(FormCtx)

  return { formState: state, handleBlur, handleChange, handleSubmit }
}

export default useForm
