import React, {Component, PureComponent} from 'react';
import {connect} from 'react-redux';
import {Col, Row} from 'antd';
import axios from 'axios';
import Avatar from 'react-avatar';

const USER_URL = 'http://localhost:8000/rest-auth/user/';

let user = null;

class User extends PureComponent {
    componentWillMount() {
        if(this.props.user !== undefined && this.props.user !==null){
            console.log(this.props.user.token);
            let config = {
                headers: {
                    Authorization: 'JWT ' + this.props.user.token,
                }
            };

            axios.get(USER_URL, config).then(response => {
                console.log('server', response.data);
                user = response.data
            }).catch(error=> {
                console.log(error)
            })
        }
    }


    componentWillReceiveProps( newProps) {
        console.log(newProps);
        if(newProps.user){
            axios.headers = {
                "Content-Type": "application/json",
                "Authorization": 'JWT ' + newProps.user.token
            };
            axios.get(USER_URL).then(response => {
                console.log('server', response.data);
                user = response.data
            }).catch(error=> {
                console.log('skata')
            })
        }
    }

    render() {
        return (
            <Row className={'border border-danger text-center'}>
                <Col span={16} className={'border border-danger'}>
                    <Row>
                        <Avatar round={true}/>
                        {user.pk}
                    </Row>
                    <Row>

                    </Row>
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
    console.log('state:');
    console.log(state);
    return {
        user: state.user
    }
};

const mapDispatchToProps = dispatch => {
    return {
        // skata
    }
};

export default connect(mapStateToProps, mapDispatchToProps )(User);
