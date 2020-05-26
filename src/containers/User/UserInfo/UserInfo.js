import React from 'react'
import {Descriptions, Avatar, Card, Tooltip, Popover} from 'antd';

// import getUnicodeFlagIcon from 'country-flag-icons/unicode'
import {GiEarthAfricaEurope} from 'react-icons/gi';
import { EllipsisOutlined, SettingOutlined, ShareAltOutlined } from '@ant-design/icons';

import classes from './userInfo.module.css';
import {Link} from "react-router-dom";


const UserInfo = (props) => {

    let country = <GiEarthAfricaEurope/>;
    // if(!props.user.country){
    //     country=getUnicodeFlagIcon(props.user.country);
    // }
    let gender = null;
    switch (props.user.gender) {
        case 'M': gender=<div>Male</div>;break;
        case 'F': gender=<div>Female</div>;break;
        case 'O': gender=<div>Other</div>;break;
        default: gender = <div>Unknown</div>;
    }

    let date = new Date(Date.parse(props.user.date_joined)).toDateString();

    let popoverContent = <div><ShareAltOutlined /></div>;

    return (
        <div className={classes.Info}>
            <Card className={classes.Card}

                  actions={[
                      props.isOwner ?
                          <Tooltip title="Account Settings">
                              <Link to={'/mysettings'}>
                                  <SettingOutlined key="Account Settings" />
                              </Link>
                          </Tooltip>
                          : "",
                      <Popover placement={"right"} content={popoverContent}>
                          <EllipsisOutlined key="ellipsis" />
                      </Popover>
                     ]}

            >
                <Avatar src={props.user.avatar} size={100}/>
                <br/>
                <div className={classes.DescriptionText} style={{marginTop: "30px"}}>{props.user.username}</div>

                <Descriptions  column={{ xxl: 2, xl: 2, lg: 2, md: 2, sm: 1, xs: 1 }} className={classes.Description}>

                    <Descriptions.Item label={<strong>Full name</strong>}>
                        <span>{props.user.username}</span>
                    </Descriptions.Item>

                    <Descriptions.Item label={<strong>Phone</strong>}>
                        <span>{props.user.phone_number}</span>
                    </Descriptions.Item>

                    <Descriptions.Item label={<strong >Date of Birth</strong>}>
                        <span>{props.user.dob}</span>
                    </Descriptions.Item>

                    <Descriptions.Item label={<strong>Country</strong>}>
                        <span>{country}</span>
                    </Descriptions.Item>

                    <Descriptions.Item label={<strong>Gender</strong>}>
                        <span>{gender}</span>
                    </Descriptions.Item>

                    <Descriptions.Item label={<strong>Member since</strong>}>
                        <span>{date}</span>
                    </Descriptions.Item>
                </Descriptions>

            </Card>


        </div>
    )
};

export default UserInfo
