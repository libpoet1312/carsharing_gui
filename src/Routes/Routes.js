import React from "react";
import { Route, Switch } from 'react-router-dom';
import {connect} from 'react-redux';

import Home from "../components/Home/Home";
import ErrorPage from '../components/404'
import Rides from "../containers/Rides/Rides";
import Ride from "../components/Ride/Ride";
import User from '../containers/User/User';
import addRide from "../containers/addRide/addRide";

const Routes = (props) => (
    <Switch>
        <Route exact path='/' component={Home}/>


        {props.isAuthenticated ? <Route exact path='/user/:id' component={User}/> : null}


        <Route exact path='/rides' component={Rides}/>
        {props.isAuthenticated ? <Route exact path='/rides/add' component={addRide}/> : null}
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