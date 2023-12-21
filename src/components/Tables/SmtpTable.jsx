import * as React from "react";
import {
  Autocomplete,
  Card,
  Grid,
  Stack,
  TextField,
  Typography,
  Button,
  InputAdornment,
  IconButton,
} from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";
export default function SmtpTable({
  formData,
  handleChange,
  handleSubmit,
  handleAutocompleteChange,
  testEmailForm,
  handleTestEmail,
  handleSubmitTestEmail,
  onEditSmtp,
  smptdata,
}) {
  const [showPassword, setShowPassword] = React.useState(false);
  const handleTogglePassword = () => {
    setShowPassword((prevShowPassword) => !prevShowPassword);
  };
  return (
    <Stack>
      <Card sx={{ p: 2, mt: 1, mb: 1 }}>
        <Grid container spacing={1}>
          <Grid item xs={4}>
            <TextField
              autoFocus
              fullWidth
              size="small"
              type="email"
              id="User_Name"
              margin="dense"
              label="User Name"
              value={formData.User_Name}
              onChange={handleChange}
            />
          </Grid>
          <Grid item xs={4}>
            <TextField
              autoFocus
              fullWidth
              size="small"
              type={showPassword ? "text" : "password"}
              id="password"
              margin="dense"
              label="Password"
              value={formData.password}
              onChange={handleChange}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      onClick={handleTogglePassword}
                      style={{
                        outline: "none",
                      }}
                    >
                      {showPassword ? (
                        <VisibilityOff fontSize="small" />
                      ) : (
                        <Visibility fontSize="small" />
                      )}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />
          </Grid>
          <Grid item xs={4}>
            <TextField
              autoFocus
              fullWidth
              id="Server_IP"
              type="text"
              size="small"
              margin="dense"
              label="Server IP / Url"
              value={formData.Server_IP}
              onChange={handleChange}
            />
          </Grid>
          <Grid item xs={4}>
            <TextField
              autoFocus
              fullWidth
              id="Server_Port"
              size="small"
              type="text"
              margin="dense"
              label="Server Port"
              style={{ marginTop: "-0.5px" }}
              value={formData.Server_Port}
              onChange={handleChange}
            />
          </Grid>
          <Grid item xs={4}>
            <TextField
              autoFocus
              fullWidth
              type="email"
              size="small"
              margin="dense"
              id="From_Address"
              label="From Address"
              style={{ marginTop: "-0.5px" }}
              value={formData.From_Address}
              onChange={handleChange}
            />
          </Grid>
          <Grid item xs={4}>
            <TextField
              autoFocus
              fullWidth
              type="text"
              size="small"
              margin="dense"
              id="From_Name"
              label="From Name"
              style={{ marginTop: "-0.5px" }}
              value={formData.From_Name}
              onChange={handleChange}
            />
          </Grid>
          <Grid item xs={4}>
            <Autocomplete
              fullWidth
              disablePortal
              size="small"
              id="Authentication"
              options={["Yes", "No"]}
              renderInput={(params) => (
                <TextField {...params} label="Authentication" />
              )}
              value={formData.Authentication}
              onChange={(event, value) =>
                handleAutocompleteChange("Authentication", value)
              }
            />
          </Grid>
          <Grid item xs={4}>
            <Autocomplete
              fullWidth
              disablePortal
              size="small"
              id="Security"
              options={["None", "SSL", "TLS", "STARTLS"]}
              renderInput={(params) => (
                <TextField {...params} label="Security" />
              )}
              value={formData.Security}
              onChange={(event, value) =>
                handleAutocompleteChange("Security", value)
              }
            />
          </Grid>
          {smptdata.length > 0 ? (
            <Grid item xs={7} display="flex" justifyContent="end">
              <Button
                variant="contained"
                onClick={handleSubmit}
                style={{
                  outline: "none",
                }}
              >
                Submit
              </Button>
            </Grid>
          ) : (
            <Grid item xs={7} display="flex" justifyContent="end">
              <Button
                variant="contained"
                onClick={onEditSmtp}
                style={{
                  outline: "none",
                }}
              >
                Update
              </Button>
            </Grid>
          )}
        </Grid>
      </Card>

      <Typography style={{ fontSize: "24.5px", fontWeight: "bold" }}>
        Test Email
      </Typography>
      <Card sx={{ p: 2 }}>
        <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
          <Grid item xs={4}>
            <TextField
              autoFocus
              fullWidth
              size="small"
              type="email"
              margin="dense"
              name="To_Address"
              label="To Address"
              value={testEmailForm.To_Address}
              onChange={handleTestEmail}
            />
          </Grid>
          <Grid item xs={4}>
            <TextField
              autoFocus
              fullWidth
              type="text"
              size="small"
              name="Subject"
              margin="dense"
              label="Subject"
              value={testEmailForm.Subject}
              onChange={handleTestEmail}
            />
          </Grid>
          <Grid item xs={4}>
            <TextField
              autoFocus
              fullWidth
              type="text"
              size="small"
              margin="dense"
              name="Message"
              label="Message"
              value={testEmailForm.Message}
              onChange={handleTestEmail}
            />
          </Grid>
          <Grid item xs={7.2} display="flex" justifyContent="end">
            <Button
              variant="contained"
              onClick={handleSubmitTestEmail}
              style={{
                outline: "none",
              }}
            >
              Test Email
            </Button>
          </Grid>
        </Grid>
      </Card>
    </Stack>
  );
}
