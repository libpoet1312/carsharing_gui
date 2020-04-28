import React from "react";
import { Route, Switch } from 'react-router-dom';

import RideListView from "./containers/RideListView";
import Home from "./components/Home";
import RideDetailView from "./containers/RideDetailView";
import ErrorPage from './components/404'
import Profile from "./containers/Profile";

const Router = () => (
    <Switch>
        <Route exact path='/' component={Home}/>
        <Route exact path='/profile/:id' component={Profile}/>
        <Route exact path='/rides' component={RideListView}></Route>
        <Route exact path='/rides/:ridePK' component={RideDetailView}/>
        <Route path='/'  component={ErrorPage}/>
    </Switch>
);

export default Router;