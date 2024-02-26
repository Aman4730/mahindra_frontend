import React, { useState } from "react";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Box from "@mui/material/Box";
import Head from "../../layout/head/Head";
import Typography from "@mui/material/Typography";
import { Autocomplete, Button, Grid, Stack, TextField } from "@mui/material";
import SystemLineChart from "../../components/SystemInfoPages/SystemLineChart";
import { DatePicker, Space } from "antd";

const CustomTabPanel = ({ children, value, index }) => {
  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
};

const a11yProps = (index) => {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
};

const AnalyticsPage = () => {
  const [value, setValue] = useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  let graph = [{}];
  let data = [];
  return (
    <Stack style={{ marginTop: "68px" }}>
      <Head title="Analytics - Regular"></Head>
      <Box sx={{ width: "100%" }}>
        <Box sx={{ borderBottom: 1, borderColor: "divider", pl: 5 }}>
          <Tabs
            value={value}
            onChange={handleChange}
            aria-label="basic tabs example"
          >
            <Tab label="ENERGY" {...a11yProps(0)} />
          </Tabs>
        </Box>
        <CustomTabPanel value={value} index={0}>
          <Grid container spacing={1} ml={1} flexDirection="row" id="form">
            <Grid item xs={2}>
              <Autocomplete
                fullWidth
                disablePortal
                size="small"
                id="Authentication"
                options={data}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    label="Site"
                    name="site"
                    // value={csv.site}
                    // onChange={handleChange}
                    style={{ backgroundColor: "white" }}
                  />
                )}
              />
            </Grid>
            <Grid item xs={2}>
              <Space direction="vertical" size={12}>
                <DatePicker
                  // onChange={(date, dateString) =>
                  //   handleChange({
                  //     target: { name: "start_date", value: dateString },
                  //   })
                  // }
                  placeholder="Start Date"
                  needConfirm={false}
                  style={{ width: "230px", height: "40px" }}
                />
              </Space>
            </Grid>
            <Grid item xs={2}>
              <Space direction="vertical" size={12}>
                <DatePicker
                  // onChange={(date, dateString) =>
                  //   handleChange({
                  //     target: { name: "end_date", value: dateString },
                  //   })
                  // }
                  placeholder="End Date"
                  needConfirm={false}
                  style={{ width: "230px", height: "40px" }}
                />
              </Space>
            </Grid>
            <Grid item xs={2}>
              <Button variant="outlined" style={{ height: "39px" }}>
                VIEW
              </Button>
            </Grid>
          </Grid>
          <Grid item xs={12} mt={2}>
            <SystemLineChart system_Info={graph} height="400" />
          </Grid>
        </CustomTabPanel>
      </Box>
    </Stack>
  );
};

export default AnalyticsPage;
