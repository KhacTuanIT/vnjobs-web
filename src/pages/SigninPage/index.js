import React, { } from 'react';
import '../../Login.css';
import { ReactComponent as LoginSVG } from '../../assets/svg/worker-in-front-of-a-computer-monitor.svg';

const index = () => {
    return (
        <section className="ftco-section">
            <div className="container">
                <div className="row justify-content-center">
                    <div className="col-md-12 col-lg-10">
                        <div className="wrap d-md-flex">
                            <div className="text-wrap p-4 p-lg-5 text-center d-flex align-items-center order-md-last">
                                <div className="text w-100">
                                    <h2>Welcome to login</h2>
                                    <LoginSVG />
                                    <p>Don't have an account?</p>
                                    <a href="/sign-up" className="btn btn-green btn-outline-white">Sign Up</a>
                                </div>
                            </div>
                            <div className="login-wrap p-4 p-lg-5">
                                <div className="d-flex">
                                    <div className="w-100">
                                        <h3 className="mb-4">Sign In</h3>
                                    </div>
                                    <div className="w-100">
                                        <p className="social-media d-flex justify-content-end">
                                            <a href="#" className="social-icon d-flex align-items-center justify-content-center"><span className="bi bi-facebook"></span></a>
                                            <a href="#" className="social-icon d-flex align-items-center justify-content-center"><span className="bi bi-google"></span></a>
                                        </p>
                                    </div>
                                </div>
                                <form action="#" className="signin-form">
                                    <div className="form-group mb-3">
                                        <label className="label" for="name">Username</label>
                                        <input type="text" className="form-control" placeholder="Username" required />
                                    </div>
                                    <div className="form-group mb-3">
                                        <label className="label" for="password">Password</label>
                                        <input type="password" className="form-control" placeholder="Password" required />
                                    </div>
                                    <div className="form-group">
                                        <button type="submit" className="form-control btn btn-primary-custom submit px-3">Sign In</button>
                                    </div>
                                    <div className="form-group d-md-flex">
                                        <div className="w-50 text-left">
                                            <div className="form-check">
                                                <input className="form-check-input" type="checkbox" value="" id="flexCheckDefault" />
                                                <label className="form-check-label" for="flexCheckDefault">
                                                    Remember me
                                                </label>
                                            </div>
                                        </div>
                                        <div className="w-50 text-md-right">
                                            <a href="#">Forgot Password</a>
                                        </div>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );

}
export default index;