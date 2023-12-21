import React, { useContext, useEffect, useState } from "react";
import { Grid, Stack } from "@mui/material";
import Head from "../../layout/head/Head";
import "react-datepicker/dist/react-datepicker.css";
import { UserContext } from "../../context/UserContext";
import ProgressBar from "../../components/SystemInfoPages/ProgressBar";
import ProgressBarchat from "../../components/SystemInfoPages/ProgressBarChart";
import SystemLineChart from "../../components/SystemInfoPages/SystemLineChart";
const SystemInfo = () => {
  const { getSystemInfo } = useContext(UserContext);
  const [system_Info, setSystem_Info] = useState([]);
  useEffect(() => {
    getsystemInfo();
  }, []);
  const getsystemInfo = () => {
    getSystemInfo(
      {},
      (apiRes) => {
        setSystem_Info(apiRes.data);
      },
      (apiErr) => {}
    );
  };
  return (
    <React.Fragment>
      <Head title="SystemInfo - Regular"></Head>
      <Stack style={{ marginTop: "80px" }}>
        <Grid container rowSpacing={1} columnSpacing={{ xs: 1, md: 2 }}>
          <Grid item xs={12} md={12}>
            <ProgressBar system_Info={system_Info} />
          </Grid>
          <Grid item xs={12} md={12}>
            <ProgressBarchat system_Info={system_Info} />
          </Grid>
          <Grid item xs={12} md={12}>
            <SystemLineChart system_Info={system_Info} />
          </Grid>
        </Grid>
      </Stack>
    </React.Fragment>
  );
};

export default SystemInfo;
