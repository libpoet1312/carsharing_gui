import React from 'react'
import {Layout, Menu, Space} from "antd";
import {Link} from "react-router-dom";

import {FaCar, FaHome, FaUserAlt, FaUserCog, FaQuestionCircle} from 'react-icons/fa';

const {Sider} = Layout;
const { SubMenu } = Menu;

const MySider = (props) => {
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
                <Menu.Item key="3">Οι διαδρομές μου</Menu.Item>
                <Menu.Item key="4">Οι αιτήσεις μου</Menu.Item>
                <Menu.Item key="5">
                    <Link to={`/user/`+props.user.user.pk} replace>
                        <Space style={{color: 'white'}}>
                            <FaUserCog/>Το προφίλ μου
                        </Space>
                    </Link>
                </Menu.Item>
            </SubMenu>
            )

    }

    return (
        <Sider collapsible collapsed={props.collapsed} onCollapse={props.onCollapse}>
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
        </Sider>
  )
};

export default MySider
