import React, { Component } from 'react';
import {connect} from 'react-redux';
import {Col, Row} from 'antd';

class Profile extends Component {
    componentDidMount() {
        console.log(this.state);
    }

    render() {
        return (
            <Row className={'border border-danger text-center'}>
                <Col span={16} className={'border border-danger'}>
                    123123
                </Col>
                <Col span={8}>
                    <Row>
                        sadda
                    </Row>
                    <Row>
                        fsadg
                    </Row>
                </Col>
            </Row>
        )
    }
}

const mapStateToProps = state => {
    console.log(state)
    return {
        user: state.user
    }
};

const mapDispatchToProps = dispatch => {
    return {
        // skata
    }
};

export default connect(mapStateToProps, mapDispatchToProps )(Profile);
