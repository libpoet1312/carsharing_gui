import React from 'react'
import {Layout, Menu} from "antd";
import {Link} from "react-router-dom";

import { HomeFilled, FileOutlined, UserOutlined} from '@ant-design/icons';
import {FaCar} from 'react-icons/fa';

const {Sider} = Layout;
const { SubMenu } = Menu;

const MySider = (props) => {
    let user_menu = null;
    if(props.isAuthenticated){
        user_menu = (
            <SubMenu
                key="sub1"
                title={
                    <span>
                        <UserOutlined />
                        <span>User</span>
                    </span>
                }
            >
                <Menu.Item key="3">My Rides</Menu.Item>
                <Menu.Item key="4">My Requests</Menu.Item>
                <Menu.Item key="5"><Link to={`/profile/`} replace>Profile</Link></Menu.Item>
            </SubMenu>
            )

    }

    return (
        <Sider collapsible collapsed={props.collapsed} onCollapse={props.onCollapse}>
            <Menu theme="dark" defaultSelectedKeys={['1']} mode="inline">
                <Menu.Item key="1">
                    <Link to={`/`} replace>
                        <HomeFilled/>
                        <span>Home</span>
                    </Link>
                </Menu.Item>
                <Menu.Item key="2">
                    <Link to={`/rides/`}>
                        <FaCar />
                        <span>Rides</span>
                    </Link>
                </Menu.Item>

                {user_menu}

                <Menu.Item key="6">
                    <FileOutlined />
                </Menu.Item>
            </Menu>
        </Sider>
  )
};

export default MySider
