import React, {Component} from "react";
import {connect} from 'react-redux';

import Aux from '../../hoc/Aux/Aux';
import * as rideActions from "../../store/actions/rideActions";
import * as requestsActions from "../../store/actions/requestsActions";
import {LoadingOutlined} from "@ant-design/icons";
import {Spin, Descriptions, Space, Modal, Button} from "antd";

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
import JoinModal from "../Modals/JoinModal/JoinModal";
import {Link} from "react-router-dom";
import {SITE_URL} from "../../config";

class Ride extends Component{


    state = {
        duration: 0,
        distance: 0,
        isOwner: false,
        hasJoined: false,
        joinModal: false,
        isAccepted: false
    };

    componentDidMount() {
        // console.log('[componentDidMount]');
        this.props.fetchRide(this.props.match.params.ridePK);
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        // console.log('[componentDidUpdate]');

        // console.log(this.props.isAuthenticated);
        if((prevProps.loading && !this.props.loading) || this.props.requests!==prevProps.requests){
            // console.log('edw');
            // console.log(this.props.isAuthenticated);
            if(this.props.isAuthenticated){
                if(this.props.ride.uploader.username===this.props.user.username){
                    this.setState({isOwner: true});
                }
                // console.log(this.props.requests);


                // handle if user has already applied!
                const obj = this.props.requests.find( req => {
                    // console.log(req, this.props.ride.pk);
                    return req.ride.id === this.props.ride.pk
                });
                console.log(obj);
                if(obj){
                    if(obj.accepted){
                        this.setState({isAccepted: true})
                    }else{
                        this.setState(
                            {hasJoined: true}
                        )
                    }
                }else{
                    this.setState({hasJoined: false, isAccepted: false})
                }
            }
        }
    }

    handleDuration = (duration) => {
        this.setState({duration: duration})
    };

    handleDistance = (distance) => {
        this.setState({distance: distance});
    };

    handleJoinBtn = () => {
        this.setState({joinModal: !this.state.joinModal})
    };

    joinHandler = (seats, msg) => {
        this.handleJoinBtn();
        const user = JSON.parse(localStorage.getItem('user'));

        // console.log(this.props.ride.pk, user.token ,seats, msg);

        //send join request to server!


        this.props.joinRequest(this.props.ride.pk, user.token ,seats, msg);
        this.setState(
            {hasJoined: true}
        );
    };

    unJoinHandler = (ride) => {
        console.log('unJoinHandler');
        const token = JSON.parse(localStorage.getItem('user')).token;
        const req = this.props.requests.find( el => {
            // console.log(el);
            return el.ride.id===ride.pk;
        });
        // console.log(req.pk);
        this.props.unJoin(req.pk, token, ride.pk);
        this.setState(
            {hasJoined: false, isAccepted: false}
        );

    };


    render() {
        const antIcon = <LoadingOutlined style={{ fontSize: 50, centered: true, alignSelf: 'center' }} spin />;


        let output =  <Spin indicator={antIcon} />;
        if(!this.props.loading && this.props.ride){


            let ride = this.props.ride;
            let shareUrl = SITE_URL;


            let button = (
                <div className={classes.ColumnRight}>
                    <AwesomeButton onPress={this.handleJoinBtn}>JOIN</AwesomeButton>
                </div>);
            if(this.state.isOwner) {
                button = (
                    <div className={classes.ColumnRight}>
                        <Link to={`/rides/${this.props.ride.pk}/edit`}>
                            <Button as={Link} to={`/rides/${this.props.ride.pk}/edit`}
                                    type="primary" style={{backgroundColor: 'orange', width: 100}} size="large" shape={"round"}
                            >
                                Edit
                            </Button>
                        </Link>
                    </div>
                )
            }
            if(this.state.hasJoined) {

                console.log('joined');
                button = (
                    <div className={classes.ColumnRight}>
                        <Button size={"large"} shape={"round"} type={"ghost"}
                                style={{height: "100%", backgroundColor: "orange", whiteSpace: "normal"}}
                                onClick={() => this.unJoinHandler(this.props.ride)}
                        >
                            <strong>Cancel Request</strong>
                        </Button>
                    </div>
                )
            }
            if(this.state.isAccepted){
                console.log('accepted');
                button = (
                    <div className={classes.ColumnRight}>
                        <Button size={"large"} shape={"round"} type={"danger"}
                                onClick={() => this.unJoinHandler(this.props.ride)}
                        >
                            UNJOIN
                        </Button>
                    </div>
                )
            }

            output = (
                <div className={classes.Ride}>
                    <Modal visible={this.state.joinModal}
                           onCancel={this.handleJoinBtn}
                           title={<h3>Join</h3>}
                           width={400}
                           footer={''}
                    >
                        <JoinModal vacant_seats={ride.vacant_seats} joinHandler={(seats, msg) => this.joinHandler(seats, msg)}/>
                    </Modal>
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

                        { this.props.isAuthenticated || this.state.isOwner ?
                            button : null
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
        isOwner: state.auth.user,
        requests: state.auth.requests
    }
};

const mapDispatchToProps = dispatch => {
    return {
        fetchRide: (pk) => dispatch(rideActions.fetchSingleRide(pk)),
        joinRequest: (pk, token, seats, message) => dispatch(requestsActions.joinRequest(pk, token, seats, message)),
        unJoin: (pk, token, ridePK) => dispatch(requestsActions.unJoin(pk, token, ridePK)),

    }
};
export default connect(mapStateToProps, mapDispatchToProps)(Ride);
