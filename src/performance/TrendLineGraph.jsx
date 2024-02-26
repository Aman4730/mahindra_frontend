import React, { useEffect, useState } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  CartesianGrid,
  ResponsiveContainer,
} from "recharts";
import { Card, Grid } from "@mui/material";
const TrendLineGraph = ({ system_Info, height, heading }) => {
  console.log(system_Info.charts);
  const graph = system_Info;
  console.log(graph, "graph");
  return (
    <Card
      sx={{
        ml: 2,
        mr: 2,
        mb: 1.1,
      }}
      elevation={6}
      style={{
        fontFamily: "Arial, sans-serif",
        padding: "15px",
        borderRadius: "10px",
        overflowX: "auto",
        borderRadius: "5px",
      }}
    >
      <h6>{heading}</h6>
      <Grid container>
        <ResponsiveContainer width="100%" height={height}>
          <LineChart data={graph}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="createdAt" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Line
              type="monotone"
              dataKey="Humidity_Instant-I01_y1"
              stroke="#8884d8"
              dot={{ fill: "#8884d8" }}
              curve="catmullRom"
              strokeWidth={2}
            />
            <Line
              type="monotone"
              dataKey="Humidity_Instant-I01_y2"
              stroke="#DA9619"
              dot={{ fill: "#8884d8" }}
              curve="catmullRom"
              strokeWidth={2}
            />
          </LineChart>
        </ResponsiveContainer>
      </Grid>
    </Card>
  );
};
export default TrendLineGraph;
