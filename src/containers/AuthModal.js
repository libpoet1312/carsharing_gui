import React from "react";
import {Row, Col, Divider} from 'antd';
import AuthService from "../services/auth.service";
import FacebookLogin from 'react-facebook-login/dist/facebook-login-render-props'
import LoginForm from '../components/LoginForm'
import { AwesomeButtonSocial } from 'react-awesome-button';
import RegistrationForm from "../components/RegisterForm";


class AuthModal extends React.Component{
    constructor(props) {
        super(props);


        this.changeFormHandler = this.changeFormHandler.bind(this);
    }

    changeFormHandler (e) {
        this.props.changeModal()
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
                        <LoginForm changeForm={this.changeFormHandler} style={{ height: "250px"}}/>
                    </Col>
                </Row>
                :
                <div>
                    <RegistrationForm changeForm={this.changeFormHandler}/>
                </div>
        )
    }


};

export default AuthModal