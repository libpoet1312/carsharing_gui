import React, { useContext, useState, useEffect, useRef } from 'react';
import {Table, Input, Button, Popconfirm, Form, Modal} from 'antd';
import AddCarForm from "../Forms/AddCarForm/AddCarForm";
import axios from "axios";
import {connect} from "react-redux";
import {GrAddCircle} from 'react-icons/gr';
import {API_HTTP} from "../../config";


const EditableContext = React.createContext();

const EditableRow = ({ index, ...props }) => {
    const [form] = Form.useForm();
    return (
        <Form form={form} component={false}>
            <EditableContext.Provider value={form}>
                <tr {...props} />
            </EditableContext.Provider>
        </Form>
    );
};

const EditableCell = ({
                          title,
                          editable,
                          children,
                          dataIndex,
                          record,
                          handleSave,
                          ...restProps
                      }) => {
    const [editing, setEditing] = useState(false);
    const inputRef = useRef();
    const form = useContext(EditableContext);
    useEffect(() => {
        if (editing) {
            inputRef.current.focus();
        }
    }, [editing]);

    const toggleEdit = () => {
        setEditing(!editing);
        form.setFieldsValue({
            [dataIndex]: record[dataIndex],
        });
    };

    const save = async e => {
        try {
            const values = await form.validateFields();
            toggleEdit();
            handleSave({ ...record, ...values });
        } catch (errInfo) {
            console.log('Save failed:', errInfo);
        }
    };

    let childNode = children;

    if (editable) {
        childNode = editing ? (
            <Form.Item
                style={{
                    margin: 0,
                }}
                name={dataIndex}
                rules={[
                    {
                        required: true,
                        message: `${title} is required.`,
                    },
                ]}
            >
                <Input ref={inputRef} onPressEnter={save} onBlur={save} />
            </Form.Item>
        ) : (
            <div
                className="editable-cell-value-wrap"
                style={{
                    paddingRight: 24,
                }}
                onClick={toggleEdit}
            >
                {children}
            </div>
        );
    }

    return <td {...restProps}>{childNode}</td>;
};

class CarTable extends React.Component {
    constructor(props) {
        super(props);
        this.columns = [
            {
                title: 'plate',
                dataIndex: 'plate',
                editable: true,
            },
            {
                title: 'brand',
                dataIndex: 'brand',
                editable: true,
            },
            {
                title: 'model',
                dataIndex: 'model',
                editable: true,
            },
            {
                title: 'year',
                dataIndex: 'year',
                editable: true,
            },
            {
                title: 'color',
                dataIndex: 'color',
                editable: true,
            },
            {
                title: 'operation',
                dataIndex: 'operation',
                render: (text, record) =>
                    this.state.dataSource.length >= 1 ? (
                        <Popconfirm title="Sure to delete?" onConfirm={() => this.handleDelete(record.key)}>
                            <Button type={"danger"}>Delete</Button>
                        </Popconfirm>
                    ) : null,
            },
        ];

        this.state = {
            dataSource: [],
            count: 0,
            modalVisible: false
        };
        console.log(this.state.dataSource);
    }

    fetchCars = () => {
        let config = {
            headers: {
                "Content-Type": "Application/Json",
                "Authorization": "JWT "+ this.props.token
            }
        };
        axios.get(API_HTTP + 'cars/car/', config)
            .then( response => {
                console.log(response.data);
                const cars = [];
                for (let i = 0; i < response.data.length; i++) {
                    cars.push({
                        key: response.data[i].id,
                        plate: response.data[i].plate,
                        brand: response.data[i].brand,
                        model: response.data[i].model,
                        year: response.data[i].year,
                        color: response.data[i].color,
                    });
                }
                this.setState({
                    dataSource: cars,
                    count: response.data.length
                });
            }).catch(error=>{

            console.log(error);
        });
    };

    componentDidMount() {
        this.fetchCars();
    }

    handleDelete = key => {
        const dataSource = [...this.state.dataSource];

        console.log(key);

        let config = {
            headers: {
                "Content-Type": "Application/Json",
                "Authorization": "JWT "+ this.props.token
            }
        };
        axios.delete(API_HTTP + 'cars/car/'+key, config)
            .then( response => {
                console.log(response);
                this.setState({
                    dataSource: dataSource.filter(item => item.key !== key),
                });

            }).catch(error=>{
                console.log(error);
        });
    };

    handleAdd = (newCar) => {
        console.log(newCar);
        const { count, dataSource } = this.state;
        const newData = {
            key: count+1,
            plate: newCar.plate,
            model: newCar.model,
            color: newCar.color,
            brand: newCar.brand,
            year: newCar.year,
        };
        console.log(this.props.token);

        let config = {
            headers: {
                "Content-Type": "Application/Json",
                "Authorization": "JWT "+ this.props.token
            }
        };
        axios.post(API_HTTP + 'cars/car/', newCar, config)
            .then( response => {
                console.log(response);

            }).catch(error=>{

            console.log(error);
        });

        this.setState({
            dataSource: [...dataSource, newData],
            count: count + 1,
        });
    };

    handleSave = row => {
        const newData = [...this.state.dataSource];
        const index = newData.findIndex(item => row.key === item.key);
        const item = newData[index];

        console.log(item);
        newData.splice(index, 1, { ...item, ...row });

        let config = {
            headers: {
                "Content-Type": "Application/Json",
                "Authorization": "JWT "+ this.props.token
            }
        };
        axios.patch(API_HTTP + 'cars/car/'+item.key+'/', {
            plate: newData[index].plate,
            brand: newData[index].brand,
            model: newData[index].model,
            year: newData[index].year,
            color: newData[index].color
        }, config)
            .then( response => {
                console.log(response);

                this.setState({
                    dataSource: newData,
                });

            }).catch(error=>{
            console.log(error);
        });



    };

    showModal = () => {
        this.setState({
            modalVisible: !this.state.modalVisible
        })
    };

    render() {
        const { dataSource } = this.state;
        const components = {
            body: {
                row: EditableRow,
                cell: EditableCell,
            },
        };
        const columns = this.columns.map(col => {
            if (!col.editable) {
                return col;
            }

            return {
                ...col,
                onCell: record => ({
                    record,
                    editable: col.editable,
                    dataIndex: col.dataIndex,
                    title: col.title,
                    handleSave: this.handleSave,
                }),
            };
        });
        return (
            <div>
                <Modal title={"Add Car"} footer={''} destroyOnClose={true} onCancel={this.showModal} visible={this.state.modalVisible}>
                    <AddCarForm showModal={this.showModal} add={(values) => this.handleAdd(values)}/>
                </Modal>
                <Button
                    icon={<GrAddCircle/>}
                    onClick={this.showModal}
                    type="outlined"
                    style={{
                        marginBottom: 16,
                    }}
                >
                    Add a Car
                </Button>
                <Table
                    components={components}
                    rowClassName={() => 'editable-row'}
                    bordered
                    scroll={{x: '100%'}}
                    dataSource={dataSource}
                    columns={columns}
                />
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return{
        token: state.auth.user.token
    }
};

export default connect(mapStateToProps)(CarTable);
