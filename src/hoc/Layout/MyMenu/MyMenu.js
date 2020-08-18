import React from 'react'
import {Menu, Space} from "antd";
import {Link} from "react-router-dom";

import {FaCarSide, FaUserCog} from 'react-icons/fa';
import {GoRequestChanges} from 'react-icons/go';

import {HomeOutlined, CarOutlined, PlusCircleOutlined, UserOutlined, QuestionCircleOutlined} from '@ant-design/icons';

const { SubMenu } = Menu;

const MyMenu = (props) => {
    let user_menu = null;

    if(props.isAuthenticated && props.user){
        user_menu = (
            <SubMenu
                key="sub1"
                icon={<UserOutlined />}
                title={
                    <span>User</span>
                }
            >
                <Menu.Item key="3">
                    <Link to={'/myrides'}>
                        <Space style={{color: 'white'}}>
                            <GoRequestChanges/>My Rides
                        </Space>
                    </Link>
                </Menu.Item>
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

            <div className="Title" ><span>Car </span><FaCarSide/><span> Sharing</span></div>



            <Menu theme="dark" defaultSelectedKeys={['1']} mode="inline" selectedKeys={props.selectedKeys}>
                <Menu.Item key="1" icon={<HomeOutlined />}>
                    <Link to={'/'}>
                        Home
                    </Link>
                </Menu.Item>
                <Menu.Item key="2" icon={<CarOutlined />}>
                    <Link to={`/rides/`}>
                        <span>Rides</span>
                    </Link>
                </Menu.Item>

                {props.isAuthenticated?
                    <Menu.Item key="6" icon={<PlusCircleOutlined />}>
                        <Link to={`/ridesadd/`}>
                                <span>Add Ride</span>
                        </Link>
                    </Menu.Item>
                    : null
                }

                {user_menu}

                <Menu.Item key="7" icon={<QuestionCircleOutlined />}>
                    <Link to={`/faq/`}>
                        <span>F.A.Q.</span>
                    </Link>

                </Menu.Item>
            </Menu>
        </div>
    )
};

export default MyMenu;
