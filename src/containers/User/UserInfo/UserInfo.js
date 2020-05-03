import React from 'react'
import Avatar from 'react-avatar';
import {Button, Col, Row, Descriptions, Collapse, Divider } from 'antd';
import getUnicodeFlagIcon from 'country-flag-icons/unicode'
import {GiEarthAfricaEurope} from 'react-icons/gi';
import {GrAddCircle} from 'react-icons/gr';
import {GiCarKey} from 'react-icons/gi';

const { Panel } = Collapse;

const UserInfo = (props) => {
    console.log('[UserInfo]');
    let country = <GiEarthAfricaEurope/>;
    if(props.user.country!==null){
        country=getUnicodeFlagIcon(props.user.country);
    }
    let gender = null;
    switch (props.user.gender) {
        case 'M': gender=<div>Άνδρας</div>;break;
        case 'F': gender=<div>Άνδρας</div>;break;
        case 'O': gender=<div>Άλλο</div>;break;
        default: gender = <div>Άγνωστο</div>;
    }

    let cars = props.user.car;
    if(!cars){

        cars = (
            <div style={{display: "flex"}}>

                <p>Κανένα αμάξι. Επιλέξτε για να προσθέσετε ένα.</p>
                <Button icon={<GrAddCircle  size="30px"/>} shape="circle" style={{borderStyle: 'none'}}/>
            </div>
            )


    }else{
        // list of cars
    }

    let rides = props.user.rides;
    if(!rides){
        rides = (
            <div style={{display: "flex", alignItems: "center", justifyContent: 'space-evenly'}}>
                <p>Κανένα αμάξι. Επιλέξτε για να προσθέσετε ένα.</p>
                <Button icon={<GrAddCircle  size="30px"/>} shape="circle" style={{borderStyle: 'none'}}/>
            </div>
        )
    }
    let info =
        <Row className="border border-info">
        <Col className="border border-danger">
            <Descriptions title="Πληροφορίες Χρήστη">
                <Descriptions.Item > <Avatar src={props.user.avatar} size="50" round={true}/></Descriptions.Item>
                <Descriptions.Item label="username">{props.user.username}</Descriptions.Item>
                <Descriptions.Item label="Ονοματεπώνυμο">{props.user.username}</Descriptions.Item>

                <Descriptions.Item label="Τηλέφωνο">{props.user.phone_number}</Descriptions.Item>
                <Descriptions.Item label="Χώρα">{country}</Descriptions.Item>

                <Descriptions.Item label="Ημερομηνία Γέννησης">{props.user.dob}</Descriptions.Item>
                <Descriptions.Item label="Φύλο">{gender}</Descriptions.Item>
                <Descriptions.Item label="Ημερομηνία Εγγραφής">{props.user.date_joined}</Descriptions.Item>
            </Descriptions>
        </Col>
        </Row>;
    if(props.isOwner){
        info = (
            <Row className="border border-info" style={{display: "flex", flexFlow: ""}}>
                <Col span={22} className="border border-danger">
                    <Descriptions title="Πληροφορίες Χρήστη">
                        <Descriptions.Item > <Avatar src={props.user.avatar} size="50" round={true}/></Descriptions.Item>
                        <Descriptions.Item label="username">{props.user.username}</Descriptions.Item>
                        <Descriptions.Item label="Ονοματεπώνυμο">{props.user.username}</Descriptions.Item>

                        <Descriptions.Item label="Τηλέφωνο">{props.user.phone_number}</Descriptions.Item>
                        <Descriptions.Item label="Χώρα">{country}</Descriptions.Item>

                        <Descriptions.Item label="Ημερομηνία Γέννησης">{props.user.dob}</Descriptions.Item>
                        <Descriptions.Item label="Φύλο">{gender}</Descriptions.Item>
                        <Descriptions.Item label="Ημερομηνία Εγγραφής">{props.user.date_joined}</Descriptions.Item>
                    </Descriptions>
                </Col>
                <Col span={2}>
                    <div>
                        <button type={'primary'}>
                        Επεξεργασία<br/>Στοιχείων</button>
                    </div>

                </Col>
            </Row>
        )
    }

    return (
        <div>
            {info}

            <Divider/>

            {props.isOwner?
                <div>
                    <Divider/>
                    <Row>
                        <Col span={4}>
                            <Collapse>
                                <Panel key="1"
                                       header={
                                           <div className="flex" style={{display: "flex", alignItems: "center", justifyContent: 'space-around'}}>
                                               <strong>Αμάξια</strong>
                                               <GiCarKey size={"20px"}/>
                                           </div>

                                       }
                                >
                                    {cars}
                                </Panel>
                            </Collapse>
                        </Col>
                        <Col span={1} justify="space-around" align="middle" className='text-center'>
                            <Divider  type={"vertical"} style={{height: "100%"}}/>
                        </Col>
                        <Col span={19}>
                            <Collapse className='text-center' >
                                <Panel key="1"
                                       header={<strong>Διαδρομές του χρήστη {props.user.username}</strong>}
                                >
                                    {rides}
                                </Panel>

                            </Collapse>
                        </Col>
                    </Row>


                </div>
                : null


            }





        </div>
    )
};

export default UserInfo
