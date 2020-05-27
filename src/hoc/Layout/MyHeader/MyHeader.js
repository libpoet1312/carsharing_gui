import React, {Component} from 'react';
import {Avatar, Button, Dropdown, Layout, Menu, Space, Tag} from "antd";
import NoticeIcon from 'ant-design-pro/lib/NoticeIcon';


import {AwesomeButton} from "react-awesome-button";
import {
    BellOutlined,
    LoginOutlined,
    LogoutOutlined,
    MenuFoldOutlined,
    MenuUnfoldOutlined,
    SettingOutlined
} from '@ant-design/icons';

import {FaUserAlt} from 'react-icons/fa';
import {GoRequestChanges} from 'react-icons/go';
import { CheckCircleTwoTone, InfoCircleTwoTone, CloseCircleFilled} from '@ant-design/icons';

import classes from './myHeader.module.css';
import './test.css';
import 'ant-design-pro/lib/NoticeIcon/style/index.less'
import 'ant-design-pro/dist/ant-design-pro.css';

import {Link, withRouter} from "react-router-dom";
import moment from "moment";

const {Header} = Layout;

class MyHeader extends Component {

    getNoticeData(notices) {
        if (notices.length === 0) {
            return {};
        }
        const newNotices = notices.map(notice => {
            // console.log(notice);
            const newNotice = { ...notice };
            // transform id to item key
            newNotice.type = 'notification';

            if(notice.verb==='accepted'){
                newNotice.avatar = <CheckCircleTwoTone twoToneColor="#52c41a" />;
                newNotice.description =`You have been accepted in ${notice.target.origin} to ${notice.target.destination}'`;
            }else if(notice.verb==='request'){
                newNotice.avatar = <InfoCircleTwoTone />;
                newNotice.description =notice.actor.username + ` requested to join in '${notice.target.origin} to ${notice.target.destination}'`;
            }else if(notice.verb==='declineRequest'){
                newNotice.avatar = <CloseCircleFilled style={{color: "red"}} twoToneColor="#eb2f96"/>;
                newNotice.description =`You have been denied to join '${notice.target.origin} to ${notice.target.destination}'`;
            }else if(notice.verb==='cancelRequest'){
                newNotice.avatar = <CloseCircleFilled style={{color: "red"}} twoToneColor="#eb2f96"/>;
                newNotice.description =notice.actor.username + ` canceled his/her request in '${notice.target.origin} to ${notice.target.destination}'`;
            }else{
                newNotice.avatar = <CloseCircleFilled style={{color: "red"}} twoToneColor="#eb2f96"/>;
                newNotice.description =notice.actor.username + notice.verb +` requested to join in '${notice.target.origin} to ${notice.target.destination}'`;
            }


            newNotice.datetime = moment(notice.timestamp).fromNow();
            newNotice.sort = moment(notice.timestamp);

            if (newNotice.id) {
                newNotice.key = newNotice.id;
            }
            if(newNotice.unread){
                newNotice.extra = (
                    <Tag color={'red'} style={{ marginRight: 0 }}>
                        Unread
                    </Tag>
                );
            }

            return newNotice;
        });

        newNotices.sort( (a,b) => {
            return a.sort.diff(b.sort)<=0
        });

        const newNotifications = newNotices.slice(0, 10);


        return newNotifications.reduce((pre, data) => {

            if (!pre[data.type]) {
                pre[data.type] = [];
            }
            pre[data.type].push(data);
            return pre;
        }, {});

    }

    onItemClick = (item) => {
        // console.log(item);

        this.props.setNotificationAsRead(item.id);
    };

    onClear = (tabTitle) => {
        console.log(tabTitle);
    };

    onViewMore =(tabProps, event) => {
        this.props.history.push('/mynotifications');
    };


    render() {
        const noticeData = this.getNoticeData(this.props.notifications);

        let header = <AwesomeButton type="primary" size="small" action={this.props.showModal}> <LoginOutlined/><span>Login</span></AwesomeButton>;
        let userMenu = null;



        if(this.props.isAuthenticated){
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
                            <Button type={"ghost"} onClick={this.props.logout}><LogoutOutlined/>Logout</Button>
                        </Space>
                    </Menu.Item>

                </Menu>
            );
        }


        return (

            <Header className={[classes.myHeader, "site-layout-background"]} style={{ padding: 0 }}>

                <div>
                    {this.props.isMobile ? React.createElement(this.props.collapsed ? MenuUnfoldOutlined : MenuFoldOutlined, {
                        className: classes.trigger,
                        onClick: this.props.showDrawer,
                    }) : null}
                </div>


                <div className={classes.Right}>
                    <div>
                        {
                            this.props.isAuthenticated ?
                                <div className={classes.Notif}>

                                    <NoticeIcon onItemClick={this.onItemClick}
                                                onClear={this.onClear}
                                                clearClose={true}
                                                onViewMore={this.onViewMore}


                                                bell={<BellOutlined style={{ fontSize: '20px'}}/>}
                                                count={this.props.unreadNotificationsCount}>
                                        <NoticeIcon.Tab
                                            title={'Notifications'}
                                            list={noticeData.notification}
                                            emptyText="Empty Text"
                                            emptyImage="https://gw.alipayobjects.com/zos/rmsportal/wAhyIChODzsoKIOBHcBk.svg"
                                            showViewMore={true}

                                            locale={''}
                                        />
                                    </NoticeIcon>
                                </div> : null
                        }


                    </div>
                    <div>
                        {
                            this.props.isAuthenticated ?
                                <div className={classes.User}>
                                    <Dropdown placement={"bottomCenter"} overlay={userMenu} trigger={['hover']}>
                                        <Button style={{all: "unset", cursor: "pointer"}}>
                                            <Avatar shape="circle" size={"small"} src={this.props.user.avatar}/>
                                        </Button>
                                    </Dropdown>
                                </div> : header
                        }
                    </div>
                </div>
            </Header>
        )
    }
}

export default withRouter(MyHeader);