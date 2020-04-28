import React, { Component } from 'react';
import {BrowserRouter} from 'react-router-dom';
import Router from './Routes';
import { connect } from 'react-redux';
import 'antd/dist/antd.css';
import CustomLayout from "./containers/CustomLayout";
import * as actions from './store/actions/auth';

class App extends Component{

    componentDidMount() {
        this.props.onTryAutoSignup();
    }

    render() {
        return (
            <div>
                <BrowserRouter>
                    <CustomLayout {...this.props}>
                        <Router />
                    </CustomLayout>
                </BrowserRouter>
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        isAuthenticated: state.user !=null
    }
};


const mapDispatchToProps = dispatch => {
    return {
      onTryAutoSignup: () => dispatch(actions.authCheckState())
    };
  };

export default connect(mapStateToProps, mapDispatchToProps)(App);
