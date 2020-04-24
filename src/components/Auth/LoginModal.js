import React from "react";
import FacebookLogin from 'react-facebook-login';
import {Modal, Button} from "react-bootstrap";
import axios from "axios";

const API_URL = "http://localhost:8000/api/";
const REST_AUTH = API_URL+'rest-auth/';

const responseFacebook = (response) => {
    console.log(response);
    return axios
        .post(REST_AUTH+'facebook/',{
            access_token: response.accessToken
        }).then( response => {
            if(response.data.token){
                localStorage.setItem("user", JSON.stringify(response.data));
                console.log(response)
            }
            return response;
        });
};


function LoginModal(props) {
    return (
        <Modal
            {...props}
            size="md"
            aria-labelledby="contained-modal-title-vcenter"
            centered className=''>
            <Modal.Header closeButton>
                <Modal.Title id="">
                    <div className=''>Σύνδεση</div>
                </Modal.Title>
            </Modal.Header>
            <Modal.Body className='text-center'>
                <FacebookLogin
                    appId="2603473709910948"
                    autoLoad={false}
                    callback={responseFacebook}
                    fields="name,email,picture"
                    icon="fa-facebook" />
                <h4 className='text-center'>Centered Modal</h4>
                <hr/>
                <p>
                    Cras mattis consectetur purus sit amet fermentum. Cras justo odio,
                    dapibus ac facilisis in, egestas eget quam. Morbi leo risus, porta ac
                    consectetur ac, vestibulum at eros.
                </p>
            </Modal.Body>
            <Modal.Footer>
                <Button onClick={props.onHide}>Close</Button>
            </Modal.Footer>
        </Modal>
    );
}

export default LoginModal