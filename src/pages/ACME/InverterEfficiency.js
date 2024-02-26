import { Grid, Stack } from "@mui/material";
import React from "react";
import SitestatusBar from "../../components/dashboardPages/SitestatusBar";
import SystemLineChart from "../../components/SystemInfoPages/SystemLineChart";
import Head from "../../layout/head/Head";

const InverterEfficiency = () => {
  let timestamp = 634574676 * 1000;
  const getFormattedDateAndTimeString = (timestamp) => {
    const date = new Date(timestamp);
    return (
      <span>
        {String(date.getDate()).padStart(2, "0")}/
        {String(date.getMonth() + 1).padStart(2, "0")}/{date.getFullYear()}
        <span>&emsp;</span>
        {date
          .toLocaleString([], {
            hour: "2-digit",
            minute: "2-digit",
            hour12: true,
          })
          .toUpperCase()}
      </span>
    );
  };
  let graph = [{}];
  const data = {
    status: "Offline",
  };
  return (
    <>
      <Head title="Inverter Efficiency - Regular"></Head>
      <Grid
        container
        spacing={1}
        columnSpacing={4}
        justifyContent="space-around"
        style={{ marginTop: "68px" }}
      >
        <Grid item xs={11.7}>
          <SitestatusBar
            show="true"
            showMW="false"
            data={data}
            timestamp={timestamp}
            site_Name="Inverter Efficiency"
            getFormattedDateAndTimeString={getFormattedDateAndTimeString}
          />
        </Grid>
        <Grid item xs={12} mt={2}>
          <SystemLineChart system_Info={graph} height={400} />
        </Grid>
        <Grid item xs={12} mt={2}>
          <SystemLineChart system_Info={graph} height={400} />
        </Grid>
      </Grid>
    </>
  );
};

export default InverterEfficiency;
