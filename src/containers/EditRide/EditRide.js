import React, {Component} from 'react';
import {connect} from 'react-redux';
import {
    Button,
    Card,
    Col,
    DatePicker,
    Descriptions,
    Form,
    InputNumber,
    message,
    Modal,
    Row,
    Select,
    Space,
    Spin,
    Steps,
    Timeline,
    TimePicker,
    Tooltip
} from "antd";


import classes from './addRide.module.css';
import LocationInput from "../../components/LocationInput/LocationInput";
import axios from "axios";
import {API_HTTP} from "../../config";
import AddCarForm from "../../components/Forms/AddCarForm/AddCarForm";
import {LoadingOutlined, PlusCircleOutlined} from "@ant-design/icons";
import MyMapComponent from "../../components/Map/Map";
import moment from "moment";
import * as myRidesActions from "../../store/actions/myRidesActions";


const { Step } = Steps;
const { Option } = Select;

class EditRide extends Component {
    state = {
        current: 0,
        origin: null,
        destination: null,
        date: null,
        time: null,
        vacant_seats: 1,
        car: null,

        newOrigin: null,
        newDestination: null,
        newDate: null,
        newTime: null,
        newVacant_seats: 1,
        newCar: null,

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
                // console.log(response.data);
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
            this.props.fetchMyRide(this.props.token, this.props.match.params.ridePK);
            this.fetchCars();
        }
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if(prevProps.user!==this.props.user || (prevState.cars===null && this.state.cars !== prevState.cars )){
            this.fetchCars();
            // this.props.fetchMyRide(this.props.token, this.props.match.params.ridePK);
        }
        if(this.props.ride && prevProps.loading && !this.props.loading){
            console.log('setState');
            this.setState({
                origin: this.props.ride.origin,
                destination: this.props.ride.destination,
                date: this.props.ride.date,
                time: this.props.ride.time,
                vacant_seats: this.props.ride.vacant_seats,
                car: this.props.ride.car,
            });
        }
    }

    onChange = current => {
        console.log('onChange:', current);
        this.setState({ current });
    };

    next = () => {
        const current = this.state.current + 1;
        this.setState({ current });
    };

    prev = () => {
        const current = this.state.current - 1;
        this.setState({ current });
    };

    setOrigin = (origin) => {
        // console.log('origin', origin);
        this.setState({newOrigin: origin});
    };

    setDestination = (destination) => {
        // console.log('destination',destination);
        this.setState({newDestination: destination});
    };

    setDate = date => {
        console.log(date);
        this.setState({newDate: date})
    };

    setTime = time => {
        // console.log(time);
        this.setState({newTime: time})
    };

    setPass = vacant_seats => {
        // console.log('vacant_seats: ', vacant_seats);
        this.setState({ newVacant_seats: vacant_seats });
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
            newCar: car
        });
    };

    disabledDate = (current) => {
        // Can not select days before today and today
        // return current && current < moment().endOf('day');
        return (
            current &&
            (current < moment().subtract(1, "day"))
        );
    };

    onSubmit = () => {

        const updatedRide = {};
        if(this.state.newOrigin){updatedRide.origin=this.state.newOrigin}
        if(this.state.newDestination){updatedRide.destination=this.state.newDestination}
        if(this.state.newDate){
            updatedRide.date=this.state.newDate.toISOString().split('T')[0];
        }
        if(this.state.newTime){
            updatedRide.time=this.state.newTime.toISOString().split('T')[1].slice(0, -1).split('.')[0];
        }
        if(this.state.newCar){updatedRide.car=this.state.newCar}
        if(this.state.newVacant_seats){updatedRide.vacant_seats=this.state.newVacant_seats}

        let config = {
            headers: {
                "Content-Type": "Application/Json",
                "Authorization": "JWT "+ this.props.user.token
            }
        };

        const pk = this.props.ride.pk;

        axios.patch(API_HTTP + 'api/'+pk+'/edit/', updatedRide , config)
            .then( response => {
                console.log(response.data);
                message.success('Updating ride complete!');
                this.props.history.push('/rides/'+response.data.pk);
            }).catch(error=>{
            console.log(error);
            message.error('Error adding event! Try again!')
        });



    };



    render() {

        if(!this.state.origin && !this.state.car){
            const antIcon = <LoadingOutlined style={{ fontSize: 50, textAlign: "center" }} spin />;
            return <Spin indicator={antIcon} />
        }

        let cars = null;
        if(this.state.cars){
            cars = this.state.cars.map( car => {
                return <Option key={car.key.toString()} value={car.plate}>{car.plate}</Option>
            });
        }else{
            cars = <Option disabled key="1" value={''}>No car. Add one!</Option>
        }
        const defaultTime = moment(this.state.date+'T'+this.state.time);


        let content = (
            <Card>
                <div className={classes.Content}>
                    <div style={{marginTop: "30px"}}>
                        <Timeline>
                            <Timeline.Item><LocationInput value={this.state.origin} placeholder={this.state.origin} setCity={(city)=> this.setOrigin(city)}/></Timeline.Item>
                            <Timeline.Item><LocationInput value={this.state.destination} placeholder={this.state.destination} setCity={(city)=> this.setDestination(city)}/></Timeline.Item>

                        </Timeline>
                    </div>

                    <div style={{marginTop: "30px"}}>
                        <Space>
                            <DatePicker
                                placeholder={'Select Date'}
                                style={{ width: 150, marginRight: "20px"}}
                                onChange={this.setDate}
                                defaultValue={moment(this.state.date)}
                                disabledDate={this.disabledDate}
                            />

                            <TimePicker
                                style={{ width: 150}}
                                minuteStep={15}
                                onChange={this.setTime}
                                defaultValue={defaultTime}
                            />
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
                            initialValues={{
                                "car": this.state.car.plate.toString(),
                                "vacant_seats": this.state.vacant_seats
                            }}
                        >

                            <Form.Item label="Car">
                                <Row gutter={8} justify>
                                    <Col span={22}>
                                        <Form.Item
                                            name="car"
                                            noStyle
                                            rules={[{ required: true, message: 'Please select your Car!' }]}
                                        >
                                            <Select value={this.state.car.id.toString()} onSelect={this.setCar} placeholder="Please select your Car">
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
                        </div>
                    </div>
                </Card>
            );
        }

        if(this.state.current===2){
            content=(
                <div className={classes.Content}>
                    <Card>
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

                    <div style={{alignSelf: 'stretch'}}>
                        <MyMapComponent
                            origin={this.state.origin} destination={this.state.destination}
                            handleDuration={(duration) => this.handleDuration(duration)}
                            handleDistance={(distance) => this.handleDistance(distance)}
                        />
                    </div>


                    <div className="steps-action" style={{marginTop: "30px", flex: 1, flexDirection: 'row', justifyContent: 'center'}}>
                        {this.state.current > 0 && (
                            <Button style={{ margin: '0 8px' }} onClick={() => this.prev()}>
                                Previous
                            </Button>
                        )}
                        {this.state.current === 2 && (
                            <Button type="primary" onClick={() => this.onSubmit()}>
                                Update
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
                        // onChange={this.onChange}
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
                    <div>
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
        user: state.auth.user,
        ride: state.ride.ride,
        error: state.ride.error,
        loading: state.ride.loading,
        token: state.auth.user ? state.auth.user.token : null
    }
};

const mapDispatchToProps = dispatch => {
    return {
        fetchMyRide: (token, pk) => dispatch(myRidesActions.fetchMyRide(token, pk)),
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(EditRide);
