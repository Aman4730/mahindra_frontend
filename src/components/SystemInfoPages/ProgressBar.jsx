import { Card, CircularProgress, Grid, Stack, Typography } from "@mui/material";
import React from "react";

const ProgressBar = ({ system_Info }) => {
  return (
    <React.Fragment>
      <Card
        sx={{
          mr: 2,
          ml: 2,
          p: 2,
          borderRadius: "5px",
          display: "flex",
          justifyContent: "space-around",
          alignItems: "center",
          flexDirection: "row",
          overflowX: "auto", // Add overflow-x for small screens
        }}
      >
        <Grid item xs={12} sm={6} md={3}>
          <h6 style={{ width: "100%" }}>MEM & CPU</h6>
          <Stack
            sx={{
              borderRadius: "5px",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              height: "100%",
            }}
          >
            <CircularProgress
              size={140}
              variant="determinate"
              style={{ color: "green" }}
              value={system_Info.memoryUsage}
            />
            <Typography
              style={{
                textAlign: "center",
              }}
            >
              {`Memory = ${system_Info.memoryUsage || 0}`}
            </Typography>
          </Stack>
        </Grid>
        {system_Info?.cpuUsagePercentage?.map((item, index) => (
          <Grid item key={index} xs={12} sm={6} md={3}>
            <Stack
              sx={{
                borderRadius: "5px",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                height: "100%",
                pt: 3,
              }}
            >
              <CircularProgress
                size={140}
                variant="determinate"
                value={item.usage}
              />
              <Typography
                style={{
                  textAlign: "center",
                }}
              >
                {`CPU ${item.core} = ${item.usage}`}
              </Typography>
            </Stack>
          </Grid>
        ))}
      </Card>
    </React.Fragment>
  );
};

export default ProgressBar;
