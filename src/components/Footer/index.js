import React from 'react';
import { Link } from 'react-router-dom';

const index = () => {
    return (
        <footer className="container-fluid footer">
            <div className="container footer-content">
                <div className="img-frame">
                    <img src="../../../images/logo_official.png" />
                </div>
                <div className="extension-content">
                    <div className="left-ec">
                        <div className="left-ec-title">
                            Company
                        </div>
                        <div className="list-link">
                            <ul>
                                <li><Link to="/">Home</Link></li>
                                <li><Link to="/">Jobs</Link></li>
                                <li><Link to="/">Sign in</Link></li>
                            </ul>
                        </div>
                    </div>
                    <div className="right-ec">
                        <div className="left-ec-title">
                            Contact Us
                        </div>
                        <div className="list-link">
                            <ul>
                                <li>Facebook: <Link to="/">fb</Link></li>
                                <li>Twitter: <Link to="/">twitter</Link></li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
            <div className="container cp-right">
                &copy; 2021, Inc.
            </div>
        </footer>
    );
};

export default index;