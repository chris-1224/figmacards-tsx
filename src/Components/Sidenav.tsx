import React, { useEffect, useState } from "react";
import "antd/dist/antd.css";
import { Layout, Menu } from "antd";
import "./Sidenav.css";
import { Col, Row } from "antd";
import Cards from "./Cards";

import img1 from "../images/img1.svg";
import img2 from "../images/img2.svg";
import img3 from "../images/img3a.png";
import img4 from "../images/img4.svg";
import img5 from "../images/img5.svg";
import img6 from "../images/img6.svg";
import img7 from "../images/img7.svg";
import img8 from "../images/img8a.png";
import img9 from "../images/img9.svg";

import CreateWorkflow from "./CreateWorkflow";

const { Sider } = Layout;

function Sidenav() {
  const [dispData, setCardData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let employeeDetail = JSON.parse(
      `${localStorage.getItem("employeeDetail") || "[]"}`
    );
    setCardData(employeeDetail);
    setLoading(false);
  }, [loading]);

  const refresh = () => {
    setLoading(true);
  };

  const searchcallbackdata = (Data: any) => {
    console.log(Data);
    setCardData(Data);
  };

  return (
    <div>
      <Layout>
        <Sider className="Sidenav">
          <div className="Logo">
            <img src={img1} alt="" />
          </div>
          <Menu
            theme="light"
            mode="inline"
            defaultSelectedKeys={["4"]}
            className="midicon"
          >
            <Menu.Item>
              <img src={img2} alt="" />
            </Menu.Item>
            <Menu.Item>
              <img src={img3} alt="" />
            </Menu.Item>
            <Menu.Item>
              <img src={img4} alt="" className="midicon3" />
            </Menu.Item>
            <Menu.Item>
              <img src={img5} alt="" />
            </Menu.Item>
            <Menu.Item>
              <img src={img6} alt="" />
            </Menu.Item>
          </Menu>
          <div className="boticon">
            <img src={img7} alt="" />
            <img src={img8} alt="" />
            <img src={img9} alt="" />
          </div>
        </Sider>
        <Layout>
          <CreateWorkflow
            refresh={refresh}
            searchcallbackdata={searchcallbackdata}
          />
          <div className="tet">
            {dispData.map((card: any) => {
              // console.log(card.title);
              return (
                <Row>
                  <Col span={6}>
                    <Cards
                      refresh={refresh}
                      id={card.id}
                      icon={card.icon}
                      title={card.title}
                      desc_id={card.desc_id}
                      card1_p={card.card1_p}
                      card2_p={card.card2_p}
                    />
                  </Col>
                </Row>
              );
            })}
          </div>
        </Layout>
      </Layout>
    </div>
  );
}
export default Sidenav;
