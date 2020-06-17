import React from "react";
import {Form, Input, Button, Checkbox, Spin, Divider} from 'antd';
import { UserOutlined, LockOutlined, LoadingOutlined } from '@ant-design/icons';
import {connect} from 'react-redux';
import * as actions from '../../../store/actions/authActions';

const antIcon = <LoadingOutlined style={{ fontSize: 24 }} spin />;

const LoginForm = (props) => {

    const onFinish = (values, error) => {
        console.log('Received values of form: ', values);
        props.onAuth(values.username, values.password);

        if (!props.error && !props.loading){
            console.log(props.error);
            console.log('okey registration');
            // props.showModal();
        }else{
            console.log(props.error);
        }

    };

    let errorMessage = null;
    if (props.error){
        if(props.error.message.includes("400")){
            errorMessage = (
                <p style={{color: "red", fontWeight: "bold"}}>Wrong username or password</p>
            )
        }else {
            errorMessage = (
                <p style={{color: "red", fontWeight: "bold"}}>Server connection error</p>
            )
        }

    }

    let form = <Spin indicator={antIcon}/>;
    if(!props.loading){
        form = (
            <Form
                name="normal_login"
                className="login-form"
                initialValues={{ remember: true }}
                onFinish={onFinish}
                size={"large"}
                style={{display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", alignContent: "center"}}
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

                    <Divider/>
                    <Button type="ghost" size="small"
                            className="login-form-forgot"
                            onClick={() => props.changeModal('forgot')}
                    >
                        Forgot password
                    </Button>
                </Form.Item>

                <Form.Item>
                    <div>
                        <Button type="secondary"
                                onClick={() => props.changeModal('register')}
                                className="login-form-button"
                        >
                            Register
                        </Button>
                        <span style={{opacity: 0.8}}><strong>  OR  </strong></span>
                        <Button type="primary" htmlType="submit" className="login-form-button">Login</Button>
                    </div>
                </Form.Item>



            </Form>
        )
    }

    return (
        <div>
            {errorMessage}
            {form}
        </div>

    );
};

const mapStateToProps = (state) => {
    return {
        loading: state.auth.loading,
        error: state.auth.error
    }
};

const mapDispatchToProps = dispatch => {
    return {
        onAuth: (username, password) => dispatch(actions.authLogin(username, password))
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(LoginForm);