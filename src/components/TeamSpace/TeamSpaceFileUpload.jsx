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
import "./TeamSpaceFileUpload.css";
import { Icon } from "../Component";
import React, { useEffect, useState } from "react";
export default function TeamSpaceFileUpload({
  open,
  close,
  docListUpload,
  handleOnClick,
  Properties,
  selectedFile,
  handleFileChange,
  handleOkay,
  fileDesc,
  handleInputChange,
  formValues,
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

  const top100Films = propertys;
  return (
    <>
      <Backdrop sx={{ color: "#fff", zIndex: 1 }} open={open}>
        <Card
          sx={{
            p: 1.5,
            border: "1px solid black",
            display: "flex",
            flexDirection: "column",
            width: "40%",
          }}
        >
          <Box>
            <a onClick={close} className="close" style={{ cursor: "pointer" }}>
              <Icon name="cross-sm"></Icon>
            </a>
            <Autocomplete
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
            <Grid container columnSpacing={0.2} rowSpacing={0.2}>
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
          <Box style={{ borderTop: "1px dashed black" }} sx={{ mt: 1, p: 1 }}>
            <Typography
              variant="h6"
              sx={{ mb: 1 }}
              style={{ width: "170px", borderBottom: "1px solid grey" }}
            >
              Add Document
            </Typography>
            <Stack flexDirection="row">
              <Grid item xs={12}>
                <TextField
                  size="small"
                  label="File Desc"
                  style={{ marginLeft: "-9px", marginRight: "5px" }}
                  onChange={fileDesc}
                />
              </Grid>
              {selectedFile?.name?.length > 0 ? (
                <span
                  style={{
                    border: "1px solid lightblue",
                    background: "lightblue",
                    fontWeight: "bold",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    padding: "0px 10px 0px 10px",
                    borderRadius: "5px",
                  }}
                >
                  Selected File: {selectedFile && selectedFile.name}
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
            <>
              <label htmlFor="file-upload" className="custom-label-input">
                Browse
              </label>
              <input
                id="file-upload"
                type="file"
                // accept=".pdf, .png"
                className="custom-input"
                onChange={handleFileChange}
              />
            </>
            {/* {selectedFile?.name?.length ? ( */}
            <Button
              variant="contained"
              onClick={handleOkay}
              style={{
                marginLeft: "5px",
                height: "35px",
              }}
            >
              Browse
            </Button>
            {/* ) : (
                ""
              )} */}

            <Button
              variant="outlined"
              style={{ marginLeft: "5px", height: "35%" }}
              onClick={close}
            >
              Cancel
            </Button>
          </Stack>
        </Card>
      </Backdrop>
    </>
  );
}
