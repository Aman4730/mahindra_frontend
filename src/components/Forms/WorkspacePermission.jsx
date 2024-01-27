// import * as React from "react";
// import Button from "@mui/material/Button";
// import Dialog from "@mui/material/Dialog";
// import DialogActions from "@mui/material/DialogActions";
// import DialogContent from "@mui/material/DialogContent";
// import DialogContentText from "@mui/material/DialogContentText";
// import DialogTitle from "@mui/material/DialogTitle";
// import { Checkbox, FormControlLabel, Grid, Typography } from "@mui/material";

// export default function WorkspacePermission({
//   openDialog,
//   permission,
//   checkboxValues,
//   handleCheckboxChange,
//   handleClosePermission,
// }) {
//   const { title, permissionArray, buttonLabels } = permission;
//   return (
//     <React.Fragment>
//       <Dialog
//         open={openDialog}
//         onClose={handleClosePermission}
//         aria-labelledby="alert-dialog-title"
//         aria-describedby="alert-dialog-description"
//       >
//         <Grid item xs={10}>
//           <DialogTitle fontSize="14px">{title}</DialogTitle>
//         </Grid>
//         <DialogContent>
//           <DialogContentText id="alert-dialog-description">
//             <Grid container spacing={1}>
//               {permissionArray?.map((data) => (
//                 <Grid item key={data.label} xs={3}>
//                   <FormControlLabel
//                     control={
//                       <Checkbox
//                         name={data.name}
//                         checked={checkboxValues[data?.name]}
//                         onChange={handleCheckboxChange}
//                       />
//                     }
//                     label={
//                       <Typography variant="body2" style={{ fontSize: "15px" }}>
//                         {data.label}
//                       </Typography>
//                     }
//                     sx={{ pl: 0.4 }}
//                     style={data.style}
//                   />
//                 </Grid>
//               ))}
//             </Grid>
//           </DialogContentText>
//         </DialogContent>
//         <DialogActions>
//           <Button onClick={handleClosePermission}>Disagree</Button>
//           <Button onClick={handleClosePermission} autoFocus>
//             Agree
//           </Button>
//         </DialogActions>
//       </Dialog>
//     </React.Fragment>
//   );
// }

import * as React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import {
  Autocomplete,
  Checkbox,
  FormControlLabel,
  Grid,
  TextField,
  Typography,
} from "@mui/material";

export default function WorkspacePermission({
  data,
  openDialog,
  permission,
  autocomplete,
  userDropdowns,
  checkboxValues,
  groupsDropdown,
  handleCheckboxChange,
  handleClickPermission,
  handleClosePermission,
}) {
  const { title, permissionArray, buttonLabels } = permission;
  return (
    <React.Fragment>
      <Dialog
        open={openDialog}
        onClose={handleClosePermission}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle fontSize="17px">{title}</DialogTitle>
        <DialogContent>
          <Grid container>
            {autocomplete && (
              <>
                <Grid item xs={6}>
                  <Autocomplete
                    multiple
                    fullWidth
                    size="small"
                    id="tags-outlined"
                    options={groupsDropdown || ""}
                    getOptionLabel={(option) => option}
                    filterSelectedOptions
                    sx={{ ml: -1 }}
                    renderInput={(params) => (
                      <TextField {...params} label="Selected Groups" />
                    )}
                    // value={formData?.selected_groups}
                    // onChange={(event, value) =>
                    //   handleAutocompleteChange("selected_groups", value)
                    // }
                  />
                </Grid>
                <Grid item xs={6}>
                  <Autocomplete
                    size="small"
                    name="userDropdowns"
                    options={userDropdowns}
                    getOptionLabel={(user) => user.email}
                    renderInput={(params) => (
                      <TextField {...params} label="Select User" />
                    )}
                    // value={shareFormData.userDropdowns || null}
                    // onChange={(e, newValue) =>
                    //   handleShareData({
                    //     target: { name: "userDropdowns", value: newValue },
                    //   })
                    // }
                  />
                </Grid>
              </>
            )}
            {permissionArray
              // .filter((data) =>
              //   ["view", "move", "share", "rights"].includes(data.name)
              // )
              ?.map((data) => (
                <Grid item key={data.label} xs={3}>
                  <FormControlLabel
                    control={
                      <Checkbox
                        name={data.name}
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
              ))}
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClosePermission}>Cancel</Button>
          <Button
            onClick={() => handleClickPermission(data?.id, data?.file_type)}
            autoFocus
          >
            Submit
          </Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
}
