import React, {useState} from 'react';
import { loginUser } from '../services/AuthService'

function Login() {
    const [loading, setLoading] = useState(false);
    const [form, setForm] = useState({
        email: '',
        password: ''
    });

    const handleLogin = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            const res = await loginUser(form);
            if(res.data?.accessToken){
                const accessToken = res.data.accessToken;
                console.log(accessToken);
                localStorage.setItem("accessToken", accessToken);
                setForm({
                    email: '',
                    password: ''
                });
                alert("Login Successfull");
            }
            else {
                throw new Error("Login Failed");
            }
            
            
        }
        catch (err) {
            alert(err.response?.data?.message||"Login Failed");
        }
        finally {
            setLoading(false);
        }

    };
  
    return (
        <div className="ui container">
        <h2>Login</h2>
        <form className="ui form" onSubmit={handleLogin}>

            <div className="field">
                <label>Email</label>
                <input 
                    type="text" 
                    name="email" 
                    placeholder="Email" 
                    value = {form.email}
                    onChange={(e) => setForm({...form, email: e.target.value})}
                />
            </div>

            <div className="field">
            <label>Password</label>
            <input 
                type="password" 
                name="password" 
                placeholder="Password" 
                value = {form.password}
                onChange={(e) => setForm({...form, password: e.target.value})}
            />
            </div>

            <button className="ui button blue" type="submit" disabled={loading}>Login</button>
        </form>
        </div>
    );
    }

export default Login;
