import React from "react";
import {List, Avatar, Row, Col, Popover} from 'antd';
import {AwesomeButton} from "react-awesome-button";
import {Link} from "react-router-dom";
import {connect} from 'react-redux';

const Rides = (props) => {

    return(
        <List
            itemLayout="vertical"
            size="large"
            pagination={{
                onChange: page => {
                    console.log(page);
                },
                pageSize: 2,
            }}
            dataSource={props.data}
            footer={
                <div>
                    <b>ant design</b> footer part
                </div>
            }
            renderItem={item => (
                <List.Item
                    key={item.pk}
                    actions={[
                        <Link to={`/rides/${item.pk}`}>
                            <AwesomeButton as={Link} to={`/rides/${item.pk}`} type="primary" size="small">Details</AwesomeButton>,
                        </Link>

                    ]}
                    extra={
                        <img
                            width={200}
                            height={200}
                            alt="logo"
                            src="https://gw.alipayobjects.com/zos/rmsportal/mqaQswcyDLcXyDKnZfES.png"
                        />
                    }
                >
                    <List.Item.Meta
                        avatar={ props.isAuthenticated ?
                                    <Popover  placement="bottom" content={<h5>Profile</h5>}>
                                        <a href='/'>
                                            <div className='border border-primary text-center'>
                                                <Avatar src={item.uploader.avatar} alt='avatar'/>
                                                <h6 className='font-italic text-muted mt-5'>{item.uploader.username}</h6>
                                            </div>
                                        </a>
                                    </Popover>
                            :
                            <div className='border border-primary text-center'>
                                <Avatar src={item.uploader.avatar} alt='avatar'/>
                                <h6 className='font-italic text-muted mt-5'>{item.uploader.username}</h6>
                            </div>


                        }
                        title={
                            <Row className='border border-danger' type="flex" align="middle">
                                {/* Title */}
                                <Col>
                                    <h5>
                                        <span className='text-muted'>From </span>
                                        <a href={item.href}>{item.origin}</a>
                                        <span className='text-muted'> to </span>
                                        <a href={item.href}>{item.destination}</a>
                                    </h5>
                                </Col>

                                {/* Date and Time */}
                                <Col className='ml-auto'>
                                    <Row>
                                        <Col><span className='text-muted'>Date:</span></Col>
                                        <Col className='ml-auto'><a href={item.href}>&nbsp;&nbsp;{item.date}</a></Col>
                                    </Row>
                                    <Row>
                                        <Col className='mr-auto'><span className='text-muted'>Time:</span></Col>
                                        <Col className='ml-auto'><a className='' href={item.href}>{item.time}</a></Col>
                                    </Row>
                                </Col>
                            </Row>
                        }
                        description={
                            <Row className='border border-info' type='flex' align='middle'>
                                <h5>Type: {item.type}</h5>
                            </Row>
                        }
                    />
                    <div className='border border-secondary'>
                        {item.content}
                        skasdaeds
                    </div>
                </List.Item>
            )}
        />
    )
};

const mapStateToProps = state => {
    return {
        isAuthenticated: state.user !=null
    }
};

export default connect(mapStateToProps)(Rides);