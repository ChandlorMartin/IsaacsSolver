import Select from "react-select"
import "./FieldSection.css"
import PropTypes from "prop-types"

const FieldSection = (props) => {

  FieldSection.propTypes = {
    name : PropTypes.string.isRequired,
    val : PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.number
    ]).isRequired,
    placeholder : PropTypes.string,
    units : PropTypes.arrayOf(PropTypes.object).isRequired,
    setValue : PropTypes.func.isRequired,
    setUnits : PropTypes.func.isRequired
  }

  function handleChange(e) {
    props.setValue(e.target.value)
  }

  function handleSelectChange(selectedOption) {
    if (selectedOption) {
      console.log("selected Option")
      props.setUnits(selectedOption.value)
    }else {
      console.log("NOT selected Option")
    }
  }

  return (
    <div className='FieldSectionSingle'>

      <div className='FieldSectionSingleName'>{ props.name }</div>
      <input type="text"
        className="FieldSectionSingleInput"
        value={ props.val }
        onChange={ handleChange }
        placeholder={ props.placeholder }
      />

      <div className = 'FieldSectionSingleUnitContainer'>
        <Select
          className="UnitBoxSetOne"
          classNamePrefix="react-select"
          defaultValue={ props.units[0] }
          options={ props.units }
          onChange={ handleSelectChange }
        />
      </div>
    </div>
  )
}

export default FieldSection
