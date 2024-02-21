import React, { useContext, useEffect, useState } from "react";
import { Stack } from "@mui/material";
import Head from "../../layout/head/Head";
import "react-datepicker/dist/react-datepicker.css";
import { UserContext } from "../../context/UserContext";
import DataGridCard from "../../components/dashboardPages/DataGridCard";
import ProgressBarchat from "../../components/dashboardPages/ProgressBarchat";
import axios from "axios";
const Dashboard = () => {
  // Destructure useContext variables
  const { getUserData, dashboard } = useContext(UserContext);
  const [tableData, setTableData] = useState([]);
  useEffect(() => {
    getDashboardTable();
  }, []);

  //dashboard table
  // const getDashboardTable = () => {
  //   dashboard(
  //     {},
  //     (apiRes) => {
  //       console.log(apiRes, "apiRes");
  //       // setTableData(apiRes.data.userData);
  //     },
  //     (apiErr) => {
  //       console.log(apiErr, "apiRes");
  //     }
  //   );
  // };

  const getDashboardTable = () => {
    axios
      .post("http://192.168.1.14:3000/dashboard", {})
      .then((response) => {
        setTableData(response?.data);
        console.log(response, "response");
      })
      .catch((error) => {
        console.error("Error during login:", error);
      });
  };
  return (
    <React.Fragment>
      <Head title="Dashboard - Regular"></Head>
      <Stack style={{ marginTop: "75px" }} p={1}>
        <ProgressBarchat />
        <DataGridCard tableData={tableData} />
      </Stack>
    </React.Fragment>
  );
};
export default Dashboard;
