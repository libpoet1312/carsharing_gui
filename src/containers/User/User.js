import React, {Component} from 'react';
import {connect} from 'react-redux';
import axios from 'axios';

import {LoadingOutlined} from '@ant-design/icons';

import UserInfo from "./UserInfo/UserInfo";
import {API_HTTP} from "../../config";


class User extends Component {

    state = {
        user: null,
        loading: true,
        isOwner: false,
    };

    fetchUserHandler = () => {
        let config = {
            headers: {
                "Content-Type": "application/json",
                "Authorization": 'JWT ' + this.props.user.token,
            }
        };
        console.log(this.props.match.params.id);
        axios.get(API_HTTP + 'user/'+this.props.match.params.id+'/', config)
            .then(res => {
                console.log('server', res.data);
                this.setState({
                    user: res.data,
                    loading: false
                });

                if(this.props.user.username===this.state.user.username){
                    this.setState({
                        isOwner: true
                    });
                }
            }).catch( err => {
            console.log(err);
        });
    };

    // it gets called if page refreshed on url:/myprofile/
    componentDidUpdate(prevProps, prevState, snapshot) {
        console.log('[componentDidUpdate]', prevProps, this.props.user);
        if(prevProps.match.url!==this.props.match.url){
            console.log('[componentDidUpdate] INSIDE');
            this.fetchUserHandler();
        }else if(prevProps.user!==this.props.user){
            console.log('[componentDidUpdate] 222INSIDE');
            this.fetchUserHandler();
        }
    }

    componentDidMount() {
        console.log('[componentDidMount]');
        // fetch the requested user only if current user is authenticated!
        if(this.props.user){
            this.fetchUserHandler();
        }
    }


    render() {

        let loadedUser = <LoadingOutlined style={{ fontSize: 24 }} spin />;
        if(!this.state.loading){
            loadedUser=<UserInfo user={this.state.user} isOwner={this.state.isOwner}/>
        }

        return loadedUser
    }
}

const mapStateToProps = state => {
    return {
        user: state.auth.user,
        loading: state.auth.loading
    }
};

export default connect(mapStateToProps)(User);
