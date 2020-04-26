import React, { Component } from "react";

class ErrorPage extends Component {
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
                <h1>404</h1>
            </div>
        );
    }
}

export default ErrorPage
