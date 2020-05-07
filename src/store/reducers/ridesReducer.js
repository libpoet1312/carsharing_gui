import * as actionTypes from '../actions/actionTypes';
import {updateObject} from '../updateObject';

const initialState = {
    rides: null,
    error: null,
    loading: false
};

// REDUCERS

const fetchRidesStart = (state) => {
    return updateObject( state, {
        error: null,
        loading: true
    })
};

const fetchRidesFail = (state, action) => {
    return updateObject( state, {
        error: action.error,
        loading: false
    })
};

const fetchRidesSuccess = (state, action) => {
    return {
        ...state,
        error: null,
        loading: false,
        rides: action.rides

    }
};


// the reducer:

const ridesReducer = (state= initialState, action) => {
    switch (action.type) {
        case actionTypes.FETCH_RIDES_START: return fetchRidesStart(state);
        case actionTypes.FETCH_RIDES_FAIL: return fetchRidesFail(state, action);
        case actionTypes.FETCH_RIDES_SUCCESS: return fetchRidesSuccess(state, action);
        default:
            return state;
    }
};

export default ridesReducer;
