import React from 'react';

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
                                <li><a href="">Home</a></li>
                                <li><a href="">Jobs</a></li>
                                <li><a href="">Sign in</a></li>
                            </ul>
                        </div>
                    </div>
                    <div className="right-ec">
                        <div className="left-ec-title">
                            Contact Us
                        </div>
                        <div className="list-link">
                            <ul>
                                <li>Facebook: <a href="">fb</a></li>
                                <li>Twitter: <a href="">twitter</a></li>
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