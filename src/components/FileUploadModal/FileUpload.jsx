import {
  Box,
  Card,
  Grid,
  Stack,
  Button,
  Backdrop,
  TextField,
  Typography,
  Autocomplete,
} from "@mui/material";
import "./FileUpload.css";
import { Icon, RSelect } from "../Component";
import React, { useEffect, useState } from "react";
export default function FileUpload({
  open,
  close,
  loading,
  fileDesc,
  handleOkay,
  formValues,
  Properties,
  selectedMeta,
  selectedFile,
  setSelectedMeta,
  handleFileChange,
  matchedWorkspace,
  handleInputChange,
  handleOnClick,
}) {
  const [propertys, setPropertys] = useState([]);
  const property = () => {
    Properties?.map((data) => {
      setPropertys(data?.metaproperties);
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

  const metadata = matchedWorkspace?.map((data) => ({
    label: data?.doctype,
    value: data?.doctype,
  }));

  return (
    <>
      <Backdrop sx={{ color: "#fff", zIndex: 1 }} open={open}>
        <Card
          sx={{
            padding: "6px 10px 0px 15px",
            border: "1px solid black",
            display: "flex",
            flexDirection: "column",
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
            <Grid container columnSpacing={1} rowSpacing={1}>
              <Grid item xs={12}>
                <RSelect
                  options={metadata}
                  defaultValue="Please Select Doctype"
                  onChange={handleOnClick}
                />
              </Grid>
            </Grid>
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
                        name={data.fieldname}
                        options={data.metaproperties}
                        renderInput={(params) => (
                          <TextField
                            {...params}
                            label={data.fieldname}
                            size="small"
                          />
                        )}
                        value={formValues[data.fieldname] || ""}
                        onChange={handleInputChange}
                      />
                    </Grid>
                  )}
                </React.Fragment>
              ))}
            </Grid>
          </Box>
          <Box sx={{ mt: 1 }}>
            <Typography variant="h6" sx={{ mb: 1 }}>
              Upload Document
            </Typography>
            <Stack flexDirection="row">
              <Grid item xs={12}>
                <TextField
                  size="small"
                  label="File Desc"
                  style={{ width: "270px", marginRight: "5px" }}
                  onChange={fileDesc}
                />
              </Grid>
              {selectedFile?.name?.length > 0 ? (
                <span
                  style={{
                    whiteSpace: "nowrap",
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                    maxWidth: "200px",
                    background: "lightblue",
                    padding: "8px 5px 0px 5px",
                    borderRadius: "5px",
                  }}
                >
                  {selectedFile && selectedFile.name}({formattedSize})
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
                {selectedFile && selectedFile.name ? (
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
                ) : (
                  <>
                    <label htmlFor="file-upload" className="custom-label-input">
                      Browse
                    </label>
                    <input
                      id="file-upload"
                      type="file"
                      className="custom-input"
                      onChange={handleFileChange}
                    />
                  </>
                )}
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
