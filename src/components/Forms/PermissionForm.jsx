import * as React from "react";
import {
  Card,
  Grid,
  Stack,
  Button,
  TextField,
  Typography,
  IconButton,
  Autocomplete,
  InputAdornment,
} from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";
export default function PermissionTable({
  formData,
  smptdata,
  editId,
  Workspace,
  onEditSmtp,
  cabinetList,
  handleChange,
  handleSubmit,
  userDropdowns,
  groupsDropdown,
  testEmailForm,
  handleTestEmail,
  handleSubmitTestEmail,
  handleAutocompleteChange,
}) {
  const [showPassword, setShowPassword] = React.useState(false);
  const handleTogglePassword = () => {
    setShowPassword((prevShowPassword) => !prevShowPassword);
  };

  return (
    <Stack>
      <Card sx={{ p: 2, mb: 1 }}>
        <Grid container spacing={1} id="form">
          <Grid item xs={3}>
            <Autocomplete
              fullWidth
              disablePortal
              size="small"
              id="Cabinet"
              options={cabinetList || []}
              renderInput={(params) => (
                <TextField {...params} label="Select Cabinet" />
              )}
              value={formData.Cabinet}
              onChange={(event, value) =>
                handleAutocompleteChange("Cabinet", value)
              }
            />
          </Grid>
          <Grid item xs={3}>
            <Autocomplete
              fullWidth
              disablePortal
              size="small"
              id="WorkSpace_Type"
              options={["My Workspace", "TeamSpace"]}
              renderInput={(params) => (
                <TextField {...params} label="WorkSpace Type" />
              )}
              value={formData.WorkSpace_Type}
              onChange={(event, value) =>
                handleAutocompleteChange("WorkSpace_Type", value)
              }
            />
          </Grid>
          <Grid item xs={3}>
            <Autocomplete
              fullWidth
              disablePortal
              size="small"
              id="WorkSpace"
              options={["None", "SSL", "TLS", "STARTLS"]}
              renderInput={(params) => (
                <TextField {...params} label="WorkSpace/TeamSpace" />
              )}
              value={formData.WorkSpace}
              onChange={(event, value) =>
                handleAutocompleteChange("WorkSpace", value)
              }
            />
          </Grid>
          <Grid item xs={3}>
            <Autocomplete
              fullWidth
              disablePortal
              size="small"
              id="Folder_File"
              options={["None", "SSL", "TLS", "STARTLS"]}
              renderInput={(params) => (
                <TextField {...params} label="Folder/File" />
              )}
              value={formData.Folder_File}
              onChange={(event, value) =>
                handleAutocompleteChange("Folder_File", value)
              }
            />
          </Grid>
          <Grid item xs={3}>
            <Autocomplete
              fullWidth
              disablePortal
              size="small"
              id="Groups"
              options={groupsDropdown || ""}
              renderInput={(params) => (
                <TextField {...params} label="Select Groups" />
              )}
              value={formData.Groups}
              onChange={(event, value) =>
                handleAutocompleteChange("Groups", value)
              }
            />
          </Grid>
          <Grid item xs={3}>
            <Autocomplete
              fullWidth
              disablePortal
              size="small"
              id="Users"
              options={userDropdowns || ""}
              renderInput={(params) => (
                <TextField {...params} label="Select Users" />
              )}
              value={formData.Security}
              onChange={(event, value) =>
                handleAutocompleteChange("Users", value)
              }
            />
          </Grid>
          <Grid item xs={3}>
            <Autocomplete
              fullWidth
              disablePortal
              size="small"
              id="Permissions"
              options={[
                "View",
                "Edit",
                "Move",
                "Share",
                "Delete",
                "Rights",
                "Download",
                "Comments",
                "Properties",
              ]}
              renderInput={(params) => (
                <TextField {...params} label="Select Permissions" />
              )}
              value={formData.Permissions}
              onChange={(event, value) =>
                handleAutocompleteChange("Permissions", value)
              }
            />
          </Grid>
          <Grid item xs={7} display="flex" justifyContent="end">
            <Button
              variant="contained"
              onClick={handleSubmit}
              style={{
                outline: "none",
              }}
              sx={{ mr: 10.5 }}
            >
              {editId ? "Update" : "Submit"}
            </Button>
          </Grid>
        </Grid>
      </Card>
    </Stack>
  );
}
