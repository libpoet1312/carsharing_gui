import React from "react";
import Rides from '../OLD/Rides';
import axios from 'axios';

const API_URL = "http://localhost:8000/api/";

const listData = [];
for (let i = 0; i < 23; i++) {
    listData.push({
        href: 'http://ant.design',
        title: `ant design part ${i}`,
        avatar: 'https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png',
        description:
            'Ant Design, a design language for background applications, is refined by Ant UED Team.',
        content:
            'We supply a series of design principles, practical patterns and high quality design resources (Sketch and Axure), to help people create their product prototypes beautifully and efficiently.',
    });
}


class RideListView extends React.Component{

    state = {
      rides: []
    };

    componentDidMount() {
        axios
            .get(API_URL)
            .then(response => {
                this.setState({
                    rides: response.data.results
                });
                console.log(response.data);
            });

    }

    render() {
        return <Rides data={this.state.rides}/>
    }
}

export default RideListView