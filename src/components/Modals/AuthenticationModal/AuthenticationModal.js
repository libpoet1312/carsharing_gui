import React from 'react'
import {Col, Divider, Row, Spin} from "antd";
import {connect} from 'react-redux';

import Aux from '../../../hoc/Aux/Aux'
import LoginForm from "../../Forms/LoginForm/LoginForm";
import RegistrationForm from "../../Forms/RegisterForm/RegisterForm";
import ForgotPasswordForm from "../../Forms/ForgotPasswordForm/ForgotPasswordForm";


import FacebookLogin from 'react-facebook-login'
// import FacebookLogin from "react-facebook-login/dist/facebook-login-render-props";
import * as actions from '../../../store/actions/authActions'
import {FACEBOOK_APP_ID} from "../../../config";
import {LoadingOutlined} from "@ant-design/icons";

const antIcon = <LoadingOutlined style={{ fontSize: 50 }} spin />;

const AuthenticationModal = (props) => {

    const responseFacebook = (response) => {
        console.log(response);
        props.facebookLogin(response.accessToken);
        props.showModal();
    };

    const componentClicked = (e) => {
        console.log('e');
    };


    let modal= <Spin indicator={antIcon}/>;

    if(props.modal==='register'){
        modal = <RegistrationForm showModal={props.showModal} changeModal={(modal)=> props.changeModal(modal)}/>
    }else if (props.modal==='forgot'){
        modal = <ForgotPasswordForm showModal={props.showModal} changeModal={(modal)=> props.changeModal(modal)}/>
    }else{
        modal =
            <Row justify="space-around" align="middle" className='text-center'>
                <Col span={11} className=''>
                    <FacebookLogin
                        appId={FACEBOOK_APP_ID}
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
    if(props.loading){
        modal = <div style={{textAlign: "center"}}><Spin indicator={antIcon}/></div>;
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
