import React from 'react'
import {Layout, Menu, Space} from "antd";
import {Link} from "react-router-dom";
import {BarsOutlined} from '@ant-design/icons'

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
                <Menu.Item key="3">My rides</Menu.Item>
                <Menu.Item key="4">My requests</Menu.Item>
                <Menu.Item key="5">
                    <Link to={`/user/`+props.user.user.pk} replace>
                        <Space style={{color: 'white'}}>
                            <FaUserCog/>My profile
                        </Space>
                    </Link>
                </Menu.Item>
            </SubMenu>
            )

    }

    return (
        <Sider breakpoint="md"
               collapsedWidth={0}
               collapsible
               trigger={null}

               collapsed={!props.collapsed}
               className={{minWidth: "150"}}
        >
            <span className={'ant-layout-sider-zero-width-trigger ant-layout-sider-zero-width-trigger-left'}
                  style={{top: 0, margin: "auto", padding: "auto"}}
                  onClick={()=>props.onCollapse(!props.collapsed)}>
				<BarsOutlined />
			</span>

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
