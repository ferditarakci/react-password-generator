import React from 'react'
import Generator from './components/Generator'

function App() {
  return (
    <React.Fragment>
      <Generator />
      <div>
        <a href="https://ferditarakci.com.tr" target="_blank">
          Development by Ferdi Tarakci
        </a>
        <br />
        <a href="https://github.com/ferditarakci/react-password-generator" target="_blank">
          Github Repository
        </a>
      </div>
    </React.Fragment>
  )
}

export default App
