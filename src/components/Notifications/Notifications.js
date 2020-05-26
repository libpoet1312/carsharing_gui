import React from "react";

import {Avatar, List, Popconfirm, Tooltip} from "antd";
import {Link} from "react-router-dom";


const Notifications = (props) => {
    return (
        <List
            bordered={true}
            itemLayout="horizontal"

            dataSource={props.notifications}
            style={{backgroundColor: "white"}}
            renderItem={item => {

                return(
                    <List.Item
                    >
                        <List.Item.Meta
                            avatar={
                                <Tooltip title={item.actor.username}><Link to={'/user/'+item.actor.pk}><Avatar src={item.actor.avatar}/></Link></Tooltip>
                            }
                            title={
                                <span>
                                    <span> {item.verb} </span>
                                    <Link to={'rides/'+item.target.pk}>{item.target.origin} to {item.target.destination}</Link>
                                </span>
                            }
                        />
                    </List.Item>
                )
            }}
            >

        </List>
    )
};


export default Notifications;