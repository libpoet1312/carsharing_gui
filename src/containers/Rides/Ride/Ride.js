import React from "react";
import axios from 'axios';
import {Card} from "antd";

const API_URL = "http://localhost:8000/api/";

class Ride extends React.Component{
    state = {
        ride: {}
    };

    componentDidMount() {
        const ridePK = this.props.match.params.ridePK;
        console.log(ridePK);
        axios
            .get(API_URL + ridePK + '/')
            .then(response => {
                this.setState({
                    ride: response.data
                });
                console.log(response.data);
            });

    }

    render() {
        return (
            <Card title='skata'>
                <p>{this.state.ride.origin}</p>

            </Card>
        )
    }
}

export default Ride