import React, { useState } from "react";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import { Autocomplete, Button, Grid, Stack, TextField } from "@mui/material";
import SystemLineChart from "../../components/SystemInfoPages/SystemLineChart";
import Head from "../../layout/head/Head";
import { DatePicker, Space } from "antd";
import TrendLine from "../../performance/TrendLine";
import PerformanceTable from "../../components/AllTables/PerformanceTable";

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

const PerformancePage = () => {
  const [value, setValue] = useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  const top100Films = [
    { title: "The Shawshank Redemption", year: 1994 },
    { title: "The Godfather", year: 1972 },
    { title: "The Godfather: Part II", year: 1974 },
    { title: "The Dark Knight", year: 2008 },
    // Add more films as needed
  ];

  const defaultProps = {
    options: top100Films,
    getOptionLabel: (option) => option.title,
  };
  let graph = [{}];
  let tableData = [{}];
  const lossAnalytics = [
    { id: "Time", label: "Time" },
    { id: "Sites", label: "Sites" },
    { id: "Budget Rev", label: "Budget Rev" },
    { id: "Actual Rev", label: "Actual Rev" },
    { id: "GHI Core Revenue", label: "GHI Core Revenue" },
    { id: "Absolute Loss", label: "Absolute Loss" },
    { id: "GHI Impact", label: "GHI Impact" },
    { id: "PA Loss/Gain", label: "PA Loss/Gain" },
    { id: "GA Loss/Gain", label: "GA Loss/Gain" },
    { id: "Temp. Loss/Gain", label: "Temp. Loss/Gain" },
  ];
  const CAB_AMB = [
    { id: "Time", label: "Time" },
    { id: "Sites", label: "Sites" },
    { id: "Block", label: "Block" },
    { id: "Inverter", label: "Inverter" },
    { id: "Percentage Difference", label: "Percentage Difference" },
    { id: "Ambient Temp", label: "Ambient Temp" },
    { id: "Cabinet Temp", label: "Cabinet Temp" },
  ];
  const INV_KW_GEN = [
    { id: "Date", label: "Date" },
    { id: "B01I01", label: "B01I01" },
    { id: "B01I02", label: "B01I02" },
    { id: "B01I03", label: "B01I03" },
    { id: "B01I04", label: "B01I04" },
    { id: "B02I01", label: "B02I01" },
    { id: "B02I02", label: "B02I02" },
    { id: "B02I03", label: "B02I03" },
    { id: "B02I04", label: "B02I04" },
    { id: "B03I01", label: "B03I01" },
    { id: "B03I02", label: "B03I02" },
    { id: "B03I03", label: "B03I03" },
    { id: "B03I04", label: "B03I04" },
  ];
  return (
    <Stack style={{ marginTop: "68px" }}>
      <Head title="Performance - Regular"></Head>
      <Box sx={{ width: "100%" }}>
        <Box
          sx={{
            borderBottom: 1,
            borderColor: "divider",
            pl: 5,
          }}
        >
          <Tabs
            value={value}
            onChange={handleChange}
            aria-label="basic tabs example"
          >
            <Tab label="ACTUAL PR" {...a11yProps(0)} />
            <Tab label="INVERTERS-WAKE UP" {...a11yProps(1)} />
            <Tab label="PEAK POWER" {...a11yProps(2)} />
            <Tab label="CALCULATED PR" {...a11yProps(3)} />
            <Tab label="LOSS Analytics" {...a11yProps(4)} />
            <Tab label="CAB / AMB" {...a11yProps(5)} />
            <Tab label="INV / KW GEN" {...a11yProps(6)} />
            <Tab label="INV SCB" {...a11yProps(7)} />
            <Tab label="TREND LINE" {...a11yProps(8)} />
            <Tab label="CLIPPING LOSS" {...a11yProps(9)} />
            <Tab label="SCB DEV" {...a11yProps(10)} />
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
                options={[]}
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
            <SystemLineChart system_Info={graph} height={400} heading="" />
          </Grid>
        </CustomTabPanel>
        <CustomTabPanel value={value} index={1}>
          <Grid container spacing={1} ml={1} flexDirection="row" id="form">
            <Grid item xs={2}>
              <Autocomplete
                fullWidth
                disablePortal
                size="small"
                id="Authentication"
                options={[]}
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
            <Grid item>
              <Button variant="outlined" style={{ height: "39px" }}>
                VIEW
              </Button>
            </Grid>
            <Grid item>
              <Button variant="outlined" style={{ height: "39px" }}>
                Download
              </Button>
            </Grid>
          </Grid>
          <Grid item xs={12} mt={2}>
            <SystemLineChart system_Info={graph} height="400" />
          </Grid>
        </CustomTabPanel>
        <CustomTabPanel value={value} index={2}>
          <Grid container spacing={1} ml={1} flexDirection="row" id="form">
            <Grid item xs={2}>
              <Autocomplete
                fullWidth
                disablePortal
                size="small"
                id="Authentication"
                options={[]}
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
            <Grid item>
              <Button variant="outlined" style={{ height: "39px" }}>
                VIEW
              </Button>
            </Grid>
            <Grid item>
              <Button variant="outlined" style={{ height: "39px" }}>
                download
              </Button>
            </Grid>
          </Grid>
          <Grid item xs={12} mt={2}>
            <SystemLineChart system_Info={graph} height="400" />
          </Grid>
        </CustomTabPanel>
        <CustomTabPanel value={value} index={3}>
          <Grid container spacing={1} ml={1} flexDirection="row" id="form">
            <Grid item xs={2}>
              <Autocomplete
                fullWidth
                disablePortal
                size="small"
                id="Authentication"
                options={[]}
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
            <Grid item>
              <Button variant="outlined" style={{ height: "39px" }}>
                VIEW
              </Button>
            </Grid>
            <Grid item>
              <Button variant="outlined" style={{ height: "39px" }}>
                download
              </Button>
            </Grid>
          </Grid>
          <Grid item xs={12} mt={2}>
            <SystemLineChart system_Info={graph} height="400" />
          </Grid>
        </CustomTabPanel>
        <CustomTabPanel value={value} index={4}>
          <Grid container spacing={1} ml={1} flexDirection="row" id="form">
            <Grid item xs={2}>
              <Autocomplete
                fullWidth
                disablePortal
                size="small"
                id="Authentication"
                options={[]}
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
            <Grid item>
              <Button variant="outlined" style={{ height: "39px" }}>
                VIEW
              </Button>
            </Grid>
            <Grid item>
              <Button variant="outlined" style={{ height: "39px" }}>
                csv
              </Button>
            </Grid>
          </Grid>
          <Grid item xs={12} mt={2}>
            <PerformanceTable tableData={tableData} headCells={lossAnalytics} />
          </Grid>
        </CustomTabPanel>
        <CustomTabPanel value={value} index={5}>
          <Grid container spacing={1} ml={1} flexDirection="row" id="form">
            <Grid container spacing={1} ml={1} flexDirection="row" id="form">
              <Grid item xs={2}>
                <Autocomplete
                  fullWidth
                  disablePortal
                  size="small"
                  id="Authentication"
                  options={[]}
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
              <Grid item>
                <Button variant="outlined" style={{ height: "39px" }}>
                  VIEW
                </Button>
              </Grid>
              <Grid item>
                <Button variant="outlined" style={{ height: "39px" }}>
                  csv
                </Button>
              </Grid>
            </Grid>
          </Grid>
          <Grid item xs={12} mt={2}>
            <PerformanceTable tableData={tableData} headCells={CAB_AMB} />
          </Grid>
        </CustomTabPanel>
        <CustomTabPanel value={value} index={6}>
          <Grid container spacing={1} ml={1} flexDirection="row" id="form">
            <Grid item xs={2}>
              <Autocomplete
                fullWidth
                disablePortal
                size="small"
                id="Authentication"
                options={[]}
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
            <PerformanceTable tableData={tableData} headCells={INV_KW_GEN} />
          </Grid>
        </CustomTabPanel>
        <CustomTabPanel value={value} index={7}>
          <Grid container spacing={1} ml={1} flexDirection="row" id="form">
            <Grid item xs={2}>
              <Autocomplete
                fullWidth
                disablePortal
                size="small"
                id="Authentication"
                options={[]}
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
        <CustomTabPanel value={value} index={8}>
          <TrendLine />
        </CustomTabPanel>
        <CustomTabPanel value={value} index={9}>
          <Grid container spacing={1} ml={1} flexDirection="row" id="form">
            <Grid item xs={2}>
              <Autocomplete
                fullWidth
                disablePortal
                size="small"
                id="Authentication"
                options={[]}
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
            <Grid item>
              <Button variant="outlined" style={{ height: "39px" }}>
                VIEW
              </Button>
            </Grid>
            <Grid item>
              <Button variant="outlined" style={{ height: "39px" }}>
                csv
              </Button>
            </Grid>
          </Grid>
          <Grid item xs={12} mt={2}>
            <SystemLineChart system_Info={graph} height="400" />
          </Grid>
        </CustomTabPanel>
        <CustomTabPanel value={value} index={10}>
          <Grid container spacing={1} ml={1} flexDirection="row" id="form">
            <Grid item xs={2}>
              <Autocomplete
                fullWidth
                disablePortal
                size="small"
                id="Authentication"
                options={[]}
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
            <Grid item>
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

export default PerformancePage;
