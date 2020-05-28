import React, { Component } from "react";
import {Card} from 'antd';
import {Animated} from "react-animated-css";

import classes from './Home.module.css';

import homelogo from '../../assets/images/homelogo.jpeg';
import lesscosts from '../../assets/images/costreduce.jpeg';
import sustainable from '../../assets/images/sustain.jpeg';
import mainImage from '../../assets/images/carsharing.jpg';
import carLeaf from '../../assets/images/carwithleaf.png';

import './s.css';

const { Meta } = Card;


class Home extends Component {
    state = {
        isVisible: true
    };

    componentDidMount() {
        this.setState({isVisible: false})
    }

    render() {
        return (
            <div>
                <div style={{textAlign: "center"}}>
                    <Animated animationIn='' animationOut='bounceInDown' animationOutDuration={500} isVisible={this.state.isVisible}>
                        <div className={"main"}>
                            <div className={"s"}>
                                <div className={"p"}>Car Sharing</div>
                            </div>
                        </div>
                    </Animated>
                    <Animated animationIn='' animationOut='bounceInRight' animationOutDuration={500} isVisible={this.state.isVisible}>
                        <div>
                           A sustainable way to travel
                        </div>
                    </Animated>
                </div>









                <div style={{textAlign: "center"}}><img src={mainImage} style={{ maxHeight: "80%", maxWidth: "80%"}} alt={'mainImg'}/></div>
                <hr className={'brace'}/>
                <div className={classes.Home}>
                    <Card
                        hoverable
                        style={{ width: 250, margin: 50 }}
                        cover={<img src={homelogo} height={220} alt={'logo'}/>}
                    >
                        <Meta title="Meet People"
                              description="www.instagram.com"
                        />
                    </Card>

                    <Card
                        hoverable
                        style={{ width: 250, margin: 50 }}
                        cover={<img src={lesscosts} height={220} alt={'logo'}/>}
                    >
                        <Meta title="Less Costs"
                              description="www.instagram.com"
                        />
                    </Card>

                    <Card
                        hoverable
                        style={{ width: 250, margin: 50 }}
                        cover={<img src={carLeaf} height={220} alt={'logo'}/>}
                    >
                        <Meta title="Eco-Friendly"
                              description="www.instagram.com"
                        />
                    </Card>

                    <Card
                        hoverable
                        style={{ width: 250, margin: 50 }}
                        cover={<img src={sustainable} height={220} alt={'logo'}/>}
                    >
                        <Meta title="All in all sustainable"
                              description="www.instagram.com"
                        />
                    </Card>
                </div>
            </div>
        );
    }
}

export default Home
