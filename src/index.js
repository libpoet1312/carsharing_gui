import React from 'react';
import ReactDOM from 'react-dom';
import { createStore, applyMiddleware, compose, combineReducers} from 'redux';
import thunk from "redux-thunk";
import { Provider, } from 'react-redux';
import * as serviceWorker from './serviceWorker';


import App from './App.js';
import authReducer from "./store/reducers/authReducer";
import ridesReducer from "./store/reducers/ridesReducer";
import rideReducer from "./store/reducers/rideReducer";
import webSocketsMiddleware from "./middleware/webSocketMiddleware";
import webSocketReducer from "./store/reducers/webSocketReducer";
import myRidesReducer from "./store/reducers/myRidesReducer";

// REDUX CONFIGURATION

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const rootReducer = combineReducers({
    auth: authReducer,
    rides: ridesReducer,
    myrides: myRidesReducer,
    ride: rideReducer,
    webSocket: webSocketReducer
});

const middleware = [thunk, webSocketsMiddleware];

export const store = createStore(rootReducer, composeEnhancers(
    applyMiddleware(...middleware)
));




const app = (
    <Provider store={store}>
        <App/>
    </Provider>
);



ReactDOM.render(app, document.getElementById("root"));
// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
