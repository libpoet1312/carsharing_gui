import * as actionTypes from './actionTypes';
import axios from 'axios';

const AUTH_URL = 'http://localhost:8000/';

export const authStart =() => {
    return {
        type: actionTypes.AUTH_START
    }
};

export const authSuccess = (user) => {
    return {
        type: actionTypes.AUTH_SUCCESS,
        user
    }
};

export const authFail = error => ({type: actionTypes.AUTH_FAIL, error});

export const logout = () =>{

    axios.post(AUTH_URL+'rest-auth/logout/',{
        token: localStorage.getItem('user')
    }).then( () =>{
        console.log(localStorage.getItem('user'));
        localStorage.removeItem('user');
    }).catch( error => {
        console.log(error);
        localStorage.removeItem('user');
    });


    return {
        type: actionTypes.AUTH_LOGOUT
    }
};


//////////////////////////
// ASYNC ACTIONS BELOW //
/////////////////////////

export const authLogin = (username, password) => {
    return dispatch => {
        dispatch(authStart());
        axios.post(AUTH_URL+'rest-auth/login/',{
            username: username,
            password: password
        }).then( response =>{
            const user = {
                token: response.data.token,
                user: response.data.user
            };
            localStorage.setItem('user', JSON.stringify(user));
            dispatch(authSuccess(user));
        }).catch( error => {

            dispatch(authFail(error))
        });
    }
};



export const authSignup = (
    username, email, password1, password2,
    phone_number, avatar, gender, country,
    has_whatsup, has_viber)  => {
        return dispatch => {
            dispatch(authStart());
            axios.post(AUTH_URL+'rest-auth/registration/',{
                username: username,
                email: email,
                password1: password1,
                password2: password2,
                phone_number: phone_number,
                avatar: avatar,
                gender: gender,
                country: country,
                has_whatsup: has_whatsup,
                has_viber: has_viber,
            }).then (
                response =>{
                    console.log(response);
                    const user = {
                        token: response.data.token,
                        user: response.data.user
                    };
                    localStorage.setItem('user', JSON.stringify(user));
                    dispatch(authSuccess(user));
                }
            ).catch( (response, error) => {
                console.log(response);
                console.log(error);
                dispatch(authFail(error));
            });
    }
};


export const authCheckState = () => {
    return dispatch => {
        const user = JSON.parse(localStorage.getItem("user"));
        if (user === undefined || user === null) {
            dispatch(logout());
        } else {
            dispatch(authSuccess(user));   
        }
    }
};