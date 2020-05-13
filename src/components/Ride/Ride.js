import React, {Component} from "react";
import {connect} from 'react-redux';

import Aux from '../../hoc/Aux/Aux';
import * as rideActions from "../../store/actions/rideActions";
import {LoadingOutlined} from "@ant-design/icons";
import {Spin, Descriptions, Space} from "antd";

import classes from './Ride.module.css';
import MyMapComponent from "../Map/Map";
import {AwesomeButton} from "react-awesome-button/";
import { EmailShareButton, FacebookShareButton, FacebookMessengerShareButton,
    TwitterShareButton, WhatsappShareButton, ViberShareButton,
    FacebookIcon,
    FacebookMessengerIcon,
    TwitterIcon,
    WhatsappIcon,
    EmailIcon,
    ViberIcon,
} from "react-share";

class Ride extends Component{
    state = {
        duration: 0,
        distance: 0,
        isOwner: false,
        joined: false,
    };

    componentDidMount() {
        console.log(this.props);
        this.props.fetchRide(this.props.match.params.ridePK);
    }

    componentDidUpdate(prevProps, prevState, snapshot) {

    }

    handleDuration = (duration) => {
        this.setState({duration: duration})
    };

    handleDistance = (distance) => {
        this.setState({distance: distance});

        if(this.props.isAuthenticated){
            console.log(this.props.isAuthenticated);
            if(this.props.ride.uploader.username===this.props.user.user.username){
                this.setState({isOwner: true});
            }
        }
    };

    handleJoin = () => {

    };


    render() {
        const antIcon = <LoadingOutlined style={{ fontSize: 50, centered: true }} spin />;




        let output =  <Spin indicator={antIcon} />;
        if(!this.props.loading && this.props.ride){


            let ride = this.props.ride;
            let shareUrl = 'https://localhost:3000'+this.props.match.url;

            output = (
                <div className={classes.Ride}>

                    <p>From <span> {ride.origin} </span> to <span> {ride.destination} </span></p>
                    <div className={[classes.Row]}>
                        <div style={ this.props.isAuthenticated || this.state.isOwner ? {width: "85%"} : {}}>
                            <Descriptions>
                                <Descriptions.Item label="date">{ride.date}</Descriptions.Item>
                                <Descriptions.Item label="time">{ride.time}</Descriptions.Item>
                                <Descriptions.Item label="driver">{ride.uploader.username}</Descriptions.Item>
                                <Descriptions.Item label="vacant seats">{ride.vacant_seats}</Descriptions.Item>
                                <Descriptions.Item label="Estimated Time">{this.state.duration}</Descriptions.Item>
                                <Descriptions.Item label="Driving distance">{this.state.distance}</Descriptions.Item>

                            </Descriptions>
                        </div>
                        {
                            this.state.isOwner ?
                                <div className={classes.ColumnRight}>
                                    <AwesomeButton onPress={this.handleJoin}>EDIT</AwesomeButton>
                                </div>
                                : this.props.isAuthenticated ?
                                <div className={classes.ColumnRight}>
                                    <AwesomeButton onPress={this.handleJoin}>JOIN</AwesomeButton>
                                </div>
                                :null
                        }





                    </div>



                    <div className={[classes.Column, classes.Map]}>
                        <MyMapComponent origin={ride.origin} destination={ride.destination}
                                        handleDuration={(duration) => this.handleDuration(duration)}
                                        handleDistance={(distance) => this.handleDistance(distance)}
                        />
                    </div>




                    <div className={classes.Share}>
                        Share:
                    </div>
                    <div className={classes.ShareButtons}>
                        <Space>

                            <FacebookShareButton url={shareUrl} className={classes.HVRBounceIn}>
                                <FacebookIcon size={32} round={true}/>
                            </FacebookShareButton>

                            <FacebookMessengerShareButton
                                url={shareUrl}
                                appId="521270401588372"
                                className={classes.HVRBounceIn}
                            >
                                <FacebookMessengerIcon size={32} round />
                            </FacebookMessengerShareButton>


                            <TwitterShareButton
                                url={shareUrl}
                                className={classes.HVRBounceIn}
                            >
                                <TwitterIcon size={32} round />
                            </TwitterShareButton>

                            <WhatsappShareButton
                                url={shareUrl}
                                separator=":: "
                                className={classes.HVRBounceIn}
                            >
                                <WhatsappIcon size={32} round />
                            </WhatsappShareButton>

                            <ViberShareButton
                                url={shareUrl}
                                className={classes.HVRBounceIn}
                            >
                                <ViberIcon size={32} round />
                            </ViberShareButton>

                            <EmailShareButton
                                url={shareUrl}
                                body="body"
                                className={classes.HVRBounceIn}
                            >
                                <EmailIcon size={32} round />
                            </EmailShareButton>
                        </Space>
                    </div>
                </div>
            )
        }


        return (
            <Aux>
                {output}
            </Aux>
        )
    }


}

const mapStateToProps = (state) => {
    return {
        ride: state.ride.ride,
        error: state.ride.error,
        loading: state.ride.loading,
        user: state.auth.user,
        isAuthenticated: state.auth.user !== null,
        isOwner: state.auth.user
    }
};

const mapDispatchToProps = dispatch => {
    return {
        fetchRide: (pk) => dispatch(rideActions.fetchSingleRide(pk))
    }
};
export default connect(mapStateToProps, mapDispatchToProps)(Ride);