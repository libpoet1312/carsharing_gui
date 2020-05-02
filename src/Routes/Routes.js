import React from "react";
import { Route, Switch } from 'react-router-dom';
import {connect} from 'react-redux';


import Home from "../components/Home/Home";
import ErrorPage from '../components/404'
import Profile from "../containers/User/User";
import Rides from "../containers/Rides/Rides";
import Ride from "../containers/Rides/Ride/Ride";

const Routes = () => (
    <Switch>
        <Route exact path='/' component={Home}/>
        <Route exact path='/profile/:id' component={Profile}/>
        <Route exact path='/rides' component={Rides}/>
        <Route exact path='/rides/:ridePK' component={Ride}/>
        <Route path='/'  component={ErrorPage}/>
    </Switch>
);

const mapStateToProps = state => {
        return {
                isAuthenticated: state.auth.token !== null
        };
};

export default connect(mapStateToProps)(Routes);