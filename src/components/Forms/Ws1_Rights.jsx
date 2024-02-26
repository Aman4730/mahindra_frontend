import * as React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import {
  Autocomplete,
  Checkbox,
  FormControlLabel,
  Grid,
  TextField,
  Typography,
} from "@mui/material";
import { codepenEmbed } from "react-syntax-highlighter/dist/esm/styles/hljs";

export default function Ws1_Rights({
  data,
  isLogin,
  openDialog,
  permission,
  autocomplete,
  userDropdowns,
  checkboxValues,
  groupsDropdown,
  permissionForm,
  handleCheckboxChange,
  handleClickPermission,
  handleClosePermission,
  workspacePermissionWs1,
  handleAutocompleteChange,
}) {
  const { title, permissionArray } = permission;
  return (
    <React.Fragment>
      <Dialog
        open={openDialog}
        onClose={handleClosePermission}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        fullWidth
      >
        <DialogTitle fontSize="17px">{title}</DialogTitle>
        <DialogContent>
          <Grid container pt={0.8}>
            {permissionArray?.map((data) => {
              {
                return (
                  <Grid item key={data.label} xs={3}>
                    <FormControlLabel
                      control={
                        <Checkbox
                          name={data?.name}
                          checked={checkboxValues[data?.name]}
                          onChange={handleCheckboxChange}
                        />
                      }
                      label={
                        <Typography
                          variant="body2"
                          style={{ fontSize: "15px" }}
                          sx={{ pl: -1 }}
                        >
                          {data.label}
                        </Typography>
                      }
                      sx={{ pl: 0.4 }}
                      style={data.style}
                    />
                  </Grid>
                );
              }
            })}
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClosePermission}>Cancel</Button>
          <Button
            onClick={() =>
              handleClickPermission(
                data?.id,
                data?.file_type,
                data?.file_name,
                data?.folder_name
              )
            }
            autoFocus
          >
            Submit
          </Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
}
