import React, { useEffect, useState } from 'react';
import '../../Login.css';
import { ReactComponent as LoginSVG } from '../../assets/svg/worker-in-front-of-a-computer-monitor.svg';
import AuthenticateNotify from '../../components/AuthenticateNotify';
import axios from 'axios';
import * as API from '../../constants/API';
import { Redirect } from 'react-router-dom';
import useLocalStorage from '../../utils/useLocalStorage';

const SignIn = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [data, setData] = useState([]);
    const [msgError, setMsgError] = useState("");
    const [isLogged, setIsLogged] = useState(false);
    const [localLoginStatus, setLocalLoginStatus] = useLocalStorage("is_logged", false);


    const validateInfo = () => {
        let isValid = true;
        if (email.length <= 0 || password.length <= 0) {
            isValid = false;
            setMsgError("Email & Password are require.");
        }
        return isValid;
    }

    const login = () => {
        const isValid = validateInfo();
        if (isValid) {
            setMsgError("");
            axios.post(API.LOGIN, {
                email: email,
                password: password,
            }, { withCredentials: true })
                .then(async function (response) {
                    if (response.status == 200) {
                        setLocalLoginStatus(true);
                        setIsLogged(true);
                    }
                })
                .catch(function (error) {
                    console.log("LOGIN: FAILED");
                    // console.log(error);
                    console.log(typeof (error.response));
                    if (typeof (error.response) != 'undefined') {
                        switch (error.response.status) {
                            case 422:
                                setMsgError("Your email or password are invalid")
                                setPassword("");
                                break;
                            case 401:
                                setMsgError("Email or Password are wrong!");
                                setPassword("");
                                break;
                            case 500:
                                setMsgError("Server error! Please try again later");
                                setPassword("");
                                break;
                            default:
                                setMsgError("Unkwown error! Please try again later");
                                setPassword("");
                                break;
                        }
                    }
                    else {
                        setMsgError("Network error!");
                        setPassword("");
                    }
                });
        }
    }

    useEffect(() => {
        console.log("RUNNED");
        const cancelTokenSource = axios.CancelToken.source();

        console.log("hi");
        console.log(localLoginStatus);
        if (!localLoginStatus) {
            axios.post(API.CHECK_VALID_TOKEN, null,
                {
                    withCredentials: true,
                    cancelToken: cancelTokenSource.token
                })
                .then(async function (response) {
                    if (response.status == 200) {
                        console.log(" HAHAHAHAHA SUCCESS | NEED NAV LINK TO HOME");
                        setIsLogged(true);
                        setLocalLoginStatus(true);
                    }
                })
                .catch(function (error) {
                    console.log("Still do not signed in");
                });
        }
        return () => cancelTokenSource.cancel();
    }, [isLogged]);

    if (localLoginStatus) return <Redirect to="/" />
    return (
        <section className="ftco-section">
            <div className="container">
                <div className="row justify-content-center">
                    <div className="col-md-12 col-lg-10">
                        <div className="wrap d-md-flex">
                            <div className="text-wrap p-4 p-lg-5 text-center d-flex align-items-center order-md-last">
                                <div className="text w-100">
                                    <h2>Welcome to VNJobs</h2>
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
                                        <AuthenticateNotify msg={msgError} />
                                        <label className="label" for="name">Email</label>
                                        <input type="text" className="form-control" value={email} onChange={(e) => { setEmail(e.target.value) }} placeholder="Email" required />
                                    </div>
                                    <div className="form-group mb-3">
                                        <label className="label" for="password">Password</label>
                                        <input type="password" className="form-control" value={password} onChange={(pwd) => { setPassword(pwd.target.value) }} placeholder="Password" required />
                                    </div>
                                    <div className="form-group">
                                        <button type="button" onClick={() => { login() }} className="form-control btn btn-primary-custom submit px-3">Sign In</button>
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
export default SignIn;
