import { NavLink } from 'react-router-dom';
import React, { useState, useEffect } from 'react';
import AuthenticateNotify from '../../components/AuthenticateNotify';
import { ReactComponent as RegisterSVG } from '../../assets/svg/businessman-standing-with-a-suitcase.svg';
import axios from 'axios';
import * as API from '../../constants/API';
import { Redirect } from 'react-router-dom';
import useLocalStorage from '../../utils/useLocalStorage';


const SignUp = () => {
    const [data, setData] = useState({
        first_name: null,
        last_name: null,
        email: null,
        password: null,
        confirm_pwd: null
    });
    const [isClickAction, setIsClickAction] = useState(false);
    const [msgError, setMsgError] = useState("");
    const [localLoginStatus, setLocalLoginStatus] = useLocalStorage("is_logged", false);
    const validateInfo = () => {
        let isValid = false;
        //STEP_1
        const formArr = Object.values(data);
        let isFullyFill = true;
        formArr.forEach(element => {
            if (!element) isFullyFill = false
        });
        //STEP 2
        if (isFullyFill) {
            console.log(data.password === data.confirm_pwd);
            if (data.password === data.confirm_pwd) isValid = true;
            else {
                isValid = false;
                setMsgError("Password and Confirm password are not match");
            }
        }
        else {
            setMsgError("You must fill all information");
        }
        setIsClickAction(false)
        return isValid;
    }

    const signup = () => {
        setIsClickAction(true)
        const isPassedValidate = validateInfo();
        if (isPassedValidate) {
            setMsgError("");
            axios.post(API.REGISTER, data,)
                .then(async function (response) {
                    console.log(response);
                    if (response.status == 201) {
                        setMsgError("");
                        loginAfterSignedUp();
                    }
                })
                .catch(function (error) {
                    setIsClickAction(false)
                    if (typeof (error.response) != 'undefined') {
                        switch (error.response.status) {
                            case 422:
                                setMsgError("Your data you given are invalid")
                                break;
                            case 401:
                                setMsgError("Email or Password are wrong!");
                                break;
                            case 500:
                                setMsgError("Server error! Please try again later");
                                break;
                            default:
                                setMsgError("Unkwown error! Please try again later");
                                break;
                        }
                    }
                    else {
                        setMsgError("Network error!");
                    }
                });
        }
    }

    const loginAfterSignedUp = () => {
        axios.post(API.LOGIN, {
            email: data.email,
            password: data.password,
        }, { withCredentials: true })
            .then(async function (response) {
                if (response.status == 200) {
                    setMsgError("");
                    setLocalLoginStatus(true);
                    setIsClickAction(false)
                }
            })
            .catch(function (error) {
                console.log("LOGIN: FAILED");
                setLocalLoginStatus(false);
                setIsClickAction(false)
                console.log(typeof (error.response));
                if (typeof (error.response) != 'undefined') {
                    switch (error.response.status) {
                        case 422:
                            setMsgError("Login after sign up failed ! CODE [422]")
                            break;
                        case 401:
                            setMsgError("Login after sign up failed ! CODE [401]");
                            break;
                        case 500:
                            setMsgError("Login after sign up failed ! CODE [500]");
                            break;
                        default:
                            setMsgError("Login after sign up failed ! CODE [Unkwown error]");
                            break;
                    }
                }
                else {
                    setMsgError("Login after sign up failed ! CODE [Network error]");
                }
            });
    }
    if (localLoginStatus) return <Redirect to="/" />

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
                                    <NavLink to="/sign-in" className="btn btn-white btn-outline-white">Sign In</NavLink>
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
                                        <AuthenticateNotify msg={msgError} color="red" />
                                        <label className="label" for="name">Email</label>
                                        <input type="text" value={data.email} onChange={(e) => { setData({ ...data, email: e.target.value }) }} className="form-control" placeholder="Email" required />
                                    </div>
                                    <div className="form-group d-flex">
                                        <div className="form-group mb-3 w-40 mr-2">
                                            <label className="label" for="name">First name</label>
                                            <input type="text" value={data.first_name} onChange={(e) => { setData({ ...data, first_name: e.target.value }) }} className="form-control" placeholder="First name" required />
                                        </div>
                                        <div className="form-group mb-3 w-40 ml-2">
                                            <label className="label" for="name">Last name</label>
                                            <input type="text" value={data.last_name} onChange={(e) => { setData({ ...data, last_name: e.target.value }) }} className="form-control" placeholder="Last name" required />
                                        </div>

                                    </div>
                                    <div className="form-group mb-3">
                                        <label className="label" for="password">Password</label>
                                        <input type="password" value={data.password} onChange={(e) => { setData({ ...data, password: e.target.value }) }} className="form-control" placeholder="Password" required />
                                    </div>
                                    <div className="form-group mb-3">
                                        <label className="label" for="password">Confirm Password</label>
                                        <input type="password" value={data.confirm_pwd} onChange={(e) => { setData({ ...data, confirm_pwd: e.target.value }) }} className="form-control" placeholder="Confirm Password" required />
                                    </div>
                                    <div className="form-group">
                                        <button type="button" onClick={() => { signup() }} disabled={isClickAction} className="form-control btn btn-primary-custom submit px-3">Sign Up</button>
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

export default SignUp;