import { useEffect, useState } from 'react'
import camelCase from '../../case'

/**
 * Checkbox field component
 * @param {*} props - React props
 * @param {string} props.name - Name of the field
 * @param {Function} props.onChange - Callback function that recieves the field's value
 */
function Checkbox(props) {

  //create state to save the field's value
  const [checked, setChecked] = useState(false)

  /**
   * Function to toggle the field's state when clicked
   */
  function handleClick() {
    setChecked(!checked)
    props.onChange(!checked)
  }

  return (
    /* Custom checkbox element */
    <div tabIndex="0" onClick={handleClick} onKeyDown={(e) => e.key === "Enter" && handleClick()} className={`field-input checkbox ${checked ? "checked" : ""}`}>{props.name}</div>
  )
}

/**
 * Singular material field component
 * @param {*} props - React props
 */
function MaterialEntry(props) {

  /**
   * Miscellaneous
   */

  //stuff to toggle placeholder text
  const [placeholder, setPlaceholder] = useState("modID:itemID:dataValue:qty")
  let placeHolderCounter = 0

  function togglePlaceholder() {
    placeHolderCounter+=1
    placeHolderCounter%=3

    if (placeHolderCounter === 0) {
      setPlaceholder("modID:itemID:dataValue:qty")
    } else if (placeHolderCounter === 1) {
      setPlaceholder("mts:packID.itemID:qty")
    } else {
      setPlaceholder("oredict:itemID:qty")
    }
  }

  useEffect(() => {
    const intervalId = setInterval(() => togglePlaceholder(), 2000)
    return () => clearInterval(intervalId)
  }, [])

  /**
   * Actual Component
   */

  const {value, onChange} = props

  return (
    /* field input element */
    <input className="field-input" type="text" placeholder={placeholder} pattern="[a-zA-Z0-9]{1,99}:[a-zA-Z0-9._-]{1,99}:[0-9]{1,3}[:]{0,1}[1-9]{0,99}" onChange={(e) => onChange(e.target.value)} value={value}/>
  )

}

function MaterialsArray(props) {

  const [values, setValues] = useState([])

  const {name, onChange} = props

  useEffect(() => onChange(values), [values])

  return(
    <div className="materials-array">
      <h4>{name}</h4>

      {values.map((value, key) => (
        <MaterialEntry
          value={value}
          key={key}
          onChange={(newValue) => {
            const newValues = [...values]
            newValues[key] = newValue
            setValues(newValues)
          }}
        />

      ))}

      <div
        id="add-material"
        tabIndex="0"
        className="button"
        onClick={(e) => {
          setValues([...values, ""])
          e.preventDefault()
        }}
      >
        Add Entry
      </div>

    </div>
  )

}

/**
 * Field component
 * @param {*} props - React props
 * @param {Object} props.field - Object that define's the fields properties
 * @param {Function} props.valueHandler - Callback function that recieves the name and the value of the field
 */
function Field(props) {

  //extract required props
  const {valueHandler} = props
  const {type, name} = props.field

  //create state to save the field's value
  const [fieldValue, setFieldValue] = useState("")


  function handleChange(value) {
    setFieldValue(value)
    valueHandler(camelCase(name), value)
  }
  
  //return the respective components according to the type
  switch (type) {
    case "text":
      return (<input
                className="field-input"
                id={camelCase(name)}
                type={type} placeholder={name}
                value={fieldValue}
                onChange={(e) => handleChange(e.target.value)}
              />)
    
    case "text-area":
      return (<textarea
                className="field-input"
                id={camelCase(name)}
                placeholder={name}
                rows="1"cols="32"
                value={fieldValue}
                onChange={(e) => handleChange(e.target.value)}
              />)

    case "checkbox":
      return (<Checkbox
                id={camelCase(name)}
                name={name}
                onChange={handleChange}
              />)
      
    case "materials":
      return (
        <MaterialsArray
          name={name}
          onChange={handleChange}
        />
      )
      
    default:
      return (<input
                className="field-input"
                id={camelCase(name)}
                type={type}
                value={name}
                readOnly
              />)
  }
}

export default Field