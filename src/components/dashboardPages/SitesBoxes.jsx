import React, { useEffect, useState } from "react";
import { Card, Grid } from "@mui/material";
import { useHistory } from "react-router-dom";
import InverterValues from "./InverterValues";
import { useLocation } from "react-router-dom";
import WindDirectionSpeed from "./WindDirectionSpeed";
import TemperaturesHumidity from "./TemperaturesHumidity";
import IrradianceGeneration from "./IrradianceGeneration";
import SystemLineChart from "../SystemInfoPages/SystemLineChart";

const SitesBoxes = () => {
  const [data, setData] = useState({});
  const history = useHistory();
  const location = useLocation();
  let wind = location?.state?.wind;
  let graph = location?.state?.graph;
  let boxData = location?.state?.boxData;
  let temperatureData = location?.state?.temperatureData;
  useEffect(() => {
    let isMounted = true;
    boxData?.map((data) => {
      if (isMounted) {
        setData(data);
      }
    });
    return () => {
      isMounted = false;
    };
  }, []);
  const counts = {
    workspaceCount: 4,
    TeamSpace: 5,
    folders: 5,
    files: 3,
    approvals: 8,
  };
  let arr = [
    {
      data: "Custom Card",
      color: "#5984ED",
      name: "Generation",
      icon: "ni ni-google-wallet",
      counts: Math.floor(data?.DayGeneration * 100) / 100,
      // counts: "456.98",
      imagePath: "/Image/powerGeneration.png",
      imageHeight: 48,
      // count: boxData.filter((elem) => {
      //   if (elem.name === "Generation") {
      //     return elem.count;
      //   }
      // }),
    },
    {
      data: "Custom Card",
      color: "#4BCD93",
      name: "Humidity",
      icon: "ni ni-share-fill",
      counts: Math.floor(data?.Humidity * 100) / 100,
      // counts: "556.02",
      imagePath: "/Image/solar.png",
      imageHeight: 48,
    },
    {
      data: "Custom Card",
      color: "#E66794",
      name: "Ambient_temp",
      icon: "ni ni-folders-fill",
      counts: Math.floor(data?.Ambient_temp * 100) / 100,
      // counts: "356.90",
      imagePath: "/Image/server.png",
      imageHeight: 48,
    },
    {
      data: "Custom Card",
      color: "#4CBACE",
      name: "GHI",
      icon: "ni ni-file-text-fill",
      counts: Math.floor(data?.ghi * 100) / 100,
      // counts: "256.13",
      imagePath: "/Image/ray.png",
      imageHeight: 48,
    },
    {
      data: "Custom Card",
      color: "#F4AD15",
      name: "GTI",
      icon: "ni ni-user-check-fill",
      counts: Math.floor(data?.gti * 100) / 100,
      // counts: "156.45",
      imagePath: "/Image/ray.png",
      imageHeight: 48,
    },
  ];
  let irradianceGenerationData = "656";
  let system_Info = "";
  return (
    <>
      <Grid
        container
        spacing={1}
        justifyContent="space-around"
        style={{ marginTop: "80px" }}
      >
        {arr.map((data) => (
          <Grid item key={data.name} xs={2.1}>
            <Card
              elevation={6}
              sx={{
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "space-evenly",
                height: "80px",
                textAlign: "center",
              }}
            >
              <img
                src={data.imagePath}
                alt={data.name}
                height={data.imageHeight}
                style={{ marginRight: "1rem" }}
              />
              <Grid item>
                <h6>{data.name}</h6>
                <h6>{data.counts || 0}</h6>
              </Grid>
            </Card>
          </Grid>
        ))}
        <Grid item xs={2.3} mt={2} ml={1}>
          <WindDirectionSpeed wind={wind} />
        </Grid>
        <Grid item xs={3} mt={2}>
          <TemperaturesHumidity temperatureData={temperatureData} />
        </Grid>
        <Grid item xs={3} mt={2}></Grid>
        <Grid item xs={3} mt={2}></Grid>
        <Grid item xs={12} mt={2}>
          <SystemLineChart system_Info={graph} />
        </Grid>
        <Grid item xs={11.7} mt={2} mb={3}>
          <InverterValues />
        </Grid>
      </Grid>
    </>
  );
};

export default SitesBoxes;
