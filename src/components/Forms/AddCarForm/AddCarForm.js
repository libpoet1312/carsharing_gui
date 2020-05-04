import React from 'react';
import { Form, Input, Button, Divider, Row, Col } from 'antd';

import 'react-phone-input-2/lib/style.css'
import {GrPowerReset} from 'react-icons/gr';



const formItemLayout = {
    labelCol: {
        xs: {
            span: 24,
        },
        sm: {
            span: 8,
        },
    },
    wrapperCol: {
        xs: {
            span: 24,
        },
        sm: {
            span: 16,
        },
    },
};


const AddCarForm = (props) => {
    const [form] = Form.useForm();

    const onFinish = (values,error) => {
        console.log('Received values of form: ', values);
        props.add(values);

        if (!props.error && !error){
            console.log('okey registration');
            props.showModal()
        }
    };

    let errorMessage = null;
    if (props.error){
        errorMessage = (
            <div>
                <p>{props.error.message}</p>
            </div>

        )
    }

    return (
        <div>
            {errorMessage}
            <Form
                {...formItemLayout}
                form={form}
                name="addCar"
                onFinish={onFinish}
                scrollToFirstError
            >
                <Form.Item
                    name="plate"
                    label="Plate"
                    rules={[
                        {
                            required: true,
                            message: 'Please input your E-mail!',
                        },
                    ]}
                >
                    <Input />
                </Form.Item>

                <Form.Item
                    name="brand"
                    label="brand"

                    rules={[
                        {
                            required: true,
                            message: 'Please input your cars brand!',
                            whitespace: false,
                        },
                    ]}
                >
                    <Input />
                </Form.Item>
                <Form.Item
                    name='model'
                    label="model"
                    rules={[
                        {
                            required: true,
                            message: 'Please input model!',
                        },
                    ]}
                >
                    <Input />
                </Form.Item>



                <Form.Item
                    name='year'
                    label="year"
                    rules={[
                        {
                            required: true,
                            message: 'Please input year!',
                        },
                    ]}
                >
                    <Input />
                </Form.Item>

                <Form.Item
                    name='color'
                    label="color"
                    rules={[
                        {
                            required: true,
                            message: 'Please input color!',
                        },
                    ]}
                >
                    <Input />
                </Form.Item>

                <Divider/>


                <Row justify="space-around" align="middle" className={'text-center'}>
                    <Col>
                        <Form.Item>
                            <Button type="secondary" shape="round" htmlType='reset' size={'large'}
                                    onClick={() => form.resetFields()}
                            >
                                <GrPowerReset/>Clear
                            </Button>
                        </Form.Item>
                    </Col>
                    <Col>
                        <Form.Item>
                            <Button type="primary" shape="round" htmlType="submit" size={'large'}>
                                Add car
                            </Button>
                        </Form.Item>
                    </Col>

                </Row>
            </Form>
        </div>
    );
};

export default AddCarForm;