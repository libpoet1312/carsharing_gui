import React, { Component } from 'react';
import {BrowserRouter} from 'react-router-dom';
import Router from './Routes';
import 'antd/dist/antd.css';

import CustomLayout from "./containers/CustomLayout";

class App extends Component{
    render() {
        return (
            <div className="App">
                <BrowserRouter>
                    <CustomLayout>
                        <Router />
                    </CustomLayout>
                </BrowserRouter>
            </div>
        );
    }
}

export default App;
