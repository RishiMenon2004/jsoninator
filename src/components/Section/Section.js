import { useEffect, useState } from 'react'
import {ReactComponent as Arrow} from '../../resources/svg/Arrow.svg'

// Styles
import './Section.scss'

// Components
import Field from '../Field/Field'
  
  /**
   * MTS JSON Section Component
   * @param {*} props - React props
   * @param {Object} props.section - Object that defines the section's fields
   * @param {Function} props.sectionHandler - Callback function that recieves a JSON object with the section's fields' values
   */
  function Section(props) {
  
    const {name, id, fields} = props.section
    const {sectionHandler} = props

    let template = {}
    fields.map(field => {
      template[field.id] = field.default
    })
  
    //States
    const [isSectionOpen, setIsSectionOpen] = useState(true)
    const [sectionJson, setSectionJson] = useState(template)
  
    /**
     * Callback function that recieves the field's name and value and saves it to state
     * @param {string} fieldId - ID of the field
     * @param {(string|boolean)} value - Value of the field
     */
    function getFields(fieldId, value) {
      setSectionJson({
          ...sectionJson,
          [fieldId]: value
      })

      // console.log(sectionJson)
    }
  
    useEffect(() => sectionHandler(id, sectionJson), [sectionJson])
  
    //map array of fields from section prop to create Field components
    const sectionFields = fields.map(field => 
      <Field
        key={field.id}
        field={field}
        valueHandler={getFields}
      />
    )
  
    return (

      /* Section component wrapper */
      <div
        tabindex="0"
        onKeyDown={(event) => {event.key === "Enter" && setIsSectionOpen(!isSectionOpen)}}
        className="section"
      >

        {/* Header */}
        <div
          className="section-header flex center-vert"
          onClick={() => setIsSectionOpen(!isSectionOpen)}
        >

          {/* Arrow indicator for collapsable content */}
          <Arrow className={`click-arrow ${isSectionOpen ? "collapsible" : ""}`}/>
  
          <h3 style={{display: 'inline', margin: 0}}>{name}</h3>
  
        </div>

        {/* Fields wrapper */}
        <div className={`section-fields ${!isSectionOpen ? "collapsed" : ""}`}>
  
          {sectionFields}
  
        </div>
  
      </div>
    )
  }

  export default Section