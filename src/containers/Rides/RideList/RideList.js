import React from 'react'
import {Avatar, Col, List, Tooltip, Row, Button, } from "antd";
import {Link, withRouter} from "react-router-dom";
import {AwesomeButton} from "react-awesome-button";

const RideList = (props) => {
    const linkToAccount =
        <Link to={'/user/'+props.item.uploader.pk}><div style={{textAlign: "center"}}>Go to<br/>uploader profile</div></Link>;


    console.log(props.my);
    return (
        <div>
            <List.Item
                key={props.item.pk}
                actions={props.my?
                    [
                        <Link to={`/rides/${props.item.pk}`}>
                            <AwesomeButton as={Link} to={`/rides/${props.item.pk}`}
                                           type="primary" size="small">Details</AwesomeButton>,
                        </Link>,
                        <Link to={`/rides/${props.item.pk}`}>
                            <Button as={Link} to={`/rides/${props.item.pk}/edit`}
                                    type="primary" style={{backgroundColor: 'orange'}} size="large" shape={"round"}
                            >
                                Edit
                            </Button>
                        </Link>,
                        <Button onClick={()=>props.deleteHandler(props.item.pk)}
                                type="primary" danger size="large" shape={"round"}
                        >
                            Delete
                        </Button>

                    ]:[
                        <Link to={`/rides/${props.item.pk}`}>
                            <AwesomeButton as={Link} to={`/rides/${props.item.pk}`}
                                           type="primary" size="small">Details</AwesomeButton>,
                        </Link>
                    ]
                }
                // extra={
                //     <img
                //         width={200}
                //         height={200}
                //         alt="logo"
                //         src="https://gw.alipayobjects.com/zos/rmsportal/mqaQswcyDLcXyDKnZfES.png"
                //     />
                // }
            >
                <List.Item.Meta
                    avatar={ props.isAuthenticated ?
                        <Tooltip  placement="bottom" title={props.item.uploader.username} content={linkToAccount}>
                                <Button
                                    shape={"circle"}
                                    icon={<Avatar  src={props.item.uploader.avatar} alt='avatar'/>}
                                    className='text-center'
                                    style={{cursor: "pointer", border: "none"}}
                                    onClick={()=> {props.history.push('/user/'+props.item.uploader.pk)}}
                                />
                        </Tooltip>
                        :
                        <div className='text-center'>
                            <Avatar src={props.item.uploader.avatar} alt='avatar'/>
                        </div>


                    }
                    title={
                        <Row type="flex" align="middle">
                            {/* Title */}
                            <Col>
                                <h5>
                                    <span className='text-muted'>From </span>
                                    <a href={props.item.href}>{props.item.origin}</a>
                                    <span className='text-muted'> to </span>
                                    <a href={props.item.href}>{props.item.destination}</a>
                                </h5>
                            </Col>

                            {/* Date and Time */}
                            <Col className='ml-auto'>
                                <Row>
                                    <Col><span className='text-muted'>Date:</span></Col>
                                    <Col className='ml-auto'><a href={props.item.href}>&nbsp;&nbsp;{props.item.date}</a></Col>
                                </Row>
                                <Row>
                                    <Col className='mr-auto'><span className='text-muted'>Time:</span></Col>
                                    <Col className='ml-auto'><a className='' href={props.item.href}>{props.item.time}</a></Col>
                                </Row>
                            </Col>
                        </Row>
                    }
                    // description={
                    //     <Row type='flex' align='middle'>
                    //         <h5>Type: {props.item.type}</h5>
                    //     </Row>
                    // }
                />
                {/*<div>*/}
                {/*    {props.item.content}*/}
                {/*    skasdaeds*/}
                {/*</div>*/}
            </List.Item>
        </div>
    )
};

export default withRouter(RideList)
