import Select from "react-select"
import "./FieldSectionTwo.css"
import PropTypes from "prop-types"

const FieldSectionTwo = (props) => {

  const styles = {
    fontSize : 24,
    innerHeight : 35,
    color : "blue"
  }

  FieldSectionTwo.propTypes = {
    name : PropTypes.string.isRequired,
    val : PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.number
    ]).isRequired,
    placeholder : PropTypes.string,
    firstUnits : PropTypes.arrayOf(PropTypes.object).isRequired,
    secondUnits : PropTypes.arrayOf(PropTypes.object).isRequired,
    setValue : PropTypes.func.isRequired,
    setFirstUnits : PropTypes.func.isRequired,
    setSecondUnits : PropTypes.func.isRequired
  }

  function handleChange(e) {
    props.setValue(e.target.value)
  }

  function handleFirstSelectChange(selectedOption) {
    if (selectedOption) {
      console.log("First selected Option")
      props.setFirstUnits(selectedOption.value)
    }else {
      console.log("NOT first selected Option")
    }
  }

  function handleSecondSelectChange(selectedOption) {
    if (selectedOption) {
      console.log("Second selected Option")
      props.setSecondUnits(selectedOption.value)
    }else {
      console.log("NOT second selected Option")
    }
  }

  return (
    <div className='FieldSectionTwo'>
      <span className='FieldSectionDoubleName'>{ props.name }</span>
      <input type="text"
        className="FieldSectionDoubleInput"
        value={ props.val }
        onChange={ handleChange }
        placeholder={ props.placeholder }
      />

      <div className = 'FieldSectionDoubleUnitsContainer'>
        <Select
          className="UnitBoxSetTwo"
          classNamePrefix="react-select"
          isSearchable={false}
          defaultValue={ props.firstUnits[0] }
          options={ props.firstUnits }
          onChange={ handleFirstSelectChange }
          style={styles.select}
        />
        <div className="UnitDivisor">
          <span>/</span>
        </div>
        <Select
          className="UnitBoxSetTwo"
          classNamePrefix="react-select"
          defaultValue={ props.secondUnits[0] }
          options={ props.secondUnits }
          onChange={ handleSecondSelectChange }
          style={styles.select}
        />
      </div>

    </div>
  )
}

export default FieldSectionTwo
