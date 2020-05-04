import * as actionTypes from './actionTypes';
import axios from 'axios';

export const addCarStart =() => {
    return {
        type: actionTypes.CAR_ADD_START
    }
};

export const addCarFail =() => {
    return {
        type: actionTypes.CAR_ADD_FAIL
    }
};

export const addCarSuccess =() => {
    return {
        type: actionTypes.CAR_ADD_SUCCESS
    }
};

// async functions:

export const addCar = (car) => {
    return dispatch => {
        dispatch(addCarStart());

    }
};