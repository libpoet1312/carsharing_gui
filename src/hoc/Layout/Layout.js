import React from "react";
import {Layout, Breadcrumb, Modal} from 'antd';
import {connect} from "react-redux";
import {Link} from "react-router-dom";
import { withRouter } from 'react-router-dom';

import 'react-awesome-button/dist/styles.css';
import 'react-awesome-button/dist/themes/theme-blue.css';

import AuthenticationModal from '../../components/Modals/AuthenticationModal/AuthenticationModal'
import MyHeader from "./MyHeader/MyHeader";
import MySider from "./MySider/MySider";

import * as authActions from '../../store/actions/authActions';
import './CustomLayout.css'

const {Content, Footer } = Layout;



const modals = {
    login: 'login',
    register: 'register',
    forgot: 'forgot'
};

class CustomLayout extends React.Component {

    state = {
        collapsed: false,
        modalVisible: false,
        modal: modals.login,
    };

    showModalHandler = () => {
        this.setState({
            modalVisible: !this.state.modalVisible,
        });
    };

    changeModal = (modal) => {
        this.setState({
            modal: modal
        })
    };

    handleCancel = () => {
        this.setState({
            modalVisible: false,
            modal: modals.login
        });
    };

    onCollapse = collapsed => {
        this.setState({ collapsed: collapsed });
    };

    logout = () => {
        this.props.logout();

        this.props.history.push('/');
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
                    <AuthenticationModal showModal={this.showModalHandler}
                                         modal={this.state.modal}
                                         changeModal={(modal)=>this.changeModal(modal)}
                    />
                </Modal>


                <MyHeader isAuthenticated={this.props.isAuthenticated} showModal={this.showModalHandler} logout={() => this.logout()}/>

                <Layout style={{ minHeight: '93vh'}} hasSider>
                    <MySider isAuthenticated={this.props.isAuthenticated} collapsed={this.state.collapsed} onCollapse={(skata)=>this.onCollapse(skata)} user={this.props.user}/>

                    {/* MAIN CONTENT FROM HERE */}
                    <Layout className="site-layout">
                        {/*<Header className="site-layout-background" style={{ padding: 0 }} />*/}
                        <Content style={{ margin: '36px 16px' }}>
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
    return {
        isAuthenticated: state.auth.user !== null,
        user: state.auth.user
    };
};


const mapDispatchToProps = dispatch => {
    return {
        logout: () => dispatch(authActions.logout())
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(CustomLayout));
