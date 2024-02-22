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
const SystemLineChart = ({ system_Info }) => {
  return (
    <Card
      sx={{
        ml: 2,
        mr: 2,
        mb: 1.1,
      }}
      style={{
        fontFamily: "Arial, sans-serif",
        padding: "15px",
        borderRadius: "10px",
        overflowX: "auto",
      }}
    >
      <h6>Irradiance / Generation</h6>
      <Grid container>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart width={1100} height={300} data={system_Info}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="createdAt" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Line
              type="monotone"
              dataKey="ghi"
              stroke="#8884d8"
              dot={{ fill: "#8884d8" }}
              curve="catmullRom"
              strokeWidth={2}
            />
            <Line
              type="monotone"
              dataKey="gti"
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
export default SystemLineChart;
