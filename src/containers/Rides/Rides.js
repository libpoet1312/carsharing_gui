import React, { Component } from 'react';
import {List, Spin} from 'antd';
import {connect} from 'react-redux';
// import Pagination from 'rc-pagination';
import Pagination from '../../components/Pagination/Pagination'

import Aux from '../../hoc/Aux/Aux';
import RideList from "./RideList/RideList";
import SearchBar from "./Search/Search";
import * as ridesActions from '../../store/actions/ridesActions';

import { LoadingOutlined } from '@ant-design/icons';

let query = new URLSearchParams();

class Rides extends Component {
    state = {
        origin: null,
        destination: null,
        date: null,
        time: null,
        passengers: null,
        pager: {}
    };

    componentDidMount() {
        // console.log('[componentDidMount]', query.toString());
        this.props.fetchRides(query.toString());


    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if(this.state!==prevState){
            // console.log('[componentDidUpdate]',prevState);
            this.props.fetchRides(query.toString());
        }
    }



    setOrigin = (origin) => {
        console.log('origin', origin);
        this.setState({origin: origin});
        if(origin===''){
            query.delete('origin');
        }else{
            query.append('origin', origin);
        }

        console.log(query.toString());
    };

    setDestination = (destination) => {
        console.log('destination',destination);
        this.setState({destination: destination});
        if(destination===''){
            query.delete('destination');
        }else{
            query.append('destination', destination);
        }
        console.log(query.toString());
    };

    setDate = (date) => {
        console.log('date',date);
        this.setState({destination: date});
        if(date===''){
            query.delete('date');
        }else{
            query.append('date', date);
        }
        console.log(query.toString());
    };

    setPassengers = (passengers) => {
        console.log('passengers',passengers);
        this.setState({destination: passengers});
        if(passengers===''){
            query.delete('passengers');
        }else{
            query.append('passengers', passengers);
        }
        console.log(query.toString());
    };


    setPage = (page) => {
        console.log(page);

        if(page===1){
            query.delete('page');
        }else{
            query.append('page', page);
        }
        this.props.fetchRides(query.toString());
    };


    renderItemFunction = (item) => {
        return <RideList item={item}/>
    };


    render() {
        const antIcon = <LoadingOutlined style={{ fontSize: 50, centered: true }} spin />;

        let list = <Spin indicator={antIcon} />;

        if(!this.props.loading && this.props.rides){
            list = <List
                itemLayout="vertical"
                size="large"

                loading={this.props.loading}
                dataSource={this.props.rides}
                footer={
                    <Pagination
                        pager={this.props.pager}
                        setPage={(page)=> this.setPage(page)}
                    />
                }
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
        rides: state.rides.rides,
        error: state.rides.error,
        loading: state.rides.loading,
        pager: state.rides.pager
    }
};

const mapDispatchToProps = dispatch => {
    return {
        fetchRides: (query) => dispatch(ridesActions.fetchRides(query))
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(Rides);