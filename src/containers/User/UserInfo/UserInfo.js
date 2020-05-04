import React from 'react'
import {Descriptions, Collapse, Divider, Avatar} from 'antd';

import getUnicodeFlagIcon from 'country-flag-icons/unicode'
import {GiEarthAfricaEurope} from 'react-icons/gi';
import {GiCarKey} from 'react-icons/gi';

import classes from './userInfo.module.css';
import CarTable from "../../../components/CarTable/CarTable";

const { Panel } = Collapse;

const UserInfo = (props) => {

    let country = <GiEarthAfricaEurope/>;
    if(props.user.country!==null){
        country=getUnicodeFlagIcon(props.user.country);
    }
    let gender = null;
    switch (props.user.gender) {
        case 'M': gender=<div>Male</div>;break;
        case 'F': gender=<div>Female</div>;break;
        case 'O': gender=<div>Other</div>;break;
        default: gender = <div>Unknown</div>;
    }

    let date = new Date(Date.parse(props.user.date_joined)).toDateString();

    return (
        <div>

            <div className={classes.Info}>

                <Avatar src={props.user.avatar} size={100}/>


                <Divider dashed={true}/>


                <Descriptions column={{ xxl: 4, xl: 3, lg: 3, md: 3, sm: 1, xs: 1 }} className={classes.Description}>
                    <Descriptions.Item label={<strong className={classes.DescriptionTitle}>username</strong>}>
                        <span className={classes.DescriptionText}>{props.user.username}</span>
                    </Descriptions.Item>

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
            </div>

            <Divider/>

            {props.isOwner?
                <div>
                    <Divider/>

                    <Collapse>
                        <Panel key="1"
                               header={
                                   <div>
                                       <strong>Αμάξια </strong>
                                       <GiCarKey size={"20px"}/>
                                   </div>
                               }
                        >
                            <CarTable/>
                        </Panel>
                    </Collapse>
                </div>
                : null
            }
        </div>
    )
};

export default UserInfo
