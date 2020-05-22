import React from "react";
import { Route, Switch } from 'react-router-dom';
import {connect} from 'react-redux';

import Home from "../components/Home/Home";
import ErrorPage from '../components/404'
import Rides from "../containers/Rides/Rides";
import Ride from "../components/Ride/Ride";
import User from '../containers/User/User';
import addRide from "../containers/addRide/addRide";
import Requests from "../components/Requests/Requests";
import MyAccount from "../containers/MyAccount/MyAccount";

const Routes = (props) => {
        let isMobile = props.isMobile;
        return (
            <Switch>

                    <Route exact path='/' component={Home}/>

                    {props.isAuthenticated ? <Route exact path='/user/:id' component={User}/> : null}
                    {props.isAuthenticated ? <Route exact path='/myaccount' render={(props) => <User {...props} isMobile={isMobile}/>}/>: null}
                    {props.isAuthenticated ? <Route exact path='/mysettings' render={(props) => <MyAccount {...props} isMobile={isMobile}/>}/>: null}


                    <Route exact path='/rides' component={Rides}/>
                    <Route exact path='/rides/:ridePK' component={Ride}/>
                    {props.isAuthenticated ? <Route exact path='/rides/add' component={addRide}/> : null}

                    {props.isAuthenticated ? <Route exact path='/requests' component={Requests}/> : null}

                    <Route path='/'  component={ErrorPage}/>
            </Switch>
        );
};



const mapStateToProps = state => {
        return {
                isAuthenticated: state.auth.token !== null
        };
};

export default connect(mapStateToProps)(Routes);