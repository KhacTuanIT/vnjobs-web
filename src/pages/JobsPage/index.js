import React, { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import axios from 'axios';
import * as API from '../../constants/Config';

const JobsPage = () => {
    const [jobRecent, setJobRecent] = useState(null);
    const [job, setJob] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [prev, setPrev] = useState('');
    const [next, setNext] = useState('');
    const [isGetting, setIsGetting] = useState(true);

    useEffect(() => {
        const getJob = async () => {
            setIsLoading(true);
            try {
                const payload = await axios.get(`${API.API}${API.RECRUITMENT_NEWS}`);
                let tempJob = [];
                let tempJobRecent = [];
                if (payload.data) {
                    setPrev(payload.data.prev_page_url);
                    setNext(payload.data.next_page_url);
                    if (payload.data.data.length > 0) {
                        let count = 0;
                        payload.data.data.map((e, i) => {
                            if (count < 5) {
                                tempJobRecent.push(e);
                                count++;
                            }
                            tempJob.push(e);
                        });
                    }
                }
                setJob(tempJob);
                setJobRecent(tempJobRecent);
                setIsLoading(false);
                setTimeout(() => {
                    setIsGetting(false);
                }, 700);
            
                return tempJob;
            } catch (error) {
                console.log(error.message);
                setTimeout(() => {
                    setIsGetting(false);
                }, 700);
            }
        }

        getJob();
    }, []);

    const handleGetJob = async (link) => {
        try {
            setIsGetting(true);
            const payload = await axios.get(link);
            if (payload.status === 200) {
                setJob(payload.data.data);
                setPrev(payload.data.prev_page_url);
                setNext(payload.data.next_page_url);
                setTimeout(() => {
                    setIsGetting(false);
                }, 1000);
            }

        } catch (error) {
            console.log(error);
            setTimeout(() => {
                setIsGetting(false);
            }, 1000);
        }
    }

    const convertDate = t => {
        var t = t.split(/[- :]/);
        var d = new Date(Date.UTC(t[0], t[1] - 1, t[2], t[3], t[4], t[5]));
        return d.toLocaleDateString();
    };

    const getDiffDate = (date1, date2) => {
        const diffTime = date2 - date1;
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
        return diffDays;
    };

    const getTimeLeft = (datetime) => {
        const d = new Date();
        const currentDate = d.toLocaleDateString();
        const interviewTime = convertDate(datetime);
        const ld = getDiffDate(new Date(currentDate), new Date(interviewTime));
        return ld > 1
            ? ld + ' days left'
            : ld === 1
                ? ld + ' day left'
                : 'Expired'
    }

    return (
        <div>
            <div className="container-fluid list-jobs-wrapper">
                <div className="list-jobs-content container">
                    <div className="title-lbc">
                        Danh sách tuyển dụng mới nhất
                    </div>
                    <div id="carouselExampleIndicators" className="carousel slide" data-bs-ride="carousel">
                        <div className="carousel-inner">
                            {
                                jobRecent ?
                                    jobRecent.length > 0 ?
                                        jobRecent.map((e, i) => {
                                            if (i === 0)
                                                return <div key={e.id + "__" + i} className='carousel-item active'>
                                                    <div className="link-item">
                                                        <div className="job-item-carousel">
                                                            <div className="title-job-item">
                                                                <div className="company-name">{e.org_name ? e.org_name : null}</div>
                                                                <div className="title-text">{e.title}</div>
                                                                <div className="desc">
                                                                    <div className="desc-item salary">Negotiative</div>
                                                                    <div className="desc-item major">{e.major.major_name}</div>
                                                                    <div className="desc-item type-work">{e.work_type}</div>
                                                                </div>
                                                                <div className="time-left">{getTimeLeft(e.end_time)}</div>
                                                            </div>
                                                            <div className="content-button">
                                                                <NavLink to={'/job-detail/' + e.id} className="btn-t btn-link-app">APPLY</NavLink>
                                                            </div>
                                                            <div className="right-content">
                                                                <div className="rc-content">
                                                                    <div className="content-text">
                                                                        {e.content}
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            else
                                                return <div key={e.id + "__" + i} className='carousel-item'>
                                                    <div className="link-item">
                                                        <div className="job-item-carousel">
                                                            <div className="title-job-item">
                                                                <div className="company-name">{e.org_name ? e.org_name : null}</div>
                                                                <div className="title-text">{e.title}</div>
                                                                <div className="desc">
                                                                    <div className="desc-item salary">Negotiative</div>
                                                                    <div className="desc-item major">{e.major.major_name}</div>
                                                                    <div className="desc-item type-work">{e.work_type}</div>
                                                                </div>
                                                                <div className="time-left">{getTimeLeft(e.end_time)}</div>
                                                            </div>
                                                            <div className="content-button">
                                                                <NavLink to={'/job-detail/' + e.id} className="btn-t btn-link-app">APPLY</NavLink>
                                                            </div>
                                                            <div className="right-content">
                                                                <div className="rc-content">
                                                                    <div className="content-text">
                                                                        {e.content}
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                        })
                                        : null
                                    : null
                            }
                        </div>
                        <button className="carousel-control-prev" type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide="prev">
                            <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                            <span className="visually-hidden">Previous</span>
                        </button>
                        <button className="carousel-control-next" type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide="next">
                            <span className="carousel-control-next-icon" aria-hidden="true"></span>
                            <span className="visually-hidden">Next</span>
                        </button>
                    </div>

                </div>
            </div>

            <div className="container-fluid list-jobs-wrapper none-bg">
                <div className="list-jobs-content container">
                    <div className="title-lbc">
                        <ul className="pagination d-flex justify-content-between align-items-center">
                            {prev !== null ?
                                <li className="page-item"><a className="page-link" onClick={() => handleGetJob(prev)}>Previous</a></li>
                                : <li className="page-item disabled"><NavLink className="page-link" aria-disabled="true" to="#">Previous</NavLink></li>}
                            Danh sách tuyển dụng
                            {
                                next !== null ?
                                    <li className="page-item"><a className="page-link" onClick={() => handleGetJob(next)}>Next</a></li>
                                    : <li className="page-item disabled"><NavLink className="page-link" aria-disabled="true" to="#">Next</NavLink></li>
                            }
                        </ul>
                    </div>
                    <div className="content-lbc">
                        {
                            !isGetting ? 
                                job ?
                                    job.length > 0 ?
                                        job.map((e, i) => (
                                            <div key={e.id} className="link-item">
                                                <div className="job-item">
                                                    <div className="title-job-item">
                                                        <img src="images/logo_official.png" />
                                                        <div className="company-name">{e.org_name ? e.org_name : null}</div>
                                                    </div>
                                                    <div className="right-content">
                                                        <div className="rc-content">
                                                            <div className="title-text col-sm-6 p-0">{e.title}</div>
                                                        </div>
                                                        <div className="desc">
                                                            <div className="desc-item salary">Negotiative</div>
                                                            <div className="desc-item major">{e.major.major_name}</div>
                                                            <div className="desc-item type-work">{e.work_type}</div>
                                                            <div className="desc-item time-left">{getTimeLeft(e.end_time)}</div>
                                                            <div className="content-button col-sm-3 justify-content-end p-0">
                                                                <NavLink to={`/job-detail/${e.id}`} className="btn-t btn-link-app">APPLY</NavLink>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        ))
                                    : <div className="text-warning">Not found any items.</div>
                                : <div className="text-danger">Something wrong, please reload site.</div>
                            :
                            <div className="d-flex justify-content-center">
                                <div className="spinner-grow" role="status mr-3">
                                    <span className="sr-only">Loading...</span>
                                </div>
                                <div className="spinner-grow" role="status mr-3">
                                    <span className="sr-only">Loading...</span>
                                </div>
                                <div className="spinner-grow" role="status mr-3">
                                    <span className="sr-only">Loading...</span>
                                </div>
                            </div>
                        }
                    </div>
                </div>
            </div>
        </div>
    );
};

export default JobsPage;