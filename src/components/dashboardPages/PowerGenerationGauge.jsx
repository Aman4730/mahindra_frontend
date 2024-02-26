import { Card, Grid, Typography } from "@material-ui/core";
import C3Chart from "react-c3js";
import "./style.css";
import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";

export default function PowerGenerationGauge({ totalExport, data }) {
  const [totalExportNum, setTotalExportNum] = useState(0);

  useEffect(() => {
    let value =
      Number(totalExport) && Number(totalExport) !== -111
        ? Number(totalExport)
        : 0;
    if (value !== totalExport) {
      setTotalExportNum(value);
    }
  }, [totalExport]);
  const location = useLocation();
  let dayGeneration = data?.DayGeneration;
  let capacity = location?.state?.capacity;
  return (
    <Card elevation={6} style={{ height: 290, width: 350 }}>
      <Typography
        style={{ marginLeft: "1rem", marginTop: ".5rem" }}
        variant="h6"
      >
        Day Generation
      </Typography>
      <Grid container>
        <Grid item style={{ height: "parent" }}>
          <C3Chart
            data={{
              columns: [["Current Export", 10]],
              type: "gauge",
            }}
            gauge={{
              label: {
                format: function (value) {
                  return 10 + " MW";
                },
                show: true,
              },
              min: 0,
              max: capacity,
              width: 45,
            }}
            color={{
              pattern: ["#4caf50"],
            }}
            size={{
              height: 200,
            }}
          />
        </Grid>
      </Grid>
    </Card>
  );
}
