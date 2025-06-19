import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Lobby from './pages/lobby'
import Login from './pages/Login'
import Register from './pages/Register'
import ContactList from './pages/ContactList'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <Router>
        <Routes>
          <Route path = "/" element={<Lobby />} />
          <Route path = "/Login" element={<Login />} />
          <Route path = "/Register" element={<Register />} />
          <Route path = "/Contacts" element={<ContactList />} />
        </Routes>
      </Router>
    </>
  )
}

export default App
