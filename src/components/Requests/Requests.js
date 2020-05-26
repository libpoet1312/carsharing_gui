import React, {Component} from 'react'
import {Button, Divider, List, Popconfirm, Tag} from "antd";
import {Link} from 'react-router-dom';
import {connect} from 'react-redux';
import * as requestsActions from '../../store/actions/requestsActions';


class Requests extends Component{

    handleDelete = (item) => {
        // console.log(item);
        const token = JSON.parse(localStorage.getItem('user')).token;
        // console.log(token);

        this.props.unjoin(item.pk, token, item.ride.id);
    };

    handleDecline = (item) => {
        const token = JSON.parse(localStorage.getItem('user')).token;
        console.log(item);
        this.props.declineJoin(item.pk, item.ride.id, token, item.fromuser.pk)
    };

    handleAccept = (item) => {
        const token = JSON.parse(localStorage.getItem('user')).token;
        this.props.acceptJoin(item.pk, item.ride.id, token, item.fromuser.pk)
    };

    render() {

        return (
            <div>
                <List
                    bordered={true}
                    itemLayout="horizontal"
                    header={"Requests that I made"}
                    dataSource={this.props.requests}
                    renderItem={item => (
                        <List.Item
                            actions={[
                                <Tag
                                    color={item.accepted ? "#87d068" : "orange"}
                                >
                                    <strong style={{fontSize: "18px"}}>{item.accepted? "ACCEPTED": "PENDING"} </strong>

                                </Tag>,
                                <Popconfirm title="Sure to delete?" onConfirm={() => this.handleDelete(item)}>
                                    <Button type={"danger"}>Delete</Button>
                                </Popconfirm>
                            ]}

                        >
                            <List.Item.Meta
                                title={
                                    <Link to={"/rides/"+item.ride.id+"/"}>
                                        <strong>From {item.ride.origin} to {item.ride.destination}</strong>
                                    </Link>
                                }
                                description={
                                    <div>on <strong>{item.ride.date}</strong> for <strong>{item.seats}</strong> seat(s)
                                    </div>
                                }

                            />
                        </List.Item>
                    )}
                />
                <Divider/>
                <List
                    bordered={true}
                    itemLayout="horizontal"
                    header={"Requests of My Rides"}
                    dataSource={this.props.requestsOfMyRides}
                    renderItem={item => {
                        console.log(item.accepted);
                        return(
                            <List.Item
                                actions={
                                    item.accepted ?
                                        [<Tag
                                            color={item.accepted ? "#87d068" : "orange"}
                                        >
                                            <strong style={{fontSize: "18px"}}>ACCEPTED</strong>

                                        </Tag>,
                                        <Popconfirm title="Sure to decline?" onConfirm={() => this.handleDecline(item)}>
                                        <Button type={"danger"}>Decline</Button>
                                        </Popconfirm>
                                        ]
                                        :
                                    [
                                    <Tag
                                        color={item.accepted ? "#87d068" : "orange"}
                                    >
                                        <strong style={{fontSize: "18px"}}>PENDING</strong>

                                    </Tag>,
                                    <Popconfirm title="Sure to decline?" onConfirm={() => this.handleDecline(item)}>
                                        <Button type={"danger"}>Decline</Button>
                                    </Popconfirm>,
                                    <Button onClick={()=> this.handleAccept(item)} type={"primary"}>Accept</Button>
                                ]
                                }
                            >
                                <List.Item.Meta
                                    title={
                                        <Link to={"/rides/"+item.ride.id+"/"}>
                                            <strong>From {item.ride.origin} to {item.ride.destination}</strong>
                                        </Link>
                                    }
                                    description={
                                        <div>on <strong>{item.ride.date}</strong> for <strong>{item.seats}</strong> seat(s)
                                            from <Link to={'/user/'+item.fromuser.pk}>{item.fromuser.username}</Link>
                                        </div>
                                    }

                                />
                            </List.Item>
                        )
                    }}
                />


            </div>
        )
    }


}

const mapStateToProps = (state) => {
    return {
        requests: state.auth.requests,
        requestsOfMyRides: state.auth.requestsOfMyRides,
    }
};

const mapDispatchToProps = dispatch => {
    return {
        unjoin: (pk, token, ridePK) => dispatch(requestsActions.unJoin(pk, token, ridePK)),
        declineJoin: (pk, ridePK, token, userID) => dispatch(requestsActions.declineJoin(pk, ridePK, token, userID)),
        acceptJoin: (pk, ridePK, token, userID) => dispatch(requestsActions.acceptJoin(pk, ridePK, token, userID)),
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(Requests);
