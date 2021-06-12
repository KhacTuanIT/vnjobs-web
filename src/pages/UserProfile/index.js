import React, { useState, useEffect, useRef } from 'react';
import './userProfile.css';
import * as Config from '../../constants/Config';
import axios from 'axios';
import { NavLink, Redirect } from 'react-router-dom';

const UserProfile = () => {

    const [user, setUser] = useState(null);
    const [org, setOrg] = useState(null);
    const [recruitmentNews, setRecruitmentNews] = useState(null);
    const [applied, setApplied] = useState(null);
    const [isCreateOrg, setIsCreateOrg] = useState(false);
    const [isEditInfo, setIsEditInfo] = useState(false);
    const [isCreateRecruitmentNews, setIsCreateRecruitmentNews] = useState(false);
    const [isMember, setIsMember] = useState(false);
    const [isOrg, setIsOrg] = useState(true);
    const [isEditOrg, setIsEditOrg] = useState(false);
    const [isManageOrg, setIsManageOrg] = useState(false);
    const [majors, setMajors] = useState(null);
    const [isLogged, setIsLogged] = useState(true);
    const mountedRef = useRef(true)

    useEffect(async() => {
        if (!majors) {
            try {
                const payload = await axios.get(`${Config.API}${Config.MAJOR}`);
                if (payload.status === 200) {
                    console.log('GET MAJOR LIST:');
                    setMajors(payload.data.data);
                } 
            } catch (error) {
                console.log(error);
            }
        }
    }, [majors]);

    useEffect(async() => {
        if (!user) {
            try {
                const payload = await axios.get(`${Config.API}${Config.USER}`, null, 
                    {
                        withCredenticals: true,
                    }
                );
                if (payload.status === 200) {
                    if (!mountedRef.current) return null
                    console.log('GET USER');
                    setUser(payload.data);
                }
                else if (payload.status === 401) {
                    if (!mountedRef.current) return null
                    console.log('User not login yet.');
                }
            } catch (error) {
                if (!mountedRef.current) return null
                if (error.response !== 'undefined') {
                    if (error.response.status === 401) {
                        console.log('User not login yet.');
                        setIsLogged(true);
                    }
                }
            }
        }
    }, [user]);

    useEffect(async() => {
        if (!applied) {
            try {
                const payload = await axios.get(`${Config.API}${Config.APPLIED}`, null,
                {
                    withCredenticals: true,
                });
                if (payload.status === 200) {
                    console.log('GET APPLIED LIST');
                    console.log(payload.data.data);
                    setApplied(payload.data.data);
                }
            } catch (error) {
                if (error.response !== 'undefined') {
                    if (error.response.status === 401) {
                        console.log('User not login yet.');
                        setIsLogged(true);
                    }
                }
            }
        }
    }, [applied]);

    return isLogged ? <Redirect to="/sign-in" /> : (
        <div className="container mt-3 mb-3">
            <div className="row">
                
                <div className="col-md-4 mb-3 text-left">
                    <div><h4>USER PROFILE</h4></div>
                </div>
            </div>
            <div className="row gutters-sm">
                <div className="col-md-4 mb-3">
                    <div className="card">
                        <div className="card-body">
                            <div className="d-flex flex-column align-items-center text-center">
                                <img src="https://bootdey.com/img/Content/avatar/avatar7.png" alt="Admin" className="rounded-circle" width="150" />
                                <div className="mt-3">
                                    <h4>{user ? user.first_name + ' ' + user.last_name : 'Veinz Tran'}</h4>
                                    <p className="text-secondary mb-1">{user ? user.bio : 'bio'}</p>
                                    <p className="text-muted font-size-sm">{user ? user.address : 'Bay Area, San Francisco, CA'}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="card mt-3">
                        <ul className="list-group list-group-flush">
                            <li className="list-group-item d-flex justify-content-between align-items-center flex-wrap">
                                <h6 className="mb-0">
                                    <svg width="48px" height="48px" viewBox="0 0 48 48" version="1.1" xmlns="http://www.w3.org/2000/svg">
                                        <title>Linkedin</title>
                                        <g id="Icon/Social/linkedin-color" stroke="none" strokeWidth="1" fill="none" fillRule="evenodd">
                                            <path d="M20.9716667,33.5527338 L25.001,33.5527338 L25.001,27.1328007 C25.001,25.439485 25.3213333,23.7988354 27.4206667,23.7988354 C29.491,23.7988354 29.517,25.7351486 29.517,27.2404662 L29.517,33.5527338 L33.5506667,33.5527338 L33.5506667,26.4341413 C33.5506667,22.9381777 32.796,20.2505391 28.711,20.2505391 C26.7483333,20.2505391 25.432,21.3265278 24.8943333,22.3471839 L24.839,22.3471839 L24.839,20.5725357 L20.9716667,20.5725357 L20.9716667,33.5527338 Z M16.423,14.1202696 C15.1273333,14.1202696 14.0823333,15.1682587 14.0823333,16.4595785 C14.0823333,17.7508984 15.1273333,18.7992208 16.423,18.7992208 C17.7133333,18.7992208 18.761,17.7508984 18.761,16.4595785 C18.761,15.1682587 17.7133333,14.1202696 16.423,14.1202696 L16.423,14.1202696 Z M14.4026667,33.5527338 L18.4406667,33.5527338 L18.4406667,20.5725357 L14.4026667,20.5725357 L14.4026667,33.5527338 Z M9.76633333,40 C8.79033333,40 8,39.2090082 8,38.2336851 L8,9.76631493 C8,8.79065843 8.79033333,8 9.76633333,8 L38.234,8 C39.2093333,8 40,8.79065843 40,9.76631493 L40,38.2336851 C40,39.2090082 39.2093333,40 38.234,40 L9.76633333,40 Z" id="Shape" fill="#007BB5"></path>
                                        </g>
                                    </svg>
                                    Linkedin
                                </h6>
                                <NavLink to={user ? user.social_linkedin : '#'} className="text-secondary">visit</NavLink>
                            </li>
                            <li className="list-group-item d-flex justify-content-between align-items-center flex-wrap">
                                <h6 className="mb-0 ml-2">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="feather feather-facebook mr-2 icon-inline text-primary"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path></svg>
                                    <span className="ml-2">Facebook</span>
                                </h6>
                                <NavLink to={user ? user.social_facebook : '#'} className="text-secondary">visit</NavLink>
                            </li>
                        </ul>
                    </div>
                    {/* check: user have org? => show button for create/manage company */}
                    {isOrg ? <div className="card mt-3">
                            <div className="d-flex justify-content-between pr-3 pl-3">
                                <div className="text-left d-flex align-items-center">
                                    <i className="bi bi-building pr-3"></i> Company
                                </div>
                                <div className="text-right pt-3 pb-3">
                                    <button className="btn btn-outline-secondary br-6" onClick={() => setIsManageOrg(true)}>Manage</button>
                                </div>
                            </div>
                        </div> :
                        <div className="card mt-3">
                            <div className="d-flex justify-content-between pr-3 pl-3">
                                <div className="text-left d-flex align-items-center">
                                    <i className="bi bi-building pr-3"></i> Company
                                </div>
                                <div className="text-right pt-3 pb-3">
                                    <button className="btn btn-outline-secondary br-6" onClick={() => setIsCreateOrg(true)}>Create</button>
                                </div>
                            </div>
                        </div>
                    }
                    {/* check: user is member or user is org => show button create recruitment news */}
                    { isOrg && <div className="card mt-3">
                        <div className="d-flex justify-content-between pr-3 pl-3">
                            <div className="text-left d-flex align-items-center">
                                <i className="bi bi-newspaper pr-3"></i> Recruitment news
                            </div>
                            <div className="text-right pt-3 pb-3">
                                <button className="btn btn-outline-secondary br-6" onClick={() => setIsCreateRecruitmentNews(true)}>Create</button>
                            </div>
                        </div>
                    </div> || isMember && <div className="card mt-3">
                        <div className="d-flex justify-content-between pr-3 pl-3">
                            <div className="text-left d-flex align-items-center">
                                <i className="bi bi-newspaper pr-3"></i> Recruitment news
                            </div>
                            <div className="text-right pt-3 pb-3">
                                <button className="btn btn-outline-secondary br-6" onClick={() => setIsCreateRecruitmentNews(true)}>Create</button>
                            </div>
                        </div>
                    </div>}
                </div>
                
                {/* check: if user have company > if click manage company => show company's info */}
                {/* check: if click editOrg => show input for editing */}
                { isManageOrg ? <div className="col-md-8">
                    <div className="card mb-3">
                        <div className="card-header">
                            <h5>YOUR COMPANY</h5>
                            <div className="company-status company-confirmed">
                                Comfirmed
                            </div>
                            <button className="close-button btn br-6" onClick={() => setIsManageOrg(false)}>
                                <i className="bi bi-x-octagon"></i>
                            </button>
                            
                        </div>
                        <div className="card-body">
                            <div className="row">
                                <div className="col-sm-3 d-flex align-items-center">
                                    <h6 className="mb-0">Company Name</h6>
                                </div>
                                <div className="col-sm-9 text-secondary text-left">
                                    {
                                        isEditOrg ? 
                                        <input type="text" className="form-control" placeholder="Company name" name="org_name" />
                                        : 'Company name' 
                                    }
                                </div>
                            </div>
                            <hr />
                            <div className="row">
                                <div className="col-sm-3 d-flex align-items-center">
                                    <h6 className="mb-0">Company Phone</h6>
                                </div>
                                <div className="col-sm-9 text-secondary text-left">
                                {
                                    isEditOrg ? 
                                    <input type="text" className="form-control" placeholder="Company phone" name="org_phone" />
                                    : 'Company Phome'
                                }
                                </div>
                            </div>
                            <hr />
                            <div className="row">
                                <div className="col-sm-3 d-flex align-items-center">
                                    <h6 className="mb-0">Tax</h6>
                                </div>
                                <div className="col-sm-9 text-secondary text-left">
                                { isEditOrg ?
                                    <input type="text" className="form-control" placeholder="Tax ID" name="tax" />
                                    : 'Tax ID'
                                }
                                </div>
                            </div>
                            <hr />
                            <div className="row">
                                <div className="col-sm-3 d-flex align-items-center">
                                    <h6 className="mb-0">Description</h6>
                                </div>
                                <div className="col-sm-9 text-secondary text-left">
                                { isEditOrg ?
                                    <input type="text" className="form-control" placeholder="Description" name="description" />
                                    : 'Description'
                                }
                                </div>
                            </div>
                            <hr />
                            <div className="row">
                                <div className="col-sm-3 d-flex align-items-center">
                                    <h6 className="mb-0">Address</h6>
                                </div>
                                <div className="col-sm-9 text-secondary text-left">
                                { isEditOrg ?
                                    <input type="text" className="form-control" placeholder="Address" name="org_address" />
                                    : 'Address'
                                }
                                </div>
                            </div>
                            <hr />
                            <div className="row">
                            { isEditOrg ?
                                <div className="col-sm-12">
                                    <button type="button" className="btn btn-danger br-6 mr-3" onClick={() => setIsEditOrg(false)}>Cancel</button>
                                    <button type="button" className="btn btn-info br-6">Save</button>
                                </div>
                                : <div className="col-sm-12">
                                    <button type="button" className="btn btn-info br-6" onClick={() => setIsEditOrg(true)}>Edit</button>
                                </div>
                            }
                            </div>
                        </div>
                    </div>
                </div> : 
                // check: if user does not have a company > if click create company => show form to create a company
                isCreateOrg ? <div className="col-md-8">
                    <div className="card mb-3">
                        <div className="card-header">
                            <h5>CREATE YOUR COMPANY</h5>
                            <button className="close-button btn br-6" onClick={() => setIsCreateOrg(false)}>
                                <i className="bi bi-x-octagon"></i>
                            </button>
                            
                        </div>
                        <div className="card-body">
                            <div className="row">
                                <div className="col-sm-3 d-flex align-items-center">
                                    <h6 className="mb-0">Company Name</h6>
                                </div>
                                <div className="col-sm-9 text-secondary text-left">
                                    <input type="text" className="form-control" placeholder="Company name" name="first_name" />
                                </div>
                            </div>
                            <hr />
                            <div className="row">
                                <div className="col-sm-3 d-flex align-items-center">
                                    <h6 className="mb-0">Company Phone</h6>
                                </div>
                                <div className="col-sm-9 text-secondary text-left">
                                    <input type="text" className="form-control" placeholder="Company phone" name="first_name" />
                                </div>
                            </div>
                            <hr />
                            <div className="row">
                                <div className="col-sm-3 d-flex align-items-center">
                                    <h6 className="mb-0">Tax</h6>
                                </div>
                                <div className="col-sm-9 text-secondary text-left">
                                    <input type="text" className="form-control" placeholder="Tax ID" name="first_name" />
                                </div>
                            </div>
                            <hr />
                            <div className="row">
                                <div className="col-sm-3 d-flex align-items-center">
                                    <h6 className="mb-0">Description</h6>
                                </div>
                                <div className="col-sm-9 text-secondary text-left">
                                    <input type="text" className="form-control" placeholder="Description" name="first_name" />
                                </div>
                            </div>
                            <hr />
                            <div className="row">
                                <div className="col-sm-3 d-flex align-items-center">
                                    <h6 className="mb-0">Address</h6>
                                </div>
                                <div className="col-sm-9 text-secondary text-left">
                                    <input type="text" className="form-control" placeholder="Address" name="first_name" />
                                </div>
                            </div>
                            <hr />
                            <div className="row">
                                <div className="col-sm-12">
                                    <button type="button" className="btn btn-info br-6">Create</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div> : isCreateRecruitmentNews ? 
                <div className="col-md-8">
                    <div className="card mb-3">
                        <div className="card-header">
                            <h5>CREATE RECRUITMENT NEWS</h5>
                            <button className="close-button btn br-6" onClick={() => setIsCreateRecruitmentNews(false)}>
                                <i className="bi bi-x-octagon"></i>
                            </button>
                        </div>
                        <div className="card-body">
                            <input type="hidden" name="org_id" value=""/>
                            <input type="hidden" name="author_id" value=""/>
                            
                            <div className="row">
                                <div className="col-sm-3 d-flex align-items-center">
                                    <h6 className="mb-0">Major</h6>
                                </div>
                                <div className="col-sm-9 text-secondary text-left">
                                    <select className="form-select" name="major_id">
                                        <option selected>Select major</option>
                                        {
                                            majors ? 
                                                majors.map((e, i) => {
                                                    return <option value={e.id} key={e.id + '_mj_'}>{e.major_name}</option>
                                                }) : null
                                        }
                                    </select>
                                </div>
                            </div>
                            <hr />
                            <div className="row">
                                <div className="col-sm-3 d-flex align-items-center">
                                    <h6 className="mb-0">Title</h6>
                                </div>
                                <div className="col-sm-9 text-secondary text-left">
                                    <input type="text" className="form-control" placeholder="Title" name="title" />
                                </div>
                            </div>
                            <hr />
                            <div className="row">
                                <div className="col-sm-3 d-flex align-items-center">
                                    <h6 className="mb-0">Content</h6>
                                </div>
                                <div className="col-sm-9 text-secondary text-left">
                                    <input type="text" className="form-control" placeholder="Content" name="content" />
                                </div>
                            </div>
                            <hr />
                            <div className="row">
                                <div className="col-sm-3 d-flex align-items-center">
                                    <h6 className="mb-0">Address</h6>
                                </div>
                                <div className="col-sm-9 text-secondary text-left">
                                    <input type="text" className="form-control" placeholder="Address" name="address" />
                                </div>
                            </div>
                            <hr />
                            <div className="row">
                                <div className="col-sm-3 d-flex align-items-center">
                                    <h6 className="mb-0">City</h6>
                                </div>
                                <div className="col-sm-9 text-secondary text-left">
                                    <input type="text" className="form-control" placeholder="City" name="city" />
                                </div>
                            </div>
                            <hr />
                            <div className="row">
                                <div className="col-sm-3 d-flex align-items-center">
                                    <h6 className="mb-0">Work Type</h6>
                                </div>
                                <div className="col-sm-9 text-secondary text-left">
                                    <input type="text" className="form-control" placeholder="Work type" name="work_type" />
                                </div>
                            </div>
                            <hr />
                            <div className="row">
                                <div className="col-sm-3 d-flex align-items-center">
                                    <h6 className="mb-0">Start Time</h6>
                                </div>
                                <div className="col-sm-9 text-secondary text-left">
                                    <input type="datetime-local" className="form-control" placeholder="Start time" name="start_time" />
                                </div>
                            </div>
                            <hr />
                            <div className="row">
                                <div className="col-sm-3 d-flex align-items-center">
                                    <h6 className="mb-0">End Time</h6>
                                </div>
                                <div className="col-sm-9 text-secondary text-left">
                                    <input type="datetime-local" className="form-control" placeholder="End time" name="end_time" />
                                </div>
                            </div>
                            <hr />
                            <div className="row">
                                <div className="col-sm-3 d-flex align-items-center">
                                    <h6 className="mb-0">Start Interview Time</h6>
                                </div>
                                <div className="col-sm-9 text-secondary text-left">
                                    <input type="datetime-local" className="form-control" placeholder="Start interview time" name="interview_start_time" />
                                </div>
                            </div>
                            <hr />
                            <div className="row">
                                <div className="col-sm-3 d-flex align-items-center">
                                    <h6 className="mb-0">End Interview Time</h6>
                                </div>
                                <div className="col-sm-9 text-secondary text-left">
                                    <input type="datetime-local" className="form-control" placeholder="End interview time" name="interview_end_time" />
                                </div>
                            </div>
                            <hr />
                            <div className="row">
                                <div className="col-sm-12">
                                    <button type="button" className="btn btn-info br-6">Create</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                :
                // /* default => show user's info */
                <div className="col-md-8">
                    <div className="card mb-3">
                        <div className="card-body">
                            <div className="row">
                                <div className="col-sm-3 d-flex align-items-center">
                                    <h6 className="mb-0">First Name</h6>
                                </div>
                                <div className="col-sm-9 text-secondary text-left">
                                    { !isEditInfo ?
                                    user ? user.first_name : 'Tran' :
                                    <input type="text" className="form-control" placeholder="First name" name="first_name" />}
                                </div>
                            </div>
                            <hr />
                            <div className="row">
                                <div className="col-sm-3 d-flex align-items-center">
                                    <h6 className="mb-0">Last Name</h6>
                                </div>
                                <div className="col-sm-9 text-secondary text-left">
                                { !isEditInfo ?
                                    user ? user.last_name : 'Veinz' :
                                    <input type="text" className="form-control" placeholder="Last name" name="last_name" />
                                }
                                </div>
                            </div>
                            <hr />
                            <div className="row">
                                <div className="col-sm-3 d-flex align-items-center">
                                    <h6 className="mb-0">Email</h6>
                                </div>
                                <div className="col-sm-9 text-secondary text-left">
                                { !isEditInfo ?
                                    user ? user.email : 'mail@example.com' :
                                    <input type="text" className="form-control" placeholder="Email" name="email" />
                                }
                                </div>
                            </div>
                            <hr />
                            <div className="row">
                                <div className="col-sm-3 d-flex align-items-center">
                                    <h6 className="mb-0">Phone</h6>
                                </div>
                                <div className="col-sm-9 text-secondary text-left">
                                { !isEditInfo ?
                                    user ? user.phone : '(239) 902-2342' :
                                    <input type="text" className="form-control" placeholder="Phone number" name="phone" />
                                }
                                </div>
                            </div>
                            <hr />
                            <div className="row">
                                <div className="col-sm-3 d-flex align-items-center">
                                    <h6 className="mb-0">Date of birth</h6>
                                </div>
                                <div className="col-sm-9 text-secondary text-left">
                                { !isEditInfo ?
                                    user ? user.dob : '02/02/2002' :
                                    <input type="datetime-local" className="form-control" placeholder="Date of birth" name="dob" />
                                }
                                </div>
                            </div>
                            <hr />
                            <div className="row">
                                <div className="col-sm-3 d-flex align-items-center">
                                    <h6 className="mb-0">Address</h6>
                                </div>
                                <div className="col-sm-9 text-secondary text-left">
                                { !isEditInfo ?
                                    user ? user.address : 'Bay Area, San Francisco, CA' :
                                    <input type="text" className="form-control" placeholder="Address" name="address" />
                                }
                                </div>
                            </div>
                            <hr />
                            <div className="row">
                                <div className="col-sm-3 d-flex align-items-center">
                                    <h6 className="mb-0">Bio</h6>
                                </div>
                                <div className="col-sm-9 text-secondary text-left">
                                { !isEditInfo ?
                                    user ? user.bio : 'bio' :
                                    <input type="text" className="form-control" placeholder="Bio" name="bio" />
                                }
                                </div>
                            </div>
                            <hr />
                            <div className="row">
                                <div className="col-sm-3 d-flex align-items-center">
                                    <h6 className="mb-0">Facebook</h6>
                                </div>
                                <div className="col-sm-9 text-secondary text-left">
                                { !isEditInfo ?
                                    user ? user.social_facebook : 'social facebook link' :
                                    <input type="text" className="form-control" placeholder="Facebook" name="social_facebook" />
                                }
                                </div>
                            </div>
                            <hr />
                            <div className="row">
                                <div className="col-sm-3 d-flex align-items-center">
                                    <h6 className="mb-0">Linkedin</h6>
                                </div>
                                <div className="col-sm-9 text-secondary text-left">
                                { !isEditInfo ?
                                    user ? user.social_linkedin : 'social linkedin link' :
                                    <input type="text" className="form-control" placeholder="Linkedin" name="social_linkedin" />
                                }
                                </div>
                            </div>
                            <hr />
                            <div className="row">
                                
                            { isEditInfo ?
                                <div className="col-sm-12">
                                    <button type="button" className="btn btn-danger br-6 mr-3" onClick={() => setIsEditInfo(false)}>Cancel</button>
                                    <button type="button" className="btn btn-info br-6">Save</button>
                                </div>
                                :
                                <div className="col-sm-12">
                                    <button type="button" className="btn btn-info br-6" onClick={() => setIsEditInfo(true)}>Edit</button>
                                </div>
                            }  
                            </div>
                        </div>
                    </div>

                    <div className="row gutters-sm">
                        { isOrg && <div className="col-sm-6 mb-3">
                            <div className="card h-100">
                                <div className="card-body">
                                    <h6 className="d-flex align-items-center mb-3">Company Status</h6>
                                    <small>Web Design</small>
                                    <div className="progress mb-3" style={{height: '5px'}}>
                                        <div className="progress-bar bg-primary" role="progressbar" style={{width: "80%"}} aria-valuenow="80" aria-valuemin="0" aria-valuemax="100"></div>
                                    </div>
                                </div>
                            </div>
                        </div> }
                        { isOrg && <div className="col-sm-6 mb-3">
                            <div className="card h-100">
                                <div className="card-body">
                                    <h6 className="d-flex align-items-center mb-3">Recruitment news Status</h6>
                                    <small>Web Design</small>
                                    <div className="progress mb-3" style={{height: '5px'}}>
                                        <div className="progress-bar bg-primary" role="progressbar" style={{width: "80%"}} aria-valuenow="80" aria-valuemin="0" aria-valuemax="100"></div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        || isMember && <div className="col-sm-6 mb-3">
                            <div className="card h-100">
                                <div className="card-body">
                                    <h6 className="d-flex align-items-center mb-3">Recruitment news Status</h6>
                                    <small>Web Design</small>
                                    <div className="progress mb-3" style={{height: '5px'}}>
                                        <div className="progress-bar bg-primary" role="progressbar" style={{width: "80%"}} aria-valuenow="80" aria-valuemin="0" aria-valuemax="100"></div>
                                    </div>
                                </div>
                            </div>
                        </div>}
                    </div>

                    <div className="row gutters-sm">
                        <div className="col-sm-6 mb-3">
                            <div className="card h-100">
                                <div className="card-body">
                                    <h6 className="d-flex align-items-center mb-3">Applied Status</h6>
                                    <small>Web Design</small>
                                    <div className="progress mb-3" style={{height: '5px'}}>
                                        <div className="progress-bar bg-primary" role="progressbar" style={{width: "80%"}} aria-valuenow="80" aria-valuemin="0" aria-valuemax="100"></div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            }
            </div>
        </div>
        
    );
};

export default UserProfile;