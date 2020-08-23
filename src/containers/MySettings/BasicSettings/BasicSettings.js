import React, {useEffect, useState} from 'react';
import {Form, Input, Upload, Button, Avatar, Select, DatePicker, message} from 'antd';
import {connect} from 'react-redux';
import {UploadOutlined} from '@ant-design/icons';
import {GiMale, GiFemale} from "react-icons/gi";
import {IoMdTransgender} from 'react-icons/io';
import './MyAccount.css';
import axios from "axios";
import {API_HTTP} from "../../../config";
import moment from "moment";
import * as authActions from '../../../store/actions/authActions';

const disabledDate = (current) => {
    // Can not select days after today
    // return current && current < moment().endOf('day');
    return (
        current &&
        (current > moment().subtract(1, "day"))
    );
};


const BasicSettings = (props) => {
    const [form] = Form.useForm();
    const [user, setUser] = useState();

    useEffect(()=> {
        if(!props.token) return;
        let config = {
            headers: {
                "Content-Type": "application/json",
                "Authorization": 'JWT ' + props.user.token,
            }
        };

        axios.get(API_HTTP + 'rest-auth/user/', config)
            .then(res => {
                console.log('rest auth', res.data);

                setUser(res.data);

            }).catch( err => {
            console.log(err);
        });
    },[props, props.token]);

    const onFinish = (values,error) => {
        if(error){
            console.log('Error: ', error);
        }else{
            // console.log('Received values of form: ', values);
            let newUser={};
            if(values.email!==user.email) newUser.email=values.email;
            if(values.username!==user.username) newUser.username=values.username;
            if(values.country!==user.country) newUser.country=values.country;
            if(values.gender!==user.gender) newUser.gender=values.gender;
            if(values.phone!==user.phone_number && !(values.phone===undefined && user.phone_number===null)) newUser.phone_number=values.phone;

            console.log('newUser', newUser);
            let config = {
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": 'JWT ' + props.user.token,
                }
            };

            axios.patch(API_HTTP+'rest-auth/user/',newUser, config).then(res => {
                console.log(res.data);
                setUser(res.data);
            }).catch(error=> {
                console.log(error);
            })
        }
    };

    const beforeUpload = (file) => {
        const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png';
        if (!isJpgOrPng) {
            message.error('You can only upload JPG/PNG file!');
        }
        const isLt2M = file.size / 1024 / 1024 < 2;
        if (!isLt2M) {
            message.error('Image must smaller than 2MB!');
        }
        return isJpgOrPng && isLt2M;
    };

    const customRequest= (options) => {
        const data= new FormData();
        data.append('avatar', options.file);
        const config= {
            "headers": {
                "Content-Type": 'multipart/form-data; boundary=----WebKitFormBoundaryqTqJIxvkWFYqvP5s',
                "Authorization": 'JWT ' + props.token,
            }
        };
        console.log('options', options);
        // console.log('data', data);

        axios.patch(API_HTTP+'rest-auth/user/', data, config).then(res=>{
            // console.log(res.data);
            message.success('Avatar uploaded successfully.');
            props.updateProfile(res.data);
            options.onSuccess();
        }).catch(error=> {
            console.log(error);
            message.error('Avatar upload failed.');
            options.onError();
        })
    };

    return (
        <div style={{marginBottom: '20px'}}>
        {
            props.user && user ?
                    <Form
                        form={form}
                        name="updateBasic"
                        onFinish={onFinish}
                        scrollToFirstError
                        layout={"vertical"}
                    >
                        <div className="Row">
                            <div>
                                <Form.Item
                                    name="email"
                                    label="E-mail"
                                    initialValue={user.email}
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
                                    <Input placeholder={!user.email ? 'Not set': null} />
                                </Form.Item>
                                <Form.Item
                                    name="username"
                                    label="Username"
                                    initialValue={user.username}
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
                                    initialValue={user.phone}
                                    rules={[
                                        {
                                            message: 'Please input your phone',
                                        },
                                    ]}
                                >
                                    <Input placeholder={!user.phone ? 'Not set': null}/>
                                </Form.Item>
                                <Form.Item
                                    name="country"
                                    label="Country"
                                    initialValue={user.country}
                                    rules={[
                                        {
                                            message: 'Please input your country',
                                        },
                                    ]}
                                >
                                    <Input placeholder={!user.country ? 'Not set': null} style={{width: "250px"}} />
                                </Form.Item>

                                <Form.Item
                                    name="gender"
                                    label="Gender"
                                    initialValue={user.gender}
                                    rules={[
                                        {
                                            required: false,
                                            message: 'Please select your gender',
                                        },
                                    ]}
                                >
                                    <Select>
                                        <Select.Option value='M'><GiMale/> Male</Select.Option>
                                        <Select.Option value='F'><GiFemale/> Female</Select.Option>
                                        <Select.Option value='O'><IoMdTransgender/> Other</Select.Option>
                                    </Select>

                                </Form.Item>

                                <Form.Item
                                    name='dob'
                                    label="Date of birth"
                                    rules={[
                                        {
                                            required: false,
                                            message: 'Please input date of birth!',
                                        },
                                    ]}
                                    initialValue={moment(user.date)}
                                >
                                    <DatePicker
                                        disabledDate={disabledDate}
                                    />
                                </Form.Item>

                                <Button type="primary" htmlType="submit" shape="round" size={"large"}>
                                    Update
                                </Button>
                            </div>

                            <div style={{marginBottom: props.isMobile ? '30px': '0'}}>
                                <Form.Item
                                    label="Avatar"
                                    style={{textAlign: "center"}}

                                >
                                    <Avatar size={150} src={props.user.avatar}/>
                                    <br/>
                                    <Upload name="avatar" accept={'.jpg,.png,.jpeg'} customRequest={customRequest} beforeUpload={beforeUpload} listType="avatar" >
                                        <Button style={{marginTop: "10px"}}>
                                            <UploadOutlined /> Click to upload
                                        </Button>
                                    </Upload>
                                </Form.Item>
                                <div style={{textAlign: 'center', fontSize: 17}}>
                                    <span >Member since:</span>
                                    <br/>
                                    <span style={{fontStyle: 'italic'}}>{moment(user.date_joined).toISOString().split('T')[0]}</span>
                                </div>

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
        user: state.auth.user,
        token: state.auth.user ? state.auth.user.token : null
    };
};

const mapDispatchToProps = dispatch => {
    return {
        updateProfile : (user) => dispatch(authActions.updateProfile(user))
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(BasicSettings);
