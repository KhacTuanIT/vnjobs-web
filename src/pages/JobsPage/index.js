import React, { useState, useEffect } from 'react';
import {NavLink} from 'react-router-dom';
import axios from 'axios';
import * as API from '../../constants/Config';

const JobsPage = () => {
    const [jobRecent, setJobRecent] = useState(null);
    const [job, setJob] = useState(null);
    const [major, setMajor] = useState(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const getOrg = async (id) => {
            let d = '';
            const payload = await axios.get(`${API.API}${API.ORGANIZATION}/${id}`);
            d = payload.data;
            return d;
        }
        const getJob = async () => {
            setIsLoading(true);
            const payload = await axios.get(`${API.API}${API.RECRUITMENT_NEWS}`);
            let tempJob = [];
            let tempJobRecent = [];
            if (payload.data) {
                if (payload.data.data.length > 0) {
                    let count = 0;
                    payload.data.data.map((e, i) => {
                        const pl = getOrg(e.org_id);
                        let p = e;
                        pl.then(res => { 
                            p.org_name = res.org_name;
                        });
                        if (count < 5) {
                            tempJobRecent.push(p);
                            count++;
                        }
                        tempJob.push(p);
                    });
                }
            }
            setJob(tempJob);
            setJobRecent(tempJobRecent);
            setIsLoading(false);
            return tempJob;
        }
        
        console.log(getJob());
    }, []);

    

    return isLoading ? null : (
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
                                                    <NavLink to={'/job-detail/' + e.id} className="link-item">
                                                        <div className="job-item-carousel">
                                                            <div className="title-job-item">
                                                                <div className="company-name">{e.org_name ? e.org_name : null}</div>
                                                                <div className="title-text">{e.title}</div>
                                                                <div className="desc">
                                                                    <div className="desc-item salary">Negotiative</div>
                                                                    <div className="desc-item major">{e.major.major_name}</div>
                                                                    <div className="desc-item type-work">{e.work_type}</div>
                                                                </div>
                                                                <div className="time-left">2 days left</div>
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
                                                    </NavLink>
                                                </div>
                                            else 
                                                return <div key={e.id + "__" + i} className='carousel-item'>
                                                    <NavLink to={'/job-detail/' + e.id} className="link-item">
                                                        <div className="job-item-carousel">
                                                            <div className="title-job-item">
                                                                <div className="company-name">{e.org_name ? e.org_name : null}</div>
                                                                <div className="title-text">{e.title}</div>
                                                                <div className="desc">
                                                                    <div className="desc-item salary">Negotiative</div>
                                                                    <div className="desc-item major">{e.major.major_name}</div>
                                                                    <div className="desc-item type-work">{e.work_type}</div>
                                                                </div>
                                                                <div className="time-left">2 days left</div>
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
                                                    </NavLink>
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
                        Danh sách tuyển dụng
                    </div>
                    <div className="content-lbc">
                        {
                            job ? 
                                job.length > 0 ? 
                                    job.map((e, i) => (
                                        <NavLink key={e.id} to={{pathname: `/job-detail/${e.id}`, idItem: e.id}} className="link-item">
                                            <div className="job-item">
                                                <div className="title-job-item">
                                                    <img src="images/logo_official.png" />
                                                    <div className="company-name">{e.org_name ? e.org_name : null}</div>
                                                </div>
                                                <div className="right-content">
                                                    <div className="desc">
                                                        <div className="desc-item salary">Negotiative</div>
                                                        <div className="desc-item major">{e.major.major_name}</div>
                                                        <div className="desc-item type-work">{e.work_type}</div>
                                                    </div>
                                                    <div className="rc-content">
                                                        <div className="title-text col-sm-6 p-0">{e.title}</div>
                                                        <div className="content-button col-sm-6 justify-content-end p-0">
                                                            <NavLink to={`/job-detail/${e.id}`} className="btn-t btn-link-app">APPLY</NavLink>
                                                        </div>
                                                    </div>
                                                    <div className="time-left">2 days left</div>
                                                </div>
                                            </div>
                                        </NavLink>
                                    ))
                                : null
                            : null
                        }
                    </div>
                </div>
            </div>
        </div>
    );
};

export default JobsPage;