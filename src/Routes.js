import React from "react";
import { Route } from 'react-router-dom';

import RideListView from "./containers/RideListView";
import Home from "./components/Home";
import RideDetailView from "./containers/RideDetailView";
import ErrorPage from './components/404'

const Router = () => (
    <div>
        <Route path='/' exact component={Home}/>
        <Route path='/rides/' exact component={RideListView}></Route>
        <Route path='/rides/:ridePK/' exact component={RideDetailView}/>
        <Route path='/' exact component={ErrorPage}/>
    </div>
);

export default Router;