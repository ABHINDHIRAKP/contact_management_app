import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Lobby from './pages/Lobby'
import Login from './pages/Login'
import Register from './pages/Register'
import ContactList from './pages/ContactList'
import {addContact} from './services/ContactService'
import AddContacts from './pages/AddContacts'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'

function App() {
  const [count, setCount] = useState(0);
  const [contacts, setContacts] = useState([]);

  const addContactHandler = async (contact) => {
    const request = {...contact};
    const response = await addContact(request);

    setContacts([...contacts, response.data]);
  }

  return (
    <>
      <Router>
        <Routes>
          <Route path = "/" element={<Lobby />} />
          <Route path = "/Login" element={<Login />} />
          <Route path = "/Register" element={<Register />} />
          <Route path = "/Contacts" element={<ContactList />} />
          <Route 
            path = '/Contacts/add' 
            element={
              <AddContacts addContactHandler={addContactHandler}/>
            }
           />
        </Routes>
      </Router>
    </>
  )
}

export default App
