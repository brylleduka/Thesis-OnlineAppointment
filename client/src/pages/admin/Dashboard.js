import React, { useState, useEffect } from "react";
import { useQuery } from "@apollo/react-hooks";
import { FETCH_CURRENT_APPOINTMENTS } from "../../util/graphql/appointment";
import UpcommingAppointments from "../../components/admin/dashboard/UpcommingAppointments";

import Layout from "../../components/admin/layout/Layout";
import {
  Content,
  DSection,
  DGrid,
  Overlay,
  DCard
} from "../../components/styled/containers";
import { Bar, Doughnut } from "react-chartjs-2";
import Cards from "../../components/admin/dashboard/Cards";

const Dashboard = () => {
  const [appointments, setAppointments] = useState([]);
  // const [percentage, setpercentage] = useState(1);
  // const [chartData, setChartData] = useState([]);

  // useEffect(() => {
  //   setpercentage(80);

  //   setChartData({
  //     labels: [
  //       "Jan",
  //       "Feb",
  //       "Mar",
  //       "Apr",
  //       "May",
  //       "Jun",
  //       "Jul",
  //       "Aug",
  //       "Sep",
  //       "Oct",
  //       "Nov",
  //       "Dec"
  //     ],
  //     datasets: [
  //       {
  //         label: "# of Appointments",
  //         data: [12, 19, 3, 5, 2, 3, 10, 22, 24, 19, 30, 33],
  //         backgroundColor: [
  //           "rgba(255, 99, 132, 0.2)",
  //           "rgba(54, 162, 235, 0.7)",
  //           "rgba(255, 206, 86, 0.7)",
  //           "rgba(75, 192, 192, 0.7)",
  //           "rgba(153, 102, 255, 0.7)",
  //           "rgba(234, 103, 64, 0.7)",
  //           "rgba(75, 59, 64, 0.7)",
  //           "rgba(75, 159, 64, 0.7)",
  //           "rgba(55, 15, 64, 0.7)",
  //           "rgba(55, 59, 44, 0.7)",
  //           "rgba(25, 59, 34, 0.7)",
  //           "rgba(25, 159, 64, 0.7)"
  //         ],
  //         borderColor: [
  //           "rgba(255, 99, 132, 1)",
  //           "rgba(54, 162, 235, 1)",
  //           "rgba(255, 206, 86, 1)",
  //           "rgba(75, 192, 192, 1)",
  //           "rgba(153, 102, 255, 1)",
  //           "rgba(255, 159, 64, 1)"
  //         ],
  //         borderWidth: 1
  //       }
  //     ]
  //   });
  // }, [setpercentage, setChartData]);

  // const options = {
  //   scales: {
  //     xAxes: [
  //       {
  //         gridLines: {
  //           display: false
  //         },
  //         display: false
  //       }
  //     ],
  //     yAxes: [
  //       {
  //         gridLines: {
  //           display: false
  //         },
  //         display: false
  //       }
  //     ]
  //   },
  //   legend: {
  //     display: false
  //   }
  // };

  const { loading, data } = useQuery(FETCH_CURRENT_APPOINTMENTS);

  useEffect(() => {
    if (data) {
      setAppointments(data.currentAppointments);
    }
  }, [data]);

  return (
    <Layout>
      <Cards />
      <DSection height="100%" margin="20px 0 20px 0">
        <DGrid gap="40px">
          {/* <DGrid two>
            <Content width="100%" height="auto">
              <Bar data={chartData}></Bar>
            </Content>

            <Content width="100%" height="auto">
              <Doughnut data={chartData}></Doughnut>
            </Content>
          </DGrid> */}

          <Content height="40vh" width="100%">
            {loading ? (
              <Overlay flex justify="center" align="center">
                <h2>Loading...</h2>
              </Overlay>
            ) : (
              data.currentAppointments && (
                <UpcommingAppointments
                  appointments={data.currentAppointments}
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
