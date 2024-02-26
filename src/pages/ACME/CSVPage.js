import React, { useContext, useEffect, useState } from "react";
import { Autocomplete, Button, Grid, Stack, TextField } from "@mui/material";
import Head from "../../layout/head/Head";
import "react-datepicker/dist/react-datepicker.css";
import CustomCSV from "../../components/CSV/CustomCSV";
import { DatePicker, Space, notification } from "antd";
import { UserContext } from "../../context/UserContext";
import {
  common,
  inverterSlots,
  inverterStrings,
  inverters,
  uncheckedCommon,
  uncheckedInverterSlots,
  uncheckedInverterStrings,
  uncheckedInverters,
} from "../../components/CSV/csvParameters";
import axios from "axios";

const CSVPage = () => {
  const { addCSV } = useContext(UserContext);
  const [csv, setCsv] = useState({
    site: "",
    start_date: "",
    end_date: "",
  });
  const handleChange = (event) => {
    const { name, value } = event.target;
    setCsv((prev) => {
      return {
        ...prev,
        [name]: value,
      };
    });
  };
  let currentDate = new Date(csv?.start_date);
  currentDate.setHours(8, 0, 0, 0);
  let morning_time = currentDate.getTime() / 1000;
  let current_time = Math.floor(Date.now(csv?.end_date) / 1000 - 600);

  //Select All
  const [commonParams, setCommonParams] = useState(common);
  const [invertersParams, setInvertersParams] = useState(inverters);
  const [inverterSlotsParams, setInverterSlotsParams] = useState(inverterSlots);

  const [inverterStringsParams, setInverterStringsParams] =
    useState(inverterStrings);

  const [globalSelectAll, setGlobalSelectAll] = useState(true);

  const [commonSelectAll, setCommmonSelectAll] = useState(true);
  const [invertersSelectAll, setInvertersSelectAll] = useState(true);
  const [inverterSlotsSelectAll, setInverterSlotsSelectAll] = useState(true);
  const [inverterStringsSelectAll, setInverterStringsSelectAll] =
    useState(true);
  const handleCommonSelectAllChange = (event) => {
    setCommmonSelectAll((prevState) => !prevState);
    if (event.target.checked === false) {
      setCommonParams(uncheckedCommon);
    } else {
      setCommonParams(common);
    }
  };
  const handleInvertersSelectAllChange = (event) => {
    setInvertersSelectAll((prevState) => !prevState);
    if (event.target.checked === false) {
      setInvertersParams(uncheckedInverters);
    } else {
      setInvertersParams(inverters);
    }
  };
  const handleInverterSlotsSelectAllChange = (event) => {
    setInverterSlotsSelectAll((prevState) => !prevState);
    if (event.target.checked === false) {
      setInverterSlotsParams(uncheckedInverterSlots);
    } else {
      setInverterSlotsParams(inverterSlots);
    }
  };
  const handleInverterStringsSelectAllChange = (event) => {
    setInverterStringsSelectAll((prevState) => !prevState);
    if (event.target.checked === false) {
      setInverterStringsParams(uncheckedInverterStrings);
    } else {
      setInverterStringsParams(inverterStrings);
    }
  };

  const handleCommonParamChange = (label) => {
    let changedParams = [...commonParams];
    for (const element of changedParams) {
      if (element.label === label) {
        element.checked = !element.checked;
        if (element.checked === false) {
          setCommmonSelectAll(false);
        }
      }
    }
    setCommonParams(changedParams);
  };
  const handleInvertersParamChange = (label) => {
    let changedParams = [...invertersParams];
    for (const element of changedParams) {
      if (element.label === label) {
        element.checked = !element.checked;
        if (element.checked === false) {
          setInvertersSelectAll(false);
          setGlobalSelectAll(false);
        }
      }
    }
    setInvertersParams(changedParams);
  };
  const handleInverterSlotsParamChange = (label) => {
    let changedParams = [...inverterSlotsParams];
    for (const element of changedParams) {
      if (element.label === label) {
        element.checked = !element.checked;
        if (element.checked === false) {
          setInverterSlotsSelectAll(false);
          setGlobalSelectAll(false);
        }
      }
    }
    setInverterSlotsParams(changedParams);
  };
  const handleInverterStringsParamChange = (label) => {
    let changedParams = [...inverterStringsParams];
    for (const element of changedParams) {
      if (element.label === label) {
        element.checked = !element.checked;
        if (element.checked === false) {
          setInverterStringsSelectAll(false);
          setGlobalSelectAll(false);
        }
      }
    }
    setInverterStringsParams(changedParams);
  };
  const newCommonData = [];

  for (let i = 0; i < commonParams.length; i++) {
    let current_parms = commonParams[i];
    if (current_parms.checked == true) {
      newCommonData.push(current_parms.label);
    }
  }
  //Apis
  const resetForm = () => {
    setCsv({
      site: "",
      start_date: "",
      end_date: "",
    });
  };
  const onFileDownload = () => {
    let data = {
      site: csv.site,
      startTime: morning_time,
      endTime: current_time,
      parameters: newCommonData,
    };
    const apiUrl = `${process.env.REACT_APP_API_URL_LOCAL}/customcsv`;
    axios
      .post(apiUrl, data, {
        responseType: "blob",
      })
      .then((response) => {
        notification["success"]({
          placement: "top",
          description: "",
          message: "File Download Successfully",
          style: {
            height: 60,
          },
        });
        resetForm();
        const blob = new Blob([response.data]);
        const fileName = "ASPL";
        // Use the split() method to separate the name and extension
        const parts = fileName.split(".");
        const name = parts[0];
        const extension = parts[1];
        // Create a temporary URL for the Blob
        const url = URL.createObjectURL(blob);
        // Create a link element
        const link = document.createElement("a");
        link.href = url;
        // Replace 'your_file_name.extension' with the desired file name and extension
        link.download = `${name}.${"csv"}`;
        // Append the link to the DOM and trigger the download
        document.body.appendChild(link);
        link.click();
        // Clean up the temporary URL and link
        URL.revokeObjectURL(url);
        link.remove();
      })
      .catch((error) => {
        console.error("Error downloading the file:", error);
      });
  };

  return (
    <React.Fragment>
      <Head title="CSV - Regular"></Head>
      <Stack style={{ marginTop: "75px" }} p={1.5}>
        <Grid container spacing={1} ml={1} flexDirection="row" id="form">
          <Grid item xs={2}>
            <Autocomplete
              fullWidth
              disablePortal
              size="small"
              id="Authentication"
              options={["ASPL"]}
              renderInput={(params) => (
                <TextField
                  {...params}
                  label="Site"
                  name="site"
                  value={csv.site}
                  onChange={handleChange}
                  style={{ backgroundColor: "white" }}
                />
              )}
            />
          </Grid>
          <Grid item xs={2}>
            <Space direction="vertical" size={12}>
              <DatePicker
                onChange={(date, dateString) =>
                  handleChange({
                    target: { name: "start_date", value: dateString },
                  })
                }
                placeholder="Start Date"
                needConfirm={false}
                style={{ width: "230px", height: "40px" }}
              />
            </Space>
          </Grid>
          <Grid item xs={2}>
            <Space direction="vertical" size={12}>
              <DatePicker
                onChange={(date, dateString) =>
                  handleChange({
                    target: { name: "end_date", value: dateString },
                  })
                }
                placeholder="End Date"
                needConfirm={false}
                style={{ width: "230px", height: "40px" }}
              />
            </Space>
          </Grid>
          <Grid item xs={2}>
            <Button
              variant="outlined"
              style={{ height: "39px" }}
              onClick={() => {
                if (newCommonData.length) {
                  onFileDownload();
                } else {
                  notification["warning"]({
                    placement: "top",
                    description: "",
                    message: "Select at least one parameter",
                    style: {
                      height: 60,
                    },
                  });
                }
              }}
            >
              Download
            </Button>
          </Grid>
          <Grid item xs={11.7}>
            <CustomCSV
              commonParams={commonParams}
              invertersParams={invertersParams}
              inverterSlotsParams={inverterSlotsParams}
              inverterStringsParams={inverterStringsParams}
              commonSelectAll={commonSelectAll}
              globalSelectAll={globalSelectAll}
              invertersSelectAll={invertersSelectAll}
              inverterSlotsSelectAll={inverterSlotsSelectAll}
              inverterStringsSelectAll={inverterStringsSelectAll}
              handleCommonParamChange={handleCommonParamChange}
              handleCommonSelectAllChange={handleCommonSelectAllChange}
              handleInvertersSelectAllChange={handleInvertersSelectAllChange}
              handleInvertersParamChange={handleInvertersParamChange}
              handleInverterSlotsParamChange={handleInverterSlotsParamChange}
              handleInverterStringsParamChange={
                handleInverterStringsParamChange
              }
              handleInverterSlotsSelectAllChange={
                handleInverterSlotsSelectAllChange
              }
              handleInverterStringsSelectAllChange={
                handleInverterStringsSelectAllChange
              }
            />
          </Grid>
        </Grid>
      </Stack>
    </React.Fragment>
  );
};
export default CSVPage;
