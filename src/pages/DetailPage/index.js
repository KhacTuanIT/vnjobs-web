import React, { useState, useEffect } from 'react';
import axios from 'axios';
import * as API from '../../constants/Config';

const DetailPage = (props) => {
    const [jobDetail, setJobDetail] = useState(null);
    const [major, setMajor] = useState(null);
    const [org, setOrg] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const url = props.match.url;
    const arrUrl = url.split('/');
    const idItem = arrUrl[arrUrl.length-1];
    useEffect(() => {
        console.log(`${API.API}${API.RECRUITMENT_NEWS}/${idItem}`);
        async function getJobDetail() {
            if (jobDetail === null) {
                console.log("Start get data");
                setIsLoading(true);
                const headers = {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                }
                const endpoint = API.API + API.RECRUITMENT_NEWS + '/' + idItem;
                const pl = await axios.get(endpoint);
                
                console.log("Getting data");
                const data= pl.data;
                if (data) {
                    if (!major) {
                        const ep = API.API + API.MAJOR + '/' + data.major_id;
                        const mpl = await axios.get(ep);
                        const majorData = mpl.data;
                        setMajor(majorData);
                    }
                    
                    if (!org) {
                        const ep = API.API + API.ORGANIZATION + '/' + data.org_id;
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
    
    return isLoading ? 
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

export default DetailPage;