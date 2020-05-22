import React from 'react';
import {TimePicker, DatePicker, Button, InputNumber} from 'antd';
import classes from './SearchBar.module.css';
import LocationInput from "../../../components/LocationInput/LocationInput";
import {FaFilter} from  'react-icons/fa';
import logo from '../../../assets/images/img_571322.png'

class Search extends React.Component{

    state = {
        opened: false,
    };

    FiltersHandler = () => {
        this.setState({opened: !this.state.opened})
    };


    onChange = (date, dateString) => {
        console.log(date, dateString);
        this.props.setDate(dateString);
    };

    setPass = (pass) => {

        this.props.setPassengers(pass);
    };





    render() {

        let filters = (
            <div className={classes.ReactCollapseCollapse}>
                <div className={classes.Item}>
                    <DatePicker  placeholder={'Select Date'}
                                 style={{ width: 150}}
                                 onChange={this.onChange}
                    />
                </div>
                <div className={classes.Item}>
                    <TimePicker style={{ width: 150}} minuteStep={15} secondStep={10}/>
                </div>
                <div className={classes.Item}>
                    <InputNumber onChange={this.setPass}
                                 style={{width: 100}}
                                 placeholder={'No of seats'}
                                 defaultValue={1}
                                 min={1}
                    />
                </div>
            </div>
        );


        return (
            <div >
                <h4 className={classes.SearchTitle}>Αναζήτηση</h4>
                <div className={classes.SearchBar}>
                    <div className={classes.Item}>
                        <LocationInput placeholder='Origin' setCity={(city)=> this.props.setOrigin(city)}/>
                    </div>

                    <div className={classes.Item}>
                        <img  src={logo} width={45} alt={'TO'}/>
                    </div>

                    <div className={classes.Item}>
                        <LocationInput placeholder='Destination' setCity={(city)=> this.props.setDestination(city)}/>
                    </div>

                    <div className={classes.break}></div>


                    <Button onClick={()=> this.FiltersHandler()}
                            icon={<FaFilter/>}
                            style={{ width: 150, marginTop: 10, marginBottom: 10}}
                            type="outline"
                    >
                        More filters
                    </Button>

                    <div className={classes.break}></div>
                    {
                        this.state.opened ?
                            filters
                            : null
                    }
                </div>
            </div>
        )
    }


}

export default Search;