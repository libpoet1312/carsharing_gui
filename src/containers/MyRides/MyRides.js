import React, { Component } from 'react';
import {List, Spin} from 'antd';
import {connect} from 'react-redux';
import Pagination from '../../components/Pagination/Pagination'

import Aux from '../../hoc/Aux/Aux';
import RideList from "../Rides/RideList/RideList";
import SearchBar from "../Rides/Search/Search";
import * as myRidesActions from '../../store/actions/myRidesActions';

import { LoadingOutlined } from '@ant-design/icons';

let query = new URLSearchParams();

class MyRides extends Component {

    state = {
        origin: null,
        destination: null,
        date: null,
        time: null,
        passengers: null,
        pager: {},
    };

    componentDidMount() {
        // console.log('[componentDidMount]', query.toString());
        if(this.props.token){
            this.props.fetchRides(query.toString(), this.props.token);
        }

    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if(this.state!==prevState || this.props.isAuthenticated!==prevProps.isAuthenticated){
            // console.log('[componentDidUpdate]',prevState);
            this.props.fetchRides(query.toString(), this.props.token);
        }
    }



    setOrigin = (origin) => {
        // console.log('origin', origin);
        this.setState({origin: origin});
        if(origin===''){
            query.delete('origin');
        }else{
            query.append('origin', origin);
        }

        // console.log(query.toString());
    };

    setDestination = (destination) => {
        // console.log('destination',destination);
        this.setState({destination: destination});
        if(destination===''){
            query.delete('destination');
        }else{
            query.append('destination', destination);
        }
        // console.log(query.toString());
    };

    setDate = (date) => {
        // console.log('date',date);
        this.setState({destination: date});
        if(date===''){
            query.delete('date');
        }else{
            query.append('date', date);
        }
        // console.log(query.toString());
    };

    setPassengers = (passengers) => {
        // console.log('passengers',passengers);
        this.setState({destination: passengers});
        if(passengers===''){
            query.delete('passengers');
        }else{
            query.append('passengers', passengers);
        }
        // console.log(query.toString());
    };


    setPage = (page) => {
        // console.log(page);

        if(page===1){
            query.delete('page');
        }else{
            query.append('page', page);
        }
        this.props.fetchRides(query.toString());
    };


    renderItemFunction = (item) => {
        return <RideList item={item} isAuthenticated={this.props.isAuthenticated} my={true} deleteHandler={(pk)=>this.deleteHandler(pk)}/>
    };

    deleteHandler = (pk)=> {
        // console.log(pk);
        this.props.deleteRide(pk, this.props.token);
    };


    render() {
        const antIcon = <LoadingOutlined style={{ fontSize: 50, textAlign: "center" }} spin />;


        let list = <Spin indicator={antIcon} />;

        let pagination = null;
        if(this.props.rides && this.props.rides.length){
            pagination =  <Pagination
                pager={this.props.pager}
                setPage={(page)=> this.setPage(page)}
            />
        }

        if(!this.props.loading && this.props.rides){
            list = <List
                itemLayout="vertical"
                size="large"

                loading={this.props.loading}
                dataSource={this.props.rides}
                footer={pagination}
                renderItem={this.renderItemFunction}

            />

        }

        return (
            <Aux>
                <SearchBar
                    setOrigin={(origin)=> this.setOrigin(origin)}
                    setDestination={(destination)=> this.setDestination(destination)}
                    setDate = {(date) => this.setDate(date)}
                    setPassengers = {(passengers) => {this.setPassengers(passengers)}}
                />
                {list}
            </Aux>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        isAuthenticated: state.auth.user!==null,
        rides: state.myrides.rides,
        error: state.myrides.error,
        loading: state.myrides.loading,
        pager: state.myrides.pager,
        token: state.auth.user ? state.auth.user.token : null
    }
};

const mapDispatchToProps = dispatch => {
    return {
        fetchRides: (query, token) => dispatch(myRidesActions.fetchMyRides(query, token)),
        deleteRide: (pk, token) => dispatch(myRidesActions.deleteMyRide(pk,token)),
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(MyRides);
