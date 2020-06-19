import React, { Component } from 'react'
import axios from "axios";
import {API_HTTP} from "../../config";
import {LoadingOutlined} from "@ant-design/icons";
import UserInfo from "../User/UserInfo/UserInfo";
import {connect} from "react-redux";

class MyAccount extends Component {
    state = {
        user: null,
        loading: true,
    };

    fetchUserHandler = () => {
        console.log(this.props.user.token);

        let config = {
            headers: {
                "Content-Type": "application/json",
                "Authorization": 'JWT ' + this.props.user.token,
            }
        };

        axios.get(API_HTTP + 'rest-auth/user/', config)
            .then(res => {
                console.log('rest auth', res.data);
                this.setState({
                    user: res.data,
                    loading: false
                });

            }).catch( err => {
            console.log(err);

        });
    };

    componentDidMount() {
        console.log('[componentDidMount]');
        // fetch the requested user only if current user is authenticated!
        if(this.props.user){
            this.fetchUserHandler();
        }
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        // console.log('[componentDidUpdate]', prevProps, this.props.user);
        if(prevProps.match.url!==this.props.match.url){
            console.log('[componentDidUpdate] INSIDE');
            this.fetchUserHandler();
        }else if(prevProps.user!==this.props.user){
            console.log('[componentDidUpdate] 222INSIDE');
            this.fetchUserHandler();
        }
    }

    render() {

        let loadedUser = <LoadingOutlined style={{ fontSize: 24 }} spin />;
        if(!this.state.loading){
            loadedUser=<UserInfo user={this.state.user} isOwner={true}/>
        }

        return <div>{loadedUser}</div>
    }



}

const mapStateToProps = state => {
    return {
        user: state.auth.user,
        loading: state.auth.loading
    }
};

export default connect(mapStateToProps)(MyAccount);