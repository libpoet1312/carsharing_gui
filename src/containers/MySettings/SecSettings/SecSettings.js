import React from "react";
import {connect} from 'react-redux';
import { Button, Form, Input,} from "antd";
import axios from "axios";
import {API_HTTP} from "../../../config";


const SecSettings = (props) => {
    const [form] = Form.useForm();

    const onFinish = (values,error) => {
        if(error){
            console.log('Error: ', error);
        }else{
            // console.log('Received values of form: ', values);
            let config = {
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": 'JWT ' + props.token,
                }
            };

            axios.patch(API_HTTP+'rest-auth/user/',{password1: values.password1, password2: values.password2}, config).then(res => {
                // console.log(res.data);
                form.resetFields();
            }).catch(error=> {
                console.log(error);
            })
        }
    };


    return (
        <div style={{marginBottom: '20px'}}>
            {
                <Form
                    form={form}
                    name="updatePassword"
                    onFinish={onFinish}
                    scrollToFirstError
                    layout={"vertical"}
                >
                    <Form.Item
                        name="password1"
                        label="Password"
                        rules={[
                            {
                                required: true,
                                message: 'Please input your password!',
                            },
                        ]}
                        hasFeedback
                    >
                        <Input.Password/>
                    </Form.Item>

                    <Form.Item
                        name="password2"
                        label="Confirm Password"
                        dependencies={['password1']}
                        hasFeedback
                        rules={[
                            {
                                required: true,
                                message: 'Please confirm your password!',
                            },
                            ({getFieldValue}) => ({
                                validator(rule, value) {
                                    if (!value || getFieldValue('password1') === value) {
                                        return Promise.resolve();
                                    }

                                    return Promise.reject('The two passwords that you entered do not match!');
                                },
                            }),
                        ]}
                    >
                        <Input.Password/>
                    </Form.Item>

                    <Form.Item>
                        <Button type="primary" shape="round" htmlType="submit" size={'large'}>
                            Update
                        </Button>
                    </Form.Item>
                </Form>
            }
        </div>
    )
};

const mapStateToProps = state => {
    return {
        token: state.auth.user ? state.auth.user.token : null
    };
};

export default connect(mapStateToProps)(SecSettings);
