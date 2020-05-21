import React from 'react'
import {Menu, Space} from "antd";
import {Link} from "react-router-dom";
import {FaCarSide} from 'react-icons/fa';

import {FaCar, FaHome, FaUserAlt, FaUserCog, FaQuestionCircle} from 'react-icons/fa';
import {GoRequestChanges} from 'react-icons/go';

const { SubMenu } = Menu;

const MyMenu = (props) => {
    let user_menu = null;

    if(props.isAuthenticated && props.user){
        user_menu = (
            <SubMenu
                key="sub1"
                title={
                    <span>
                        <Space style={{color: 'white'}}>
                            <FaUserAlt />
                            <span>User</span>
                        </Space>
                    </span>
                }
            >
                <Menu.Item key="3">My rides</Menu.Item>
                <Menu.Item key="4">
                    <Link to={'/requests'}>
                        <Space style={{color: 'white'}}>
                            <GoRequestChanges/>My requests
                        </Space>
                    </Link>
                </Menu.Item>
                <Menu.Item key="5">
                    <Link to={`/user/`+props.user.pk} replace>
                        <Space style={{color: 'white'}}>
                            <FaUserCog/>My profile
                        </Space>
                    </Link>
                </Menu.Item>

            </SubMenu>
        )
    }

    return (
        <div>
            <h5 className='Title'>Car <FaCarSide/> Sharing</h5>

            <Menu theme="dark" defaultSelectedKeys={['1']} mode="inline">
                <Menu.Item key="1">
                    <Link to={`/`} replace>
                        <Space style={{color: 'white'}}>
                            <FaHome/>
                            <span>Home</span>
                        </Space>
                    </Link>
                </Menu.Item>
                <Menu.Item key="2">
                    <Link to={`/rides/`}>
                        <Space style={{color: 'white'}}>
                            <FaCar />
                            <span>Rides</span>
                        </Space>

                    </Link>
                </Menu.Item>

                {user_menu}

                <Menu.Item key="6">
                    <Space>
                        <FaQuestionCircle /> F.A.Q.
                    </Space>

                </Menu.Item>
            </Menu>
        </div>
    )
};

export default MyMenu;
