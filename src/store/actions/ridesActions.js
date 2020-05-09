import * as actionTypes from './actionTypes';
import axios from 'axios';


// rides actions
export const fetchRidesStart =() => {
    return {
        type: actionTypes.FETCH_RIDES_START
    }
};

export const fetchRidesFail =(error) => {
    return {
        type: actionTypes.FETCH_RIDES_FAIL,
        error: error
    }
};

export const fetchRidesSuccess =(rides) => {
    return {
        type: actionTypes.FETCH_RIDES_SUCCESS,
        rides: rides
    }
};




// async

export const fetchRides = (query) => {
    return dispatch => {
        dispatch(fetchRidesStart());
        if(query!==''){
            console.log('edw');
            query = '?'+query;
        }
        axios.get('http://localhost:8000/api/'+ query)
            .then( (response) => {
                // console.log(response.data);
                dispatch(fetchRidesSuccess(response.data));
            }).catch( error => {
                console.log(error);
                dispatch(fetchRidesFail(error));
        })
    }
};