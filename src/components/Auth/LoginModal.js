import React from "react";
import FacebookLogin from 'react-facebook-login';
import {Modal, Button, Col, Row} from "react-bootstrap";
import AuthService from '../../services/auth.service';
import Login from "./Login";


function LoginModal(props) {
    return (
        <Modal
            {...props}
            size="md"
            aria-labelledby="contained-modal-title-vcenter"
            centered>
            <Modal.Header closeButton>
                <Modal.Title>
                    <div>Σύνδεση στο CarPooling</div>
                </Modal.Title>
            </Modal.Header>
            <Modal.Body className='text-center'>
                <Row>
                    <Col>
                        <FacebookLogin
                            appId="2603473709910948"
                            autoLoad={false}
                            callback={AuthService.facebooklogin}
                            fields="name,email,picture"
                            icon="fa-facebook" />
                    </Col>
                    <Col>
                        <Login/>
                    </Col>
                </Row>


            </Modal.Body>
            <Modal.Footer>
                <Button onClick={props.onHide}>Close</Button>
            </Modal.Footer>
        </Modal>
    );
}

export default LoginModal