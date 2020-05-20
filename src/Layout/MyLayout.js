import React, { useState } from 'react';
import ProLayout, {
    PageHeaderWrapper,
    SettingDrawer,
    BasicLayout
} from '@ant-design/pro-layout';
import {Menu, Space} from "antd";
import { Link, Switch, Route, useLocation } from "react-router-dom";

import {FaHome,FaCar} from 'react-icons/fa';

const MyLayout = () => {
    const [settings, setSetting] = useState({
        "primaryColor": "#1890ff",
        "fixedHeader": true,
        "fixSiderbar": true,
        "contentWidth": "Fluid"
    });
    useLocation();

    const menu = (
        <Menu theme="dark" defaultSelectedKeys={['1']} mode="inline">
            <Menu.Item key="1">
                <Link to={`/`} replace>
                    <Space style={{color: 'white'}}>
                        <FaHome/>
                        <span>Home</span>
                    </Space>
                </Link>
            </Menu.Item>
            <Menu.Item key="2">
                <Link to={`/rides/`}>
                    <Space style={{color: 'white'}}>
                        <FaCar />
                        <span>Rides</span>
                    </Space>

                </Link>
            </Menu.Item>
        </Menu>
    );



    return (
        <div
            id="test"
            style={{
                transform: 'rotate(0)',
                overflowX: 'hidden',
            }}
        >

            <BasicLayout
                style={{
                    height: "100%",
                }}
                {...settings}
                route={{
                    routes: [
                        {
                            key: "Home",
                            path: "/",
                            name: "Home",
                            exact: true,
                        },
                        {
                            key: "rides",
                            path: "/rides",
                            name: "rides",
                            exact: true
                        }
                    ]
                }}
                menuItemRender={(menuItemProps, defaultDom) => {
                    if (
                        menuItemProps.isURL ||
                        menuItemProps.children ||
                        !menuItemProps.path
                    ) {
                        return defaultDom;
                    }

                    return <Link to={menuItemProps.path}>{defaultDom}</Link>;
                }}

            >

                <PageHeaderWrapper content="header">
                    <div
                        style={{
                            height: '120vh',
                        }}
                    >

                        <Switch>
                            <Route exact path="/" render={() => <div>home</div>} />
                            <Route exact path="/rides" render={() => <div>rides</div>} />
                            <Route render={() => <div>error</div>} />
                        </Switch>
                    </div>
                </PageHeaderWrapper>
            </BasicLayout>
            {/*<SettingDrawer*/}
            {/*    getContainer={() => document.getElementById('test')}*/}
            {/*    settings={settings}*/}
            {/*    onSettingChange={setSetting}*/}
            {/*/>*/}
        </div>
    );
};

export default MyLayout;
