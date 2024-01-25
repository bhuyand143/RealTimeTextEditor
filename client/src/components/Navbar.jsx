import React from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom';
import logo from '../assets/logo.png'

const Navbar = (props) => {
    let location = useLocation();
    let navigate = useNavigate();
    const {setlogstatus,isLoggedin}=props;
    const handleLogout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('userid');
        setlogstatus(false);
        navigate('/login');
    }
    return (
        <div>
            <nav className="navbar navbar-expand-lg bg-dark navbar-dark">
                <div className="container-fluid">
                    <Link className="navbar-brand" to='/'><span><img src={logo} className='img-fluid' alt="" /></span> CollabText</Link>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarSupportedContent">
                        <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                            <li className="nav-item">
                                <Link className={`nav-link ${location.pathname === "/home" || location.pathname === "/login" ? 'active' : ''}`} aria-current="page" to='/home'>Home</Link>
                            </li>
                        </ul>

                        {!isLoggedin
                            ?
                            <form className="d-flex" role="search">
                                <Link to="/login" className='btn btn-primary mx-1' role="button">Login <i className="fa-solid fa-user"></i></Link>
                                <Link to="/signup" className='btn btn-primary mx-1' role="button">Sign Up <i className="fa-solid fa-user-plus"></i></Link>
                            </form>
                            :
                            <form className="d-flex">
                                <button onClick={handleLogout} className="btn btn-danger">Logout <i className="fa fa-sign-out"></i></button>
                            </form>}
                    </div>
                </div>
            </nav>
        </div>
    )
}

export default Navbar