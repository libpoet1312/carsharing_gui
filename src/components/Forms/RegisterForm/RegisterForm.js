import React from 'react';
import {
    Form, Input, Tooltip, Select, Upload,
    Checkbox, Button, DatePicker, Divider, Row, Col
} from 'antd';
import PhoneInput from 'react-phone-input-2'
import 'react-phone-input-2/lib/style.css'

import { QuestionCircleOutlined, UploadOutlined } from '@ant-design/icons';
import {GiMale, GiFemale} from "react-icons/gi";
import {IoMdTransgender} from 'react-icons/io'
import {FaViber} from "react-icons/fa";
import { Icon } from '@iconify/react';
import whatsappIcon from '@iconify/icons-logos/whatsapp';
import {RiArrowGoBackLine} from 'react-icons/ri';
import {GrPowerReset} from 'react-icons/gr';
import * as actions from "../../../store/actions/authActions";
import {connect} from "react-redux";


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
const tailFormItemLayout = {
    wrapperCol: {
        xs: {
            span: 24,
            offset: 0,
        },
        sm: {
            span: 16,
            offset: 8,
        },
    },
};

const RegistrationForm = (props) => {
    const [form] = Form.useForm();

    const onFinish = (values,error) => {
        console.log('Received values of form: ', values);
        props.onAuth(values.username, values.email, values.password1, values.password2,
            values.phone_number, values.avatar, values.gender, values.country,
            values.has_whatsup, values.has_viber);
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
                name="register"
                onFinish={onFinish}
                scrollToFirstError
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
                    <Input />
                </Form.Item>

                <Form.Item
                    name="username"
                    label={
                        <span>
                        Username&nbsp;
                            <Tooltip title="What do you want others to call you?">
                          <QuestionCircleOutlined />
                        </Tooltip>
                    </span>
                    }
                    rules={[
                        {
                            required: true,
                            message: 'Please input your nickname!',
                            whitespace: false,
                        },
                    ]}
                >
                    <Input />
                </Form.Item>

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
                    <Input.Password />
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
                        ({ getFieldValue }) => ({
                            validator(rule, value) {
                                if (!value || getFieldValue('password1') === value) {
                                    return Promise.resolve();
                                }

                                return Promise.reject('The two passwords that you entered do not match!');
                            },
                        }),
                    ]}
                >
                    <Input.Password />
                </Form.Item>

                <Form.Item
                    name='dob'
                    label="Ημερομηνία Γέννησης"
                    rules={[
                        {
                            required: false,
                            message: 'Please input date of birth!',
                        },
                    ]}
                >
                    <DatePicker />
                </Form.Item>

                <Divider/>

                <Form.Item
                    name="gender"
                    label="Φύλο"
                    rules={[
                        {
                            required: false,
                            message: 'Please select your gender',
                        },
                    ]}
                >
                    <Select>
                        <Select.Option value='M'><GiMale/>Άνδρας</Select.Option>
                        <Select.Option value='F'><GiFemale/>Γυναίκα</Select.Option>
                        <Select.Option value='O'><IoMdTransgender/>Άλλο</Select.Option>
                    </Select>

                </Form.Item>

                <Form.Item
                    name="phone_number"
                    label="Αριθμός Τηλεφώνου"
                    rules={[
                        {
                            required: false,
                            message: 'Please input your phone number!',
                        },
                    ]}
                >
                    <PhoneInput
                        country={'us'}
                        // value={this.state.phone}
                        // onChange={phone => this.setState({ phone })}
                    />
                </Form.Item>

                <Form.Item label="Εικόνα">
                    <Upload name="avatar" listType="picture">
                        <Button>
                            <UploadOutlined /> Click to upload
                        </Button>
                    </Upload>
                </Form.Item>

                <Divider>Επιπλέον μέσα επικοινωνίας</Divider>

                <Row justify="space-around" align="middle" >
                    <Col className={'w-50 text-right'}>
                        <Form.Item className={'text-right'}
                                   name="has_whatsup"
                                   valuePropName="checked"
                        >
                            <Checkbox>
                                <Icon icon={whatsappIcon} /> What's up
                            </Checkbox>
                        </Form.Item>
                    </Col>
                    <Col className={"w-50 text-right"}>
                        <Form.Item className={'text-right'}
                                   name="has_viber"
                                   valuePropName="checked"
                        >
                            <Checkbox>
                                <FaViber/>Viber
                            </Checkbox>
                        </Form.Item>
                    </Col>


                </Row>





                <Form.Item className={'text-center'}
                           name="agreement"
                           valuePropName="checked"
                           rules={[
                               {
                                   validator: (_, value) =>
                                       value ? Promise.resolve() : Promise.reject('Should accept agreement'),
                               },
                           ]}
                           {...tailFormItemLayout}
                >
                    <Checkbox>
                        Συμφωνώ με τους <a href="/">όρους και προυποθέσεις χρήσης</a> της υπηρεσίας.
                    </Checkbox>
                </Form.Item>

                <Row justify="space-around" align="middle" className={'text-center'}>
                    <Col>
                        <Form.Item>
                            <Button type="secondary" onClick={() => props.changeModal('login')}>
                                <RiArrowGoBackLine/>Πίσω στην Σύνδεση
                            </Button>
                        </Form.Item>
                    </Col>
                    <Col>
                        <Form.Item>
                            <Button type="secondary" htmlType='reset'
                                    onClick={() => form.resetFields()}
                            >
                                <GrPowerReset/>Καθαρισμός Πεδίων
                            </Button>
                        </Form.Item>
                    </Col>
                    <Col>
                        <Form.Item>
                            <Button type="primary" shape="round" htmlType="submit" size={'large'}>
                                Εγγραφή
                            </Button>
                        </Form.Item>
                    </Col>

                </Row>
            </Form>
        </div>
    );
};

const mapStateToProps = (state) => {
    return {
        loading: state.loading,
        error: state.error
    }
};

const mapDispatchToProps = dispatch => {
    return {
        onAuth: (username, email, password1, password2, phone_number, avatar, gender, country,
                 has_whatsup, has_viber) => dispatch(actions.authSignup(
                     username, email, password1, password2, phone_number, avatar, gender, country,
            has_whatsup, has_viber))
    }
};

export default connect (mapStateToProps, mapDispatchToProps)(RegistrationForm);