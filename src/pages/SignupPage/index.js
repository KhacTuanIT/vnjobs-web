import React, { } from 'react';
import { ReactComponent as RegisterSVG } from '../../assets/svg/businessman-standing-with-a-suitcase.svg';

const index = () => {
    return (
        <section className="ftco-section">
            <div className="container">
                <div className="row justify-content-center">
                    <div className="col-md-12 col-lg-10">
                        <div className="wrap d-md-flex">
                            <div className="text-wrap p-4 p-lg-5 text-center d-flex align-items-center">
                                <div className="text w-100">
                                    <h2>Welcome to Sign up</h2>
                                    <RegisterSVG />
                                    <p>You have an account?</p>
                                    <a href="/sign-in" className="btn btn-green btn-outline-white">Sign In</a>
                                </div>
                            </div>
                            <div className="login-wrap p-4 p-lg-5 order-md-last">
                                <div className="d-flex">
                                    <div className="w-100">
                                        <h3 className="mb-4">Sign Up</h3>
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
                                    <div className="form-group mb-3">
                                        <label className="label" for="password">Confirm Password</label>
                                        <input type="password" className="form-control" placeholder="Confirm Password" required />
                                    </div>
                                    <div className="form-group">
                                        <button type="submit" className="form-control btn btn-primary-custom submit px-3">Sign Up</button>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default index;