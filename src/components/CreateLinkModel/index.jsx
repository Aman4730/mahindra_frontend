import React from "react";
import Button from "@mui/material/Button";
import DatePicker from "react-datepicker";
import Dialog from "@mui/material/Dialog";
import TextField from "@mui/material/TextField";
import DialogTitle from "@mui/material/DialogTitle";
import "react-datepicker/dist/react-datepicker.css";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import {
  Autocomplete,
  Checkbox,
  FormControlLabel,
  FormGroup,
  Grid,
  Stack,
  Typography,
} from "@mui/material";
export default function CreateLinkModel({
  error,
  openLink,
  moveData,
  teamSpace,
  selectedDate,
  shareFormData,
  userDropdowns,
  checkboxValues,
  accesscheckbox,
  setSelectedDate,
  handleShareData,
  handleLinkClose,
  handleDateChange,
  handleCheckboxChange,
  handleSubmitShareData,
}) {
  return (
    <Stack padding={2}>
      <Dialog open={openLink} onClose={handleLinkClose}>
        <DialogTitle>Generate Link</DialogTitle>
        <DialogContent>
          <Grid container columnSpacing={1} pt={1}>
            <Grid item xs={6}>
              <Autocomplete
                fullWidth
                size="small"
                name="Type"
                disablePortal
                options={["User", "Guest"]}
                renderInput={(params) => (
                  <TextField {...params} label="Selected Type" />
                )}
                value={shareFormData.Type}
                onChange={(e, newValue) =>
                  handleShareData({ target: { name: "Type", value: newValue } })
                }
              />
            </Grid>
            {shareFormData.Type === "User" ? (
              <>
                <Grid item xs={6}>
                  <Autocomplete
                    disablePortal
                    size="small"
                    name="userDropdowns"
                    options={userDropdowns}
                    getOptionLabel={(user) => user.email}
                    renderInput={(params) => (
                      <TextField {...params} label="Select an option" />
                    )}
                    value={shareFormData.userDropdowns || null}
                    onChange={(e, newValue) =>
                      handleShareData({
                        target: { name: "userDropdowns", value: newValue },
                      })
                    }
                  />
                </Grid>
                <Grid item xs={6}>
                  <Autocomplete
                    disablePortal
                    size="small"
                    name="userDropdowns"
                    options={teamSpace}
                    getOptionLabel={(user) => user}
                    renderInput={(params) => (
                      <TextField {...params} label="Workspace Name" />
                    )}
                    value={shareFormData.workspace_name || null}
                    onChange={(e, newValue) =>
                      handleShareData({
                        target: { name: "workspace_name", value: newValue },
                      })
                    }
                  />
                </Grid>
              </>
            ) : (
              <>
                <Grid item xs={6}>
                  <TextField
                    fullWidth
                    autoFocus
                    size="small"
                    type="email"
                    name="Email"
                    margin="dense"
                    label="Enter Your Email"
                    value={shareFormData?.Email}
                    onChange={handleShareData}
                  />
                </Grid>
                <Grid item xs={6}>
                  <TextField
                    error={error ? error : ""}
                    fullWidth
                    autoFocus
                    type="text"
                    size="small"
                    margin="dense"
                    name="Password"
                    label="Enter Your Password"
                    helperText={error ? "Incorrect Entry." : ""}
                    value={shareFormData.Password}
                    onChange={handleShareData}
                  />
                </Grid>
                <Grid item xs={6}>
                  <TextField
                    fullWidth
                    autoFocus
                    type="text"
                    size="small"
                    margin="dense"
                    name="Subject"
                    label="Email Subject"
                    value={shareFormData.Subject}
                    onChange={handleShareData}
                  />
                </Grid>
                <Grid item xs={6}>
                  <TextField
                    fullWidth
                    autoFocus
                    type="text"
                    size="small"
                    margin="dense"
                    name="Message"
                    label="Email Message"
                    value={shareFormData.Message}
                    onChange={handleShareData}
                  />
                </Grid>
              </>
            )}
            <Grid item xs={6}>
              <div className="form-control-wrap">
                <DatePicker
                  name="Link_Expiry"
                  dateFormat="dd/MM/yyyy"
                  placeholderText="Link Expiry"
                  selected={selectedDate}
                  onChange={handleDateChange}
                  className="form-control date-picker small-width"
                />
              </div>
            </Grid>
            {accesscheckbox?.map((data) => (
              <Grid item key={data.label}>
                <FormControlLabel
                  control={
                    <Checkbox
                      name={data.name}
                      checked={checkboxValues[data.name]}
                      onChange={handleCheckboxChange}
                    />
                  }
                  label={
                    <Typography variant="body2" style={{ fontSize: "15px" }}>
                      {data.label}
                    </Typography>
                  }
                  sx={{ pl: 0.4, mb: -4 }}
                  style={data.style}
                />
              </Grid>
            ))}
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleLinkClose}>Cancel</Button>
          <Button onClick={handleSubmitShareData}>Share</Button>
        </DialogActions>
      </Dialog>
    </Stack>
  );
}
