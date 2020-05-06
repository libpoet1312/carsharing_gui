import React, { useState } from 'react';
import {Dropdown, TimePicker, DatePicker, Button} from 'antd';
import classes from './SearchBar.module.css';
import LocationInput from "../../../components/LocationInput/LocationInput";
import {FaFilter} from  'react-icons/fa';
import logo from '../../../assets/images/img_571322.png'
import {Collapse} from 'react-collapse';

class Search extends React.Component{

    state = {
        opened: false
    };

    FiltersHandler = () => {
        this.setState({opened: !this.state.opened})
    };


    onChange = (date, dateString) => {
        console.log(date, dateString);
    };

    setOrigin = () => {
        this.setState()
    };

    setDestination = () => {

    };



    render() {
        let filters = (
            <div className={classes.ReactCollapseCollapse}>
                <div>
                    <DatePicker  placeholder={'Select Date'} style={{ width: 150}} onChange={this.onChange} />
                    <TimePicker style={{ width: 150}} minuteStep={15} secondStep={10} />
                </div>
                <div>

                </div>






            </div>
        );


        return (
            <div >
                <h4 className={classes.SearchTitle}>Αναζήτηση</h4>
                <div className={classes.SearchBar}>
                    <div className={classes.Item}>
                        <LocationInput placeholder='Origin'/>
                    </div>

                    <div className={classes.Item}>
                        <img  src={logo} width={45} alt={'TO'}/>
                    </div>

                    <div className={classes.Item}>
                        <LocationInput placeholder='Destination'/>
                    </div>

                    <div className={classes.break}></div>


                    <Button onClick={()=> this.FiltersHandler()}
                            icon={<FaFilter/>}
                            style={{ width: 150, marginTop: 10}}
                            type="outline"
                    >
                        More filters
                    </Button>

                    <div className={classes.break}></div>
                    <Collapse
                        isOpened={this.state.opened}

                    >
                        <div>{filters}</div>
                    </Collapse>



                </div>
            </div>
        )
    }


};

export default Search;