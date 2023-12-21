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
import { Card, Container, Grid } from "@mui/material";
const SystemLineChart = ({ system_Info }) => {
  const [data, setData] = useState([]);
  useEffect(() => {
    if (system_Info?.last_10_doc) {
      const newData = system_Info.last_10_doc.map((item) => {
        const originalTimestamp = item.createdAt;
        const originalDate = new Date(parseInt(originalTimestamp));

        const options = {
          year: "numeric",
          month: "2-digit",
          day: "2-digit",
          hour: "2-digit",
          minute: "2-digit",
          hour12: false,
        };

        const convertedTimestamp = originalDate.toLocaleString(
          "en-US",
          options
        );

        return {
          createdAt: convertedTimestamp,
          rx_sec: item.networkInfo.map((item) =>
            item.operstate === "up" ? item.rx_sec / 125 : ""
          ),
          tx_sec: item.networkInfo.map((item) =>
            item.operstate === "up" ? item.tx_sec / 125 : ""
          ),
        };
      });

      setData(newData);
    }
  }, [system_Info]);
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
      }}
    >
      <h6>Disk Storage</h6>
      <Grid container>
        {/* <Container>
          <LineChart width={1100} height={300} data={data}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="createdAt" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Line
              type="monotone"
              dataKey="rx_sec"
              stroke="#8884D8"
              dot={{ r: 5 }}
              name="Rx"
            />
            <Line
              type="monotone"
              dataKey="tx_sec"
              stroke="#82CA9D"
              dot={{ r: 5 }}
              name="Tx"
            />
          </LineChart>
        </Container> */}
        <ResponsiveContainer width="100%" height={300}>
          <LineChart width={1100} height={300} data={data}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="createdAt" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Line
              type="monotone"
              dataKey="rx_sec"
              stroke="#8884d8"
              dot={{ fill: "#8884d8" }}
              curve="catmullRom"
              strokeWidth={2} // Set the stroke width for series1
            />
            <Line
              type="monotone"
              dataKey="tx_sec"
              stroke="#82CA9D"
              dot={{ fill: "#82ca9d" }}
              name="Tx"
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
