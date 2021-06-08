import React, { Component } from 'react';
import { connect } from 'react-redux';

function mapStateToProps(state) {
    return {
        job: state.jobDetail
    };
}

function mapDispatchToProps(dispatch) {
    return {

    };
}

class index extends Component {
    render() {
        return (
            <div>
                <div className="detail-wrapper container-fluid">
                    <div className="container">
                        <div className="job-title">Job title</div>
                        <div className="company">Company</div>
                        <div className="city">Ha noi</div>
                        <div className="desc-content">
                            <div className="salary-content row">
                                <div className="col-sm-2">Salary</div>:Negotiative</div>
                            <div className="major-content row">
                                <div className="col-sm-2">Major</div>:IT</div>
                            <div className="work-type-content row">
                                <div className="col-sm-2">Type</div>:Full-time</div>
                            <div className="address-content row">
                                <div className="col-sm-2">Address</div>:address</div>
                            <div className="time-left-content row">
                                <div className="col-sm-2">Time left</div>:From 21/1 - 21/2</div>
                        </div>
                        <div className="detail-content">
                            <div className="detail-content-title">
                                Job description
                            </div>
                            <div className="dc-content">
                                Lorem ipsum dolor sit amet consectetur adipisicing elit. Beatae laboriosam itaque, reiciendis distinctio eum eligendi ut in esse omnis magnam voluptatibus eaque possimus harum sapiente totam nam repellat dolor similique!
                            </div>
                        </div>
                        <div className="interview-time">
                            <div className="it-title">
                                Interview time
                            </div>
                            <div className="it-content">
                                From .... - ....
                            </div>
                        </div>
                    </div>
                    
                </div>
                <div className="container-fluid">
                    <h3 className="text-center">APPLY JOB</h3>
                    <form className="apply container col-sm-6">
                        <div className="mb-3 row">
                            <label className="col-sm-2 col-form-label">Exp years: </label>
                            <div className="col-sm-10">
                            <input type="number" className="form-control-plaintext input-form" min="0" max="50"/>
                            </div>
                        </div>
                        <div className="mb-3 row">
                            <label className="col-sm-2 col-form-label">CV: </label>
                            <div className="col-sm-10">
                            <input type="file" className="form-control-plaintext"/>
                            </div>
                        </div>
                        <div className="mb-3 row">
                            <label className="col-sm-2 col-form-label">Cover letter: </label>
                            <div className="col-sm-10">
                            <input type="file" className="form-control-plaintext"/>
                            </div>
                        </div>
                        <div className="justify-content-center d-flex">
                            <button className="btn-t btn-link-app" type="submit">SEND</button>
                        </div>
                        
                    </form>
                </div>
            </div>
        );
    }
}

export default connect(
    mapStateToProps,
)(index);