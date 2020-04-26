import React, { Component } from 'react';
// import './App.css';
import 'antd/dist/antd.css';

import CustomLayout from "./containers/CustomLayout";
import RideList from "./containers/RideListView";

class App extends Component{
    render() {
        return (
            <div className="">
                <CustomLayout>
                    <RideList />
                </CustomLayout>
            </div>
        );
    }
}

export default App;
