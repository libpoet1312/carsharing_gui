import React from 'react'
import {Col, Divider, Row} from "antd";

import Aux from '../../hoc/Aux/Aux'
import LoginForm from "../Forms/LoginForm/LoginForm";
import RegistrationForm from "../Forms/RegisterForm/RegisterForm";
import ForgotPasswordForm from "../Forms/ForgotPasswordForm/ForgotPasswordForm";

import {AwesomeButtonSocial} from "react-awesome-button";

import FacebookLogin from "react-facebook-login/dist/facebook-login-render-props";
// import AuthService from "../../services/auth.service";

const AuthenticationModal = (props) => {

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
                        // callback={AuthService.facebooklogin}
                        fields="name,email,picture"
                        render={renderProps => (
                            <AwesomeButtonSocial onClick={renderProps.onClick} size='lg' type='facebook'>
                                <Row>Σύνδεση / Εγγραφή με Facebook</Row>
                            </AwesomeButtonSocial>
                        )}
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

export default AuthenticationModal
