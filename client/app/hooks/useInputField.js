import { useField } from "formik"
import { useCallback } from "react"

export const useInputField = ({
  name,
  id = name,
  ...props
}) => {

  const [
    { value, onBlur, onChange },
    { error, touched },
    { setValue },
  ] = useField({
    name,
  })

  const hasValue = Boolean(value)
  const isTouched = Boolean(touched)
  const hasError = error != null

  const isInvalidField = isTouched && hasError
  const isValidField = !hasError && isTouched && hasValue

  return {
    id,
    name,
    value,
    onBlur,
    onChange,
    isInvalidField,
    ...props,
  }
}
