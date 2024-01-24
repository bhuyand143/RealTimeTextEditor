import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'

const Login = (props) => {
    const [credentials, setCredentials] = useState({ email: "", password: "" })
    let navigate = useNavigate();//for history
    const {setlogstatus}=props;
    const host = import.meta.env.VITE_APP_SERVER;
    const handleSubmit = async (e) => {
        e.preventDefault();
        const url = `${host}/api/login/`;
        const response = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({email:credentials.email,password:credentials.password})
        }); 
        const json=await response.json()
        if(json.success){
            //redirect
            localStorage.setItem('userid',json.user_id);
            localStorage.setItem('token',json.authToken);
            setlogstatus(true);
            alert('Logged in Successfully');
            navigate('/home');
        }
        else
        {
            alert(json.error);
        }
    }
    const onChange = (e) => {
        setCredentials({ ...credentials, [e.target.name]: e.target.value })
    }

    return (
        <div>
            <div className="container d-flex justify-content-center align-items-center my-3 ">
                <div className="row">
                    <div className="col-md-6 offset-md-3 col-xl-4 offset-xl-4">
                        <div className="card shadow">
                            <img src="https://images.unsplash.com/photo-1642543492493-f57f7047be73?&auto=format&fit=crop&w=1267&q=80&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OHx8dGV4dCUyMGVkaXRvcnxlbnwwfHwwfHx8MA%3D%3D"
                                alt="" className="card-img-top" />
                            <div className="card-body">
                                <h5 className="card-title">Login</h5>
                                <form onSubmit={handleSubmit}>
                                    <div className="mb-3">
                                        <label htmlFor="email" className="form-label">Email address</label>
                                        <input type="email" className="form-control" value={credentials.email} id="email" name='email' onChange={onChange} autoFocus required />
                                    </div>

                                    <div className="mb-3">
                                        <label htmlFor="password" className="form-label">Password</label>
                                        <input type="password" className="form-control" value={credentials.password} name='password' id="password" onChange={onChange} />
                                    </div>
                                    <div className="d-grid col-12">
                                        <button type='submit' className="btn btn-success btn-block">Login</button>
                                    </div>
                                </form>
                                <div className='mt-2 text-center'>
                                    <Link to="/signup">Does not have an account?</Link>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Login