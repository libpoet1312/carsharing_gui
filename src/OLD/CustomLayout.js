import React from "react";
import {Layout, Menu, Breadcrumb, Space, Row, Col, Modal} from 'antd';
import {
    DesktopOutlined,
    HomeFilled,
    FileOutlined,
    TeamOutlined,
    UserOutlined,
    LoginOutlined,
    LogoutOutlined
} from '@ant-design/icons';

import '../hoc/Layout/CustomLayout.css'

import {FaCarSide} from 'react-icons/fa';
import { AwesomeButton} from 'react-awesome-button';
import 'react-awesome-button/dist/styles.css';
import 'react-awesome-button/dist/themes/theme-blue.css';
import {Link} from "react-router-dom";

import * as actions from '../store/actions/authActions';
import {connect} from "react-redux";

const { Header, Content, Footer, Sider } = Layout;
const { SubMenu } = Menu;


{/*<span className={'ant-layout-sider-zero-width-trigger ant-layout-sider-zero-width-trigger-left'}*/}
{/*      style={{top: 0, margin: "auto", padding: "auto"}}*/}
{/*      onClick={()=>props.onCollapse(!props.collapsed)}>*/}
{/*	<BarsOutlined />*/}
{/*</span>*/}

class CustomLayout extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            collapsed: false,
            modalVisible: false,
            loginModal: true,
            ForgotPasswordModal: false
        };

        this.changeModal = this.changeModal.bind(this);
        this.ForgotPasswordModal = this.ForgotPasswordModal.bind(this);
        this.showModal = this.showModal.bind(this);
    }

    showModal = () => {
        this.setState({
            modalVisible: !this.state.modalVisible,
        });
    };

    changeModal = () => {
        console.log('here');
        this.setState({
            loginModal: !this.state.loginModal
        })
    };

    ForgotPasswordModal = () => {
        this.setState({
            loginModal: !this.state.loginModal,
            ForgotPasswordModal: !this.state.ForgotPasswordModal
        })
    };


    handleCancel = e => {
        this.setState({
            modalVisible: false,
            loginModal: true,
            ForgotPasswordModal: false
        });
    };



    onCollapse = collapsed => {
        this.setState({ collapsed });
    };

    render() {
        return (
            <div>
                <Modal visible={this.state.modalVisible}
                       onCancel={this.handleCancel}
                       title={<h3>Σύνδεση | Εγγραφή</h3>}
                       width={800}
                       footer={''}
                >
                    <AuthModal showModal={this.showModal} login={this.state.loginModal} forgot={this.state.ForgotPasswordModal} changeModal={this.changeModal} ForgotPasswordModal={this.ForgotPasswordModal} />
                </Modal>

                <Header className="header">
                    <Row type="flex" align="middle">
                        <Col className='site-title'>
                            Car <FaCarSide/> Sharing
                        </Col>
                        <Col className="ml-auto">
                            {
                                this.props.isAuthenticated ?
                                    <Space>
                                        <AwesomeButton type="primary"  action={this.props.logout}> <LogoutOutlined/>Αποσύνδεση</AwesomeButton>
                                    </Space>
                                    :
                                    <Space>
                                        <AwesomeButton type="primary" size="small" action={this.showModal}> <LoginOutlined/>Σύνδεση</AwesomeButton>
                                    </Space>
                            }

                        </Col>
                    </Row>
                </Header>





                <Layout style={{ minHeight: '93vh' }}>
                    <Sider collapsible collapsed={this.state.collapsed} onCollapse={this.onCollapse}>
                        <Menu theme="dark" defaultSelectedKeys={['1']} mode="inline">
                            <Menu.Item key="1">
                                <Link to={`/`} replace>
                                    <HomeFilled/>
                                    <span>Home</span>
                                </Link>
                            </Menu.Item>
                            <Menu.Item key="2">
                                <Link to={`/rides/`}>
                                    <DesktopOutlined />
                                    <span>Rides</span>
                                </Link>
                            </Menu.Item>
                            {
                                this.props.isAuthenticated ?
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
                                        <Menu.Item key="5"><Link to={`/profile/${this.props.user.user.pk}`} replace>Profile</Link></Menu.Item>
                                    </SubMenu>
                                    :
                                    <div></div>
                            }

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

const mapStateToProps = state => {
    console.log('layout: ', state.user);
    return {
        user: state.user
    }
};

const mapDispatchToProps = dispatch => {
    return {
        logout: () => dispatch(actions.logout())
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(CustomLayout);
