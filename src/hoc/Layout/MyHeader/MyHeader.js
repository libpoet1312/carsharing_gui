import React from 'react';
import {Layout} from "antd";

import {AwesomeButton} from "react-awesome-button";
import {
    MenuUnfoldOutlined,
    MenuFoldOutlined, LoginOutlined, LogoutOutlined } from '@ant-design/icons';


import classes from './myHeader.module.css';
import './test.css';

const {Header} = Layout;

const MyHeader = (props) => {

    let header = <AwesomeButton type="primary" size="small" action={props.showModal}> <LoginOutlined/><span>Login</span></AwesomeButton>;

    if(props.isAuthenticated){
        header = <AwesomeButton type="primary" size="small" action={props.logout}><LogoutOutlined/>Logout</AwesomeButton>
    }

    return (

        <Header className={[classes.myHeader, "site-layout-background"]} style={{ padding: 0 }}>

            <div>
                {props.isMobile ? React.createElement(props.collapsed ? MenuUnfoldOutlined : MenuFoldOutlined, {
                    className: classes.trigger,
                    onClick: props.showDrawer,
                }) : null}
            </div>
            <div>{header}</div>


        </Header>
    )
};



export default MyHeader;