import React, { Component } from 'react';
import {BrowserRouter} from 'react-router-dom';
import { connect } from 'react-redux';

import * as actions from './store/actions/authActions';

import Routes from './Routes/Routes';
import Layout from "./hoc/Layout/Layout";

import 'antd/dist/antd.css';



class App extends Component{

    componentDidMount() {
        this.props.onTryAutoSignup(); // auto-signin
    }

    render() {
        return (
            <BrowserRouter>
                <Layout {...this.props}>
                    <Routes/>
                </Layout>
                {/*<MyLayout/>*/}
            </BrowserRouter>
        );

    }

}

const mapStateToProps = state => {
    return {
        myrides: state.myrides.rides
    };
};

const mapDispatchToProps = dispatch => {
    return {
      onTryAutoSignup: () => dispatch(actions.authCheckState())
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
