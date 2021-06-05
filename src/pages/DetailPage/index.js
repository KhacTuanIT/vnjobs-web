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
                Detail page
            </div>
        );
    }
}

export default connect(
    mapStateToProps,
)(index);