import TextEditor from "./components/TextEditor"
import "./App.css"

import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate
} from "react-router-dom";

import {v4 as uuidV4} from 'uuid'

function App() {


  return (
    <>
      <Router>
        <Routes>
          <Route exact path='/' element={ <Navigate to={`/documents/${uuidV4()}`} />} />
          <Route exact path='/documents/:id' element={<TextEditor />} />
        </Routes>
       
      </Router>
    </>
  )
}

export default App
