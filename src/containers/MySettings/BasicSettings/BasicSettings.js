import React from 'react';
import {Form, Input, Upload, Button, Avatar} from 'antd';
import {connect} from 'react-redux';
import {UploadOutlined} from '@ant-design/icons';
import './MyAccount.css';

const BasicSettings = (props) => {
    const [form] = Form.useForm();

    const onFinish = (values,error) => {
        console.log('Received values of form: ', values);

    };

    return (
        <div style={{marginBottom: '20px'}}>
        {
            props.user ?

                    <Form
                        form={form}
                        name="register"
                        onFinish={onFinish}
                        scrollToFirstError
                        layout={"vertical"}
                    >
                        <div className="Row">
                            <div>
                                <Form.Item
                                    name="email"
                                    label="E-mail"
                                    initialValue={props.user.email}
                                    rules={[
                                        {
                                            type: 'email',
                                            message: 'The input is not valid E-mail!',
                                        },
                                        {
                                            message: 'Please input your E-mail!',
                                        },
                                    ]}
                                >
                                    <Input  />
                                </Form.Item>
                                <Form.Item
                                    name="username"
                                    label="Username"
                                    initialValue={props.user.username}
                                    rules={[
                                        {
                                            message: 'Please input your username',
                                        },
                                    ]}
                                >
                                    <Input style={{width: "250px"}} />
                                </Form.Item>
                                <Form.Item
                                    name="phone"
                                    label="Phone"
                                    initialValue={props.user.phone}
                                    rules={[
                                        {
                                            message: 'Please input your phone',
                                        },
                                    ]}
                                >
                                    <Input/>
                                </Form.Item>
                                <Form.Item
                                    name="country"
                                    label="Country"
                                    initialValue={props.user.username}
                                    rules={[
                                        {
                                            message: 'Please input your country',
                                        },
                                    ]}
                                >
                                    <Input style={{width: "250px"}} />
                                </Form.Item>

                                <Button type="primary" htmlType="submit">
                                    Submit
                                </Button>
                            </div>




                            <div style={{marginBottom: props.isMobile ? '30px': '0'}}>
                                <Form.Item
                                    label="Avatar"

                                    style={{textAlign: "center"}}

                                >
                                    <Avatar size={150}/>
                                    <br/>
                                    <Upload name="avatar" action="/upload.do" listType="avatar" >
                                        <Button style={{marginTop: "10px"}}>
                                            <UploadOutlined /> Click to upload
                                        </Button>
                                    </Upload>
                                </Form.Item>
                            </div>
                        </div>
                    </Form>


                : null
        }
        </div>

    )
};

const mapStateToProps = state => {
    return {
        isAuthenticated: state.auth.user !== null,
        user: state.auth.user
    };
};

export default connect(mapStateToProps)(BasicSettings);