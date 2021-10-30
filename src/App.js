import { useState } from 'react'

// Styles
import './App.scss';

// Components
import Section from './components/Section/Section'

// JSON Structure Templates
import {jsonVehicle} from './jsondef'

/**
 * Application Component
 */
function App() {

  //create temporary template object to create empty fields using the JSON template
  let template = {}

  jsonVehicle.map(section => {
    let sectionTemplate = template[section.id] = {}
    section.fields.map(field => {
        sectionTemplate[field.id] = field.default
    })
  })

  //create state to save finalised JSON with values
  const [json, setJson] = useState(template)

  /**
   * Callback function thgat recieves the Section's field values and saves it to the finalised JSON state
   * @param {string} sectionId - ID of the MTS JSON Section
   * @param {Object} sectionFieldValues - JSON object with it's field's values
   */
  function getSection(sectionId, sectionFieldValues) {
    setJson({
      ...json,
      [sectionId]: sectionFieldValues
    })
  }

  //map array of sections from JSON template to create the Section components
  const sections = jsonVehicle.map(section => 
    <Section
      key={section.id}
      section={section} 
      sectionHandler={getSection}
    />
  )

  /**
   * Saves finalised JSON to file
   */
  function saveJson() {
    
    const reducedJson = {...json}
    
    for (let section in reducedJson) {
      const sectionFields = reducedJson[section]
      let refSection = {}
      jsonVehicle.map(tempSection => {
        if (tempSection.id === section) {
          refSection = tempSection
        }
      })
      for (let field in sectionFields) {
        let fieldValue = sectionFields[field]
        let refField = {}
        refSection.fields.map(tempField => {
          if (tempField.id === field) {
            refField = tempField
          }
        })
        if (!refField.required && !fieldValue) {
          delete sectionFields[field]
        }
      }
    }

    
    // fs.writeFile('myJson.json', JSON.stringify(reducedJson, null, 2))
    console.info(JSON.stringify(reducedJson, null, 2))
    console.info("Saved!")
  } 

  return (

    /* App Wrapper */
    <div className="App">

      {/* Header */}
      <header className="App-header">

        {/* File Open and Save */}
        <div tabIndex="0" className="dropdown button">
          File
          <div className="dropdown-content">
            <div tabindex="0" className="button">Open</div>
            <div tabindex="0" className="button" onClick={saveJson}>Save</div>
          </div>
        </div>

        <div tabIndex="0" className="dropdown button">
          About
          <div className="dropdown-content">
            <div tabindex="0" className="button">E</div>
            <div tabindex="0" className="button">A</div>
          </div>
        </div>

      </header>

      <main className="main">

        {/* JSON Editor */}
        <div className="json-editor">

          {sections}

        </div>
        
        {/* JSON Preview */}
        <pre>

          {JSON.stringify(json, null, 2)}

        </pre>

      </main>

    </div>
  );
}

export default App;
