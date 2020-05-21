import React from "react";
import { Drawer } from 'antd';

const MyDrawer = (props) =>  {
        return (
                <Drawer
                    placement="left"
                    closable={true}
                    onClose={props.showDrawer}
                    visible={props.drawerVisible}
                >
                    <p>Some contents...</p>
                    <p>Some contents...</p>
                    <p>Some contents...</p>
                </Drawer>

        );

}

export default MyDrawer;
