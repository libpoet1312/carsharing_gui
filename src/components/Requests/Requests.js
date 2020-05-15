import React from 'react'
import {List} from "antd";
import {connect} from 'react-redux';

const Requests = (props) => {
    return (
        <div>
            <List
                itemLayout="horizontal"
                dataSource={props.requests}
                renderItem={item => (
                    <List.Item>
                        <List.Item.Meta
                            title={<a href="https://ant.design">{item.title}</a>}
                            description="Ant Design, a design language for background applications, is refined by Ant UED Team"
                        />
                    </List.Item>
                )}
            />

        </div>
    )
};

const mapStateToProps = (state) => {
    return {
        requests: state.auth.requests
    }
};

export default connect(mapStateToProps)(Requests);
