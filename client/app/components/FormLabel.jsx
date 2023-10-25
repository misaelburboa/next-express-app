export const FormLabel = ({ text, className, htmlFor }) => (
  <>
    <label htmlFor={htmlFor} className="form-label">
      {text}
    </label>
  </>
)
