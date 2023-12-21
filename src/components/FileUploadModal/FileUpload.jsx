import {
  Card,
  Backdrop,
  Box,
  Autocomplete,
  TextField,
  Typography,
  Button,
  Stack,
  Grid,
} from "@mui/material";
import "./FileUpload.css";
import { Icon } from "../Component";
import React, { useEffect, useState } from "react";
export default function FileUpload({
  open,
  close,
  docListUpload,
  handleOnClick,
  Properties,
  selectedFile,
  handleFileChange,
  handleOkay,
  fileDesc,
  fileName,
  handleInputChange,
  formValues,
  loading,
}) {
  const [propertys, setPropertys] = useState([]);
  const property = () => {
    Properties.map((data) => {
      setPropertys(data.metaproperties);
    });
  };
  useEffect(() => {
    property();
  }, [Properties]);

  function formatFileSize(sizeInBytes) {
    if (sizeInBytes < 1024) {
      return sizeInBytes + " B";
    } else if (sizeInBytes < 1024 * 1024) {
      return (sizeInBytes / 1024).toFixed(2) + " KB";
    } else if (sizeInBytes < 1024 * 1024 * 1024) {
      return (sizeInBytes / (1024 * 1024)).toFixed(2) + " MB";
    } else {
      return (sizeInBytes / (1024 * 1024 * 1024)).toFixed(2) + " GB";
    }
  }
  const fileSizeInBytes = selectedFile?.size;
  const formattedSize = formatFileSize(fileSizeInBytes);
  const top100Films = propertys;
  return (
    <>
      <Backdrop sx={{ color: "#fff", zIndex: 1 }} open={open}>
        <Card
          sx={{
            padding: "6px 10px 0px 15px",
            border: "1px solid black",
            display: "flex",
            flexDirection: "column",
            width: "45%",
          }}
        >
          <Stack flexDirection="row" justifyContent="space-between">
            <Typography variant="h6" pb={1}>
              File MetaData
            </Typography>
            <a onClick={close} className="close" style={{ cursor: "pointer" }}>
              <Icon name="cross-sm"></Icon>
            </a>
          </Stack>
          <Box>
            <Autocomplete
              fullWidth
              freeSolo
              disablePortal
              size="small"
              options={docListUpload}
              getOptionLabel={(docListUpload) => docListUpload?.doctype_name} // Adjust this based on your API response structure
              sx={{ width: 248, pb: 0.5 }}
              renderInput={(params) => (
                <TextField {...params} label="Select Doc Type" />
              )}
              onChange={(event, value) => handleOnClick(value)}
            />
            <Grid container columnSpacing={1} rowSpacing={1}>
              {Properties?.map((data) => (
                <React.Fragment key={data.name}>
                  {data.fieldtype == "Text" ? (
                    <Grid item xs={6}>
                      <TextField
                        fullWidth
                        size="small"
                        variant="outlined"
                        type={data.fieldtype}
                        name={data.fieldname}
                        label={data.fieldname}
                        value={formValues[data.fieldname] || ""}
                        onChange={handleInputChange}
                      />
                    </Grid>
                  ) : (
                    <Grid item xs={6}>
                      <Autocomplete
                        disablePortal
                        size="small"
                        id="combo-box-demo"
                        options={top100Films}
                        renderInput={(params) => (
                          <TextField
                            {...params}
                            label="Properties"
                            size="small"
                          />
                        )}
                      />
                    </Grid>
                  )}
                </React.Fragment>
              ))}
            </Grid>
          </Box>
          <Box sx={{ mt: 1 }}>
            <Typography variant="h6" sx={{ mb: 1 }} style={{ width: "170px" }}>
              Upload Document
            </Typography>
            <Stack flexDirection="row">
              <Grid item xs={12}>
                <TextField
                  size="small"
                  label="File Desc"
                  style={{ marginRight: "5px" }}
                  onChange={fileDesc}
                />
              </Grid>
              {selectedFile?.name?.length > 0 ? (
                <span
                  style={{
                    // border: "1px solid lightblue",
                    // background: "lightblue",
                    // fontWeight: "bold",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    padding: "0px 5px 0px 5px",
                    borderRadius: "5px",
                  }}
                >
                  Selected File: {selectedFile && selectedFile.name}(
                  {formattedSize})
                </span>
              ) : (
                ""
              )}
            </Stack>
          </Box>
          <Stack
            style={{
              display: "flex",
              flexDirection: "row",
            }}
          >
            {loading ? (
              ""
            ) : (
              <Stack pt={1} sx={{ pt: 1.5 }} flexDirection="row">
                <label htmlFor="file-upload" className="custom-label-input">
                  Browse
                </label>
                <input
                  id="file-upload"
                  type="file"
                  className="custom-input"
                  onChange={handleFileChange}
                />
                <Button
                  variant="contained"
                  onClick={handleOkay}
                  style={{
                    marginLeft: "5px",
                    height: "35px",
                    outline: "none",
                  }}
                >
                  Upload
                </Button>
              </Stack>
            )}
            <Button
              variant="outlined"
              style={{ marginLeft: "5px", height: "35%", outline: "none" }}
              onClick={close}
              sx={{ mt: 1.5, mb: 1 }}
            >
              Cancel
            </Button>
          </Stack>
        </Card>
      </Backdrop>
    </>
  );
}
