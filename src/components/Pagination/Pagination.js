import React from 'react'
import classes from './Pagination.module.css';
import {Button} from "antd";
import {DoubleLeftOutlined, LeftOutlined, RightOutlined, DoubleRightOutlined} from "@ant-design/icons";
const Pagination = (props) => {
    // console.log(props.pager);


    return (
        <React.Fragment>
            <ul className={classes.Pagination}>

                <li>
                    <Button disabled={props.pager.currentPage === 1}
                            onClick={() => props.setPage(1)}
                    >
                        <div className={classes.Button}>
                            <DoubleLeftOutlined style={{fontSize: 15}}/>
                            <span>First</span>

                        </div>

                    </Button>
                </li>
                <li>
                    <Button disabled={props.pager.currentPage === 1}
                            onClick={() => props.setPage(props.pager.currentPage - 1)}
                    >
                        <div className={classes.Button}>
                            <LeftOutlined />
                            <span>Previous</span>
                        </div>

                    </Button>
                </li>

                {props.pager.pages.map((page, index) =>
                    <li key={index} >
                        {/*{console.log(index, page, props.pager.currentPage)}*/}
                        <Button
                            type={props.pager.currentPage === page ? "link" : ''}
                            className={props.pager.currentPage === page ? classes.Active : ''}
                            onClick={() => props.setPage(page)}
                        >
                            {page}
                        </Button>
                    </li>
                )}

                <li>
                    <Button
                        disabled={props.pager.currentPage === props.pager.totalPages}
                        onClick={() => props.setPage(props.pager.currentPage + 1)}
                    >
                        <div className={classes.Button}>
                            <span>Next</span>
                            <RightOutlined />
                        </div>

                    </Button>
                </li>
                <li>
                    <Button
                        disabled={props.pager.currentPage === props.pager.totalPages}
                        onClick={() => props.setPage(props.pager.totalPages)}
                    >
                        <div className={classes.Button}>
                            <span>Last</span>
                            <DoubleRightOutlined/>
                        </div>

                    </Button>
                </li>
            </ul>
        </React.Fragment>
    )
};

export default Pagination
