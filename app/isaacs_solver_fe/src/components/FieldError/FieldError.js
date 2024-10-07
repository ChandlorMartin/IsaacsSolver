import "./FieldError.css"
import PropTypes from "prop-types"

const FieldError = (props) => {

  FieldError.propTypes = {
    msg : PropTypes.string.isRequired,
    placeholder : PropTypes.string,
    setMessage : PropTypes.func.isRequired
  }

  function handleChange(e) {
    props.setMessage(e.target.value)
  }

  return (
    <textarea
      className="FieldErrorDescription"
      value={ props.msg }
      onChange={ handleChange }
      placeholder={ props.placeholder }
      readOnly={true}
    />
  )
}

export default FieldError
