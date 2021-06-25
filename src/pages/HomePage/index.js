import React, { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import '../../Ind.css';
import axios from 'axios';
import * as API from '../../constants/Config';

const HomePage = () => {

    const [job, setJob] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [majors, setMajors] = useState([]);
    const [titleSearch, setTitleSearch] = useState('');
    const [citySearch, setCitySearch] = useState('');
    const [msgTitle, setMsgTitle] = useState('');

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

        const getMajors = () => {
            axios.get(`${API.API}${API.MAJOR}`)
                .then(res => {
                    setMajors(res.data.data);
                })
                .catch();
        }

        getJob();
        getMajors();
        setMsgTitle('Danh sách tuyển dụng mới nhất');
    }, []);

    const search = () => {
        setIsLoading(true);
        if (titleSearch.length <= 0 && citySearch.length <= 0) {
            axios.get(`${API.API}${API.RECRUITMENT_NEWS}`).then(response => {
                setJob(response.data);
                setMsgTitle('Danh sách tuyển dụng mới nhất');
                setIsLoading(false);
            });
        }
        else {
            let data = null;

            titleSearch <= 0 ? data = { city: citySearch } : data = { city: citySearch, title: titleSearch };
            axios.post(`${API.API}${API.SEARCH}`,
                data
            ).then(res => {
                setMsgTitle('Kết quả tìm kiếm công việc liên quan');
                setJob(res.data);
                setIsLoading(false);
            })
                .catch(function (error) {
                    console.log("error");
                    if (error.response) {
                        console.log(error.response.data);
                        console.log(error.response.status);
                    }
                    setIsLoading(false);
                });

        }
    }

    const searchWithMajor = (majorName) => {
        axios.get(`${API.API}${API.FIND_BY_MAJOR}`)
            .then(res => {
                setMsgTitle('Kết quả tìm kiếm ngành nghề liên quan');
                res.data.map((e, i) => {
                    if (e.major_name == majorName) {
                        let data = e.recruitment_news;
                        for (const key in data) { data[key].major = { major_name: majorName } }
                        setJob({ data });
                    }
                })
                setIsLoading(false);
            })
            .catch(function (error) {
                console.log("error_in_search_with_major");
                if (error.response) {
                    console.log(error.response.data);
                    console.log(error.response.status);
                }
                setIsLoading(false);
            });
    }
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

    function makeid(length) {
        var result           = '';
        var characters       = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        var charactersLength = characters.length;
        for ( var i = 0; i < length; i++ ) {
          result += characters.charAt(Math.floor(Math.random() * charactersLength));
       }
       return result;
    }


    return (
        <div>
            <div className="search-form">
                <div className="title-ic">Tìm kiếm công việc ngay </div>
                <div className="d-flex justify-content-center container search-home">
                    <input type="text" className="search-item text-search w-50" onChange={t => (setTitleSearch(t.target.value))} placeholder="Tên công việc" />
                    <select className="search-item city-select form-select w-25" value={citySearch} onChange={e => { setCitySearch(e.target.value) }}>
                        <option value="">Thành phố...</option>
                        <option value="Hà Nội">Hà Nội</option>
                        <option value="Đà Nẵng">Đà Nẵng</option>
                        <option value="Hồ Chí Minh">TP Hồ Chí Minh</option>
                        <option value="">Khác</option>
                    </select>
                    <div onClick={() => search()} className="btn btn-search">Tìm kiếm</div>
                </div>
                <div className="list-major-recommend d-flex justify-content-center container">
                    {
                        majors.map(item => (
                            <div key={makeid(4)} onClick={() => {
                                searchWithMajor(item.major_name);
                            }} className="major-rec-item">{item.major_name}</div>
                        ))
                    }
                </div>

            </div>
            <div className="container-fluid list-jobs-wrapper">
                <div className="list-jobs-content container">
                    <div className="title-lbc">
                        {msgTitle}
                    </div>
                    <div className="content-lbc">
                        {
                            !isLoading ?
                                job.data !== undefined ?
                                    job.data.length > 0 ?
                                        job.data.map((e, i) => {
                                            return <div key={makeid(4)} className="link-item">
                                                <div className="job-item">
                                                    <div className="title-job-item">
                                                        <img src="images/logo_official.png" />
                                                        <div className="company-name"></div>
                                                    </div>
                                                    <div className="right-content">
                                                        <div className="rc-content">
                                                            <div className="title-text col-sm-6 p-0">{e.title} ({e.city})</div>
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
                                            <div className="err">4</div>
                                            <div className="f"><i className="far fa-question-circle fa-spin"></i></div>
                                            <div className="err2">4</div>
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