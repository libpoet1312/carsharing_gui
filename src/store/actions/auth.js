import * as actionTypes from './actionTypes';
import axios from 'axios';

const AUTH_URL = 'http://localhost:8000/';

export const authStart =() => {
    return {
        type: actionTypes.AUTH_START
    }
};

export const authSuccess = (token) => {
    return {
        type: actionTypes.AUTH_SUCCESS,
        token: token
    }
};

export const authFail = error => ({type: actionTypes.AUTH_FAIL, error:error});

export const logout = () =>{
    localStorage.removeItem('token');
    localStorage.removeItem('token_expirationDate');
    return {
        type: actionTypes.AUTH_LOGOUT
    }
};



const checkAuthTimeout = token_expirationDate => {
    return dispatch => {
        setTimeout(() => {
            dispatch(logout())
        }, token_expirationDate * 1000)
    }
};

export const authLogin = (username, password) => {
    return dispatch => {
        dispatch(authStart());
        axios.post(AUTH_URL+'rest-auth/login/',{
            username: username,
            password: password
        }).then( response =>{
            const token = response.data.token;
            const token_expirationDate = new Date( new Date().getTime() + 3600 * 1000);

            localStorage.setItem('token', token);
            localStorage.setItem('token_expirationDate', token_expirationDate);
            dispatch(authSuccess(token));
            checkAuthTimeout();
            dispatch(checkAuthTimeout(3600));
        }).catch( error => {
            dispatch(authFail(error))
        });
    }
};

export const authSignup = (username, email, password1, password2,
                           phone_number, avatar, gender, country,
                           has_whatsup, has_viber
)  => {
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

        }).then( response =>{
            const token = response.data.token;
            const token_expirationDate = new Date( new Date().getTime() + 3600 * 1000);

            localStorage.setItem('token', token);
            localStorage.setItem('token_expirationDate', token_expirationDate);
            dispatch(authSuccess(token));
            checkAuthTimeout();
            dispatch(checkAuthTimeout(3600));
        }).catch( error => {
            dispatch(authFail(error))
        });
    }
};


export const authCheckState= () => {
    return dispatch => {
        const token = localStorage.getItem('token');
        if(token===undefined){
            dispatch(logout());
        }else{
            const token_expirationDate =new Date(localStorage.getItem('token_expirationDate'));
            if (token_expirationDate <= new Date() ) {
                dispatch(logout());
            }else {
                dispatch(authSuccess(token));
                dispatch(checkAuthTimeout( (token_expirationDate.getTime() - new Date().getTime()) / 1000 ));
            }
        }
    }
};
