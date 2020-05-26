import React from 'react';
import {Layout, Badge, Menu, Button, Dropdown, Avatar, Space} from "antd";


import {AwesomeButton} from "react-awesome-button";
import {
    MenuUnfoldOutlined,
    MenuFoldOutlined, LoginOutlined, LogoutOutlined, BellOutlined, SettingOutlined } from '@ant-design/icons';

import {FaUserAlt} from 'react-icons/fa';
import {GoRequestChanges} from 'react-icons/go';

import classes from './myHeader.module.css';
import './test.css';
import {Link} from "react-router-dom";
import Notifications from "../../../components/Notifications/Notifications";

const {Header} = Layout;

const MyHeader = (props) => {

    let header = <AwesomeButton type="primary" size="small" action={props.showModal}> <LoginOutlined/><span>Login</span></AwesomeButton>;
    let userMenu = null;
    // if(props.isAuthenticated){
    //     header = (
    //         <div>
    //             <AwesomeButton type="primary" size="small" action={props.logout}><LogoutOutlined/>Logout</AwesomeButton>
    //         </div>
    //     )
    // }

    const content = (
        <Notifications notifications={props.notifications}/>
    );

    if(props.isAuthenticated){
        userMenu = (
            <Menu>
                <Menu.Item key="1">My rides</Menu.Item>
                <Menu.Item key="2">
                    <Link to={'/requests'}>
                        <Space>
                            <GoRequestChanges/>My requests
                        </Space>
                    </Link>
                </Menu.Item>
                <Menu.Item key="3">
                    <Link to={'/myaccount'} replace>
                        <Space>
                            <FaUserAlt /> My Account
                        </Space>
                    </Link>
                </Menu.Item>
                <Menu.Item key="4">
                    <Link to={'/mysettings'} replace>
                        <Space>
                            <SettingOutlined /> Account Settings
                        </Space>
                    </Link>
                </Menu.Item>
                <Menu.Item key="5">

                   <Space>
                       <Button type={"ghost"} onClick={props.logout}><LogoutOutlined/>Logout</Button>
                   </Space>
                </Menu.Item>

            </Menu>
        );
    }


    return (

        <Header className={[classes.myHeader, "site-layout-background"]} style={{ padding: 0 }}>

            <div>
                {props.isMobile ? React.createElement(props.collapsed ? MenuUnfoldOutlined : MenuFoldOutlined, {
                    className: classes.trigger,
                    onClick: props.showDrawer,
                }) : null}
            </div>


            <div className={classes.Right}>
                <div>
                    {
                        props.isAuthenticated ?
                            <div className={classes.Notif}>
                                <Dropdown placement={"bottomCenter"} overlay={content} trigger={['click']}>
                                    <Button style={{all: "unset", cursor: "pointer"}}>
                                        <Badge count={props.unreadNotificationsCount} overflowCount={10}>
                                            <BellOutlined style={{ fontSize: '20px'}}/>
                                        </Badge>
                                    </Button>
                                </Dropdown>
                            </div> : null
                    }


                </div>
                <div>
                    {
                        props.isAuthenticated ?
                            <div className={classes.User}>
                                <Dropdown placement={"bottomCenter"} overlay={userMenu} trigger={['hover']}>
                                    <Button style={{all: "unset", cursor: "pointer"}}>
                                        <Avatar shape="circle" size={"small"} src={props.user.avatar}/>
                                    </Button>
                                </Dropdown>
                            </div> : header
                    }
                </div>

            </div>



            {/*<div>{header}</div>*/}


        </Header>
    )
};



export default MyHeader;