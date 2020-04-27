import * as actionTypes from '../actions/actionTypes';
import {updateObject} from '../updateObject';


const initialState = {
    token: null,
    error: null,
    loading: false
};

// REDUCERS
const authStart = (state, action) => {
  return updateObject( state, {
      error: null,
      loading: true
  })
};

const authSucces = (state, action) => {
    return updateObject(state, {
        token: action.token,
        loading:false
    })
};

const authFail = (state, action) => {
    return updateObject(state, {
        error: action.error,
        loading:false
    })
};

const authLogout = (state, action) => {
    return updateObject(state, {
        token: null
    })
};


// ONE REDUCER
const reducer = (state= initialState, action) => {
    switch (action.type) {
        case actionTypes.AUTH_START: return authStart(state, action);
        case actionTypes.AUTH_SUCCESS: return authSucces(state, action);
        case actionTypes.AUTH_FAIL: return authFail(state, action);
        case actionTypes.AUTH_LOGOUT: return authLogout(state, action);
        default:
            return state;
    }
};

export default reducer;