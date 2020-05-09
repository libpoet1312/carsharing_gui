import React from 'react'
import {Avatar, Col, List, Popover, Row} from "antd";
import {Link} from "react-router-dom";
import {AwesomeButton} from "react-awesome-button";

const RideList = (props) => {

    return (
        <div>
            <List.Item
                key={props.item.pk}
                actions={[
                    <Link to={`/rides/${props.item.pk}`}>
                        <AwesomeButton as={Link} to={`/rides/${props.item.pk}`}
                                       type="primary" size="small">Details</AwesomeButton>,
                    </Link>

                ]}
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
                        <Popover  placement="bottom" content={<h5>Profile</h5>}>
                            <a href='/'>
                                <div className='border border-primary text-center'>
                                    <Avatar src={props.item.uploader.avatar} alt='avatar'/>
                                    <h6 className='font-italic text-muted mt-5'>{props.item.uploader.username}</h6>
                                </div>
                            </a>
                        </Popover>
                        :
                        <div className='border border-primary text-center'>
                            <Avatar src={props.item.uploader.avatar} alt='avatar'/>
                            <h6 className='font-italic text-muted mt-5'>{props.item.uploader.username}</h6>
                        </div>


                    }
                    title={
                        <Row className='border border-danger' type="flex" align="middle">
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
                    description={
                        <Row className='border border-info' type='flex' align='middle'>
                            <h5>Type: {props.item.type}</h5>
                        </Row>
                    }
                />
                <div className='border border-secondary'>
                    {props.item.content}
                    skasdaeds
                </div>
            </List.Item>
        </div>
    )
};

export default RideList
