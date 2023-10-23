import { useInputField } from "@/app/hooks/useInputField"
import { useField } from "formik"
import PropTypes from "prop-types"

const InputFieldProps = {
  name: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
}

export const InputField = ({ name, type }) => {
  const fieldProps = useInputField({ name })

  return <input type={type} name={name} {...fieldProps} />
}

InputField.propTypes = InputFieldProps
