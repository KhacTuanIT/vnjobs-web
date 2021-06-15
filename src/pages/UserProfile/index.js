import React, { useState, useEffect, useRef, useCookies } from 'react';
import './userProfile.css';
import * as Config from '../../constants/Config';
import * as API from '../../constants/API';
import axios from 'axios';
import { NavLink, Redirect } from 'react-router-dom';

const UserProfile = () => {

    const [userProfile, setUserProfile] = useState(null);
    const [orgs, setOrgs] = useState(null);
    const [recruitmentNews, setRecruitmentNews] = useState(null);
    const [applied, setApplied] = useState(null);
    const [ownerOrg, setOwnerOrg] = useState(null);
    const [listOwnerOrg, setListOwnerOrg] = useState(null);
    const [isCreateOrg, setIsCreateOrg] = useState(false);
    const [isEditInfo, setIsEditInfo] = useState(false);
    const [isCreateRecruitmentNews, setIsCreateRecruitmentNews] = useState(false);
    const [isMember, setIsMember] = useState(false);
    const [isOrg, setIsOrg] = useState(false);
    const [isEditOrg, setIsEditOrg] = useState(false);
    const [isManageOrg, setIsManageOrg] = useState(false);
    const [majors, setMajors] = useState(null);
    const [isLogged, setIsLogged] = useState(false);

    // User info variable
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [phone, setPhone] = useState('');
    const [dob, setDob] = useState('');
    const [address, setAddress] = useState('');
    const [bio, setBio] = useState('');
    const [facebook, setFacebook] = useState('');
    const [linkedin, setLinkedin] = useState('');

    // org info variable
    const [orgName, setOrgName] = useState('');
    const [orgPhone, setOrgPhone] = useState('');
    const [orgAddress, setOrgAddress] = useState('');
    const [tax, setTax] = useState('');
    const [description, setDescription] = useState('');

    // recruitment news info variable
    const [listOrg, setListOrg] = useState(null);
    const [orgId, setOrgId] = useState(''); 
    const [majorId , setMajorId] = useState('');  
    const [title, setTitle] = useState(''); 
    const [content, setContent] = useState(''); 
    const [rnAddress, setRnAddress] = useState(''); 
    const [city, setCity] = useState(''); 
    const [workType, setWorkType] = useState(''); 
    const [startTime, setStartTime] = useState(''); 
    const [endTime, setEndTime] = useState(''); 
    const [interviewStartTime, setInterviewStartTime] = useState(''); 
    const [interviewEndTime, setInterviewEndTime] = useState(''); 

    // toast state
    const [toastIcon, setToastIcon] = useState('');
    const [toastMessage, setToastMessage] = useState('helllo');


    useEffect(async() => {
        if (!majors) {
            try {
                const payload = await axios.get(`${Config.API}${Config.MAJOR}`);
                if (payload.status === 200) {
                    // console.log('GET MAJOR LIST:');
                    setMajors(payload.data.data);
                    setMajorId(payload.data.data[0].id);
                } 
            } catch (error) {
                console.log(error);
            }
        }
    }, [majors]);

    useEffect(() => {
        if (!userProfile) {
            try {
                axios.get(API.USER, { withCredentials: true, }).then(function (res) {
                    // const payload = await axios.get(API.USER, { withCredentials: true, })
                    if (res.status === 200) {
                        let listOrgTemp = [];
                        let tempOw = [];
                        let tempOr = [];
                        const data = res.data;
                        console.log(data);
                        if (data.orgs.length > 0) {
                            tempOr = [...data.orgs];
                            tempOr = getUnique(tempOr);
                            setOrgs(tempOr);
                            setIsMember(true);
                        }
                        if (data.owned_orgs.length > 0) {
                            tempOw = [...data.owned_orgs];
                            setListOwnerOrg(data.owned_orgs);
                            const orgTemp = data.owned_orgs[0];
                            setOwnerOrg(data.owned_orgs[0]);
                            setOrgName(orgTemp.org_name);
                            setOrgPhone(orgTemp.phones);
                            setTax(orgTemp.tax_id);
                            setOrgAddress(orgTemp.address);
                            setDescription(orgTemp.description);
                            setIsOrg(true);
                        }
                        if (data.recruitment_news.length > 0) {
                            setRecruitmentNews(data.recruitment_news);
                        }
                        listOrgTemp = [...tempOw, ...tempOr];
                        listOrgTemp = getUnique(listOrgTemp);
                        setListOrg(listOrgTemp);
                        setOrgId(listOrgTemp[0].id);
                        setUserProfile(data);
                        setFirstName(data.first_name);
                        setLastName(data.last_name);
                        setAddress(data.address);
                        setPhone(data.phone);
                        setDob(data.dob);
                        setBio(data.bio);
                        setFacebook(data.social_facebook ?? '');
                        setLinkedin(data.social_linkedin ?? '');
                    }
                    else {
                        console.log("RESPONSE DATA: ");
                        console.log(res);
                    }
                }).catch(error => {
                    console.log(error)
                    if (error.response !== undefined) {
                        if (error.response.status === 401) {
                            console.log('Not login yet.');
                            setIsLogged(true);
                        }
                    }
    
                    if (error.message === 'Network Error') {
                        console.log('NETWORK ERR');
                    }
                })
            } catch (error) {
                console.log(error);
            }
        }
        
    }, [userProfile]);

    const getUnique = (data) => {
        let t = -1;
        let orgList = [];
        if (data.length > 0) {
            data.map((e, i) => {
                if (t !== e.id) {
                    orgList.push(e);
                    t = e.id;
                }
            })
        }
        
        return orgList
    }

    useEffect(() => {
            try {
                // axios.get(`${Config.API}${Config.APPLIED}`,
                axios.get(API.LIST_APPLIED_JOBS,
                {
                    withCredentials: true,
                }).then(res => {
                    if (res.status === 200) {
                        console.log('GET APPLIED LIST');
                        console.log(res);
                        setApplied(res.data);
                    }
                })
                
            } catch (error) {
                if (error.response !== 'undefined') {
                    if (error.response.status === 401) {
                        console.log('User not login yet.');
                        setIsLogged(true);
                    }
                }
            }
    }, []);


    const showToast = (type, icon = '', message = '') => {
        setToastIcon(icon);
        setToastMessage(message);
        var x = document.getElementById("toast")
        switch (type) {
            case 'success': 
                x.className = "show success";
                break;
            case 'error':
                x.className = "show error";
                break;
            case 'warning':
                x.className = "show warning";
                break;
            default:
                x.className = "show";
                break;
        }
        
        setTimeout(function(){ x.className = x.className.replace("show", ""); }, 5000);
    }

    const onCreateOrg = () => {
        try {
            const data = {
                'org_name': orgName,
                'phones': orgPhone,
                'description': description,
                'tax_id': parseInt(tax),
                'address': orgAddress,
                'logo_path': '..',
                'cover_path': '..',
            }
            axios.post(API.LIST_ORGANIZATION, data, {withCredentials: true,
                headers: {
                    'Content-Type': 'application/json',
                    'accept': 'application/json; charset=utf8;'
                }
            })
                .then(res => {
                    console.log(res);
                    if (res.status === 200) {
                        setOwnerOrg(res.data);
                        setIsOrg(true);
                        showToast('success', 'bi bi-info-circle', 'Create Organization successfully! Waiting for admin verify.')
                    }
                }).catch(error => {
                    console.log(error);
                    if (error.response !== undefined) {
                        if (error.response.status === 401) {
                            showToast('error' , 'bi bi-info-circle', 'Create failed! You are not log in yet.');
                        }
                    }
                    if (error.message === 'Network Error') {
                        showToast('error' , 'bi bi-info-circle', 'Create failed! Network error.');
                    } else {
                        showToast('error' , 'bi bi-info-circle', error.message);
                    }
                })
        } catch (error) {
            if (error.response !== undefined) {
                if (error.response.status === 401) {
                    showToast('error' , 'bi bi-info-circle', 'Create failed! You are not log in yet.');
                }
            }
            if (error.message === 'Network Error') {
                showToast('error' , 'bi bi-info-circle', 'Create failed! Network error.');
            } else {
                showToast('error' , 'bi bi-info-circle', error.message);
            }
        }
    }
    
    //
    const handleUpdateUserInfo = () => {
        try {
            const data = {
                'first_name': firstName,
                'last_name': lastName,
                'phone': phone,
                'dob': dob,
                'address': address,
                'social_facebook': facebook,
                'social_linkedin': linkedin,
                'bio': bio,
                'email': userProfile.email
            };
            axios.put(API.USER, data, { withCredentials: true, })
                .then(res => {
                    console.log(res.data);
                    if (res.status === 200) {
                        setUserProfile(res.data.user);
                        setTimeout(() => setIsEditInfo(false), 5000);
                        showToast('success', 'bi bi-info-circle', res.data.message);
                    }
                }).catch(error => {
                    if (error.response !== undefined) {
                        if (error.response.status === 401) {
                            showToast('error' , 'bi bi-info-circle', 'Update failed! You are not log in yet.');
                        }
                    }
                    if (error.message === 'Network Error') {
                        showToast('error' , 'bi bi-info-circle', 'Update failed! Network error.');
                    }
                    else {
                        showToast('error' , 'bi bi-info-circle', error.message);
                    }
                })
        } catch (error) {
            showToast('error' , 'bi bi-info-circle', error.message);
        }
    }
    //
    const handleCreateRecruitmentNews = () => {
        try {
            const data = {
                'org_id': orgId,
                'major_id': majorId,
                'title': title,
                'content': content,
                'address': rnAddress,
                'city': city,
                'work_type': workType,
                'start_time': startTime,
                'end_time': endTime,
                'interview_start_time': interviewStartTime,
                'interview_end_time': interviewEndTime,
            }
            axios.post(API.LIST_RECRUITMENT_NEWS, data, { withCredentials: true, })
                .then(res => {
                    console.log(res);
                    if (res.status === 200) {
                        showToast('success', 'bi bi-info-circle', res.data.message);
                        let tempRn = [...recruitmentNews, res.data.recruitment_news];
                        setRecruitmentNews(tempRn);
                        setTimeout(() => {
                            clearFormCreateRecruitmentNews();
                            setIsCreateRecruitmentNews(false);
                        }, 5000);
                    }
                }).catch(error => {
                    if (error.response !== undefined) {
                        if (error.response.status === 401) {
                            showToast('error' , 'bi bi-info-circle', 'Update failed! You are not log in yet.');
                        }
                    }
                    if (error.message === 'Network Error') {
                        showToast('error' , 'bi bi-info-circle', 'Update failed! Network error.');
                    }
                    else {
                        showToast('error' , 'bi bi-info-circle', error.message);
                    }
                })
        } catch (error) {
            showToast('error' , 'bi bi-info-circle', error.message);
        }
    }
    //
    const handleEditOrg = () => {
        try {
            const data = {
                'org_name': orgName,
                'phones': orgPhone,
                'tax_id': tax,
                'address': orgAddress,
                'description': description
            }
            axios.put(API.LIST_ORGANIZATION + '/' + ownerOrg.id, data, {withCredentials: true,})
                .then(res => {
                    console.log(res);
                    if (res.status === 200) {
                        setOwnerOrg(res.data);
                        showToast('success', 'bi bi-info-circle', 'Update successfully!');
                        setTimeout(() => {
                            setIsEditOrg(false);
                        }, 5000);
                    }
                }).catch(error => {
                    if (error.response !== undefined) {
                        if (error.response.status === 401) {
                            showToast('error' , 'bi bi-info-circle', 'Update failed! You are not log in yet.');
                        }
                    }
                    if (error.message === 'Network Error') {
                        showToast('error' , 'bi bi-info-circle', 'Update failed! Network error.');
                    }
                    else {
                        showToast('error' , 'bi bi-info-circle', error.message);
                    }
                })
        } catch (error) {
            showToast('error' , 'bi bi-info-circle', error.message);
        }
    }

    const clearFormCreateRecruitmentNews = () => {
        setTitle('');
        setContent('');
        setRnAddress('');
        setCity('');
        setWorkType('');
        setStartTime('');
        setEndTime('');
        setInterviewStartTime('');
        setInterviewEndTime('');
    }

    const onClickManageOrg = () => {
        setIsManageOrg(true);
        setIsCreateRecruitmentNews(false);
    }

    const onClickCreateOrg = () => {
        setIsCreateOrg(true);
        setIsCreateRecruitmentNews(false);
    }

    const onClickCreateRecruitmentNews = () => {
        setIsManageOrg(false);
        setIsCreateRecruitmentNews(true);
        setIsCreateOrg(false);
    }

    const signOut = () => {
        setIsLogged(true);
        // set logout on server side
    }

    function makeid(length) {
        var result           = '';
        var characters       = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        var charactersLength = characters.length;
        for ( var i = 0; i < length; i++ ) {
          result += characters.charAt(Math.floor(Math.random() * 
     charactersLength));
       }
       return result;
    }

    const handleOnChangeSelect = (e) => {
        const value = e.target.value;
        setOwnerOrg(value);
    }

    return isLogged ? <Redirect to="/sign-in" /> : (
        <div className="container mt-3 mb-3">
            <div className="row">
                
                <div className="col-md-12 mb-3 text-left">
                    <div style={{position: 'relative'}}>
                        <h4><i className="bi bi-person-lines-fill"></i> / USER PROFILE</h4>
                        <button className="close-button btn br-6" onClick={() => signOut()}>
                            Sign out <i className="pl-1 bi bi-box-arrow-right"></i>
                        </button>
                    </div>
                </div>
            </div>
            <div className="row gutters-sm">
                <div className="col-md-4 mb-3">
                    <div className="card">
                        <div className="card-body">
                            <div className="d-flex flex-column align-items-center text-center">
                                <img src="https://bootdey.com/img/Content/avatar/avatar7.png" alt="Admin" className="rounded-circle" width="150" />
                                <div className="mt-3">
                                    <h4>{userProfile ? userProfile.first_name + ' ' + userProfile.last_name : 'Veinz Tran'}</h4>
                                    <p className="text-secondary mb-1 text-left"><strong>Bio: </strong>{userProfile ? userProfile.bio : 'bio'}</p>
                                    <p className="text-muted font-size-sm text-justify"><strong>Address: </strong>{userProfile ? userProfile.address : 'Bay Area, San Francisco, CA'}</p>
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
                                { userProfile ? userProfile.social_linkedin ? <a href={userProfile.social_linkedin} target="_blank" className="text-secondary">visit</a> : 'null' : 'null'}
                            </li>
                            <li className="list-group-item d-flex justify-content-between align-items-center flex-wrap">
                                <h6 className="mb-0 ml-2">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="feather feather-facebook mr-2 icon-inline text-primary"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path></svg>
                                    <span className="ml-2">Facebook</span>
                                </h6>
                                {userProfile ? userProfile.social_facebook ? <a href={userProfile.social_facebook} target="_blank" className="text-secondary">visit</a> : 'null' : 'null' }
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
                                    <button className="btn btn-outline-secondary br-6" onClick={() => onClickManageOrg()}>Manage</button>
                                </div>
                            </div>
                        </div> :
                        <div className="card mt-3">
                            <div className="d-flex justify-content-between pr-3 pl-3">
                                <div className="text-left d-flex align-items-center">
                                    <i className="bi bi-building pr-3"></i> Company
                                </div>
                                <div className="text-right pt-3 pb-3">
                                    <button className="btn btn-outline-secondary br-6" onClick={() => onClickCreateOrg()}>Create</button>
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
                                <button className="btn btn-outline-secondary br-6" onClick={() => onClickCreateRecruitmentNews()}>Create</button>
                            </div>
                        </div>
                    </div> || isMember && <div className="card mt-3">
                        <div className="d-flex justify-content-between pr-3 pl-3">
                            <div className="text-left d-flex align-items-center">
                                <i className="bi bi-newspaper pr-3"></i> Recruitment news
                            </div>
                            <div className="text-right pt-3 pb-3">
                                <button className="btn btn-outline-secondary br-6" onClick={() => onClickCreateRecruitmentNews()}>Create</button>
                            </div>
                        </div>
                    </div>}
                </div>
                
                {/* check: if user have company > if click manage company => show company's info */}
                {/* check: if click editOrg => show input for editing */}
                { isManageOrg ? <div className="col-md-8">
                    <div className="card mb-3">
                        <select className="form-select" name="manage-org-select" defaultValue={ownerOrg} onChange={() => handleOnChangeSelect()}>
                            {
                                listOwnerOrg ? listOwnerOrg.map((e, i) => {
                                    return <option key={e.id + makeid(2)} value={e}>{e.org_name}</option>
                                }) : null
                            }
                        </select>
                    </div>
                    <div className="card mb-3">
                        <div className="card-header">
                            <h5>YOUR COMPANY</h5>
                            {
                                ownerOrg ? 
                                    ownerOrg.is_verify ? 
                                    <div className="company-status company-confirmed">
                                        Verified
                                    </div>
                                    : 
                                    <div className="company-status company-unconfirmed">
                                        Unverified
                                    </div>
                                :
                                <div className="company-status company-unconfirmed">
                                    Unverified
                                </div>
                            }
                            
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
                                        <input type="text" className="form-control" placeholder="Company name" name="orgName" value={orgName} onChange={e => setOrgName(e.target.value)} />
                                        : ownerOrg ? ownerOrg.org_name : null 
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
                                    <input type="text" className="form-control" placeholder="Company phone" name="orgPhone" value={orgPhone} onChange={e => setOrgPhone(e.target.value)} />
                                    : ownerOrg ? ownerOrg.phones : null
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
                                    <input type="text" className="form-control" placeholder="Tax ID" name="taxId"  value={tax} onChange={e => setTax(e.target.value)}/>
                                    : ownerOrg ? ownerOrg.tax_id : null
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
                                    <input type="text" className="form-control" placeholder="Description" name="description" value={description} onChange={e => setDescription(e.target.value)} />
                                    : ownerOrg ? ownerOrg.description : null
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
                                    <input type="text" className="form-control" placeholder="Address" name="orgAddress" value={orgAddress} onChange={e => setOrgAddress(e.target.value)} />
                                    : ownerOrg ? ownerOrg.address : null
                                }
                                </div>
                            </div>
                            <hr />
                            <div className="row">
                            { isEditOrg ?
                                <div className="col-sm-12">
                                    <button type="button" className="btn btn-danger br-6 mr-3" onClick={() => setIsEditOrg(false)}>Cancel</button>
                                    <button type="button" className="btn btn-info br-6" onClick={() => handleEditOrg()}>Save</button>
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
                                    <input type="text" className="form-control" placeholder="Company name" name="org_name" value={orgName} onChange={e => setOrgName(e.target.value)} />
                                </div>
                            </div>
                            <hr />
                            <div className="row">
                                <div className="col-sm-3 d-flex align-items-center">
                                    <h6 className="mb-0">Company Phone</h6>
                                </div>
                                <div className="col-sm-9 text-secondary text-left">
                                    <input type="text" className="form-control" placeholder="Company phone" name="org_phone" value={orgPhone} onChange={e => setOrgPhone(e.target.value)} />
                                </div>
                            </div>
                            <hr />
                            <div className="row">
                                <div className="col-sm-3 d-flex align-items-center">
                                    <h6 className="mb-0">Tax</h6>
                                </div>
                                <div className="col-sm-9 text-secondary text-left">
                                    <input type="text" className="form-control" placeholder="Tax ID" name="tax_id" value={tax} onChange={e => setTax(e.target.value)} />
                                </div>
                            </div>
                            <hr />
                            <div className="row">
                                <div className="col-sm-3 d-flex align-items-center">
                                    <h6 className="mb-0">Description</h6>
                                </div>
                                <div className="col-sm-9 text-secondary text-left">
                                    <input type="text" className="form-control" placeholder="Description" name="description" value={description} onChange={e => setDescription(e.target.value)} />
                                </div>
                            </div>
                            <hr />
                            <div className="row">
                                <div className="col-sm-3 d-flex align-items-center">
                                    <h6 className="mb-0">Address</h6>
                                </div>
                                <div className="col-sm-9 text-secondary text-left">
                                    <input type="text" className="form-control" placeholder="Address" name="org_address" value={orgAddress} onChange={e => setOrgAddress(e.target.value)} />
                                </div>
                            </div>
                            <hr />
                            <div className="row">
                                <div className="col-sm-12">
                                    <button type="button" className="btn btn-info br-6" onClick={() => onCreateOrg()}>Create</button>
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
                                    <h6 className="mb-0">Company</h6>
                                </div>
                                <div className="col-sm-9 text-secondary text-left">
                                    <select className="form-select" name="org_id_select" value={orgId} onChange={e => setOrgId(e.target.value)}>
                                        {
                                            listOrg ? 
                                                listOrg.map((e, i) => {
                                                    return <option value={e.id} key={e.id + '_orgss_' + makeid(2)}>{e.org_name}</option>
                                                }) : null
                                        }
                                    </select>
                                </div>
                            </div>
                            <hr />
                            <div className="row">
                                <div className="col-sm-3 d-flex align-items-center">
                                    <h6 className="mb-0">Major</h6>
                                </div>
                                <div className="col-sm-9 text-secondary text-left">
                                    <select className="form-select" name="major_id" value={majorId} onChange={e => setMajorId(e.target.value)}>
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
                                    <input type="text" className="form-control" placeholder="Title" name="title" value={title} onChange={e => setTitle(e.target.value)} />
                                </div>
                            </div>
                            <hr />
                            <div className="row">
                                <div className="col-sm-3 d-flex align-items-center">
                                    <h6 className="mb-0">Content</h6>
                                </div>
                                <div className="col-sm-9 text-secondary text-left">
                                    <input type="text" className="form-control" placeholder="Content" name="content" value={content} onChange={e => setContent(e.target.value)} />
                                </div>
                            </div>
                            <hr />
                            <div className="row">
                                <div className="col-sm-3 d-flex align-items-center">
                                    <h6 className="mb-0">Address</h6>
                                </div>
                                <div className="col-sm-9 text-secondary text-left">
                                    <input type="text" className="form-control" placeholder="Address" name="address" value={rnAddress} onChange={e => setRnAddress(e.target.value)} />
                                </div>
                            </div>
                            <hr />
                            <div className="row">
                                <div className="col-sm-3 d-flex align-items-center">
                                    <h6 className="mb-0">City</h6>
                                </div>
                                <div className="col-sm-9 text-secondary text-left">
                                    <input type="text" className="form-control" placeholder="City" name="city" value={city} onChange={e => setCity(e.target.value)} />
                                </div>
                            </div>
                            <hr />
                            <div className="row">
                                <div className="col-sm-3 d-flex align-items-center">
                                    <h6 className="mb-0">Work Type</h6>
                                </div>
                                <div className="col-sm-9 text-secondary text-left">
                                    <input type="text" className="form-control" placeholder="Work type" name="work_type" value={workType} onChange={e => setWorkType(e.target.value)} />
                                </div>
                            </div>
                            <hr />
                            <div className="row">
                                <div className="col-sm-3 d-flex align-items-center">
                                    <h6 className="mb-0">Start Time</h6>
                                </div>
                                <div className="col-sm-9 text-secondary text-left">
                                    <input type="datetime-local" className="form-control" placeholder="Start time" name="start_time" value={startTime} onChange={e => setStartTime(e.target.value)} />
                                </div>
                            </div>
                            <hr />
                            <div className="row">
                                <div className="col-sm-3 d-flex align-items-center">
                                    <h6 className="mb-0">End Time</h6>
                                </div>
                                <div className="col-sm-9 text-secondary text-left">
                                    <input type="datetime-local" className="form-control" placeholder="End time" name="end_time" value={endTime} onChange={e => setEndTime(e.target.value)} />
                                </div>
                            </div>
                            <hr />
                            <div className="row">
                                <div className="col-sm-3 d-flex align-items-center">
                                    <h6 className="mb-0">Start Interview Time</h6>
                                </div>
                                <div className="col-sm-9 text-secondary text-left">
                                    <input type="datetime-local" className="form-control" placeholder="Start interview time" name="interview_start_time" value={interviewStartTime} onChange={e => setInterviewStartTime(e.target.value)} />
                                </div>
                            </div>
                            <hr />
                            <div className="row">
                                <div className="col-sm-3 d-flex align-items-center">
                                    <h6 className="mb-0">End Interview Time</h6>
                                </div>
                                <div className="col-sm-9 text-secondary text-left">
                                    <input type="datetime-local" className="form-control" placeholder="End interview time" name="interview_end_time" value={interviewEndTime} onChange={e => setInterviewEndTime(e.target.value)} />
                                </div>
                            </div>
                            <hr />
                            <div className="row">
                                <div className="col-sm-12">
                                    <button type="button" className="btn btn-info br-6" onClick={() => handleCreateRecruitmentNews()}>Create</button>
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
                                    <h6 className="mb-0">Email</h6>
                                </div>
                                <div className="col-sm-9 text-secondary text-left">
                                {
                                    userProfile ? userProfile.email : 'mail@example.com' 
                                }
                                </div>
                            </div>
                            <hr />
                            <div className="row">
                                <div className="col-sm-3 d-flex align-items-center">
                                    <h6 className="mb-0">First Name</h6>
                                </div>
                                <div className="col-sm-9 text-secondary text-left">
                                    { !isEditInfo ?
                                    userProfile ? userProfile.first_name : 'Tran' :
                                    <input type="text" className="form-control" placeholder="First name" name="first_name" value={firstName} onChange={e => setFirstName(e.target.value)} />}
                                </div>
                            </div>
                            <hr />
                            <div className="row">
                                <div className="col-sm-3 d-flex align-items-center">
                                    <h6 className="mb-0">Last Name</h6>
                                </div>
                                <div className="col-sm-9 text-secondary text-left">
                                { !isEditInfo ?
                                    userProfile ? userProfile.last_name : 'Veinz' :
                                    <input type="text" className="form-control" placeholder="Last name" name="last_name" value={lastName} onChange={e => setLastName(e.target.value)} />
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
                                    userProfile ? userProfile.phone : '(239) 902-2342' :
                                    <input type="text" className="form-control" placeholder="Phone number" name="phone" value={phone} onChange={e => setPhone(e.target.value)} />
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
                                    userProfile ? userProfile.dob : '02/02/2002' :
                                    <input type="date" className="form-control" value={dob} onChange={e => setDob(e.target.value)} placeholder="Date of birth" name="dob" />
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
                                    userProfile ? userProfile.address : 'Bay Area, San Francisco, CA' :
                                    <input type="text" className="form-control" placeholder="Address" name="address" value={address} onChange={e => setAddress(e.target.value)} />
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
                                    userProfile ? userProfile.bio : 'bio' :
                                    <input type="text" className="form-control" placeholder="Bio" name="bio" value={bio} onChange={e => setBio(e.target.value)} />
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
                                    userProfile ? userProfile.social_facebook : 'social facebook link' :
                                    <input type="text" className="form-control" placeholder="Facebook" name="social_facebook" value={facebook} onChange={e => setFacebook(e.target.value)} />
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
                                    userProfile ? userProfile.social_linkedin : 'social linkedin link' :
                                    <input type="text" className="form-control" placeholder="Linkedin" name="social_linkedin" value={linkedin} onChange={e => setLinkedin(e.target.value)} />
                                }
                                </div>
                            </div>
                            <hr />
                            <div className="row">
                                
                            { isEditInfo ?
                                <div className="col-sm-12">
                                    <button type="button" className="btn btn-danger br-6 mr-3" onClick={() => setIsEditInfo(false)}>Cancel</button>
                                    <button type="button" className="btn btn-info br-6" onClick={() => handleUpdateUserInfo()}>Save</button>
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
                                    <hr/>
                                    {
                                        listOwnerOrg ? 
                                            listOwnerOrg.map((e, i) => {
                                                return <div key={e.id + '__owner__' + makeid(4)}>
                                                    <div className="text-left"><small>Company name</small></div>
                                                    <div className="text-left">
                                                        {e.org_name}
                                                    </div>
                                                    <div className="text-left"><small>Verify</small></div>
                                                    <div className="text-left">
                                                        {
                                                            e.is_elect === 1 ? 'Verified' : 'Unverified'
                                                        }
                                                    </div>
                                                    <br/>
                                                </div>
                                            })
                                        : null
                                    }
                                    
                                    
                                </div>
                            </div>
                        </div> }
                        { isOrg && <div className="col-sm-6 mb-3">
                            <div className="card h-100">
                                <div className="card-body">
                                    <h6 className="d-flex align-items-center mb-3">Recruitment news Status</h6>
                                    <hr/>
                                    <div className="text-left"><small>Recruitment news list</small></div>
                                    <div>
                                        { recruitmentNews ? 
                                            recruitmentNews.length > 0 ?
                                                recruitmentNews.map((e, i) => {
                                                    return <div key={e.id + '__rn__'} className="d-flex justify-content-between mb-3">
                                                        <div>{e.title}</div>
                                                        <button className="btn br-6 btn-outline-secondary">Edit</button>
                                                    </div>
                                                })
                                            : <small><i>Not found any recruitment news</i></small>
                                        : <small><i>Not found any recruitment news</i></small>}
                                    </div>
                                </div>
                            </div>
                        </div>
                        || isMember && <div className="col-sm-6 mb-3">
                            <div className="card h-100">
                                <div className="card-body">
                                    <h6 className="d-flex align-items-center mb-3">Member Status</h6>
                                    <hr/>
                                    <div className="text-left"><small>Recruitment news list</small></div>
                                    <div>
                                        { recruitmentNews ? 
                                            recruitmentNews.length > 0 ?
                                                recruitmentNews.map((e, i) => {
                                                    return <div key={e.id + '__rn__'} className="d-flex justify-content-between mb-3">
                                                        <div>{e.title}</div>
                                                        <button className="btn br-6 btn-outline-secondary">Edit</button>
                                                    </div>
                                                })
                                            : <small><i>Not found any recruitment news</i></small>
                                        : <small><i>Not found any recruitment news</i></small>}
                                    </div>
                                </div>
                            </div>
                        </div>}
                        <div className="col-sm-6 mb-3">
                            <div className="card h-100">
                                <div className="card-body">
                                    <h6 className="d-flex align-items-center mb-3">Applied Status</h6>
                                    <hr/>
                                    <div className="text-left"><small>Applied list</small></div>
                                    {
                                        applied ? 
                                            applied.length > 0 ? 
                                                applied.map((e, i) => {
                                                    return <NavLink key={e.id + '__applied__'} to={'/job-detail/' + e.recruitment_news.id} className="list-applied-item d-flex justify-content-between">
                                                            <div className="text-left">{e.recruitment_news.title}</div>
                                                            <div className="text-right">Detail</div>
                                                            {
                                                                e.is_elect === 1 ? 
                                                                <span className="list-applied-tag tag-done">passed</span>
                                                                : <span className="list-applied-tag tag-reject">rejected</span>
                                                            }
                                                            
                                                        </NavLink>
                                                })
                                            : <small><i>Not found any applied post.</i></small>
                                        : <small><i>Not found any applied post.</i></small>
                                    }
                                </div>
                            </div>
                        </div>
                        <div className="col-sm-6 mb-3">
                            <div className="card h-100">
                                <div className="card-body">
                                    <h6 className="d-flex align-items-center mb-3">Job Status</h6>
                                    <hr/>
                                    <div>
                                        { orgs ? 
                                            orgs.length > 0 ? 
                                                orgs.map((e, i) => {
                                                    return <div className="text-left list-org-item" key={e.id + '__org__' + makeid(2)}>
                                                        Work at {e.org_name}
                                                    </div>
                                                })
                                            : <small><i>Not found any your position</i></small>
                                        : <small><i>Not found any your position</i></small>
                                        }
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    
                </div>
            }
            </div>
            <div id="toast"><div id="img"><i className={toastIcon}></i></div><div id="desc">{toastMessage}</div></div>
        </div>
        
    );
};

export default UserProfile;