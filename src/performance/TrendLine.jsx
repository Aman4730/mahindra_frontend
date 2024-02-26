import React, { useContext, useEffect, useState } from "react";
import Head from "../layout/head/Head";
import { DatePicker, Space } from "antd";
import { Autocomplete, Button, Grid, TextField } from "@mui/material";
import SystemLineChart from "../components/SystemInfoPages/SystemLineChart";
import { UserContext } from "../context/UserContext";
import TrendLineGraph from "./TrendLineGraph";

const TrendLine = () => {
  const { gettrendline } = useContext(UserContext);
  const [trendLineGraph, setTrendLineGraph] = useState([]);
  const [trendline, setTrendline] = useState({
    site: "",
    start_date: "",
    end_date: "",
    Y1_Cat: "",
    Y1_Param: [],
    Y2_Cat: "",
    Y2_Param: "",
  });
  console.log(trendline, "trendline");
  const handleChange = (event) => {
    const { name, value } = event.target;
    setTrendline((prev) => {
      return {
        ...prev,
        [name]: value,
      };
    });
  };
  //   useEffect(() => {
  //     getTrendlineGraph();
  //   }, []);

  const y1CategoryParameters = [
    {
      category: "WMS",
      parameters: [
        "Humidity Instant",
        "Wind Speed Instant",
        "Wind Dir Instant",
        "Rain",
        "GHI Instant",
        "GHI Instant2",
        "GTI Instant",
        "GTI Instant2",
        "Mod. Temp Instant",
        "Mod. Temp Instant2",
        "Mod. Temp 2 Instant",
        "Amb. Temp Instant",
      ],
    },
    {
      category: "Plant",
      parameters: [
        "PA Instant",
        "GA Instant",
        "Plant PR Instant",
        "Day Generation Cumulative (KWH)",
        "Power Generation Instant (MW)",
        "Peak Power",
        "Revenue",
      ],
    },
    {
      category: "Inverter",
      parameters: [
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
      ],
    },
    {
      category: "Inv Scb",
      parameters: [
        "S1",
        "S2",
        "S3",
        "S4",
        "S5",
        "S6",
        "S7",
        "S8",
        "S9",
        "S10",
        "S11",
        "S12",
        "S12",
        "S13",
        "S14",
        "S15",
        "S16",
        "S17",
        "S18",
        "S19",
        "S20",
        "S21",
        "S22",
        "S23",
        "S24",
        "S25",
        "S26",
        "S27",
        "S28",
        "S29",
        "S30",
        "S31",
        "S32",
      ],
    },
    {
      category: "Inv Slots",
      parameters: [
        "S1 L1 I",
        "S1 L3 I",
        "S1 L1 V",
        "S1 L2 V",
        "S1 L3 V",
        "S1 DC I",
        "S1 DC V",
        "S1 Active Power",
        "S1 PF",
        "S1 DC Power",
        "S1 IGBT Temp",
        "S1 CAB Temp",
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
        "S2 CAB Temp",
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
        "S3 CAB Temp",
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
        "S4 IGBT Temp",
        "S4 CAB Temp",
        "S1 + S2 Peak Active Power",
        "S3 + S4 Peak Active Power",
      ],
    },
    {
      category: "Calculated",
      parameters: ["Inv Efficiency", "Calculated PR"],
    },
  ];

  let graph = [{}];

  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedParameter, setSelectedParameter] = useState([]);
  const [selectedCategory1, setSelectedCategory1] = useState("");
  const [selectedParameter1, setSelectedParameter1] = useState([]);

  const handleCategoryChange = (event, newValue) => {
    setSelectedCategory(newValue);
  };
  const handleParameterChange = (event, newValue) => {
    setSelectedParameter(newValue);
  };

  const handleCategoryChange1 = (event, newValue) => {
    setSelectedCategory1(newValue);
  };
  const handleParameterChange1 = (event, newValue) => {
    setSelectedParameter1(newValue);
  };
  const getTrendlineGraph = () => {
    let data = {
      site: trendline?.site,
      // endTime: Math.floor(new Date(trendline?.start_date).getTime() / 1000),
      // startTime: Math.floor(new Date(trendline.end_date).getTime() / 1000 ),
      endTime: 1708938503,
      startTime: 1708933906,
      y1Category: [selectedCategory],
      y1Parameter: selectedParameter,
      y2Category: [selectedCategory1],
      y2Parameter: selectedParameter1,
    };
    gettrendline(
      data,
      (apiRes) => {
        console.log(apiRes, "apiRes");
        setTrendLineGraph(apiRes?.data);
      },
      (apiErr) => {
        console.log(apiErr, "apiErr");
      }
    );
  };
  return (
    <React.Fragment>
      <Head title="CSV - Regular"></Head>
      <Grid container spacing={1} ml={1} flexDirection="row" id="form">
        <Grid item xs={1.5}>
          <Autocomplete
            fullWidth
            disablePortal
            size="small"
            id="Authentication"
            options={["ASPL"]}
            renderInput={(params) => (
              <TextField
                {...params}
                label="Site"
                name="site"
                value={trendline.site}
                onChange={handleChange}
                style={{ backgroundColor: "white" }}
              />
            )}
          />
        </Grid>
        <Grid item xs={2}>
          <Autocomplete
            fullWidth
            disablePortal
            size="small"
            id="Category"
            options={y1CategoryParameters.map((ele) => ele?.category)}
            value={selectedCategory}
            onChange={handleCategoryChange}
            renderInput={(params) => (
              <TextField
                {...params}
                label="Y1 Cat"
                name="Y1_Cat"
                style={{ backgroundColor: "white" }}
              />
            )}
          />
        </Grid>
        <Grid item xs={2}>
          <Autocomplete
            fullWidth
            multiple
            disablePortal
            size="small"
            id="Parameter"
            options={
              selectedCategory
                ? y1CategoryParameters.find(
                    (ele) => ele.category === selectedCategory
                  ).parameters
                : []
            }
            value={selectedParameter}
            onChange={handleParameterChange}
            renderInput={(params) => (
              <TextField
                {...params}
                label="Y1 Param"
                name="Y1_Param"
                style={{ backgroundColor: "white" }}
              />
            )}
          />
        </Grid>
        <Grid item xs={2}>
          <Autocomplete
            fullWidth
            disablePortal
            size="small"
            id="Category"
            options={y1CategoryParameters.map((ele) => ele.category)}
            value={selectedCategory1}
            onChange={handleCategoryChange1}
            renderInput={(params) => (
              <TextField
                {...params}
                label="Y2 Cat"
                name="Y2_Cat"
                style={{ backgroundColor: "white" }}
              />
            )}
          />
        </Grid>
        <Grid item xs={2}>
          <Autocomplete
            fullWidth
            multiple
            disablePortal
            size="small"
            id="Parameter"
            options={
              selectedCategory
                ? y1CategoryParameters.find(
                    (ele) => ele.category === selectedCategory
                  ).parameters
                : []
            }
            value={selectedParameter1}
            onChange={handleParameterChange1}
            renderInput={(params) => (
              <TextField
                {...params}
                label="Y2 Param"
                name="Y2_Param"
                style={{ backgroundColor: "white" }}
              />
            )}
          />
        </Grid>
        <Grid item xs={2}>
          <Space direction="vertical" size={12}>
            <DatePicker
              onChange={(date, dateString) =>
                handleChange({
                  target: { name: "start_date", value: dateString },
                })
              }
              placeholder="Start Date"
              needConfirm={false}
              style={{ width: "230px", height: "40px" }}
            />
          </Space>
        </Grid>
        <Grid item xs={2}>
          <Space direction="vertical">
            <DatePicker
              onChange={(date, dateString) =>
                handleChange({
                  target: { name: "end_date", value: dateString },
                })
              }
              placeholder="End Date"
              needConfirm={false}
              style={{ width: "230px", height: "40px" }}
            />
          </Space>
        </Grid>
        <Grid item xs={2}>
          <Button
            variant="outlined"
            style={{ height: "39px" }}
            onClick={() => getTrendlineGraph()}
          >
            VIEW
          </Button>
        </Grid>
      </Grid>
      <Grid item xs={12} mt={2}>
        <TrendLineGraph system_Info={trendLineGraph} height={400} heading="" />
      </Grid>
    </React.Fragment>
  );
};

export default TrendLine;
