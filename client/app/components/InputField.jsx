import { useInputField } from "@/app/hooks/useInputField"
import { ErrorMessage, useField } from "formik"
import PropTypes from "prop-types"

import * as styles from "./InputField.module.css"
import clsx from "clsx"

export const InputField = ({ className, label, ...props }) => {
  const { isInvalidField, ...fieldProps } = useInputField(props)

  return (
    <>
      <label htmlFor={fieldProps.name} className="form-label">
        {label}
      </label>

      <input {...fieldProps} className={clsx(className, "form-control")} />

      <div className={clsx("mt-2", isInvalidField && styles.invalid)}>
        <ErrorMessage name={props.name} />
      </div>
    </>
  )
}
