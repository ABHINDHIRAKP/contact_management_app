import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Lobby from './pages/Lobby'
import Login from './pages/Login'
import Register from './pages/Register'
import ContactList from './pages/ContactList'
import ContactDetail from './pages/ContactDetail'
import {addContact, deleteContact} from './services/ContactService'
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

  const deleteContactHandler = async (id) => {
    await deleteContact(id);
    const newContactList = contacts.filter((contact) => {
      return contact._id !== id;
    });
    setContacts(newContactList);
  };

  return (
    <>
      <Router>
        <Routes>
          <Route path = "/" element={<Lobby />} />
          <Route path = "/Login" element={<Login />} />
          <Route path = "/Register" element={<Register />} />
          <Route 
            path = "/Contacts" 
            element={<ContactList deleteContactHandler = {deleteContactHandler}/>
            } 
          />
          <Route 
            path = '/Contacts/add' 
            element={
              <AddContacts addContactHandler={addContactHandler}/>
            }
          />
          <Route 
            path = '/Contacts/:id' 
            element={<ContactDetail />}
          />
        </Routes>
      </Router>
    </>
  )
}

export default App
