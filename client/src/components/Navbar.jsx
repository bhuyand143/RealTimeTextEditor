import React from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom';


const Navbar = () => {
    let location = useLocation();
    let navigate = useNavigate();

    const handleLogout = () => {
        localStorage.removeItem('token');
        navigate('/login');
    }
    return (
        <div>
            <nav className="navbar navbar-expand-lg bg-dark navbar-dark">
                <div className="container-fluid">
                    <Link className="navbar-brand" to='/'>CollabText</Link>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarSupportedContent">
                        <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                            <li className="nav-item">
                                <Link className={`nav-link ${location.pathname === "/home" || location.pathname === "/login" ? 'active' : ''}`} aria-current="page" to='/home'>Home</Link>
                            </li>
                            {/* {location.pathname === `/documents/:id` && 
                             <>
                                <li class="nav-item dropdown">
                                    <a class="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                                        Connected users
                                    </a>
                                    <ul class="dropdown-menu">
                                        <li><a class="dropdown-item" href="#">Action</a></li>
                                        <li><a class="dropdown-item" href="#">Another action</a></li>
                                        <li><hr class="dropdown-divider" /></li>
                                        <li><a class="dropdown-item" href="#">Something else here</a></li>
                                    </ul>
                                </li>
                            </>} */}
                        </ul>

                        {!localStorage.getItem('token')
                            ?
                            <form className="d-flex" role="search">
                                <Link to="/login" className='btn btn-primary mx-1' role="button">Login <i className="fa-solid fa-user"></i></Link>
                                <Link to="/signup" className='btn btn-primary mx-1' role="button">Sign Up <i className="fa-solid fa-user-plus"></i></Link>
                            </form>
                            :
                            <form className="d-flex">
                                <button onClick={handleLogout} className="btn btn-primary">Logout <i class="fa fa-sign-out"></i></button>
                            </form>}
                    </div>
                </div>
            </nav>
        </div>
    )
}

export default Navbar