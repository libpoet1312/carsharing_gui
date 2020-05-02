import React, { Component } from "react";

class Home extends Component {
    constructor(props) {
        super(props);

        this.state = {
            content: ""
        };
    }

    componentDidMount() {

    }

    render() {
        return (
            <div>
                <h1>HOME</h1>
            </div>
        );
    }
}

export default Home
