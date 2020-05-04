import React from 'react'
import {Col, Divider, Row} from "antd";
import {connect} from 'react-redux';

import Aux from '../../../hoc/Aux/Aux'
import LoginForm from "../../Forms/LoginForm/LoginForm";
import RegistrationForm from "../../Forms/RegisterForm/RegisterForm";
import ForgotPasswordForm from "../../Forms/ForgotPasswordForm/ForgotPasswordForm";


import FacebookLogin from 'react-facebook-login'
// import FacebookLogin from "react-facebook-login/dist/facebook-login-render-props";
// import AuthService from "../../services/auth.service";
import * as actions from '../../../store/actions/authActions'

const AuthenticationModal = (props) => {

    const responseFacebook = (response) => {
        console.log(response);
        props.facebookLogin(response.accessToken);
        props.showModal();
    };

    const componentClicked = (e) => {
        console.log('e');
    };


    let modal;

    if(props.modal==='register'){
        modal = <RegistrationForm changeModal={(modal)=> props.changeModal(modal)}/>
    }else if (props.modal==='forgot'){
        modal = <ForgotPasswordForm changeModal={(modal)=> props.changeModal(modal)}/>
    }else{
        modal =
            <Row justify="space-around" align="middle" className='text-center'>
                <Col span={11} className=''>
                    <FacebookLogin
                        appId="2603473709910948"
                        autoLoad={false}
                        callback={responseFacebook}
                        onClick={componentClicked}
                        fields="name,email,picture"
                    />
                </Col>
                <Col span={2}><Divider type="vertical" style={{height: "250px"}}/></Col>
                <Col span={11} className='text-center'>
                    <LoginForm showModal={props.showModal}
                               changeModal={(modal)=> props.changeModal(modal)}
                               style={{height: "250px"}}/>
                </Col>
            </Row>
    }


    return (
        <Aux>
            {modal}
        </Aux>
    )
};

const mapStateToProps = (state) => {
    return {
        loading: state.auth.loading,
        error: state.auth.error
    }
};

const mapDispatchToProps = dispatch => {
    return{
        facebookLogin: (fbToken) => dispatch(actions.facebookAuth(fbToken))
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(AuthenticationModal);
