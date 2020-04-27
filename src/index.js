import React from 'react';
import ReactDOM from 'react-dom';
import 'bootstrap/dist/css/bootstrap.css';
import App from './App.js';
import * as serviceWorker from './serviceWorker';
import { createStore, applyMiddleware} from 'redux';
import reducer from "./store/reducers/auth";
import thunk from "redux-thunk";
import { Provider } from 'react-redux';
import { composeWithDevTools } from 'redux-devtools-extension';


// REDUX CONFIGURATION

// const composeEnhances = window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__();

const store = createStore(reducer, composeWithDevTools(
    applyMiddleware(thunk)
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