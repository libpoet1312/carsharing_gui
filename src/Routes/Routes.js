import React, {useEffect, useState} from "react";
import {Route, Switch, useLocation} from 'react-router-dom';
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
import TermsConditions from "../components/Terms and Conditions/TermsConditions";
import {PrivacyPolicy} from "../components/PrivacyPolicy/PrivacyPolicy";

const checkIfOwner = (pk, myrides)=> {
    // console.log(pk, myrides);
    if(!myrides || !pk){return false}
    return myrides.some(ride => {
        return ride.pk.toString() === pk;
    });
};

const Routes = (props) => {
    let isMobile = props.isMobile;
    let [myrides, setMyRides] = useState();
    let location = useLocation();
    const pk = location.pathname.split('/')[2];

    useEffect(()=> {
        if(!myrides){
            setMyRides(props.myrides);
        }
    },[myrides, props.myrides]);

    return (
        <Switch>
            <Route exact path='/' component={Home}/>
            {props.isAuthenticated ? <Route exact path='/user/:id' component={User}/> : null}
            {props.isAuthenticated ? <Route exact path='/myaccount' render={(props) => <MyAccount {...props} isMobile={isMobile}/>}/>: null}
            {props.isAuthenticated ? <Route exact path='/mysettings' render={(props) => <MySettings {...props} isMobile={isMobile}/>}/>: null}
            {props.isAuthenticated ? <Route exact path='/mynotifications' render={(props) => <Notifications {...props}/>}/>: null}
            {props.isAuthenticated  ? <Route exact path='/myrides' render={(props) => <MyRides {...props}/>}/>: null}
            {props.isAuthenticated && checkIfOwner(pk, myrides)  ? <Route exact path='/rides/:ridePK/edit' render={(props) => <EditRide {...props}/>}/>: null}


            <Route exact path='/rides' component={Rides}/>

            <Route exact path='/rides/:ridePK' component={Ride}/>
            <Route exact path='/faq' component={MyFaq}/>
            <Route exact path='/terms' component={TermsConditions}/>
            <Route exact path='/privacypolicy' component={PrivacyPolicy}/>
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
        fetchMyRides: (query, token) => dispatch(myRidesActions.fetchMyRides(query, token)),
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(Routes);
