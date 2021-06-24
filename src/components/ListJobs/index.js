import React from 'react';
import { Link } from 'react-router-dom';

const index = () => {

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
    }, [job]);

    return (
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
    );
};

export default index;