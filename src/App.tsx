import gjensidigmon from './assets/images/gjensidigmon.png'
import './App.css'
import { useState } from 'react'

function App() {

  const [inputText, setInputText] = useState('')


  return (
    <>
      <div className="image-container">
        <img  src={gjensidigmon} alt="gjensidigmon"/>
      </div>
      <div className="search-container">
        <input 
          type="text"
          placeholder="Search pokemon"
          value={inputText}
          onChange={(e) => setInputText(e.target.value)}
        />
        <button onClick={() => console.log(inputText)}>Search</button>
      </div>
    </>
  )
}

export default App
