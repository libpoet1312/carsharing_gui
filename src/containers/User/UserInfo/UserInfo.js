import React from 'react'
import {Descriptions, Divider, Avatar, Card} from 'antd';

// import getUnicodeFlagIcon from 'country-flag-icons/unicode'
import {GiEarthAfricaEurope} from 'react-icons/gi';
import { EllipsisOutlined, SettingOutlined } from '@ant-design/icons';

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


    return (
        <div className={classes.Info}>
            <Card className={classes.Card}

                  actions={[
                      <Link to={'/myaccount'}>
                          <SettingOutlined key="Account Settings" />
                      </Link>,
                      <EllipsisOutlined key="ellipsis" />]}

            >
                <Avatar src={props.user.avatar} size={100}/>
                <br/>
                <div className={classes.DescriptionText} style={{marginTop: "30px"}}>{props.user.username}</div>

                <Descriptions  column={{ xxl: 2, xl: 2, lg: 2, md: 2, sm: 1, xs: 1 }} className={classes.Description}>

                    <Descriptions.Item label={<strong className={classes.DescriptionTitle}>Full name</strong>}>
                        <span className={classes.DescriptionText}>{props.user.username}</span>
                    </Descriptions.Item>

                    <Descriptions.Item label={<strong className={classes.DescriptionTitle}>Phone</strong>}>
                        <span className={classes.DescriptionText}>{props.user.phone_number}</span>
                    </Descriptions.Item>

                    <Descriptions.Item label={<strong className={classes.DescriptionTitle}>Date of Birth</strong>}>
                        <span className={classes.DescriptionText}>{props.user.dob}</span>
                    </Descriptions.Item>

                    <Descriptions.Item label={<strong className={classes.DescriptionTitle}>Country</strong>}>
                        <span className={classes.DescriptionText}>{country}</span>
                    </Descriptions.Item>

                    <Descriptions.Item label={<strong className={classes.DescriptionTitle}>Gender</strong>}>
                        <span className={classes.DescriptionText}>{gender}</span>
                    </Descriptions.Item>

                    <Descriptions.Item label={<strong className={classes.DescriptionTitle}>Member since</strong>}>
                        <span className={classes.DescriptionText}>{date}</span>
                    </Descriptions.Item>

                </Descriptions>

            </Card>


        </div>
    )
};

export default UserInfo
