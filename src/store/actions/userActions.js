import * as actionTypes from './actionTypes';
import axios from 'axios';
import {API_HTTP} from "../../config";


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
          axios.get(API_HTTP + 'user').then(res => {
              console.log(res.data);
              dispatch(getUserSuccess(res.data));
          }).catch(error => {
              console.log(error);
              dispatch(getUserFail());
          });
      }
};
