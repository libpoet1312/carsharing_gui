import React, { Component } from 'react'
import { Tabs } from 'antd';
import BasicSettings from "./BasicSettings/BasicSettings";
import CarTable from "../../components/CarTable/CarTable";
import SecSettings from "./SecSettings/SecSettings";

const { TabPane } = Tabs;

export class AccountSettings extends Component {
    render() {
        return (
            <Tabs defaultActiveKey="1" style={{height: "100%"}}  tabPosition={ this.props.isMobile ? "top":"left"}>
                <TabPane  tab={<strong >Basic Settings</strong>} key="1">
                    <BasicSettings isMobile={this.props.isMobile}/>
                </TabPane>
                <TabPane tab={<strong>Security Settings</strong>} key="2">
                    <SecSettings/>
                </TabPane>
                <TabPane tab={<strong>My Cars</strong>} key="3">
                    <CarTable/>
                </TabPane>
            </Tabs>
        )
    }
}

export default AccountSettings;
