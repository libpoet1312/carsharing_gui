import React from "react";
import {Layout, Menu, Breadcrumb, Space, Row, Col} from 'antd';
import {
    DesktopOutlined,
    HomeFilled,
    FileOutlined,
    TeamOutlined,
    UserOutlined,
    LoginOutlined,
} from '@ant-design/icons';

import './CustomLayout.css'

import {FaCarSide} from 'react-icons/fa';
import { AwesomeButton} from 'react-awesome-button';
import 'react-awesome-button/dist/styles.css';
import 'react-awesome-button/dist/themes/theme-blue.css';
import {Link} from "react-router-dom";


const { Header, Content, Footer, Sider } = Layout;
const { SubMenu } = Menu;

class CustomLayout extends React.Component {
    constructor(props) {
        super(props);



        this.state = {
            collapsed: false,
        };
    }

    onCollapse = collapsed => {
        this.setState({ collapsed });
    };

    render() {
        return (
            <div>
                <Header className="header">
                    <Row type="flex" align="middle">
                        <Col className='site-title'>
                            Car <FaCarSide/> Sharing
                        </Col>
                        <Col className="ml-auto">
                            <Space>
                                <AwesomeButton type="primary" size="small"> <LoginOutlined/>{'    '}Σύνδεση</AwesomeButton>
                                <AwesomeButton type="secondary" size="small"> Εγγραφή</AwesomeButton>
                            </Space>
                        </Col>
                    </Row>
                </Header>

                <Layout style={{ minHeight: '93vh' }}>
                    <Sider collapsible collapsed={this.state.collapsed} onCollapse={this.onCollapse}>
                        <Menu theme="dark" defaultSelectedKeys={['1']} mode="inline">
                            <Menu.Item key="1">
                                <Link to='/'>
                                    <HomeFilled/>
                                    <span>Home</span>
                                </Link>
                            </Menu.Item>
                            <Menu.Item key="2">
                                <Link to='rides/'>
                                    <DesktopOutlined />
                                    <span>Rides</span>
                                </Link>
                            </Menu.Item>
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
                                <Menu.Item key="5">Profile</Menu.Item>
                            </SubMenu>
                            <SubMenu
                                key="sub2"
                                title={
                                    <span>
                                      <TeamOutlined />
                                      <span>Team</span>
                                    </span>
                                }
                            >
                                <Menu.Item key="6">Team 1</Menu.Item>
                                <Menu.Item key="8">Team 2</Menu.Item>
                            </SubMenu>
                            <Menu.Item key="9">
                                <FileOutlined />
                            </Menu.Item>
                        </Menu>
                    </Sider>
                    <Layout className="site-layout">
                        <Header className="site-layout-background" style={{ padding: 0 }} />
                        <Content style={{ margin: '0 16px' }}>
                            <Breadcrumb style={{ margin: '16px 0' }}>
                                <Breadcrumb.Item><Link to='/'>Home</Link></Breadcrumb.Item>
                                <Breadcrumb.Item><Link to='rides/'>List</Link></Breadcrumb.Item>
                            </Breadcrumb>
                            <div className="site-layout-background" style={{ padding: 24, minHeight: 360 }}>
                                {this.props.children}
                            </div>
                        </Content>
                        <Footer style={{ textAlign: 'center' }}>Copyright © 2020 Created by Nick Pappas</Footer>
                    </Layout>
                </Layout>

                {/*<Affix style={{position:'fixed',bottom:50,right:50}}>*/}
                {/*    <Button type="primary" icon={<wechat/>} />*/}
                {/*</Affix>*/}
            </div>


        );
    }
}

export default CustomLayout
