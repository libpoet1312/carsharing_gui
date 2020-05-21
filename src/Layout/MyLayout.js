import ReactSider from 'react-sider';
import 'react-sider/lib/index.css';
import React from "react";
import { withRouter } from "react-router";

const menuData = [{
    // MenuItem name
    name: 'Dashboard',
    // MenuItem icon (antd icon)
    icon: 'dashboard',
    // MenuItem relative path
    path: 'dashboard',
    // SubMenu
    children: [{
        name: 'Analysis',
        path: 'analysis',
        children: [{
            name: 'Real-time',
            path: 'realtime',
        }, {
            name: 'Offline',
            path: 'offline',
        }],
    },
        {
            name: 'Monitor',
            path: 'monitor',
        },
        {
            name: 'Workplace',
            path: 'workplace',
        }],
}, {
    name: 'Marketing',
    icon: 'table',
    path: 'marketing',
}, {
    name: 'Settings',
    icon: 'setting',
    path: 'settings',
    children: [{
        name: 'Users Management',
        path: 'users',
    }],
}];

const Sider = (props) => (
    <ReactSider
        appName="React App Pro"
        // appLogo={logo}
        menuData={menuData}
        // better to sync pathname with the router in your application
        pathname={props.location.pathname}
    />
);

export default withRouter(Sider);