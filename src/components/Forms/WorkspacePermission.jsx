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
import { Checkbox, FormControlLabel, Grid, Typography } from "@mui/material";

export default function WorkspacePermission({
  openDialog,
  permission,
  checkboxValues,
  handleCheckboxChange,
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
        <DialogTitle fontSize="14px">{title}</DialogTitle>
        <DialogContent>
          <Grid container>
            {permissionArray?.map((data) => (
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
          <Button onClick={handleClosePermission}>Disagree</Button>
          <Button onClick={handleClosePermission} autoFocus>
            Agree
          </Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
}
