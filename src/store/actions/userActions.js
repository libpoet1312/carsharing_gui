import * as actionTypes from './actionTypes';
import axios from 'axios';

const AUTH_URL = 'http://localhost:8000/';

export const getUserStart = () => {
    return {
        type: actionTypes.GET_USER_START
    }
};

export const getUserFail = (error) => {
    return {
        type: actionTypes.GET_USER_FAIL,
        error
    }
};

export const getUserSuccess = (user) => {
    return{
        type: actionTypes.GET_USER_SUCCESS,
        user
    }
};


// async get User
export const getUser = token => {
      return dispatch => {
          dispatch(getUserStart());
          axios.headers = {
              "Content-Type": "Application/Json",
              "Authorization": "JWT "+token
          };
          axios.get('http://192.168.1.45:8000/user').then(res => {
              console.log(res.data);
              dispatch(getUserSuccess(res.data));
          }).catch(error => {
              console.log(error);
              dispatch(getUserFail());
          });
      }
};
