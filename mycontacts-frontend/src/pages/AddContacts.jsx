import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

function AddContacts({addContactHandler}) {
    const [person, setPerson] = useState({
        name: '',
        email: '',
        phone: ''
    })
    const navigate = useNavigate();

    const add = (e) => {
        e.preventDefault();
        if(person.name === "" || person.email === "" || person.phone === "") {
            alert("All the fields are mandatory!");
            return;
        }
        addContactHandler(person);
        setPerson({name:'', email:'', phone:''});
        navigate('/Contacts');
    };
    return (
        <div className = "ui main">
            <h2>Add Contact</h2>
            <form className="ui form" onSubmit={add}>
                <div className="field">
                    <label>Name</label>
                    <input 
                        type="text" 
                        name="name" 
                        placeholder="Name" 
                        value={person.name}
                        onChange={(e) => setPerson({...person, name: e.target.value})}
                    />
                </div>

                <div className="field">
                    <label>Email</label>
                    <input 
                        type="text" 
                        name="email" 
                        placeholder="Email"
                        value = {person.email}
                        onChange={(e) => setPerson({...person, email: e.target.value})}
                    />
                </div>

                <div className="field">
                    <label>Phone</label>
                    <input 
                        type="text" 
                        name="email" 
                        placeholder="Email"
                        value = {person.phone}
                        onChange={(e) => setPerson({...person, phone: e.target.value})}
                    />
                </div>
                <button className="ui button blue">Add</button>

            </form>
        </div>
    )

}
export default AddContacts;

