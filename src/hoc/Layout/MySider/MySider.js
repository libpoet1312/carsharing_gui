import React from 'react'
import {Drawer, Layout} from "antd";


import './MySider.css';
import MyMenu from "../MyMenu/MyMenu";

const {Sider} = Layout;


const MySider = (props) => {
    let sidebar = (
        <Sider breakpoint="xl"
               collapsible
               trigger={null}

               onBreakpoint={broken => {
                   console.log(broken);
               }}

               onCollapse={(collapsed, type) => {
                   console.log(collapsed, type);
               }}

               style={{minWidth: "200px"}}
        >

            <MyMenu isAuthenticated={props.isAuthenticated} user={props.user} />
        </Sider>
    );
    if(props.isMobile) {
        sidebar = (
            <Drawer
                title={''}
                drawerStyle={{
                    backgroundColor: '#001529'
                }}
                width='180px'
                placement="left"
                closable={true}
                onClose={props.showDrawer}
                visible={props.drawerVisible}
            >
                <MyMenu isAuthenticated={props.isAuthenticated} user={props.user} />
            </Drawer>
        )
    }


    return sidebar
};

export default MySider
