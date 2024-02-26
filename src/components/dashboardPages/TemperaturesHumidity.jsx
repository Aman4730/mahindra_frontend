import React, { useEffect, useState } from "react";
import { Card, Grid, Typography } from "@mui/material";
import { Bar, BarChart, CartesianGrid, Cell, XAxis, YAxis } from "recharts";

const CustomTooltip = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    const labelStr = String(label);
    return (
      <div style={{ color: "#009688" }}>
        {labelStr.split(" ")[0]}: {payload[0].value}
        {label === "Humidity" ? "%" : "°C"}
      </div>
    );
  }

  return null;
};

const CustomizedLabel = ({ x, y, fill, value, index }) => {
  return (
    <text
      x={x}
      y={y}
      dx="10"
      dy="-10"
      fontFamily="sans-serif"
      fill={fill}
      textAnchor="middle"
    >
      {value}
      {index === 2 ? "%" : "°C"}
    </text>
  );
};
const TemperaturesHumidity = ({ temperatureData }) => {
  const [temperature, setTemperature] = useState({});
  useEffect(() => {
    temperatureData?.map((data) => {
      setTemperature(data);
    });
  }, [temperatureData]);
  const data1 = [
    {
      name: "Ambient",
      // value: Number(ambientTemp) === -111 ? "x" : ambientTemp,
      value: Math.floor(temperature?.ambient_temp * 100) / 100,
    },
    {
      name: "Module",
      value: Math.floor(temperature?.module_temp * 100) / 100,
    },
    {
      name: "Humidity",
      value: Math.floor(temperature?.humidity * 100) / 100,
    },
  ];
  return (
    <Card
      elevation={6}
      style={{
        paddingTop: ".5rem",
        paddingBottom: ".5rem",
        paddingLeft: ".25rem",
        paddingRight: ".25rem",
        height: 290,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "space-between",
        borderRadius: "5px",
      }}
    >
      <Typography variant="h6">Temperatures {" and "} Humidity</Typography>
      <BarChart
        width={300}
        height={240}
        data={data1}
        margin={{ right: 50 }}
        barSize={20}
      >
        <XAxis dataKey="name" scale="point" padding={{ left: 30 }} />
        <YAxis domain={[0, 100]} />
        {/* <Tooltip /> */}
        <CartesianGrid strokeDasharray="3 3" />
        <Bar
          isAnimationActive={false}
          dataKey="value"
          fill="#8884d8"
          background={{ fill: "#eee" }}
          label={<CustomizedLabel />}
        >
          {/* <LabelList dataKey='name' content={renderCustomizedLabel} /> */}
          {data1.map((entry, index) => (
            <Cell
              cursor="pointer"
              fill={
                index === 0 ? "#42a5f5" : index === 1 ? "#82ca9d" : "#8884d8"
              }
              key={`cell-${index}`}
            />
          ))}
        </Bar>
      </BarChart>
    </Card>
  );
};

export default TemperaturesHumidity;
