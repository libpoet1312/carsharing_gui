import React, {Component} from "react";
import {connect} from 'react-redux';

import Aux from '../../hoc/Aux/Aux';
import * as rideActions from "../../store/actions/rideActions";
import {LoadingOutlined} from "@ant-design/icons";
import {Spin, Descriptions} from "antd";

import classes from './Ride.module.css';
import MyMapComponent from "../Map/Map";

class Ride extends Component{

    componentDidMount() {
        // console.log(this.props.match.params.ridePK);
        this.props.fetchRide(this.props.match.params.ridePK);
    }


    render() {
        const antIcon = <LoadingOutlined style={{ fontSize: 50, centered: true }} spin />;



        let output =  <Spin indicator={antIcon} />;
        if(!this.props.loading && this.props.ride){



            let ride = this.props.ride;
            output = (
                <div className={classes.Ride}>
                    <p>From <span>{ride.origin}</span> to <span>{ride.destination}</span></p>
                    <div className={[classes.Row]}>


                        <Descriptions>
                            <Descriptions.Item label="UserName">Zhou Maomao</Descriptions.Item>
                            <Descriptions.Item label="Telephone">1810000000</Descriptions.Item>
                            <Descriptions.Item label="Live">Hangzhou, Zhejiang</Descriptions.Item>
                            <Descriptions.Item label="Remark">empty</Descriptions.Item>
                            <Descriptions.Item label="Address">
                                No. 18, Wantang Road, Xihu District, Hangzhou, Zhejiang, China
                            </Descriptions.Item>
                        </Descriptions>
                    </div>

                    <div className={[classes.Column, classes.Map]}>
                        <MyMapComponent origin={ride.origin} destination={ride.destination}/>
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
    }
};

const mapDispatchToProps = dispatch => {
    return {
        fetchRide: (pk) => dispatch(rideActions.fetchSingleRide(pk))
    }
};
export default connect(mapStateToProps, mapDispatchToProps)(Ride);