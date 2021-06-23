import React, { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import '../../Ind.css';
import axios from 'axios';
import * as API from '../../constants/Config';

const HomePage = () => {

    const [job, setJob] = useState([]);
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        const getJob = async () => {
            try {
                const payload = await axios.get(`${API.API}${API.RECRUITMENT_NEWS}`);
                setJob(payload.data);
                return payload.data;
            } catch (error) {
                console.log(error);
            }

        }
        getJob();
    }, []);

    // const getOrg = async (id) => {
    //     console.log(`${API.API}${API.ORGANIZATION}/${id}`);
    //     const payload = await axios.get(`${API.API}${API.ORGANIZATION}/${id}`)
    //     return payload.data;
    // }

    const handleGetJob = async (link) => {
        try {
            setIsLoading(true);
            const payload = await axios.get(link);
            setJob(payload.data);
            setTimeout(() => {
                setIsLoading(false);
            }, 1000);
            return payload.data;
        } catch (error) {
            console.log(error);
        }
    }

    const convertDate = t => {
        t = t.split(/[- :]/);
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
            <div className="search-form">
                <div className="title-ic">Tìm kiếm công việc ngay </div>
                <div className="d-flex justify-content-center container search-home">
                    <input type="text" className="search-item text-search w-50" placeholder="Tên công việc" />
                    <select class="search-item city-select form-select w-25">
                        <option selected>Thành phố...</option>
                        <option>Hà Nội</option>
                        <option>Đà Nẵng</option>
                        <option>TP Hồ Chí Minh</option>
                        <option>Khác</option>
                    </select>
                    <NavLink to="/" className="btn btn-search">Tìm kiếm</NavLink>
                </div>
                <div className="list-major-recommend d-flex justify-content-center container">
                    <div className="major-rec-item">IT</div>
                    <div className="major-rec-item">Kế Toán</div>
                    <div className="major-rec-item">Tạp vụ</div>
                    <div className="major-rec-item">Lễ Tân</div>
                    <div className="major-rec-item">Tài xế</div>
                    <div className="major-rec-item">Giúp việc</div>
                </div>

            </div>
            <div className="container-fluid list-jobs-wrapper">
                <div className="list-jobs-content container">
                    <div className="title-lbc">
                        Danh sách tuyển dụng mới nhất
                    </div>
                    <div className="content-lbc">
                        {
                            !isLoading ?
                                job.data !== undefined ?
                                    job.data.length > 0 ?
                                        job.data.map((e, i) => {
                                            return <div key={e.id} className="link-item">
                                                <div className="job-item">
                                                    <div className="title-job-item">
                                                        <img src="images/logo_official.png" />
                                                        <div className="company-name"></div>
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
                                        }) :
                                        <div className="d-flex justify-content-center flex-row">
                                            <div class="err">4</div>
                                            <div className="f"><i class="far fa-question-circle fa-spin"></i></div>
                                            <div class="err2">4</div>
                                        </div>
                                    : <div className="d-flex justify-content-center">
                                        <div className="spinner-grow" role="status mr-3">
                                            <span className="sr-only">Loading...</span>
                                        </div>
                                        <div className="spinner-grow" role="status mr-3">
                                            <span className="sr-only">Loading...</span>
                                        </div>
                                        <div className="spinner-grow" role="status mr-3">
                                            <span className="sr-only">Loading...</span>
                                        </div>
                                    </div> :
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
                        {
                            job.data !== undefined ?
                                job.data.length > 0 ?
                                    <div className="d-flex justify-content-end pr-3">
                                        <nav aria-label="Page navigation example">
                                            <ul className="pagination">
                                                {
                                                    job.prev_page_url !== null ?
                                                        <li className="page-item"><a className="page-link" onClick={() => handleGetJob(job.prev_page_url)}>Previous</a></li>
                                                        : <li className="page-item disabled"><NavLink className="page-link" aria-disabled="true" to="#">Previous</NavLink></li>
                                                }
                                                {
                                                    job.next_page_url !== null ?
                                                        <li className="page-item"><a className="page-link" onClick={() => handleGetJob(job.next_page_url)}>Next</a></li>
                                                        : <li className="page-item disabled"><NavLink className="page-link" aria-disabled="true" to="#">Next</NavLink></li>
                                                }

                                            </ul>
                                        </nav>
                                    </div>
                                    : null : null
                        }

                    </div>
                </div>
            </div>
        </div>)
}

export default HomePage;