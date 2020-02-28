import React, { useState, useEffect } from "react";
import { useQuery } from "@apollo/react-hooks";
import { FETCH_APPOINTMENTS_QUERY } from "../../util/graphql";
import UpcommingAppointments from "../../components/admin/dashboard/UpcommingAppointments";

import Layout from "../../components/admin/layout/Layout";
import {
  Content,
  DSection,
  DGrid,
  Overlay
} from "../../components/styled/containers";
import { Line, Bar, Doughnut } from "react-chartjs-2";

const Dashboard = () => {
  const [appointments, setAppointments] = useState([]);
  const [percentage, setpercentage] = useState(1);
  const [chartData, setChartData] = useState([]);

  useEffect(() => {
    setpercentage(80);

    setChartData({
      labels: [
        "Jan",
        "Feb",
        "Mar",
        "Apr",
        "May",
        "Jun",
        "Jul",
        "Aug",
        "Sep",
        "Oct",
        "Nov",
        "Dec"
      ],
      datasets: [
        {
          label: "# of Appointments",
          data: [12, 19, 3, 5, 2, 3, 10, 22, 24, 19, 30, 33],
          backgroundColor: [
            "rgba(255, 99, 132, 0.7)",
            "rgba(54, 162, 235, 0.7)",
            "rgba(255, 206, 86, 0.7)",
            "rgba(75, 192, 192, 0.7)",
            "rgba(153, 102, 255, 0.7)",
            "rgba(234, 103, 64, 0.7)",
            "rgba(75, 59, 64, 0.7)",
            "rgba(75, 159, 64, 0.7)",
            "rgba(55, 15, 64, 0.7)",
            "rgba(55, 59, 44, 0.7)",
            "rgba(25, 59, 34, 0.7)",
            "rgba(25, 159, 64, 0.7)"
          ],
          borderColor: [
            "rgba(255, 99, 132, 1)",
            "rgba(54, 162, 235, 1)",
            "rgba(255, 206, 86, 1)",
            "rgba(75, 192, 192, 1)",
            "rgba(153, 102, 255, 1)",
            "rgba(255, 159, 64, 1)"
          ],
          borderWidth: 1
        }
      ]
    });
  }, [setpercentage, setChartData]);

  const options = {
    scales: {
      xAxes: [
        {
          gridLines: {
            display: false
          },
          display: false
        }
      ],
      yAxes: [
        {
          gridLines: {
            display: false
          },
          display: false
        }
      ]
    },
    legend: {
      display: false
    }
  };

  const { loading, data } = useQuery(FETCH_APPOINTMENTS_QUERY);

  useEffect(() => {
    if (data) {
      setAppointments(data.appointments);
    }
  }, [data]);

  return (
    <Layout>
      <DSection
        height="20vh"
        width="100%"
        flex
        justify="space-around"
        align="center"
        margin="20px 0"
      >
        <Content width="200px" height="100px" rounded>
          <Line data={chartData} options={options}></Line>
          <Overlay
            className="dark"
            bg={"rgba(0,0,0,0.3)"}
            flex
            justify="center"
            align="center"
            direct="column"
          >
            <h3 style={{ border: "1px solid #fff" }}>Members</h3>
            <h2>20</h2>
          </Overlay>
        </Content>
        <Content width="200px" height="100px" rounded>
          <Line data={chartData} options={options}></Line>
          <Overlay
            className="dark"
            bg={"rgba(0,0,0,0.2)"}
            flex
            justify="center"
            align="center"
            direct="column"
          >
            <h3 style={{ border: "1px solid #fff" }}>Appointments</h3>
            <h2>70</h2>
          </Overlay>
        </Content>
        <Content width="200px" height="100px" rounded>
          <Line data={chartData} options={options}></Line>
          <Overlay
            className="dark"
            bg={"rgba(0,0,0,0.2)"}
            flex
            justify="center"
            align="center"
            direct="column"
          >
            <h3 style={{ border: "1px solid #fff" }}>Inquiries</h3>
            <h2>20</h2>
          </Overlay>
        </Content>
      </DSection>
      <DSection height="100%" margin="20px 0 20px 0">
        <DGrid gap="40px">
          <DGrid two>
            <Content width="100%" height="auto">
              <Bar data={chartData}></Bar>
            </Content>

            <Content width="100%" height="auto">
              <Doughnut data={chartData}></Doughnut>
            </Content>
          </DGrid>

          <Content height="40vh" width="100%">
            {loading ? (
              <Overlay flex justify="center" align="center">
                <h2>Loading...</h2>
              </Overlay>
            ) : (
              data.appointments && (
                <UpcommingAppointments
                  appointments={appointments}
                  loading={loading}
                />
              )
            )}
          </Content>
        </DGrid>
      </DSection>
    </Layout>
  );
};

export default Dashboard;
