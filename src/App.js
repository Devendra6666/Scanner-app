import React, { useState } from 'react'
import NavBar from './Components/NavBar'
import QrDecoder from './Components/QrDecoder'
import QrGenerator from './Components/QrGenerator'

function App() {
  let [isChangedMode, setIsChangedMode] = useState(false)
  return (
    <div>
      <NavBar isChangedMode={isChangedMode} setIsChangedMode={setIsChangedMode} />
      {!isChangedMode && <QrGenerator /> }
      {isChangedMode && <QrDecoder /> }
    </div>
  )
}

export default App