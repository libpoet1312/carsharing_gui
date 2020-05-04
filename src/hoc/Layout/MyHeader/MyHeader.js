import React from 'react';
import {Layout} from "antd";

import {AwesomeButton} from "react-awesome-button";
import {FaCarSide} from 'react-icons/fa';
import { LoginOutlined, LogoutOutlined } from '@ant-design/icons';

import classes from './myHeader.module.css';

const {Header} = Layout;

const MyHeader = (props) => {

    let header = <AwesomeButton className={classes.Button} type="primary" size="small" action={props.showModal}> <LoginOutlined/><span>Login</span></AwesomeButton>;

    if(props.isAuthenticated){
        header = <AwesomeButton type="primary" size="small" action={props.logout}><LogoutOutlined/>Logout</AwesomeButton>
    }

    return (
        <Header className={classes.myHeader}>
            <h5 className={classes.Title}>Car <FaCarSide/> Sharing</h5>
            <div className={classes.Button}>{header}</div>
        </Header>
    )
};



export default MyHeader;