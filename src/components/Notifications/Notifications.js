import React, {Component} from "react";
import {Avatar, List, Tag, Button, Tooltip} from "antd";
import {connect} from 'react-redux';
import {CheckCircleTwoTone, CloseCircleFilled, InfoCircleTwoTone, EyeOutlined} from "@ant-design/icons";
import moment from "moment";
import {Link} from "react-router-dom";
import * as notifActions from "../../store/actions/notificationsActions";

function getNoticeData(notices) {
    if (notices.length === 0) {
        return {};
    }
    const newNotices = notices.map(notice => {
        const newNotice = { ...notice };
        // transform id to item key
        newNotice.type = 'notification';

        console.log(notice.target);
        if(notice.verb==='accepted'){
            newNotice.avatar = <CheckCircleTwoTone style={{fontSize: "32.4px", textAlign: "center"}} twoToneColor="#52c41a" />;
            newNotice.description =
                notice.target ?
                        <div>
                            <span>You have been accepted to </span>
                            <Link to={'/rides/'+notice.target.pk}>{notice.target.origin} to {notice.target.destination}</Link>
                        </div>:
                        <div>
                            <span>You have been accepted to </span>
                            <Link to={'/rides/'}><span style={{fontStyle: 'italic'}}>"Ride has been deleted"</span></Link>
                        </div>


        }else if(notice.verb==='request'){
            newNotice.avatar = <InfoCircleTwoTone style={{fontSize: "32.4px", textAlign: "center"}}/>;
            newNotice.description =
                <div>
                    <Link to={'/user/'+notice.actor.pk}>{notice.actor.username}</Link>
                    <span> requested to join in </span>
                    {notice.target ?
                        <Link to={'/rides/'+notice.target.pk}>{notice.target.origin} to {notice.target.destination}</Link>
                        : <Link to={'/rides/'}><span style={{fontStyle: 'italic'}}>"Ride has been deleted"</span></Link>
                    }

                </div>
        }else if(notice.verb==='declineRequest'){
            newNotice.avatar = <CloseCircleFilled style={{fontSize: "32.4px", textAlign: "center", color: "red"}} />;
            newNotice.description =
                <div>
                    <span>You have been denied to join </span>
                    {notice.target ?
                        <Link to={'/rides/'+notice.target.pk}>{notice.target.origin} to {notice.target.destination}</Link>
                        : <Link to={'/rides/'}><span style={{fontStyle: 'italic'}}>"Ride has been deleted"</span></Link>
                    }
                </div>
        }else if(notice.verb==='cancelRequest'){
            newNotice.avatar = <CloseCircleFilled style={{fontSize: "32.4px", textAlign: "center", color: "red"}} />;
            newNotice.description =
                <div>
                    <Link to={'/user/'+notice.actor.pk}>{notice.actor.username}</Link>
                    <span> canceled his/her request in </span>
                    {notice.target ?
                        <Link to={'/rides/'+notice.target.pk}>{notice.target.origin} to {notice.target.destination}</Link>
                        : <Link to={'/rides/'}><span style={{fontStyle: 'italic'}}>"Ride has been deleted"</span></Link>
                    }

                </div>
        }else{
            newNotice.avatar = <CloseCircleFilled style={{fontSize: "32.4px", textAlign: "center", color: "red"}}/>;
            newNotice.description =
                <div>
                    <Link to={'/user/'+notice.actor.pk}>{notice.actor.username}</Link>
                    <span> requested to join in </span>
                    {notice.target ?
                        <Link to={'/rides/'+notice.target.pk}>{notice.target.origin} to {notice.target.destination}</Link>
                        : <Link to={'/rides/'}><span style={{fontStyle: 'italic'}}>"Ride has been deleted"</span></Link>
                    }

                </div>
        }


        newNotice.datetime = moment(notice.timestamp).fromNow();
        newNotice.sort = moment(notice.timestamp);

        if (newNotice.id) {
            newNotice.key = newNotice.id;
        }
        if(newNotice.unread){
            newNotice.extra = (
                <Tag color={'red'} style={{ marginRight: 0 }}>
                    Unread
                </Tag>
            );
        }

        return newNotice;
    });

    newNotices.sort( (a,b) => {
        return a.sort.diff(b.sort)<=0
    });



    return newNotices.reduce((pre, data) => {

        if (!pre[data.type]) {
            pre[data.type] = [];
        }
        pre[data.type].push(data);
        return pre;
    }, {});

}

class Notifications extends Component{

    setAllReadHandler = () => {
        const token = JSON.parse(localStorage.getItem('user')).token;
        this.props.setAllAsRead(token)
    };

    setReadHandler = (id) => {
        const token = JSON.parse(localStorage.getItem('user')).token;
        this.props.setRead(id, token);
    };

    render() {
        const noticeData = getNoticeData(this.props.notifications);
        return (
            <div>
                <List
                    itemLayout="horizontal"
                    bordered={true}
                    header={
                        <div style={{display: "flex", justifyContent: "space-between"}}>
                            <span>Notifications </span>
                            <div>
                                <Tooltip placement="topRight" title={'Set all Notifications as Read'}>
                                    <Button onClick={this.setAllReadHandler} icon={<EyeOutlined />} />
                                </Tooltip>
                            </div>
                        </div>
                    }
                    dataSource={noticeData.notification}
                    renderItem={item => {
                        return (
                            <List.Item
                                actions={item.extra ? [<div>{item.extra}</div>, <Button onClick={() => this.setReadHandler(item.id)}>Set Read</Button>] : ""}
                            >
                                <List.Item.Meta
                                    avatar={<Avatar icon={item.avatar}/>}
                                    title={item.description}
                                    description={item.datetime}
                                />
                            </List.Item>
                        )}}
                />
            </div>
        )
    }


}

const mapStateToProps = state => {
    return {
        notifications: state.auth.notifications
    }
};

const mapDispatchToProps = dispatch => {
    return {
        setAllAsRead: (token) => dispatch(notifActions.setAllNotificationsRead(token)),
        setRead: (id, token) => dispatch(notifActions.setNotificationRead(id, token))
    }
};


export default connect(mapStateToProps, mapDispatchToProps)(Notifications);
