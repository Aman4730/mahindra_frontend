import React from "react";
import { Doughnut } from "react-chartjs-2";
import { Card, Grid, Stack } from "@mui/material";

const PieDoughnutChart = ({ extension }) => {
  const labels = Object.keys(extension);
  const datasetValues = labels.map((label) => extension[label]);
  // Sample data for the pie/doughnut chart
  const totalSum = datasetValues.reduce((sum, value) => sum + value, 0);
  const percentages = datasetValues.map(
    (value) => ((value / totalSum) * 100).toFixed(2) + "%"
  );
  const data = {
    labels: labels,
    datasets: [
      {
        data: datasetValues,
        backgroundColor: [
          "#CD6155",
          "#EC7063 ",
          "#AF7AC5",
          "#A569BD",
          "#5499C7",
          "#5DADE2",
          "#48C9B0",
          "#45B39D",
          "#52BE80",
          "#58D68D",
          "#F4D03F",
          "#F5B041",
          "#EB984E",
          "#DC7633",
          "#AAB7B8",
          "#99A3A4",
          "#5D6D7E",
          "#566573",
        ],
        hoverBackgroundColor: [
          "#C0392B",
          "#E74C3C",
          "#9B59B6",
          "#8E44AD",
          "#2980B9",
          "#3498DB",
          "#1ABC9C",
          "#16A085",
          "#27AE60",
          "#2ECC71",
          "#F1C40F",
          "#F39C12",
          "#E67E22",
          "#D35400",
          "#95A5A6",
          "#7F8C8D",
          "#34495E",
          "#2C3E50",
        ],
      },
    ],
  };
  const doughnutOptions = {
    responsive: true,
    maintainAspectRatio: false,
    cutoutPercentage: 65,
    legend: {
      display: true,
      position: "right",
      labels: {
        boxWidth: 15,
        fontSize: 12,
      },
    },
    plugins: {
      datalabels: {
        formatter: (value, context) => {
          const dataset = context.chart.data.datasets[0];
          const currentValue = dataset.data[context.dataIndex];
          const percentage = ((currentValue / totalSum) * 100).toFixed(2);
          return `${percentage}%`;
        },
        color: "#fff", // Label text color
        anchor: "end",
        align: "start",
        offset: 10,
        font: {
          weight: "bold",
        },
      },
    },
  };
  return (
    <Stack>
      <Grid sx={{ flexGrow: 1 }} container spacing={2}>
        <Grid item xs={12}>
          <Card
            sx={{
              mb: 1,
              mr: 1.4,
              ml: 2,
              p: 1,
              pr: 2,
              pl: 2,
              width: "25vw",
              borderRadius: "5px",
            }}
          >
            <div>
              <h6>File Extensions</h6>
              <div style={{ height: "219px" }}>
                <Doughnut data={data} options={doughnutOptions} />
              </div>
            </div>
          </Card>
        </Grid>
      </Grid>
    </Stack>
  );
};

export default PieDoughnutChart;
