import React, { useEffect, useState } from "react";
import Compass from "./Compass";
import { Card, Typography } from "@mui/material";

export default function WindDirectionSpeed({
  windDirection,
  windSpeed,
  rain,
  wind,
}) {
  const [data, setData] = useState({});
  console.log(wind);

  useEffect(() => {
    let isMounted = true;
    wind?.map((data) => {
      if (isMounted) {
        setData(data);
      }
    });
    return () => {
      isMounted = false;
    };
  }, []);
  return (
    <Card
      elevation={6}
      style={{
        padding: ".5rem 1rem",
        height: 300,
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
      }}
    >
      <Typography align="center" variant="h6">
        Wind <span style={{ color: "#4caf50" }}>Direction</span>
        {" & "}
        <span style={{ color: "#2196f3" }}>Speed</span>
      </Typography>
      <div style={{ textAlign: "center", padding: ".5rem" }}>
        <Compass
          size={Number.isNaN(rain) === true ? 170 : 150}
          rotate={windDirection}
        />
      </div>
      <div>
        <Typography align="center" variant="h6">
          <span
            style={{
              color: "#4caf50",
            }}
          >
            <span>{Math.floor(data.wind_dir * 100) / 100} °</span>
          </span>
          <span
            style={{
              marginLeft: "1rem",
              color: "#2196f3",
            }}
          >
            {<span>{Math.floor(data.wind_speed * 100) / 100} m/s</span>}
          </span>
        </Typography>
        {!Number.isNaN(rain) && (
          <Typography
            // variant="h6"
            color="textSecondary"
            align="center"
            style={{ marginTop: ".25rem", marginBottom: ".25rem" }}
          >
            Rain: {Number(rain) === -111 ? "x" : <span>{data?.rain} mm</span>}
          </Typography>
        )}
      </div>
    </Card>
  );
}
