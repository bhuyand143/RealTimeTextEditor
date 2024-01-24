import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';

const Signup = () => {
    const [credentials, setCredentials] = useState({ email: "", password: "", name: "" });
    let navigate = useNavigate();
    const host = import.meta.env.VITE_APP_SERVER;
    const handleSubmit = async (e) => {
        e.preventDefault();
        const url = `${host}/api/createUser/`;
        const response = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ name: credentials.name, email: credentials.email, password: credentials.password })
        });
        const json = await response.json();
        if (json.success) {
            alert('Account Created Successfully');
            localStorage.setItem('userid',json.user_id);
            localStorage.setItem('token',json.authToken);
            navigate('/home');
        }
        else {
            alert(json.error);
        }
    }

    const onChange = (e) => {
        setCredentials({ ...credentials, [e.target.name]: e.target.value })
    }
    return (
        <div>
            <div className="container d-flex justify-content-center align-items-center mt-2 ">
                <div className="row">
                    <div className="col-md-6 offset-md-3 col-xl-4 offset-xl-4">
                        <div className="card shadow">
                            <img src="https://images.unsplash.com/photo-1642543492493-f57f7047be73?&auto=format&fit=crop&w=1267&q=80&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OHx8dGV4dCUyMGVkaXRvcnxlbnwwfHwwfHx8MA%3D%3D" alt="" className="card-img-top" />
                            <div className="card-body">
                                <h5 className="card-title">Register</h5>
                                <form onSubmit={handleSubmit} >
                                    <div className="mb-3">
                                        <label htmlFor="name" className="form-label">Name</label>
                                        <input type="text" className="form-control" name='name' id="name" onChange={onChange} required autoFocus minLength={3} />
                                    </div>
                                    <div className="mb-3">
                                        <label htmlFor="exampleInputEmail1" className="form-label">Email address</label>
                                        <input type="email" className="form-control" name='email' id="email" aria-describedby="emailHelp" onChange={onChange} required />
                                        <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
                                    </div>
                                    <div className="mb-3">
                                        <label htmlFor="password" className="form-label">Password</label>
                                        <input type="password" name='password' className="form-control" id="password" onChange={onChange} required minLength={5} />
                                    </div>
                                    <div className="d-grid col-12">
                                        <button type="submit" className="btn btn-success btn-block">Register</button>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Signup