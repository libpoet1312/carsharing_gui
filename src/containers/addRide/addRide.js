import React, { Component } from 'react';
import {connect} from 'react-redux';
import {Card, Input, message, Steps, Button, Form, DatePicker, TimePicker, Select, Modal, Row} from "antd";

import {FaRegArrowAltCircleRight} from 'react-icons/fa';

import classes from './addRide.module.css';
import LocationInput from "../../components/LocationInput/LocationInput";
import axios from "axios";
import {API_HTTP} from "../../config";
import {Redirect} from "react-router";
import AddCarForm from "../../components/Forms/AddCarForm/AddCarForm";


const { Step } = Steps;
const { Option } = Select;

class addRide extends Component {
    state = {
        current: 0,
        origin: null,
        destination: null,
        date: null,
        time: null,
        passengers: null,
        car: null,
        cars: null,
        carModalVisible: false,
    };

    fetchCars = () => {
        let config = {
            headers: {
                "Content-Type": "Application/Json",
                "Authorization": "JWT "+ this.props.user.token
            }
        };
        axios.get(API_HTTP + 'cars/car', config)
            .then( response => {
                console.log(response.data);
                const cars = [];
                for (let i = 0; i < response.data.length; i++) {
                    cars.push({
                        key: response.data[i].id,
                        plate: response.data[i].plate,
                        brand: response.data[i].brand,
                        model: response.data[i].model,
                        year: response.data[i].year,
                        color: response.data[i].color,
                    });
                }
                this.setState({
                    cars: cars,
                    carsCount: response.data.length
                });
            }).catch(error=>{

            console.log(error);
        });
    };

    componentDidMount() {
        if(this.props.user){
            this.fetchCars();
        }

    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if(prevProps.user!==this.props.user || (prevState.cars===null && this.state.cars !== prevState.cars )){
            this.fetchCars();
        }
    }

    onChange = current => {
        console.log('onChange:', current);
        this.setState({ current });
    };

    next() {
        const current = this.state.current + 1;
        this.setState({ current });
    }

    prev() {
        const current = this.state.current - 1;
        this.setState({ current });
    }

    setOrigin = (origin) => {
        console.log('origin', origin);
        this.setState({origin: origin});
    };

    setDestination = (destination) => {
        console.log('destination',destination);
        this.setState({destination: destination});
    };

    handleAdd = (newCar) => {
        console.log(newCar);
        const { count, dataSource } = this.state;
        const newData = {
            key: count+1,
            plate: newCar.plate,
            model: newCar.model,
            color: newCar.color,
            brand: newCar.brand,
            year: newCar.year,
        };
        console.log(this.props.token);

        let config = {
            headers: {
                "Content-Type": "Application/Json",
                "Authorization": "JWT "+ this.props.token
            }
        };
        axios.post(API_HTTP + 'cars/car/', newCar, config)
            .then( response => {
                console.log(response);

            }).catch(error=>{

            console.log(error);
        });

        this.setState({
            dataSource: [...dataSource, newData],
            count: count + 1,
        });
    };

    showModal = () => {
        this.setState({
            carModalVisible: !this.state.carModalVisible
        })
    };

    onFinish = values => {
        console.log('Received values of form: ', values);
        this.setState({
            car: values
        });
    };

    onNext = (values) => {
        console.log('onNext: ', values);
    };



    render() {
        const formItemLayout = {
            labelCol: { span: 6 },
            wrapperCol: { span: 8 },
        };


        let cars = null;
        if(this.state.cars){
            cars = this.state.cars.map( car => {
                return <Option key={car.key.toString()} value={car.plate}>{car.plate}</Option>
            });
        }else{
            cars = <Option disabled key="1" value={''}>No car. Add one!</Option>
        }


        let content = (
            <div>
                <Card>
                    <div className={classes.Content}>
                        <LocationInput  placeholder='Origin' setCity={(city)=> this.setOrigin(city)}/>
                        <div><FaRegArrowAltCircleRight style={{fontSize: "35px"}}/></div>
                        <LocationInput placeholder='Destination' setCity={(city)=> this.setDestination(city)}/>

                    </div>
                    <div style={{marginTop: "30px"}}>
                        <DatePicker  placeholder={'Select Date'}
                                     style={{ width: 150, marginRight: "20px"}}

                            // onChange={this.onChange}
                        />

                        <TimePicker style={{ width: 150}} minuteStep={15} secondStep={10}/>
                    </div>

                    <div className="steps-action" style={{marginTop: "30px"}}>
                        {/*{this.state.current > 0 && (*/}
                        {/*    <Button style={{ margin: '0 8px' }} onClick={() => this.prev()}>*/}
                        {/*        Previous*/}
                        {/*    </Button>*/}
                        {/*)}*/}
                        {this.state.current < 2 && (
                            <Button type="primary" disabled={!this.state.origin || !this.state.destination} onClick={() => this.next()}>
                                Next
                            </Button>
                        )}
                        {/*{this.state.current === 2 && (*/}
                        {/*    <Button type="primary" onClick={() => message.success('Processing complete!')}>*/}
                        {/*        Done*/}
                        {/*    </Button>*/}
                        {/*)}*/}
                    </div>


                </Card>
            </div>

        );
        if(this.state.current===1){
            content = (
                <Card >
                    <Modal title={"Add Car"} footer={''} destroyOnClose={true} onCancel={this.showModal} visible={this.state.carModalVisible}>
                        <AddCarForm showModal={this.showModal} add={(values) => this.handleAdd(values)}/>
                    </Modal>
                    <div>
                        <Form
                            onFinish={this.onNext}
                            name="basic"
                            {...formItemLayout}
                        >
                            <Form.Item
                                name="car"
                                label="Car"
                                hasFeedback
                                rules={[{ required: true, message: 'Please select your Car!' }]}

                            >
                                <>
                                        <Select onSelect={this.onFinish} placeholder="Please select your Car">
                                            {cars}
                                        </Select>
                                    <Button onClick={this.showModal}>Add a Car</Button>


                                </>


                            </Form.Item>

                            <div className="steps-action" style={{marginTop: "30px"}}>
                                {this.state.current > 0 && (
                                    <Button style={{ margin: '0 8px' }} onClick={() => this.prev()}>
                                        Previous
                                    </Button>
                                )}
                                {this.state.current < 2 && (
                                    <Button type="primary" htmlType="submit" disabled={!this.state.car}>
                                        Next
                                    </Button>
                                )}
                                {/*{this.state.current === 2 && (*/}
                                {/*    <Button type="primary" onClick={() => message.success('Processing complete!')}>*/}
                                {/*        Done*/}
                                {/*    </Button>*/}
                                {/*)}*/}
                            </div>
                        </Form>
                    </div>




                </Card>
            );
        }

        return (
        <div>

            <div>
                <Steps
                    type="navigation"
                    size="small"
                    current={this.state.current}
                    onChange={this.onChange}
                    className={["site-navigation-steps"]}
                >
                    <Step
                        title="Basic Ride Informantion"
                    />
                    <Step
                        title="Extra"
                    />
                    <Step
                        title="Submit"
                    />
                </Steps>
                <div className={classes.addRide}>
                    <div className={["steps-content"]}>
                        {content}


                    </div>



                </div>
            </div>







        </div>
        )
    }
}

const mapStateToProps = (state) => {
    return{
        user: state.auth.user
    }
};

export default connect(mapStateToProps)(addRide);