import React, { Component } from 'react';
import {connect} from 'react-redux';
import {
    Card,
    Descriptions,
    message,
    Steps,
    Button,
    Form,
    DatePicker,
    TimePicker,
    Select,
    Modal,
    Row,
    InputNumber,
    Timeline,
    Tooltip, Space, Col
} from "antd";


import classes from './addRide.module.css';
import LocationInput from "../../components/LocationInput/LocationInput";
import axios from "axios";
import {API_HTTP} from "../../config";
import AddCarForm from "../../components/Forms/AddCarForm/AddCarForm";
import { PlusCircleOutlined} from "@ant-design/icons";
import MyMapComponent from "../../components/Map/Map";
import moment from "moment";


const { Step } = Steps;
const { Option } = Select;

class addRide extends Component {
    state = {
        current: 0,
        origin: null,
        destination: null,
        date: null,
        time: null,
        vacant_seats: 1,
        car: null,
        cars: null,
        carModalVisible: false,
        duration: 0,
        distance: 0,
    };

    handleDuration = (duration) => {
        this.setState({duration: duration})
    };

    handleDistance = (distance) => {
        this.setState({distance: distance});
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

    setDate = date => {
        console.log(date);
        this.setState({date: date})
    };

    setTime = time => {
        console.log(time);
        this.setState({time: time})
    };

    setPass = vacant_seats => {
        console.log('vacant_seats: ', vacant_seats);
        this.setState({ vacant_seats: vacant_seats || 1});
    };

    handleAdd = (newCar) => {
        console.log(newCar);
        const cars = this.state.cars;
        const newData = {
            key: cars.length + 1,
            plate: newCar.plate,
            model: newCar.model,
            color: newCar.color,
            brand: newCar.brand,
            year: newCar.year,
        };
        console.log(this.props.user.token);

        let config = {
            headers: {
                "Content-Type": "Application/Json",
                "Authorization": "JWT "+ this.props.user.token
            }
        };
        axios.post(API_HTTP + 'cars/car/', newCar, config)
            .then( response => {
                console.log(response);

            }).catch(error=>{

            console.log(error);
        });

        this.setState({
            cars: [...this.state.cars, newData],
        });
    };

    showModal = () => {
        this.setState({
            carModalVisible: !this.state.carModalVisible
        })
    };

    setCar = values => {
        console.log('Received values of form: ', values);
        let result = this.state.cars.find( car => {
            return car.plate === values
        });
        console.log(result);
        const car = {
            id: result.key,
            plate: result.plate,
            brand: result.brand,
            model: result.model,
            year: result.year,
            color: result.color,
        };

        this.setState({
            car: car
        });
    };

    onSubmit = () => {
        const time1 = moment('12:00:00', "hh:mm:ss").toISOString();
        console.log('Submit!');
        const time2 = time1.split('T');
        console.log(time2[1].slice(0, -1));
        const time = time2[1].slice(0, -1);


        const ride = {
            origin: this.state.origin,
            destination: this.state.destination,
            date: this.state.date,
            time: this.state.time ? this.state.time.toISOString() : time,
            vacant_seats: this.state.vacant_seats
        };

        let config = {
            headers: {
                "Content-Type": "Application/Json",
                "Authorization": "JWT "+ this.props.user.token
            }
        };

        axios.post(API_HTTP + 'api/create/', ride, config)
            .then( response => {
                console.log(response.data);
                message.success('Processing complete!');
                this.props.history.push('/rides/'+response.data.pk);
            }).catch(error=>{
                console.log(error);
                message.error('Error adding event! Try again!')
        });



    };



    render() {

        let cars = null;
        if(this.state.cars){
            cars = this.state.cars.map( car => {
                return <Option key={car.key.toString()} value={car.plate}>{car.plate}</Option>
            });
        }else{
            cars = <Option disabled key="1" value={''}>No car. Add one!</Option>
        }


        let content = (
            <Card>
                <div className={classes.Content}>
                    <div style={{marginTop: "30px"}}>
                        <Timeline>
                            <Timeline.Item><LocationInput  placeholder='Origin' setCity={(city)=> this.setOrigin(city)}/></Timeline.Item>
                            <Timeline.Item><LocationInput placeholder='Destination' setCity={(city)=> this.setDestination(city)}/></Timeline.Item>

                        </Timeline>
                    </div>

                    <div style={{marginTop: "30px"}}>
                        <Space>
                            <DatePicker
                                placeholder={'Select Date'}
                                style={{ width: 150, marginRight: "20px"}}
                                onChange={this.setDate}
                            />

                            <TimePicker style={{ width: 150}} minuteStep={15} onChange={this.setTime}/>
                        </Space>

                    </div>

                    <div className="steps-action" style={{marginTop: "30px"}}>
                        {this.state.current < 2 && (
                            <Button type="primary" disabled={!this.state.origin || !this.state.destination || !this.state.date} onClick={() => this.next()}>
                                Next
                            </Button>
                        )}
                    </div>
                </div>
            </Card>

        );

        if(this.state.current===1){
            content = (
                <Card>
                    <Modal title={"Add Car"} footer={''} destroyOnClose={true} onCancel={this.showModal} visible={this.state.carModalVisible}>
                        <AddCarForm showModal={this.showModal} add={(values) => this.handleAdd(values)}/>
                    </Modal>
                    <div className={classes.Content}>
                        <Form
                            name="basic"
                        >

                            <Form.Item label="Car">
                                <Row gutter={8} justify>
                                    <Col span={22}>
                                        <Form.Item
                                            name="car"
                                            noStyle
                                            rules={[{ required: true, message: 'Please select your Car!' }]}
                                        >
                                            <Select onSelect={this.setCar} placeholder="Please select your Car">
                                                {cars}
                                            </Select>
                                        </Form.Item>
                                    </Col>
                                    <Col span={2}>
                                        <Tooltip title="Add a Car" >
                                            <PlusCircleOutlined style={{fontSize: 25, padding: "3px"}} onClick={this.showModal}>Add a Car</PlusCircleOutlined>
                                        </Tooltip>
                                    </Col>
                                </Row>
                            </Form.Item>


                            <Form.Item
                                name="vacant_seats"
                                label="Vacant Seats"
                                initialValue={1}
                                rules={[{ required: true, message: 'Please type your available seats!' }]}
                            >
                                <InputNumber
                                             placeholder={'No of seats'}
                                             min={1}
                                             onChange={(vacant_seats) => this.setPass(vacant_seats)}
                                />

                            </Form.Item>
                        </Form>

                        <div className="steps-action" style={{marginTop: "30px"}}>
                            {this.state.current > 0 && (
                                <Button style={{ margin: '0 8px' }} onClick={() => this.prev()}>
                                    Previous
                                </Button>
                            )}
                            {this.state.current < 2 && (
                                <Button type="primary" onClick={() => this.next()} disabled={!this.state.car}>
                                    Next
                                </Button>
                            )}
                            {/*{this.state.current === 2 && (*/}
                            {/*    <Button type="primary" onClick={() => message.success('Processing complete!')}>*/}
                            {/*        Done*/}
                            {/*    </Button>*/}
                            {/*)}*/}
                        </div>
                    </div>




                </Card>
            );
        }

        if(this.state.current===2){
            content=(
                <div>
                    <Card >
                        <Descriptions>
                            <Descriptions.Item label="Origin">{this.state.origin}</Descriptions.Item>
                            <Descriptions.Item label="Destination">{this.state.destination}</Descriptions.Item>
                            <Descriptions.Item label="Vacant seats">{this.state.vacant_seats}</Descriptions.Item>
                            <Descriptions.Item label="Date">{this.state.date.toString()}</Descriptions.Item>
                            <Descriptions.Item label="Time">{this.state.time ? this.state.time.toString() : "Undefined"}</Descriptions.Item>

                            <Descriptions.Item label="Car">{this.state.car.plate}</Descriptions.Item>

                            <Descriptions.Item label="Duration">{this.state.duration}</Descriptions.Item>
                            <Descriptions.Item label="Distance">{this.state.distance}</Descriptions.Item>
                        </Descriptions>

                    </Card>


                    <MyMapComponent
                        origin={this.state.origin} destination={this.state.destination}
                        handleDuration={(duration) => this.handleDuration(duration)}
                        handleDistance={(distance) => this.handleDistance(distance)}
                    />

                    <div className="steps-action" style={{marginTop: "30px"}}>
                        {this.state.current > 0 && (
                            <Button style={{ margin: '0 8px' }} onClick={() => this.prev()}>
                                Previous
                            </Button>
                        )}
                        {this.state.current === 2 && (
                            <Button type="primary" onClick={() => this.onSubmit()}>
                                Add Ride
                            </Button>
                        )}
                    </div>

                </div>
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