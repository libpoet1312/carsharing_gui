import * as actionTypes from './actionTypes';
import axios from "axios";

export const getMyRequests = (requests) => {
    return {
        type: actionTypes.GET_MY_REQUESTS,
        requests: requests
    }
};

export const getRideRequests = (requests) => {
    return {
        type: actionTypes.GET_RIDE_REQUESTS,
        requests: requests
    }
};

export const joinRequest = (pk, token, seats, message) => {
    return dispatch => {
        axios.headers = {
            "Content-Type": "Application/Json",
            "Authorization": "JWT "+token
        };
        axios.post('http://192.168.1.45:8000/api/'+pk+'/join/', {
            seats: seats,
            message: message
        }).then( response => {
            console.log(response);
        }).catch( error => {
            console.log(error)
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