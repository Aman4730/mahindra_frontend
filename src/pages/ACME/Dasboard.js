import React, { useContext, useEffect, useState } from "react";
import { Stack } from "@mui/material";
import Head from "../../layout/head/Head";
import "react-datepicker/dist/react-datepicker.css";
import { UserContext } from "../../context/UserContext";
import DataGridCard from "../../components/dashboardPages/DataGridCard";
import ProgressBarchat from "../../components/dashboardPages/ProgressBarchat";
const Dashboard = () => {
  // Destructure useContext variables
  const {
    dashboard,
    dashboardBoxes,
    dashboardwind,
    dashboardGraph,
    dashboardtemperature,
  } = useContext(UserContext);
  const [wind, setWind] = useState([]);
  const [boxData, setBoxData] = useState([]);
  const [tableData, setTableData] = useState([]);
  const [graph, setGraph] = useState([]);
  const [temperatureData, setTemperatureData] = useState([]);
  useEffect(() => {
    getDashboardWind();
    getDashboardBoxes();
    getDashboardTable();
    getDashboardGraph();
    getDashboardtemperature();
  }, []);

  //dashboard table
  const getDashboardTable = () => {
    dashboard(
      {},
      (apiRes) => {
        setTableData(apiRes?.data);
      },
      (apiErr) => {
        console.log(apiErr, "apiRes");
      }
    );
  };
  //Boxes
  const getDashboardBoxes = () => {
    let data = { startTime: 1708502470, endTime: 1708502511 };
    dashboardBoxes(
      data,
      (apiRes) => {
        setBoxData(apiRes?.data);
      },
      (apiErr) => {
        console.log(apiErr, "apiRes");
      }
    );
  };
  //temperature
  const getDashboardtemperature = () => {
    dashboardtemperature(
      {},
      (apiRes) => {
        setTemperatureData(apiRes?.data);
      },
      (apiErr) => {
        console.log(apiErr, "apiRes");
      }
    );
  };
  //wind
  const getDashboardWind = () => {
    dashboardwind(
      {},
      (apiRes) => {
        setWind(apiRes?.data);
      },
      (apiErr) => {
        console.log(apiErr, "apiRes");
      }
    );
  };
  //graph
  const getDashboardGraph = () => {
    let data = { startTime: 1708597490, endTime: 1708597904 };
    dashboardGraph(
      data,
      (apiRes) => {
        console.log(apiRes, "apiRes");
        setGraph(apiRes?.data);
      },
      (apiErr) => {
        console.log(apiErr, "apiRes");
      }
    );
  };
  return (
    <React.Fragment>
      <Head title="Dashboard - Regular"></Head>
      <Stack style={{ marginTop: "75px" }} p={1}>
        <ProgressBarchat />
        <DataGridCard
          wind={wind}
          graph={graph}
          boxData={boxData}
          tableData={tableData}
          temperatureData={temperatureData}
        />
      </Stack>
    </React.Fragment>
  );
};
export default Dashboard;
