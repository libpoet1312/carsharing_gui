import React from "react";
import { Route, Switch, useLocation } from 'react-router-dom';
import {connect} from 'react-redux';

import Home from "../components/Home/Home";
import error404 from '../components/404/404'
import Rides from "../containers/Rides/Rides";
import Ride from "../components/Ride/Ride";
import User from '../containers/User/User';
import addRide from "../containers/addRide/addRide";
import Requests from "../components/Requests/Requests";
import MySettings from "../containers/MySettings/MySettings";
import MyAccount from "../containers/MyAccount/MyAccount";
import Notifications from "../components/Notifications/Notifications";
import MyFaq from '../components/FAQ/MyFaq';
import MyRides from "../containers/MyRides/MyRides";
import EditRide from "../containers/EditRide/EditRide";
import * as myRidesActions from "../store/actions/myRidesActions";

const checkIfOwner = (pk, myrides)=> {
    console.log(pk, myrides);
    return true;
};

const Routes = (props) => {
    let isMobile = props.isMobile;
    let location = useLocation();
    const pk = location.pathname.split('/')[2];
    // console.log(location.pathname.split('/'));
    props.fetchRides('', props.token);
    checkIfOwner(pk, props.myrides);

    return (
        <Switch>
            <Route exact path='/' component={Home}/>
            {props.isAuthenticated ? <Route exact path='/user/:id' component={User}/> : null}
            {props.isAuthenticated ? <Route exact path='/myaccount' render={(props) => <MyAccount {...props} isMobile={isMobile}/>}/>: null}
            {props.isAuthenticated ? <Route exact path='/mysettings' render={(props) => <MySettings {...props} isMobile={isMobile}/>}/>: null}
            {props.isAuthenticated ? <Route exact path='/mynotifications' render={(props) => <Notifications {...props}/>}/>: null}
            {props.isAuthenticated  ? <Route exact path='/myrides' render={(props) => <MyRides {...props}/>}/>: null}
            {props.isAuthenticated  ? <Route exact path='/rides/:ridePK/edit' render={(props) => <EditRide {...props}/>}/>: null}


            <Route exact path='/rides' component={Rides}/>
            <Route exact path='/rides/:ridePK' component={Ride}/>
            <Route exact path='/faq' component={MyFaq}/>
            {props.isAuthenticated ? <Route exact path='/ridesadd' component={addRide}/> : null}
            {props.isAuthenticated ? <Route exact path='/requests' component={Requests}/> : null}
            <Route path='/'  component={error404}/>
        </Switch>
    );
};



const mapStateToProps = state => {
        return {
            isAuthenticated: state.auth.token !== null,
            myrides: state.myrides.rides,
            token: state.auth.user ? state.auth.user.token : null
        };
};
const mapDispatchToProps = dispatch => {
    return {
        fetchRides: (query, token) => dispatch(myRidesActions.fetchMyRides(query, token)),
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(Routes);
