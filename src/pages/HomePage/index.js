import React, { Component, useState, useEffect } from 'react';
import { connect } from 'react-redux';
import {NavLink, Redirect} from 'react-router-dom';
import '../../Ind.css';
import axios from 'axios';
import * as API from '../../constants/Config';

const HomePage = () => {

    const [job, setJob] = useState([]);

    useEffect(() => {
        const getJob = async () => {
            const payload = await axios.get(`${API.API}${API.RECRUITMENT_NEWS}`);
            setJob(payload.data);
            return payload.data;
        }
        console.log(getJob());
    }, []);

    const getOrg = async (id) => {
        console.log(`${API.API}${API.ORGANIZATION}/${id}`);
        const payload = await axios.get(`${API.API}${API.ORGANIZATION}/${id}`)
        return payload.data;
    }

    return (    
    <div>
        <div className="container-fluid">
            <div className="introduce-content container">
                <div className="title-ic">
                    Tôn trọng là thành công
                </div>
                <div className="ic-content">
                    Con người là một trong những yếu tố quan trọng quyết định sự thành bại của một doanh nghiệp. Thấu hiểu sâu sắc điều này, MPHR cam kết cung cấp cho khách hàng của mình những giải pháp nhân sự chuyên biệt và hiệu quả nhất nhằm đáp ứng nhu cầu đa dạng của
                    khách hàng trong nước và quốc tế về Nhân Sự - Đào Tạo.
                    <br />
                    <br/> Dựa trên nền tảng Minh Phúc Telecom - nhà cung cấp dịch vụ hàng đầu về giải pháp Contact Center, BPO với 15 năm kinh nghiệm tại Việt Nam. MPHR tự hào theo đuổi các giá trị toàn vẹn trên tất cả các dịch vụ của mình, giúp khách
                    hàng giải quyết tất cả các vấn đề phức tạp nhất về Nhân sự bao gồm:
                    <br />
                    <br/> - Dịch vụ Quản lý tiền lương <br/> - Dịch vụ Cho thuê nhân sự <br/> - Dịch vụ Tuyển dụng nhân sự <br/> - Dịch vụ Đào tạo <br/> - Dịch vụ Tư vấn hướng nghiệp
                    <br/>
                    <br/>
                    <h4>Giá trị cốt lõi</h4>
                    <br/> Tôn trọng – Thích ứng – Hiệu quả
                    <br/>
                    <br/>
                    <h4>Sứ mệnh</h4>
                    <br/> Thấu hiểu được rằng "Con người là tài sản quý giá nhất của doanh nghiệp", MPHR luôn trung thành với sứ mệnh cung ứng nguồn lực tốt nhất cho các doanh nghiệp ở nhiều lĩnh vực.
                    <br/>
                    <br/>
                    <h4>Tầm nhìn</h4>
                    <br/> Trở thành công ty số một tại Việt Nam cung cấp các dịch vụ về giải pháp nhân sự cho khách hàng.
                </div>
            </div>
        </div>
        <div className="container-fluid list-jobs-wrapper">
            <div className="list-jobs-content container">
                <div className="title-lbc">
                    Danh sách tuyển dụng mới nhất
                </div>
                <div className="content-lbc">
                    {
                        job.data !== undefined ?
                        job.data.length > 0 ? 
                        job.data.map((e, i) => {
                            return <NavLink key={e.id} to={{pathname: `/job-detail/${e.id}`, idItem: e.id}} className="link-item">
                            <div className="job-item">
                                <div className="title-job-item">
                                    <img src="images/logo_official.png" />
                                    <div className="company-name"></div>
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
                                        <li className="page-item"><NavLink className="page-link" to="/">Previous</NavLink></li>
                                        : <li className="page-item disabled"><NavLink className="page-link" aria-disabled="true" to="#">Previous</NavLink></li>
                                    }
                                    {
                                        job.next_page_url !== null ?
                                        <li className="page-item"><NavLink className="page-link" to="/">Next</NavLink></li>
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