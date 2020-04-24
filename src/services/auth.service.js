import axios from "axios";

const API_URL = "http://localhost:8000/api/";
const REST_AUTH = API_URL+'rest-auth/';

class AuthService {
    login(username, password) {
        return axios
            .post(REST_AUTH+'login/',{
                username,
                password
            }).then( response => {
                if(response.data.token){
                    localStorage.setItem("user", JSON.stringify(response.data));
                }
                return response;
            });
    }

    logout(){
        return axios
            .post(REST_AUTH+'logout/', {
                token: localStorage.getItem('user.token')
            }).then( response =>{
                if(response.status===200){
                    localStorage.removeItem("user");
                }
            });
    }

    getCurrentUser() {
        return JSON.parse(localStorage.getItem('user'));;
    }
}

export default new AuthService();