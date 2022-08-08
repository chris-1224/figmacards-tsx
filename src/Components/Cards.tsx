import React, { useState } from "react";
import "antd/dist/antd.css";
import { Layout } from "antd";
import { Input, Col, Row, Button, Modal, Form } from "antd";
import { Card } from "antd";

import "./Sidenav.css";

const { Content } = Layout;

type card_det_props = {
  id: any;
  title: string;
  icon: any;
  desc_id: string;
  card1_p: string;
  card2_p: string;
  refresh: any;
};

const Cards = (props: card_det_props) => {
  // Card Hover
  const [isActive, setIsActive] = useState(true);

  const handleMousecard = () => {
    setIsActive((isActive) => !isActive);
  };

  // Modal
  const [isModalVisible, setIsModalVisible] = useState(false);

  const showModal = () => {
    setIsModalVisible(true);
  };

  // Fetching Data from local storage to card
  const [employeeName, setEmployeeName] = useState(props.title);
  const [empdesignation, setEmployeeDesignation] = useState(props.desc_id);
  const [employeedetails, setEmployeeDetails] = useState(props.card1_p);

  const Edit = () => {
    let employeeDetail = JSON.parse(
      `${localStorage.getItem("employeeDetail")}`
    );
    let data = employeeDetail.map((value: any) => {
      if (
        value.title === props.title &&
        value.desc_id === props.desc_id &&
        value.card1_p === props.card1_p
      ) {
        return {
          ...value,
          title: employeeName,
          desc_id: empdesignation,
          card1_p: employeedetails,
        };
      }
      return value;
    });
    localStorage.setItem("employeeDetail", JSON.stringify(data));
    props.refresh();
    // window.localStorage.reload();
    setIsModalVisible(false);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  // Delete card
  const deleteCard = () => {
    let employeeDetail = JSON.parse(
      `${localStorage.getItem("employeeDetail")}`
    );
    for (let index = 0; index < employeeDetail.length; index++) {
      if (props.id === employeeDetail[index].id) {
        employeeDetail = [
          ...employeeDetail.slice(0, index),

          ...employeeDetail.slice(index + 1),
        ];
      }
    }
    localStorage.setItem("employeeDetail", JSON.stringify(employeeDetail));
    props.refresh();
    // window.localStorage.reload();
  };

  // Form item check
  const onFinish = (values: any) => {
    console.log("Success:", values);
  };

  const onFinishFailed = (errorInfo: any) => {
    console.log("Failed:", errorInfo);
  };

  return (
    <Content style={{ margin: "20px 10px" }}>
      <Row gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }}>
        <Col className="gutter-row" span={6}>
          <Card style={{ width: 280, height: 140 }} className="card1">
            <div
              className={
                isActive ? "site-card-border-less-wrapper" : "hoverdis"
              }
              onMouseEnter={handleMousecard}
            >
              <Row>
                <Col span={6}>
                  <img src={props.icon} alt="" />
                </Col>
                <Col span={18}>
                  <h3 className="cardTitle">{props.title}</h3>
                  <p className="cardPara">{props.desc_id}</p>
                  <p className="cardSpan">{props.card1_p}</p>
                </Col>
              </Row>
            </div>

            <div
              className={
                isActive ? "hoverdis" : "site-card-border-less-wrapper"
              }
              onMouseLeave={handleMousecard}
            >
              <p className="card2hp"> {props.card2_p} </p>
              <Button className="dltbtn" onClick={deleteCard}>
                Delete
              </Button>
              <Button type="primary" className="card2btn" onClick={showModal}>
                View Details
              </Button>
              <Modal
                visible={isModalVisible}
                onOk={Edit}
                onCancel={handleCancel}
                className="viewdet"
                footer={null}
              >
                <Row>
                  <Col span={6}>
                    <img src={props.icon} alt="" />
                  </Col>
                  <Col span={18}>
                    <h3 className="cardTitle">{props.title}</h3>
                    <p className="cardPara">{props.desc_id}</p>
                    <p className="cardSpan">{props.card1_p}</p>
                  </Col>
                </Row>
                <Row>
                  <Col span={24}>
                    <Form
                      name="basic"
                      labelCol={{ span: 8 }}
                      wrapperCol={{ span: 16 }}
                      initialValues={{ remember: true }}
                      onFinish={onFinish}
                      onFinishFailed={onFinishFailed}
                      autoComplete="off"
                    >
                      <Form.Item className="EmpName" label="Employee Name">
                        <Input
                          className="empname"
                          value={employeeName}
                          onChange={(value: any) =>
                            setEmployeeName(value.target.value)
                          }
                        />
                      </Form.Item>

                      <Form.Item className="EmpDesg" label="Designation">
                        <Input
                          className="empname"
                          value={empdesignation}
                          onChange={(value: any) =>
                            setEmployeeDesignation(value.target.value)
                          }
                        />
                      </Form.Item>
                      <Form.Item className="Empdet" label="Employee Details">
                        <Input
                          className="empname"
                          value={employeedetails}
                          onChange={(value: any) =>
                            setEmployeeDetails(value.target.value)
                          }
                        />
                      </Form.Item>
                    </Form>
                  </Col>
                </Row>
                <Row>
                  <Button type="primary" className="editbtn" onClick={Edit}>
                    Edit
                  </Button>
                  <Button className="cancelbtn" onClick={handleCancel}>
                    Cancel
                  </Button>
                </Row>
              </Modal>
            </div>
          </Card>
        </Col>
      </Row>
    </Content>
  );
};

export default Cards;
