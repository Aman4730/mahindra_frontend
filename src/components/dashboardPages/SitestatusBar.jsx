import { Grid, IconButton, Stack, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import NoteAddIcon from "@mui/icons-material/NoteAdd";
import SiteCalendar from "../SiteCalendar";
import { useLocation } from "react-router-dom";
import { DatePicker, Space, TimePicker } from "antd";
import moment from "moment";
const SitestatusBar = ({
  show,
  data,
  showMW,
  site_Name,
  timestamp,
  handleDateChange,
}) => {
  const location = useLocation();
  let siteName = location?.state?.site;
  let capacity = location?.state?.capacity;
  const date = new Date(data.timestamp * 1000);
  const options = {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
  };
  const formattedDateTime = date.toLocaleString("en-GB", options);
  return (
    <Stack>
      <Grid container spacing={1} justifyContent="space-between">
        <Grid item>
          <Grid container alignItems="center">
            <Grid item>
              <Typography variant="h6">
                {show == "true" ? site_Name : siteName || "No Site"}
              </Typography>
            </Grid>

            <Grid item style={{ margin: "0 1rem" }}></Grid>
            {showMW == "true" ? (
              <>
                <Grid item>
                  <Typography variant="h6">{capacity || 0} MW</Typography>
                </Grid>

                <Grid item>
                  <IconButton
                    color="primary"
                    onClick={() => handleClickOpen()}
                    style={{ paddingInline: ".5rem" }}
                  >
                    <NoteAddIcon fontSize="small" />
                  </IconButton>
                </Grid>
              </>
            ) : (
              ""
            )}
          </Grid>
        </Grid>
        <Grid item style={{ paddingRight: "5rem" }}>
          <Grid container>
            <Grid item>
              {data?.status == "Offline" ? (
                <Typography variant="h6" style={{ color: "#f44336" }}>
                  Offline
                </Typography>
              ) : (
                <Typography variant="h6" style={{ color: "#4caf50" }}>
                  Online
                </Typography>
              )}
            </Grid>
            <Grid item style={{ margin: "0 1rem" }}></Grid>
            <Grid item>
              {formattedDateTime === undefined ? (
                <CircularProgress size={30} />
              ) : (
                <Typography variant="h6">
                  {formattedDateTime || "No Date"}
                </Typography>
              )}
            </Grid>
          </Grid>
        </Grid>
        <Grid item xs={2}>
          <Space direction="vertical" size={12}>
            <DatePicker
              showTime={{
                format: "HH:mm",
                minuteStep: 5,
              }}
              onChange={(date, dateString) =>
                handleDateChange({
                  target: { name: "select_date", value: dateString },
                })
              }
              placeholder="Select Date and Time"
              needConfirm={false}
            />
          </Space>
        </Grid>
      </Grid>
    </Stack>
  );
};

export default SitestatusBar;
