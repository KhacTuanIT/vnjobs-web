import React, { useState, useEffect } from 'react';

const CompanyForm = ({org}) => {
    const [organiztion, setOrganization] = useState(org);
    return (
        <div className="col-md-8">
            <div className="card mb-3">
                <div className="card-header">
                    <h5>YOUR COMPANY</h5>
                    <div className="company-status company-confirmed">
                        Comfirmed
                    </div>
                    <button className="close-button btn br-6" onClick={() => setIsManageOrg(false)}>
                        <i className="bi bi-x-octagon"></i>
                    </button>
                    
                </div>
                <div className="card-body">
                    <div className="row">
                        <div className="col-sm-3 d-flex align-items-center">
                            <h6 className="mb-0">Company Name</h6>
                        </div>
                        <div className="col-sm-9 text-secondary text-left">
                            {
                                isEditOrg ? 
                                <input type="text" className="form-control" placeholder="Company name" name="org_name" />
                                : 'Company name' 
                            }
                        </div>
                    </div>
                    <hr />
                    <div className="row">
                        <div className="col-sm-3 d-flex align-items-center">
                            <h6 className="mb-0">Company Phone</h6>
                        </div>
                        <div className="col-sm-9 text-secondary text-left">
                        {
                            isEditOrg ? 
                            <input type="text" className="form-control" placeholder="Company phone" name="org_phone" />
                            : 'Company Phome'
                        }
                        </div>
                    </div>
                    <hr />
                    <div className="row">
                        <div className="col-sm-3 d-flex align-items-center">
                            <h6 className="mb-0">Tax</h6>
                        </div>
                        <div className="col-sm-9 text-secondary text-left">
                        { isEditOrg ?
                            <input type="text" className="form-control" placeholder="Tax ID" name="tax" />
                            : 'Tax ID'
                        }
                        </div>
                    </div>
                    <hr />
                    <div className="row">
                        <div className="col-sm-3 d-flex align-items-center">
                            <h6 className="mb-0">Description</h6>
                        </div>
                        <div className="col-sm-9 text-secondary text-left">
                        { isEditOrg ?
                            <input type="text" className="form-control" placeholder="Description" name="description" />
                            : 'Description'
                        }
                        </div>
                    </div>
                    <hr />
                    <div className="row">
                        <div className="col-sm-3 d-flex align-items-center">
                            <h6 className="mb-0">Address</h6>
                        </div>
                        <div className="col-sm-9 text-secondary text-left">
                        { isEditOrg ?
                            <input type="text" className="form-control" placeholder="Address" name="org_address" />
                            : 'Address'
                        }
                        </div>
                    </div>
                    <hr />
                    <div className="row">
                    { isEditOrg ?
                        <div className="col-sm-12">
                            <button type="button" className="btn btn-danger br-6 mr-3" onClick={() => setIsEditOrg(false)}>Cancel</button>
                            <button type="button" className="btn btn-info br-6">Save</button>
                        </div>
                        : <div className="col-sm-12">
                            <button type="button" className="btn btn-info br-6" onClick={() => setIsEditOrg(true)}>Edit</button>
                        </div>
                    }
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CompanyForm;