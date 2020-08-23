import * as actionTypes from './actionTypes';
import {fetchMyRides} from "./myRidesActions";
import axios from 'axios';
import {API_HTTP} from "../../config";


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



//logout actions

export const ws_logout = () => {
    return {type: actionTypes.AUTH_LOGOUT}
};

export const logoutStart = () => {
    return {
        type: actionTypes.LOGOUT_START
    }
};

export const logoutFail = (error) => {
    return {
        type: actionTypes.LOGOUT_FAIL,
        error: error
    }
};

export const logoutSuccess = () => {
    return {
        type: actionTypes.LOGOUT_SUCCESS
    }
};

export const logout = () =>{
    return dispatch => {
        dispatch(logoutStart());
        dispatch(ws_logout());
        axios.post(API_HTTP+'rest-auth/logout/',{
            token: localStorage.getItem('user')

        }).then( () =>{
            // console.log(localStorage.getItem('user'));
            localStorage.removeItem('user');
            dispatch(logoutSuccess());
        }).catch( error => {
            console.log(error);
            dispatch(logoutFail(error));
            localStorage.removeItem('user');
        });
    };
};


//facebook
export const facebookAuthStart = () => {
    return {
        type: actionTypes.FACEBOOK_AUTH_START
    }
};

export const facebookAuthFail = (error) => {
    return{
        type: actionTypes.FACEBOOK_AUTH_FAIL,
        error: error
    }
};

export const facebookAuthSuccess = (user) => {
    return{
        type: actionTypes.FACEBOOK_AUTH_SUCCESS,
        user: user
    }
};


// export const updateProfileStart = () => {
//     return {
//         type: actionTypes.UPDATE_PROFILE_SUCCESS,
//     }
// };
//
// export const updateProfileFail = error => {
//     return {
//         type: actionTypes.UPDATE_PROFILE_FAIL,
//         error
//     }
// };

export const updateProfileSuccess = user => {
    return {
        type: actionTypes.UPDATE_PROFILE_SUCCESS,
        user
    }
};

//////////////////////////
// ASYNC ACTIONS BELOW //
/////////////////////////

export const updateProfile = (user) => {
    return dispatch => {
        dispatch(updateProfileSuccess(user));
    }
};

export const authLogin = (username, password) => {
    return dispatch => {
        dispatch(authStart());
        axios.post(API_HTTP+'rest-auth/login/',{
            username: username,
            password: password
        }).then( response =>{
            // console.log(response.data);
            const user = {
                token: response.data.token,
                user: response.data.user
            };
            localStorage.setItem('user', JSON.stringify(user));

            dispatch(authSuccess(user));
            dispatch(fetchMyRides('', user.token));
        }).catch( error => {
            dispatch(authFail(error));
        });
    }
};

export const authSignup = (data)  => {

    // username, email, password1, password2,
    //     phone_number, avatar, gender, country,
    //     has_whatsup, has_viber, dob
//     username: username,
//         email: email,
//         password1: password1,
//         password2: password2,
//         phone_number: phone_number,
//         avatar: avatar,
//         gender: gender,
//         country: country,
//         has_whatsup: has_whatsup,
//         has_viber: has_viber,
//         dob: dob,
// }
//     const config= {
//         "headers": {
//             "Content-Type": 'multipart/form-data; boundary=----WebKitFormBoundaryqTqJIxvkWFYqvP5s',
//         }
//     };
        return dispatch => {
            dispatch(authStart());
            axios.post(API_HTTP+'rest-auth/registration/',data).then (
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
            // console.log('123123');
            // dispatch(logout());
        } else {
            // console.log('edwwww');

            // get again my requests!
            axios.get(API_HTTP + 'api/getmyrequests/',
                {
                    headers:
                        {
                            "Authorization": "JWT "+ user.token,
                            "Content-type": "application/json"
                        }
                }).then( response => {
                    user.user.request = response.data;

                    axios.get(API_HTTP + 'api/getallrequests/',
                        {
                            headers:
                                {
                                    "Authorization": "JWT "+ user.token,
                                    "Content-type": "application/json"
                                }
                        }).then( response => {
                        user.user.requestsOfMyRides = response.data;
                            axios.get(API_HTTP + 'notifier/getall/', {
                                headers:
                                    {
                                        "Authorization": "JWT "+ user.token,
                                        "Content-type": "application/json"
                                    }
                            }).then( response => {
                                user.user.notifications = response.data;
                                // console.log(response);

                                dispatch(authSuccess(user));
                                dispatch(fetchMyRides('', user.token));
                            })



                    }).catch( error => {
                        console.log(error);
                        dispatch(authFail(error));
                    });


            }).catch( error => {
                console.log(error);
                dispatch(authFail(error));
            });



        }
    }
};


// FACEBOOK LOGIN/SIGNUP
export const facebookAuth = (fbToken) => {
    return dispatch => {
        dispatch(facebookAuthStart());
        axios
            .post(
                API_HTTP + 'rest-auth/facebook/',
                {access_token: fbToken})
            .then( response =>{
                console.log(response);
                if(response.data.token){
                    const user = {
                        token: response.data.token,
                        user: response.data.user
                    };
                    localStorage.setItem('user', JSON.stringify(user));
                    dispatch(facebookAuthSuccess(user));
                    dispatch(fetchMyRides('', user.token));
                }else{
                    dispatch(facebookAuthFail(response));
                }
            }).catch(error => {
                console.log(error);
                dispatch(facebookAuthFail(error));
            })
    }
};


