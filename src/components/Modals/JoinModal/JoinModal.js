import React from 'react'
import {InputNumber, Button, Space} from "antd";

import Aux from '../../../hoc/Aux/Aux';
import {MinusCircleTwoTone, PlusCircleTwoTone} from "@ant-design/icons";
import classes from './JoinModal.module.css';

class JoinModal extends React.Component {
    state = {
        noSeats: 1
    };

    inc = () => {

    };

    decr = () => {

    };

    render() {


        return (
            <div className={classes.JoinModal}>
                <div className={classes.Title}>Number of Seats</div>
                <div className={classes.Row}>
                    <Button style={{marginRight: 20}} ghost={true} size={500}>
                        <MinusCircleTwoTone/>
                    </Button>
                    <div>{this.state.noSeats}</div>
                    <Button style={{marginLeft: 20}} ghost={true} size={'200'} icon={<PlusCircleTwoTone />}/>
                </div>

                <br/>
                <Button size={"large"} type={"danger"}>Join Ride</Button>
            </div>
        )
    }
}

export default JoinModal
