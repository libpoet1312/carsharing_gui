import React, { Component } from 'react';
import {List} from 'antd';

import Aux from '../../hoc/Aux/Aux';
import RideList from "./RideList/RideList";
import axios from "axios";
import SearchBar from "./Search/Search";

class Rides extends Component {

    state = {
        rides: []
    };

    componentDidMount() {
        axios
            .get('http://localhost:8000/api/')
            .then(response => {
                this.setState({
                    rides: response.data.results
                });
                console.log(response.data);
            });
    }


    renderItemFunction = (item) => {
        return <RideList item={item}/>
    };

    render() {
        return (
            <Aux>
                <SearchBar/>
                <List
                    itemLayout="vertical"
                    size="large"
                    pagination={{
                        onChange: page => {
                            console.log(page);
                        },
                        pageSize: 2,
                    }}
                    dataSource={this.state.rides}
                    footer={
                        <div>
                            <b>ant design</b> footer part
                        </div>
                    }
                    renderItem={this.renderItemFunction}
                >

                </List>

            </Aux>
        )
    }
}

export default Rides;