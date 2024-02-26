import React, { useContext, useEffect, useState } from "react";
import { Card, Grid } from "@mui/material";
import SitestatusBar from "./SitestatusBar";
import InverterValues from "./InverterValues";
import WindDirectionSpeed from "./WindDirectionSpeed";
import { UserContext } from "../../context/UserContext";
import TemperaturesHumidity from "./TemperaturesHumidity";
import PowerGenerationGauge from "./PowerGenerationGauge";
import SystemLineChart from "../SystemInfoPages/SystemLineChart";

const SitesBoxes = () => {
  const {
    getGrid,
    dashboardBoxes,
    dashboardwind,
    dashboardGraph,
    dashboardtemperature,
  } = useContext(UserContext);
  useEffect(() => {
    getDashboardGrid();
    getDashboardWind();
    getDashboardBoxes();
    getDashboardGraph();
    getDashboardtemperature();
  }, []);
  const [wind, setWind] = useState([]);
  const [boxData, setBoxData] = useState([]);
  const [graph, setGraph] = useState([]);
  const [tableGrid, setTableGrid] = useState([]);
  const [temperatureData, setTemperatureData] = useState([]);

  const [data, setData] = useState({});

  useEffect(() => {
    boxData?.map((data) => {
      setData(data);
    });
  }, [boxData]);

  const [dateTime, setDateTime] = useState(null);
  const handleDateChange = (event) => {
    getDashboardBoxes();
    setDateTime(event.target.value);
  };
  const timestampDashboard = dateTime
    ? Math.floor(new Date(dateTime).getTime() / 1000)
    : null;
  console.log(timestampDashboard - 120, "ffdf");
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
      counts: Math.floor(data?.DayGeneration * 100) / 100 + " MWH",
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
      imagePath: "/Image/humidity.png",
      imageHeight: 48,
    },
    {
      data: "Custom Card",
      color: "#E66794",
      name: "Ambient_Temp",
      icon: "ni ni-folders-fill",
      counts: Math.floor(data?.Ambient_temp * 100) / 100,
      // counts: "356.90",
      imagePath: "/Image/thermometer.png",
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
  //GetApis
  const getDashboardBoxes = () => {
    let startTime;
    let endTime;
    if (timestampDashboard == null) {
      startTime = Math.floor(Date.now() / 1000 - 120);
      endTime = Math.floor(Date.now() / 1000);
    } else {
      startTime = timestampDashboard - 120;
      endTime = timestampDashboard;
    }

    let data = {
      startTime: startTime,
      endTime: Math.floor(Date.now() / 1000),
    };

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
    let startTime;
    let endTime;
    if (timestampDashboard == null) {
      startTime = Math.floor(Date.now() / 1000 - 120);
      endTime = Math.floor(Date.now() / 1000);
    } else {
      startTime = timestampDashboard - 120;
      endTime = timestampDashboard;
    }
    let data = {
      startTime: startTime,
      endTime: Math.floor(Date.now() / 1000),
    };
    console.log(data, "its me");

    dashboardtemperature(
      data,
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
    let startTime;
    let endTime;
    if (timestampDashboard == null) {
      startTime = Math.floor(Date.now() / 1000 - 120);
      endTime = Math.floor(Date.now() / 1000);
    } else {
      startTime = timestampDashboard - 120;
      endTime = timestampDashboard;
    }
    let data = {
      startTime: startTime,
      endTime: Math.floor(Date.now() / 1000),
    };
    dashboardwind(
      data,
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
    let startTime;
    let endTime;
    if (timestampDashboard == null) {
      startTime = Math.floor(Date.now() / 1000 - 120);
      endTime = Math.floor(Date.now() / 1000);
    } else {
      startTime = timestampDashboard - 120;
      endTime = timestampDashboard;
    }
    let data = {
      startTime: Math.floor(Date.now() / 1000 - 120),
      endTime: Math.floor(Date.now() / 1000),
    };
    dashboardGraph(
      data,
      (apiRes) => {
        setGraph(apiRes?.data);
      },
      (apiErr) => {
        console.log(apiErr, "apiRes");
      }
    );
  };
  //table
  const getDashboardGrid = () => {
    let data = { startTime: 1708597490, endTime: 1708597904 };
    getGrid(
      data,
      (apiRes) => {
        setTableGrid(apiRes?.data);
        formatInverterValues(apiRes?.data);
      },
      (apiErr) => {
        console.log(apiErr, "apiRes");
      }
    );
  };

  const [blockTableObjects, setBlockTableObjects] = useState([]);

  const formatInverterValues = (data) => {
    let arrayOfObjectsX = [];

    let arrayFromObject = Object.entries(data);

    const heading = [
      "L1 I",
      "L2 I",
      "L3 I",
      "L1 V",
      "L2 V",
      "L3 V",
      "Frequency",
      "DC I",
      "DC V",
      "Active Power",
      "DC Power",
      "Reactive Power",
      "PF",
      "Cab Temp",
      "IGBT Temp",
      "DC Energy",
      "S1 L1 I",
      "S1 L2 I",
      "S1 L3 I",
      "S1 L1 V",
      "S1 L2 V",
      "S1 L3 V",
      "S1 DC I",
      "S1 DC V",
      "S1 Active Power",
      "S1 DC Power",
      "S1 PF",
      "S1 IGBT Temp",

      "S2 L1 I",
      "S2 L2 I",
      "S2 L3 I",
      "S2 L1 V",
      "S2 L2 V",
      "S2 L3 V",
      "S2 DC I",
      "S2 DC V",
      "S2 Active Power",
      "S2 DC Power",
      "S2 PF",
      "S2 IGBT Temp",

      "S3 L1 I",
      "S3 L2 I",
      "S3 L3 I",
      "S3 L1 V",
      "S3 L2 V",
      "S3 L3 V",
      "S3 DC I",
      "S3 DC V",
      "S3 Active Power",
      "S3 DC Power",
      "S3 PF",
      "S3 IGBT Temp",

      "S4 L1 I",
      "S4 L2 I",
      "S4 L3 I",
      "S4 L1 V",
      "S4 L2 V",
      "S4 L3 V",
      "S4 DC I",
      "S4 DC V",
      "S4 Active Power",
      "S4 DC Power",
      "S4 PF",
      "S4 IGBT Temp",

      "S1 + S2 Peak Active Power",
      "S3 + S4 Peak Active Power",
      "S1 / S1CB1 I",
      "S2 / S1CB2 I",
      "S3 / S1CB3 I",
      "S4 / S1CB4 I",
      "S5 / S1CB5 I",
      "S6 / S1CB6 I",
      "S7 / S1CB7 I",
      "S8 / S1CB8 I",
      "S9 / S2CB1 I",
      "S10 / S2CB2 I",
      "S11 / S2CB3 I",
      "S12 / S2CB4 I",
      "S13 / S2CB5 I",
      "S14 / S2CB6 I",
      "S15 / S2CB7 I",
      "S16 / S2CB8 I",
      "S17 / S3CB1 I",
      "S18 / S3CB2 I",
      "S19 / S3CB3 I",
      "S20 / S3CB4 I",
      "S21 / S3CB5 I",
      "S22 / S3CB6 I",
      "S23 / S3CB7 I",
      "S24 / S3CB8 I",
      "S25 / S4CB1 I",
      "S26 / S4CB2 I",
      "S27 / S4CB3 I",
      "S28 / S4CB4 I",
      "S29 / S4CB5 I",
      "S30 / S4CB6 I",
      "S31 / S4CB7 I",
      "S32 / S4CB8 I",
    ];

    for (let i = 0; i < heading.length; i++) {
      let inv1Value = NaN;
      let inv2Value = NaN;
      let inv3Value = NaN;
      let inv4Value = NaN;
      let inv5Value = NaN;
      let inv6Value = NaN;

      try {
        if (arrayFromObject[i][1]) {
          inv1Value = arrayFromObject[i][1];
        }
        if (arrayFromObject[heading.length + i][1]) {
          inv2Value = arrayFromObject[heading.length + i][1];
        }
        if (arrayFromObject[heading.length * 2 + i][1]) {
          inv3Value = arrayFromObject[heading.length * 2 + i][1];
        }
        if (arrayFromObject[heading.length * 3 + i][1]) {
          inv4Value = arrayFromObject[heading.length * 3 + i][1];
        }
        if (arrayFromObject[heading.length * 4 + i][1]) {
          inv5Value = arrayFromObject[heading.length * 4 + i][1];
        }
        if (arrayFromObject[heading.length * 5 + i][1]) {
          inv6Value = arrayFromObject[heading.length * 5 + i][1];
        }
      } catch (error) {}

      arrayOfObjectsX.push({
        heading: heading[i],
        inv1: inv1Value,
        inv2: inv2Value,
        inv3: inv3Value,
        inv4: inv4Value,
        inv5: inv5Value,
        inv6: inv6Value,
      });
    }
    setBlockTableObjects([...arrayOfObjectsX]);
  };

  return (
    <>
      <Grid
        container
        spacing={1}
        columnSpacing={4}
        justifyContent="space-around"
        style={{ marginTop: "68px" }}
      >
        <Grid item xs={11.7}>
          <SitestatusBar
            data={data}
            showMW="true"
            timestamp={timestampDashboard}
            handleDateChange={handleDateChange}
          />
        </Grid>
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
                borderRadius: "5px",
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
        <Grid item xs={3} mt={2}>
          <PowerGenerationGauge data={data} />
        </Grid>
        <Grid item xs={3} mt={2}>
          <TemperaturesHumidity temperatureData={temperatureData} />
        </Grid>
        <Grid item xs={2.3} mt={2}>
          <WindDirectionSpeed wind={wind} />
        </Grid>
        <Grid item xs={2.6}></Grid>
        <Grid item xs={12} mt={2}>
          <SystemLineChart
            system_Info={graph}
            height={400}
            heading="Irradiance / Generation"
          />
        </Grid>
        <Grid item xs={11.7} mt={2} mb={3}>
          <InverterValues values={blockTableObjects} />
        </Grid>
      </Grid>
    </>
  );
};

export default SitesBoxes;
