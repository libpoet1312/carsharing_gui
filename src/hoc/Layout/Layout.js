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
        width: 0,
        height: 0,
        mobile: false,
        drawerVisible: false
    };

    constructor(props) {
        super(props);
        this.updateWindowDimensions = this.updateWindowDimensions.bind(this);
    }


    componentDidMount() {
        this.updateWindowDimensions();
        window.addEventListener('resize', this.updateWindowDimensions);
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if(prevState.width!==this.state.width){
            this.updateWindowDimensions();
        }

    }

    componentWillUnmount() {
        window.removeEventListener('resize', this.updateWindowDimensions);
    }

    updateWindowDimensions() {
        this.setState({ width: window.innerWidth, height: window.innerHeight });
        this.setState({ mobile: this.state.width<768})
    }

    changeView = () => {
        this.setState({mobile: !this.state.mobile})
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


    showDrawer = () => {
        this.setState({ drawerVisible: !this.state.drawerVisible})
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


                <Layout style={{height:"100vh"}} hasSider>

                        <MySider isMobile={this.state.mobile} changeView={() => this.changeView()}
                                 isAuthenticated={this.props.isAuthenticated} collapsed={this.state.collapsed}
                                 onCollapse={(skata)=>this.onCollapse(skata)} user={this.props.user}
                                 showDrawer={() => this.showDrawer()} drawerVisible={this.state.drawerVisible}


                        />







                    {/* MAIN CONTENT FROM HERE */}
                    <Layout className="site-layout">
                        <MyHeader showDrawer={() => this.showDrawer()} isMobile={this.state.mobile}
                                  collapsed={this.state.collapsed} isAuthenticated={this.props.isAuthenticated}
                                  showModal={this.showModalHandler} logout={() => this.logout()}
                                  user={this.props.user}
                        />

                        {/*<Header className="site-layout-background" style={{ padding: 0 }} />*/}


                        <Content style={{ margin: '20px 10px' }}>
                            <Breadcrumb style={{ margin: '16px 10px' }}>
                                <Breadcrumb.Item><Link to='/'>Home</Link></Breadcrumb.Item>
                                <Breadcrumb.Item><Link to='rides/'>List</Link></Breadcrumb.Item>
                            </Breadcrumb>


                            <div className="Content">
                                {React.cloneElement(this.props.children, { isMobile: this.state.mobile })}
                            </div>
                        </Content>

                        <Footer style={{width: "100%", textAlign: 'center', position: "fixed", bottom: "0" }}>Copyright © 2020 Created by Nick Pappas</Footer>
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
        logout: () => dispatch(authActions.logout()),
    }
};

export default connect(mapStateToProps, mapDispatchToProps,  null, { pure: false })(withRouter(CustomLayout));
