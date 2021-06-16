import React, { useState, useEffect } from 'react';
import axios from 'axios';
import * as API from '../../constants/Config';
import { Redirect } from 'react-router-dom';
import './detail.css';

const DetailPage = (props) => {
    const [jobDetail, setJobDetail] = useState(null);
    const [major, setMajor] = useState(null);
    const [org, setOrg] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [isLoggedIn, setIsLoggedIn] = useState(true);

    const [rnId, setRnId] = useState(0);
    const [expYears, setExpYears] = useState(0);
    const [isSuccess, setIsSucces] = useState(false);
    const [isSending, setIsSending] = useState(false);
    const [message, setMessage] = useState('');
    const [isRedirectProfile, setIsRedirectProfile] = useState(false);

    const url = props.match.url;
    const arrUrl = url.split('/');
    const idItem = arrUrl[arrUrl.length - 1];

    useEffect(() => {
        console.log(`${API.API}${API.RECRUITMENT_NEWS}/${idItem}`);
        async function getJobDetail() {
            if (jobDetail === null) {
                console.log("Start get data");
                setIsLoading(true);
                const endpoint = API.API + API.RECRUITMENT_NEWS + '/' + idItem;
                const pl = await axios.get(endpoint);

                console.log("Getting data");
                const data = pl.data;
                if (data) {
                    setRnId(data.id);
                    if (!major) {
                        const ep = API.API + API.MAJOR + '/' + data.major_id;
                        const mpl = await axios.get(ep);
                        const majorData = mpl.data;
                        setMajor(majorData);
                    }

                    if (!org) {
                        const ep = API.API + API.FIND_ORGANIZATION + '/' + data.org_id;
                        const opl = await axios.get(ep);
                        const orgData = opl.data;
                        setOrg(orgData);
                    }
                }
                setJobDetail(data);
                setIsLoading(false);
                console.log("End get data");
                window.scrollTo(0, 0);
            }
        }

        return getJobDetail();
        // return GetJobDetail();
    }, []);

    const convertDatetime = (datetime) => {
        const month = [
            'Jan',
            'Feb',
            'Mar',
            'Apr',
            'May',
            'Jun',
            'Jul',
            'Aug',
            'Sep',
            'Oct',
            'Nov',
            'Dec'
        ]

        let dateStr = datetime.split(' ')[0].toString();
        let dateParts = dateStr.split('-');
        var jsDate = month[parseInt(dateParts[1])] + ' ' + dateParts[2] + ', ' + dateParts[0];
        return jsDate;
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            let cover = document.getElementsByName('cover_letter_path')[0].files[0];
            let cv = document.getElementsByName('cv_path')[0].files[0];
            console.log(cover);

            let formdata = new FormData();
            formdata.append('rn_id', rnId);
            formdata.append('exp_years', expYears);
            formdata.append('cover_letter_path', cover);
            formdata.append('cv_path', cv);
            console.log('FORM DATA');
            console.log(formdata);
            const response = await axios.post(`${API.API}${API.APPLY}`, formdata, {
                withCredentials: true,
            });
            if (response.status === 200) {
                setIsSending(true);
                setIsSucces(true);
                setMessage('Đã ứng tuyển thành công, vui lòng đợi kết quả');
                console.log("đã apply")
                setTimeout(() => {
                    setIsSending(false);
                    setMessage('');
                    setIsRedirectProfile(true);
                }, 2000);
            } else if (response.status === 201) {
                setIsSending(true);
                setIsSucces(true);
                setMessage('Đã ứng tuyển thành công, vui lòng đợi kết quả');
                console.log("đã apply")
                setTimeout(() => {
                    setIsSending(false);
                    setMessage('');
                    setIsRedirectProfile(true);
                }, 2000);
            }
        } catch (error) {
            if (error.response.status === 401) {
                setIsSending(true);
                setIsSucces(false);
                setMessage('Vui lòng đăng nhập trước khi ứng tuyển!');
                setTimeout(() => {
                    setIsSending(false);
                    setMessage('');
                    setIsLoggedIn(false);
                }, 2000);
                console.log("chưa đăng nhập")
            }
            if (error.message === 'Network Error') {
                setIsSending(true);
                setIsSucces(false);
                setMessage('Ứng tuyển thất bại, vui lòng xem lại kết nối mạng');
                setTimeout(() => {
                    setIsSending(false);
                    setMessage('');
                }, 2000);
            }
            console.log(error.response.status);
        }
    }

    const handleChange = (e) => {
        const target = e.target;
        const value = target.value;
        setExpYears(value);
    }
    if (isRedirectProfile) return <Redirect to="/user-profile" />;
    return !isLoggedIn ? <Redirect to="/sign-in" /> : isLoading ?
        <div className="d-flex justify-content-center loading-wr">
            <div className="spinner-grow" role="status mr-3">
                <span className="sr-only">Loading...</span>
            </div>
            <div className="spinner-grow" role="status mr-3">
                <span className="sr-only">Loading...</span>
            </div>
            <div className="spinner-grow" role="status mr-3">
                <span className="sr-only">Loading...</span>
            </div>
        </div> : (
            <div>
                <div className="detail-wrapper container-fluid">
                    <div className="container">
                        <div className="job-title">{jobDetail ? jobDetail.title : null}</div>
                        <div className="company">{org ? org.org_name : null}</div>
                        <div className="city">{jobDetail ? jobDetail.city : null}</div>
                        <div className="desc-content">
                            <div className="salary-content row">
                                <div className="col-sm-2">Salary</div>: Negotiative</div>
                            <div className="major-content row">
                                <div className="col-sm-2">Major</div>: {major ? major.major_name : null}</div>
                            <div className="work-type-content row">
                                <div className="col-sm-2">Type</div>: {jobDetail ? jobDetail.work_type : null}</div>
                            <div className="address-content row">
                                <div className="col-sm-2">Address</div>: {jobDetail ? jobDetail.address : null}</div>
                            <div className="time-left-content row">
                                <div className="col-sm-2">Time left</div>: From {jobDetail !== null ? convertDatetime(jobDetail.start_time) : null} - {jobDetail !== null ? convertDatetime(jobDetail.end_time) : null}</div>
                        </div>
                        <div className="detail-content">
                            <div className="detail-content-title">
                                Job description
                            </div>
                            <div className="dc-content">
                                {jobDetail ? jobDetail.content : null}
                            </div>
                        </div>
                        <div className="interview-time">
                            <div className="it-title">
                                Interview time
                            </div>
                            <div className="it-content">
                                From {jobDetail !== null ? convertDatetime(jobDetail.interview_start_time) : null} - {jobDetail !== null ? convertDatetime(jobDetail.interview_end_time) : null}
                            </div>
                        </div>
                    </div>

                </div>
                <div className="container-fluid">
                    <div className="header-form-apply container">
                        <h3 className="text-center">APPLY JOB</h3>
                        {isSending ? isSuccess ?
                            <span className="applied-popup applied-success">{message}</span>
                            : <span className="applied-popup applied-failed">{message}</span>
                            : null}
                    </div>

                    <form onSubmit={handleSubmit} action="https://api.vnjobs.tk/api/v1/users/apply" method="POST" encType="multipart/form-data" className="apply container col-sm-6">
                        <input type="hidden" name="rn_id" value={jobDetail ? jobDetail.id : null} />
                        <div className="mb-3 row">
                            <label className="col-sm-2 col-form-label">Exp years: </label>
                            <div className="col-sm-10">
                                <input type="number" name="exp_years" className="phoenix-form form-control-plaintext" min="0" max="50" value={expYears} onChange={handleChange} />
                            </div>
                        </div>
                        <div className="mb-3 row">
                            <label className="col-sm-2 col-form-label">CV: </label>
                            <div className="col-sm-10 text-left">
                                <label for="cv_path" class="custom-file-upload">
                                    Upload CV
                                </label>
                                <input type="file" id="cv_path" name="cv_path" className="" />
                            </div>
                        </div>
                        <div className="mb-3 row">
                            <label className="col-sm-2 col-form-label">Cover letter: </label>
                            <div className="col-sm-10 text-left">
                                <label for="cover_letter_path" class="custom-file-upload">
                                    Upload Cover letter
                                </label>
                                <input type="file" id="cover_letter_path" name="cover_letter_path" className="form-control-plaintext" />
                            </div>
                        </div>
                        <div className="justify-content-center d-flex">
                            <button className="btn-t btn-link-app-active" type="submit">SEND</button>
                        </div>

                    </form>
                </div>
            </div>
        );
}

export default DetailPage;