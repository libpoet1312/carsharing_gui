import * as actionTypes from './actionTypes';
import axios from "axios";

// export const getMyRequests = (user) => {
//     return {
//         type: actionTypes.GET_MY_REQUESTS,
//         user: user
//     }
// };
//
// export const getRideRequests = (requests) => {
//     return {
//         type: actionTypes.GET_RIDE_REQUESTS,
//         requests: requests
//     }
// };

export const joinRequestStart = () => {
    return {
        type: actionTypes.JOIN_REQUEST_START
    }
};

export const joinRequestFail = () => {
    return {
        type: actionTypes.JOIN_REQUEST_FAIL
    }
};

export const joinRequestSuccess = (requests) => {
    return {
        type: actionTypes.JOIN_REQUEST_SUCCESS,
        requests: requests
    }
};

export const joinRequest = (pk, token, seats, message) => {
    return dispatch => {
        const send = {
            seats: seats,
            message: message
        };
        dispatch(joinRequestStart());
        axios.post('http://192.168.1.45:8000/api/'+pk+'/join/', send,
            {
                headers:
                    {
                        "Authorization": "JWT "+ token,
                        "Content-type": "application/json"
                    }
            }).then( response => {
            // console.log(response);

            dispatch(joinRequestSuccess(response.data));
        }).catch( error => {
            console.log(error);
            dispatch(joinRequestFail(error));
        });
    }
};

export const acceptRequest = () => {
    return {
        type: actionTypes.ACCEPT_REQUEST
    }
};

export const declineRequest = () => {
    return {
        type: actionTypes.DECLINE_REQUEST
    }
};

export const unJoin = () => {
    return {
        type: actionTypes.UNJOIN
    }
};