import React from 'react';
import './App.css';
import NavigationBar from "./components/Navigation/NavigationBar";
import { Route, Switch } from 'react-router-dom';
import Home from "./components/Home";
import Login from "./components/Auth/Login";

function App() {
    return (
        <div>
            <NavigationBar/>
            <Switch>
                <Route path='/' exact component={Home} />
                <Route path='/login' exact component={Login}/>
                <Route render={() => <h1>404: page not found</h1>} />
            </Switch>

        </div>
    );
}

export default App;
