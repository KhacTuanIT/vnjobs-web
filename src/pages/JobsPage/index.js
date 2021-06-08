import React from 'react';
import {NavLink} from 'react-router-dom';

const index = () => {
    return (
        <div>
            <div className="container-fluid list-jobs-wrapper">
                <div className="list-jobs-content container">
                    <div className="title-lbc">
                        Danh sách tuyển dụng mới nhất
                    </div>
                    <div id="carouselExampleIndicators" className="carousel slide" data-bs-ride="carousel">
                        <div className="carousel-inner">
                            <div className="carousel-item active">
                                <NavLink to="#" className="link-item">
                                    <div className="job-item-carousel">
                                        <div className="title-job-item">
                                            <div className="company-name">Google</div>
                                            <div className="title-text">Job title</div>
                                            <div className="desc">
                                                <div className="desc-item salary">Negotiative</div>
                                                <div className="desc-item major">IT</div>
                                                <div className="desc-item type-work">Full-time</div>
                                            </div>
                                            <div className="time-left">2 days left</div>
                                        </div>
                                        <div className="content-button">
                                            <NavLink to="#" className="btn-t btn-link-app">APPLY</NavLink>
                                        </div>
                                        <div className="right-content">
                                            <div className="rc-content">
                                                <div className="content-text">
                                                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Ipsa, velit, non maxime perferendis molestiae fugiat enim, praesentium facere itaque iste minus vel commodi repellat dicta. Atque voluptate esse nemo dolores!
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </NavLink>
                            </div>
                            <div className="carousel-item">
                                <NavLink to="#" className="link-item">
                                    <div className="job-item-carousel">
                                        <div className="title-job-item">
                                            <div className="company-name">Google</div>
                                            <div className="title-text">Job title 2</div>
                                            <div className="desc">
                                                <div className="desc-item salary">Negotiative</div>
                                                <div className="desc-item major">IT</div>
                                                <div className="desc-item type-work">Full-time</div>
                                            </div>
                                            <div className="time-left">2 days left</div>
                                        </div>
                                        <div className="content-button">
                                            <NavLink to="#" className="btn-t btn-link-app">APPLY</NavLink>
                                        </div>
                                        <div className="right-content">
                                            <div className="rc-content">
                                                <div className="content-text">
                                                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Ipsa, velit, non maxime perferendis molestiae fugiat enim, praesentium facere itaque iste minus vel commodi repellat dicta. Atque voluptate esse nemo dolores!
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </NavLink>
                            </div>
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
                        <NavLink to="#" className="link-item">
                            <div className="job-item">
                                <div className="title-job-item">
                                    <img src="images/logo_official.png" />
                                    <div className="company-name">Google</div>
                                </div>
                                <div className="right-content">
                                    <div className="desc">
                                        <div className="desc-item salary">Negotiative</div>
                                        <div className="desc-item major">IT</div>
                                        <div className="desc-item type-work">Full-time</div>
                                    </div>
                                    <div className="rc-content">
                                        <div className="title-text col-sm-6 p-0">Job title</div>
                                        <div className="content-button col-sm-6 justify-content-end p-0">
                                            <NavLink to="#" className="btn-t btn-link-app">APPLY</NavLink>
                                        </div>
                                    </div>
                                    <div className="time-left">2 days left</div>
                                </div>
                            </div>
                        </NavLink>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default index;