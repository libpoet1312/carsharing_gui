import React, { Component } from 'react'
import { Tabs } from 'antd';
import BasicSettings from "./BasicSettings/BasicSettings";
import CarTable from "../../components/CarTable/CarTable";

const { TabPane } = Tabs;

export class MyAccount extends Component {
    render() {
        return (
            <Tabs defaultActiveKey="1" style={{height: "100%"}}  tabPosition={ this.props.isMobile ? "top":"left"}>
                <TabPane  tab={<strong >Basic Settings</strong>} key="1">
                    <BasicSettings isMobile={this.props.isMobile}/>
                </TabPane>
                <TabPane tab={<strong>Security Settings</strong>} key="2">
                    Content of Tab Pane 2
                </TabPane>
                <TabPane tab={<strong>My Cars</strong>} key="3">
                    <CarTable/>
                </TabPane>
            </Tabs>
        )
    }
}

export default MyAccount;