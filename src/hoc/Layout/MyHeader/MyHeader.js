import React from 'react';
import {Col, Layout, Row} from "antd";

import {AwesomeButton} from "react-awesome-button";
import {FaCarSide} from 'react-icons/fa';
import { LoginOutlined, LogoutOutlined } from '@ant-design/icons';

const {Header} = Layout;

const MyHeader = (props) => {

    let header = <AwesomeButton type="primary" size="small" action={props.showModal}> <LoginOutlined/>Σύνδεση</AwesomeButton>;

    if(props.isAuthenticated){
        header = <AwesomeButton type="primary"  action={props.logout}> <LogoutOutlined/>Αποσύνδεση</AwesomeButton>
    }

    return (
        <Header className="header">
            <Row type="flex" align="middle">
                <Col className='site-title'> Car <FaCarSide/> Sharing</Col>
                <Col className="ml-auto">{header}</Col>
            </Row>
        </Header>
    )
};



export default MyHeader;