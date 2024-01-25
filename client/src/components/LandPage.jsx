import React from 'react';
import { Link } from 'react-router-dom';

const LandPage = () => {
    const backgroundImageUrl =
        'url(https://images.unsplash.com/photo-1627389955928-2f3a48686106?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D)';

    return (
        <div
            className="landpage-section text-white text-center pt-5"
            style={{
                backgroundImage: backgroundImageUrl,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                height: '96vh',
                boxShadow: 'inset 0 0 0 1000px rgba(0, 0, 0, 0.7)',
                
            }}
        >
            <div className="container">
                <h1 className="display-3 mb-md-5 text-warning">Welcome to CollabText</h1>
                <p className="lead">Your Collaborative Text Editing Platform</p>
            </div>

            <div className="container">
                <div className="row mt-5">
                    <div className="col-md-4">
                        <div className="card bg-transparent border-info mb-4">
                            <div className="card-body">
                                <h5 className="card-title text-info">Real-Time Collaboration</h5>
                                <p className="card-text text-light">
                                    Work together with your team in real-time, making collaboration seamless and efficient.
                                </p>
                            </div>
                        </div>
                    </div>
                    <div className="col-md-4">
                        <div className="card bg-transparent border-info mb-4">
                            <div className="card-body">
                                <h5 className="card-title text-info">Anywhere Access</h5>
                                <p className="card-text te">
                                    Access your collaborative documents from anywhere, providing seamless and flexible productivity.
                                </p>
                            </div>
                        </div>
                    </div>
                    <div className="col-md-4">
                        <div className="card bg-transparent border-info mb-4">
                            <div className="card-body">
                                <h5 className="card-title text-info">Secure and Private</h5>
                                <p className="card-text text-light">
                                    Your data is encrypted and secure, allowing you to focus on collaboration without compromising privacy.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="mt-md-5">
                    <Link to="/login" className="btn btn-success btn-lg">Get Started</Link>
                </div>
            </div>
        </div>
    );
};

export default LandPage;
