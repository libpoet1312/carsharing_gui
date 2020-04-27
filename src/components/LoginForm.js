import React from "react";
import {Form, Input, Button, Checkbox, Spin, Space} from 'antd';
import { UserOutlined, LockOutlined, LoadingOutlined } from '@ant-design/icons';
import {connect} from 'react-redux';

const antIcon = <LoadingOutlined style={{ fontSize: 24 }} spin />;

const LoginForm = (props) => {

    const onFinish = values => {
        console.log('Received values of form: ', values);
    };

    let errorMessage = null;
    if (props.error){
        errorMessage = (
            <p>{props.error.message}</p>
        )
    }

    return (
        <div>
            {errorMessage}
            {
                props.loading ?
                    <Spin indicator={antIcon}/>
                    :
                    <Form
                        name="normal_login"
                        className="login-form"
                        initialValues={{ remember: true }}
                        onFinish={onFinish}
                        size={"large"}
                    >
                        <Form.Item
                            name="username"
                            rules={[{ required: true, message: 'Please input your Username!' }]}
                        >
                            <Input prefix={<UserOutlined className="site-form-item-icon" />} placeholder="Username" />
                        </Form.Item>

                        <Form.Item
                            name="password"
                            rules={[{ required: true, message: 'Please input your Password!' }]}
                        >
                            <Input
                                prefix={<LockOutlined className="site-form-item-icon" />}
                                type="password"
                                placeholder="Password"
                            />
                        </Form.Item>
                        <Form.Item>
                            <Form.Item name="remember" valuePropName="checked" noStyle>
                                <Checkbox>Remember me</Checkbox>
                            </Form.Item>

                            <a className="login-form-forgot" href="/">
                                Forgot password
                            </a>
                        </Form.Item>

                        <Form.Item>
                            <Space>
                                <Button type="primary" htmlType="submit" className="login-form-button">Σύνδεση</Button>
                                Or
                                <Button type="secondary" onClick={props.changeForm} className="login-form-button">Εγγραφή
                                </Button>
                            </Space>

                        </Form.Item>
                    </Form>


            }

        </div>

    );
};

const mapStateToProps = (state) => {
    return {
        loading: state.loading,
        error: state.error
    }
};

export default connect(mapStateToProps)(LoginForm);