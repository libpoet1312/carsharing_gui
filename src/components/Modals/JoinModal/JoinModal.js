import React from 'react'
import { Button, Input, Divider} from "antd";

import {MinusCircleTwoTone, PlusCircleTwoTone} from "@ant-design/icons";
import classes from './JoinModal.module.css';
import './JoinModal.module.css';

class JoinModal extends React.Component {
    state = {
        noSeats: 1,
        message: null
    };

    inc = () => {
        this.setState({noSeats: this.state.noSeats + 1})
    };

    decr = () => {
        this.setState({noSeats: this.state.noSeats - 1})
    };

    messageHandler = (e) => {
        console.log(e.target.value);
        this.setState({ message: e.target.value})
    };

    render() {
        return (
            <div className={classes.JoinModal}>
                <div className={classes.Title}>Number of Seats</div>
                <div className={classes.Row}>
                    <Button disabled={this.state.noSeats<=1}
                            style={{marginRight: 20, borderStyle: "none"}}
                            ghost={true} size={"large"}
                            onClick={this.decr}

                    >
                        <MinusCircleTwoTone/>
                    </Button>
                    <div>{this.state.noSeats}</div>
                    <Button style={{marginLeft: 20, borderStyle: "none"}}
                            ghost={true} size={"large"}
                            disabled={this.state.noSeats>=this.props.vacant_seats}
                            icon={<PlusCircleTwoTone />}
                            onClick={this.inc}
                    />
                </div>

                <Input.TextArea
                    placeholder={'Send a message with the request'}
                    value={this.state.message}
                    allowClear={true}
                    style={{height: "100px"}}
                    name={this.state.message}
                    onChange={(e) => this.messageHandler(e)}
                />
                <Divider/>
                <Button className={classes.HVRBounceIn}
                        shape={"round"} size={"large"}
                        type={"danger"}
                        onClick={() => this.props.joinHandler(this.state.noSeats, this.state.message)}
                >
                    <h3 style={{fontSize: '20px', color: "white"}}>Send join Request</h3>
                </Button>
            </div>
        )
    }
}

export default JoinModal
