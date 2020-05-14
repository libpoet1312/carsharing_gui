import * as actionTypes from '../actions/actionTypes';
import {updateObject} from '../updateObject';

const initialState = {
    user: null,
    error: null,
    loading: false,
};

// REDUCERS
const authStart = (state) => {
  return updateObject( state, {
      error: null,
      loading: true
  })
};

const authSuccess = (state, action) => {
    console.log(action.user);


    return updateObject(state, {
        user: action.user,
        loading:false
    })
};

const authFail = (state, action) => {
    return updateObject(state, {
        error: action.error,
        loading:false
    })
};

const logoutSuccess = (state) => {
    return updateObject(state, {
        user: null
    })
};

const facebookAuthStart = (state, action) => {
    return updateObject( state, {
        error: null,
        loading: true
    })
};

const facebookAuthSuccess = (state, action) => {
    console.log(action.user);
    return updateObject(state, {
        user: action.user,
        loading:false
    })
};

const facebookAuthFail = (state, action) => {
    return updateObject(state, {
        error: action.error,
        loading:false
    })
};



// ONE REDUCER
const authReducer = (state= initialState, action) => {
    switch (action.type) {
        case actionTypes.AUTH_START: return authStart(state, action);
        case actionTypes.AUTH_SUCCESS: return authSuccess(state, action);
        case actionTypes.AUTH_FAIL: return authFail(state, action);
        case actionTypes.LOGOUT_SUCCESS: return logoutSuccess(state, action);
        case actionTypes.FACEBOOK_AUTH_START: return facebookAuthStart(state, action);
        case actionTypes.FACEBOOK_AUTH_SUCCESS: return facebookAuthSuccess(state, action);
        case actionTypes.FACEBOOK_AUTH_FAIL: return facebookAuthFail(state, action);
        default:
            return state;
    }
};

export default authReducer;