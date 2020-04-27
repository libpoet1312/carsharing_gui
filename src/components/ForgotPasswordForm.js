import React from 'react'
import {Form, Input, Button, Row} from "antd";
import {RiArrowGoBackLine} from 'react-icons/ri';



const ForgotPasswordForm = (props) => {
    const [form] = Form.useForm();

    const onFinish = values => {
        console.log('Received values of form: ', values);
    };

    return (
        <div>
            <Form
                name="forgotpassword"
                layout={'vertical'}
                form={form}
                onFinish={onFinish}
            >
                <Form.Item
                    name="email"
                    label="E-mail"
                    rules={[
                        {
                            type: 'email',
                            message: 'The input is not valid E-mail!',
                        },
                        {
                            required: true,
                            message: 'Please input your E-mail!',
                        },
                    ]}
                >
                    <Input placeholder="e-mail" />
                </Form.Item>

                <Row>
                    <Form.Item>
                        <Button type="secondary" onClick={props.ForgotPassHandler}>
                            <RiArrowGoBackLine/>Πίσω στην Σύνδεση
                        </Button>
                    </Form.Item>
                    <Form.Item className={'ml-auto'}>
                        <Button type="primary" htmlType='submit'></Button>
                    </Form.Item>

                </Row>


            </Form>
        </div>
    )
};

export default ForgotPasswordForm