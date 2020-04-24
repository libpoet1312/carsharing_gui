import axios from 'axios';
import authHeader from './auth-header';

const API_URL = "http://localhost:8000/api/";
const REST_AUTH = API_URL+'rest-auth/';

class UserService {
    getUserInfo(){
        return axios
            .get(REST_AUTH+'user/')
    }
}

export default new UserService();