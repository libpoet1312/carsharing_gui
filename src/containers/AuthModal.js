import React from "react";
import {Row, Col, Divider} from 'antd';
import AuthService from "../services/auth.service";
import FacebookLogin from 'react-facebook-login/dist/facebook-login-render-props'
import LoginForm from '../components/LoginForm'
import { AwesomeButtonSocial } from 'react-awesome-button';
import RegistrationForm from "../components/RegisterForm";
import ForgotPasswordForm from "../components/ForgotPasswordForm";


class AuthModal extends React.Component{
    constructor(props) {
        super(props);
        this.changeFormHandler = this.changeFormHandler.bind(this);
        this.ForgotPassHandler = this.ForgotPassHandler.bind(this);
        this.showModal = this.showModal.bind(this);
    }

    changeFormHandler (e) {
        console.log('ForgotPassword', this.props.forgot);
        this.props.changeModal()
    };

    ForgotPassHandler (e) {
        console.log('ForgotPassword', this.props.forgot);

        this.props.ForgotPasswordModal()
    };

    showModal (e) {
        this.props.showModal()
    };

    render() {
        return(
            this.props.login ?
                <Row justify="space-around" align="middle" className='text-center'>
                    <Col span={11} className=''>
                        <FacebookLogin
                            appId="2603473709910948"
                            autoLoad={false}
                            callback={AuthService.facebooklogin}
                            fields="name,email,picture"
                            render={renderProps => (
                                <AwesomeButtonSocial onClick={renderProps.onClick} size='lg' type='facebook'>
                                    <Row>Σύνδεση / Εγγραφή με Facebook</Row>
                                </AwesomeButtonSocial>
                            )}
                             />
                    </Col>
                    <Col span={2}><Divider type="vertical" style={{ height: "250px" }} /></Col>
                    <Col span={11} className='text-center'>
                        <LoginForm showModal={this.showModal} changeForm={this.changeFormHandler} ForgotPassHandler={this.ForgotPassHandler} style={{ height: "250px"}}/>
                    </Col>
                </Row>
                : this.props.forgot ?
                <div>
                    <ForgotPasswordForm showModal={this.showModal} ForgotPassHandler={this.ForgotPassHandler}/>
                </div>
                :
                <div>
                    <RegistrationForm showModal={this.showModal} changeForm={this.changeFormHandler}/>
                </div>

        )
    }


};

export default AuthModal