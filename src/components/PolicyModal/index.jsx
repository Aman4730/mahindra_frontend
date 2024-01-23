import * as React from "react";
import Dialog from "@mui/material/Dialog";
import TextField from "@mui/material/TextField";
import DialogTitle from "@mui/material/DialogTitle";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import { Button, Icon, RSelect } from "../Component";
import {
  Autocomplete,
  Checkbox,
  FormControl,
  FormControlLabel,
  Grid,
  Stack,
  Typography,
} from "@mui/material";
export default function PolicyModal({
  open,
  title,
  title1,
  title2,
  title3,
  title4,
  title5,
  title6,
  title7,
  title8,
  email,
  access,
  addTask,
  Policies,
  password,
  version,
  BandWidth,
  recyclebin,
  linkSharing,
  addPolicies,
  versionfield,
  PropertyName,
  onFormSubmit,
  userDropdowns,
  groupsDropdown,
  setAddPolicies,
  checkboxValues,
  onClickaddTask,
  recyclebinfield,
  handleShareData,
  handleCheckboxChange,
  type = "normal",
  buttonSuccessTitle = "Okay",
  buttonCancelTitle = "Cancel",
  handleClose = () => alert("Please add handle cancel function"),
  handleOkay = () => alert("Please add handle success function"),
  handleChange = () => alert("Please add handle change function"),
  inputList = [
    { type: "file", name: "Default", placeholder: "Default Placeholder" },
  ],
}) {
  const top100Films = [
    { label: "My Workspace", year: 1994 },
    { label: "TeamSpace", year: 1972 },
  ];

  return (
    <div>
      <Dialog open={open} onClose={handleClose} fullWidth>
        <DialogTitle sx={{ mr: 1, mb: -2, mt: -1 }}>{title}</DialogTitle>
        <DialogContent>
          {type === "form" && (
            <FormControl>
              <Grid container spacing={1} sx={{ mt: 0.1 }}>
                <Grid
                  container
                  spacing={1}
                  sx={{ mt: 0.1 }}
                  style={{ width: "550px", height: "105px" }}
                >
                  {/* Policies */}
                  <Grid item xs={6}>
                    <Autocomplete
                      fullWidth
                      size="small"
                      disablePortal
                      options={["MyWorkspace", "Teamspace"]}
                      renderInput={(params) => (
                        <TextField {...params} label="Type" />
                      )}
                      value={addPolicies?.policy_type}
                      onChange={(e, newValue) =>
                        setAddPolicies({
                          ...addPolicies,
                          policy_type: newValue,
                        })
                      }
                    />
                  </Grid>
                  {Policies?.map((data, index) => (
                    <>
                      <Grid item xs={6} key={index}>
                        <TextField
                          fullWidth
                          size="small"
                          type={data.type}
                          name={data.name}
                          variant="outlined"
                          defaultValue={addPolicies[data.name]}
                          onChange={handleShareData}
                          value={addPolicies.name}
                          label={data.placeholder}
                          inputProps={{
                            style: {
                              padding: "7px",
                            },
                          }}
                        />
                      </Grid>
                    </>
                  ))}
                  <Grid item xs={6}>
                    <RSelect
                      isMulti
                      options={groupsDropdown}
                      name="addCabinet"
                      placeholder="Select Groups"
                      styles={{
                        control: (provided) => ({
                          ...provided,
                          minHeight: "10px", // Adjust the height value as per your requirement
                        }),
                      }}
                      onChange={(e) =>
                        setAddPolicies({
                          ...addPolicies,
                          selected_group: e.map((option) => option.label),
                          [name]: e.map((option) => option.value),
                        })
                      }
                    />
                  </Grid>

                  <Grid item xs={6}>
                    <RSelect
                      isMulti
                      options={userDropdowns}
                      name="addCabinet"
                      placeholder="Select User"
                      styles={{
                        control: (provided) => ({
                          ...provided,
                          minHeight: "10px", // Adjust the height value as per your requirement
                        }),
                      }}
                      onChange={(e) =>
                        setAddPolicies({
                          ...addPolicies,
                          selected_user: e.map((option) => option.label),
                          [name]: e.map((option) => option.value),
                        })
                      }
                    />
                  </Grid>
                </Grid>
                <br />
                <br />
                <br />
                {addPolicies.policy_type == "Teamspace" ? (
                  <>
                    {/* Password Setting */}
                    <Grid item xs={10} sx={{ mb: -2 }}>
                      <DialogTitle sx={{ ml: -3, mt: -2.5 }} fontSize="14px">
                        {title1}
                      </DialogTitle>
                    </Grid>
                    {inputList?.map((data, index) => (
                      <>
                        <Grid item xs={4} key={index}>
                          <TextField
                            fullWidth
                            size="small"
                            type={data.type}
                            name={data.name}
                            variant="outlined"
                            onChange={handleShareData}
                            value={addPolicies.name}
                            label={data.placeholder}
                            defaultValue={addPolicies[data.name]}
                            inputProps={{
                              style: {
                                paddingTop: "5px",
                              },
                            }}
                          />
                        </Grid>
                      </>
                    ))}
                    <Grid item xs={10} sx={{ mb: -2 }}>
                      {/* <DialogTitle sx={{ ml: -3, mt: -2.5 }} fontSize="14px">
                    {title2}
                  </DialogTitle> */}
                    </Grid>
                    {password?.map((data) => (
                      <>
                        <Grid item xs={4} key={data.name}>
                          <TextField
                            fullWidth
                            size="small"
                            type={data.type}
                            name={data.name}
                            variant="outlined"
                            onChange={handleShareData}
                            value={addPolicies.name}
                            label={data.placeholder}
                            defaultValue={addPolicies[data.name]}
                            inputProps={{
                              style: {
                                paddingTop: "5px",
                              },
                            }}
                          />
                        </Grid>
                      </>
                    ))}
                    {/* File Extension */}
                    <Grid item xs={10} sx={{ mb: -2 }}>
                      <DialogTitle sx={{ ml: -3, mt: -2.5 }} fontSize="14px">
                        {title2}
                      </DialogTitle>
                    </Grid>
                    <Grid
                      item
                      xs={12}
                      style={{
                        display: "flex",
                        flexDirection: "row",
                      }}
                    >
                      <TextField
                        fullWidth
                        type="text"
                        name="file_extension"
                        size="small"
                        variant="outlined"
                        onChange={PropertyName}
                        label="File Extension"
                        inputProps={{
                          style: {
                            padding: "7px",
                          },
                        }}
                        // defaultValue={addPolicies.properties_name}
                      />
                      <Button
                        color="primary"
                        style={{
                          height: "37px",
                          width: "40px",
                          marginLeft: "3px",
                          display: "flex",
                          justifyContent: "center",
                        }}
                        onClick={onClickaddTask}
                      >
                        <Icon name="plus"></Icon>
                      </Button>
                      <Button
                        color="primary"
                        style={{
                          height: "37px",
                          width: "40px",
                          marginLeft: "3px",
                          display: "flex",
                          justifyContent: "center",
                        }}
                        onClick={onClickaddTask}
                      >
                        <Icon name="minus"></Icon>
                      </Button>
                      <br />
                    </Grid>
                    <Grid
                      container
                      spacing={1}
                      m={1}
                      // p={2}
                      xs={12}
                      borderRadius="4px"
                      border="2px solid lightgrey"
                    >
                      {addTask?.map((ele, index) => {
                        return (
                          <>
                            <Grid
                              item
                              xs={2}
                              key={index}
                              style={{
                                display: "flex",
                                flexDirection: "row",
                                marginBottom: "10px",
                                justifyContent: "space-between",
                              }}
                            >
                              <Stack
                                style={{
                                  width: "100%",
                                  // borderBottom: "1px solid black",
                                }}
                              >
                                {ele},
                              </Stack>
                              {/* <Button
                            onClick={() => removeHandler(index)}
                            className="btn-icon"
                            variant="outlined"
                            style={{
                              padding: "1px 2px 1px 2px",
                              width: "25%",
                            }}
                          >
                            Remove,
                          </Button> */}
                            </Grid>
                          </>
                        );
                      })}
                    </Grid>
                    {/* Link Expiry */}
                    <Grid item xs={10} sx={{ mb: -2 }}>
                      <DialogTitle sx={{ ml: -3, mt: -2.5 }} fontSize="14px">
                        {title3}
                      </DialogTitle>
                    </Grid>
                    {linkSharing?.map((data) => (
                      <>
                        <Grid item xs={4} key={data.name}>
                          <TextField
                            fullWidth
                            size="small"
                            type={data.type}
                            name={data.name}
                            variant="outlined"
                            onChange={handleShareData}
                            value={addPolicies.name}
                            label={data.placeholder}
                            defaultValue={addPolicies[data.name]}
                            inputProps={{
                              style: {
                                paddingTop: "5px",
                              },
                            }}
                          />
                        </Grid>
                      </>
                    ))}
                    {/* Email */}
                    <Grid item xs={10} sx={{ mb: -2 }}>
                      <DialogTitle sx={{ ml: -3, mt: -2.5 }} fontSize="14px">
                        {title4}
                      </DialogTitle>
                    </Grid>
                    {email?.map((data) => (
                      <>
                        <Grid item xs={4} key={data.name}>
                          <TextField
                            fullWidth
                            size="small"
                            type={data.type}
                            name={data.name}
                            variant="outlined"
                            onChange={handleShareData}
                            value={addPolicies.name}
                            label={data.placeholder}
                            defaultValue={addPolicies[data.name]}
                            inputProps={{
                              style: {
                                paddingTop: "5px",
                              },
                            }}
                          />
                        </Grid>
                      </>
                    ))}
                    {/* BandWidth */}
                    <Grid item xs={10} sx={{ mb: -2 }}>
                      <DialogTitle sx={{ ml: -3, mt: -2.5 }} fontSize="14px">
                        {title5}
                      </DialogTitle>
                    </Grid>
                    {BandWidth?.map((data) => (
                      <>
                        <Grid item xs={4} key={data.name}>
                          <TextField
                            fullWidth
                            size="small"
                            type={data.type}
                            name={data.name}
                            variant="outlined"
                            value={addPolicies.name}
                            label={data.placeholder}
                            onChange={handleShareData}
                            defaultValue={addPolicies[data.name]}
                            inputProps={{
                              style: {
                                paddingTop: "5px",
                              },
                            }}
                          />
                        </Grid>
                      </>
                    ))}
                    <Grid item xs={10} sx={{ mb: -3.8 }} width={400}>
                      <DialogTitle sx={{ ml: -3, mt: -2.5 }} fontSize="14px">
                        {title6}
                      </DialogTitle>
                    </Grid>
                    {access?.map((data) => (
                      <>
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
                              <Typography
                                variant="body2"
                                style={{ fontSize: "15px" }}
                              >
                                {data.label}
                              </Typography>
                            }
                            sx={{ pl: 0.4, mb: -4 }}
                            style={data.style}
                          />
                        </Grid>
                      </>
                    ))}
                    <Grid item xs={10} sx={{ mb: -2 }}>
                      <DialogTitle sx={{ ml: -3 }} fontSize="14px">
                        {title7}
                      </DialogTitle>
                    </Grid>
                    {recyclebin?.map((data) => (
                      <>
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
                              <Typography
                                variant="body2"
                                style={{ fontSize: "15px" }}
                              >
                                {data.label}
                              </Typography>
                            }
                            sx={{ pl: 0.4, mb: -4 }}
                            style={data.style}
                          />
                        </Grid>
                      </>
                    ))}
                    {checkboxValues.enable == true ? (
                      <>
                        {recyclebinfield?.map((data) => (
                          <>
                            <Grid item xs={4} key={data.name}>
                              <TextField
                                fullWidth
                                size="small"
                                type={data.type}
                                name={data.name}
                                variant="outlined"
                                value={addPolicies.name}
                                label={data.placeholder}
                                onChange={handleShareData}
                                defaultValue={addPolicies[data.name]}
                                inputProps={{
                                  style: {
                                    paddingTop: "7px",
                                  },
                                }}
                              />
                            </Grid>
                          </>
                        ))}
                      </>
                    ) : (
                      ""
                    )}
                    <Grid item xs={10} sx={{ mb: -3.5 }}>
                      <DialogTitle sx={{ ml: -3 }} fontSize="14px">
                        {title8}
                      </DialogTitle>
                    </Grid>
                    {version?.map((data) => (
                      <>
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
                              <Typography
                                variant="body2"
                                style={{ fontSize: "15px" }}
                              >
                                {data.label}
                              </Typography>
                            }
                            sx={{ pl: 0.4, mb: -4 }}
                            style={data.style}
                          />
                        </Grid>
                      </>
                    ))}
                    {versionfield?.map((data) => (
                      <>
                        <Grid item xs={4} key={data.name}>
                          <TextField
                            fullWidth
                            size="small"
                            type={data.type}
                            name={data.name}
                            variant="outlined"
                            value={addPolicies.name}
                            label={data.placeholder}
                            onChange={handleShareData}
                            defaultValue={addPolicies[data.name]}
                            inputProps={{
                              style: {
                                paddingTop: "5px",
                              },
                            }}
                          />
                        </Grid>
                      </>
                    ))}
                  </>
                ) : (
                  ""
                )}
                {/* ------------------------------------------------ */}
                {addPolicies.policy_type == "MyWorkspace" ? (
                  <>
                    {/* File Extension */}
                    <Grid item xs={10} sx={{ mb: -2 }}>
                      <DialogTitle sx={{ ml: -3, mt: -2.5 }} fontSize="14px">
                        {title2}
                      </DialogTitle>
                    </Grid>
                    <Grid
                      item
                      xs={12}
                      style={{
                        display: "flex",
                        flexDirection: "row",
                      }}
                    >
                      <TextField
                        fullWidth
                        type="text"
                        name="file_extension"
                        size="small"
                        variant="outlined"
                        onChange={PropertyName}
                        label="File Extension"
                        inputProps={{
                          style: {
                            padding: "7px",
                          },
                        }}
                        // defaultValue={addPolicies.properties_name}
                      />
                      <Button
                        color="primary"
                        style={{
                          height: "37px",
                          width: "40px",
                          marginLeft: "3px",
                          display: "flex",
                          justifyContent: "center",
                        }}
                        onClick={onClickaddTask}
                      >
                        <Icon name="plus"></Icon>
                      </Button>
                      <Button
                        color="primary"
                        style={{
                          height: "37px",
                          width: "40px",
                          marginLeft: "3px",
                          display: "flex",
                          justifyContent: "center",
                        }}
                        onClick={onClickaddTask}
                      >
                        <Icon name="minus"></Icon>
                      </Button>
                      <br />
                    </Grid>
                    <Grid
                      container
                      m={1}
                      pl={1}
                      pt={0.3}
                      xs={12}
                      borderRadius="4px"
                      border="1px solid lightgrey"
                    >
                      {addTask?.map((ele, index) => {
                        return (
                          <>
                            <Grid
                              item
                              xs={2}
                              key={index}
                              style={{
                                display: "flex",
                                flexDirection: "row",
                                marginBottom: "10px",
                                justifyContent: "space-between",
                              }}
                            >
                              <Stack
                                style={{
                                  width: "100%",
                                  // borderBottom: "1px solid black",
                                }}
                              >
                                {ele},
                              </Stack>
                            </Grid>
                          </>
                        );
                      })}
                    </Grid>
                    {/* BandWidth */}
                    <Grid item xs={10} sx={{ mb: -2 }}>
                      <DialogTitle sx={{ ml: -3, mt: -2.5 }} fontSize="14px">
                        {title5}
                      </DialogTitle>
                    </Grid>
                    {BandWidth?.map((data) => (
                      <>
                        <Grid item xs={4} key={data.name}>
                          <TextField
                            fullWidth
                            size="small"
                            type={data.type}
                            name={data.name}
                            variant="outlined"
                            value={addPolicies.name}
                            label={data.placeholder}
                            onChange={handleShareData}
                            defaultValue={addPolicies[data.name]}
                            inputProps={{
                              style: {
                                paddingTop: "5px",
                              },
                            }}
                          />
                        </Grid>
                      </>
                    ))}
                    <Grid item xs={10} sx={{ mb: -3.8 }} width={400}>
                      <DialogTitle sx={{ ml: -3, mt: -2.5 }} fontSize="14px">
                        {title6}
                      </DialogTitle>
                    </Grid>
                    {access?.map((data) => (
                      <>
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
                              <Typography
                                variant="body2"
                                style={{ fontSize: "15px" }}
                              >
                                {data.label}
                              </Typography>
                            }
                            sx={{ pl: 0.4, mb: -4 }}
                            style={data.style}
                          />
                        </Grid>
                      </>
                    ))}
                    <Grid item xs={10} sx={{ mb: -3.5 }}>
                      <DialogTitle sx={{ ml: -3 }} fontSize="14px">
                        {title7}
                      </DialogTitle>
                    </Grid>
                    {recyclebin?.map((data) => (
                      <>
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
                              <Typography
                                variant="body2"
                                style={{ fontSize: "15px" }}
                              >
                                {data.label}
                              </Typography>
                            }
                            sx={{ pl: 0.4, mb: -4 }}
                            style={data.style}
                          />
                        </Grid>
                      </>
                    ))}
                    {checkboxValues.enable == true ? (
                      <>
                        {recyclebinfield?.map((data) => (
                          <>
                            <Grid item xs={4} key={data.name}>
                              <TextField
                                fullWidth
                                size="small"
                                type={data.type}
                                name={data.name}
                                variant="outlined"
                                value={addPolicies.name}
                                label={data.placeholder}
                                onChange={handleShareData}
                                defaultValue={addPolicies[data.name]}
                                inputProps={{
                                  style: {
                                    paddingTop: "7px",
                                  },
                                }}
                              />
                            </Grid>
                          </>
                        ))}
                      </>
                    ) : (
                      ""
                    )}
                    <Grid item xs={10} sx={{ mb: -3.5 }}>
                      <DialogTitle sx={{ ml: -3 }} fontSize="14px">
                        {title8}
                      </DialogTitle>
                    </Grid>
                    {version?.map((data) => (
                      <>
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
                              <Typography
                                variant="body2"
                                style={{ fontSize: "15px" }}
                              >
                                {data.label}
                              </Typography>
                            }
                            sx={{ pl: 0.4, mb: -4 }}
                            style={data.style}
                          />
                        </Grid>
                      </>
                    ))}
                    {versionfield?.map((data) => (
                      <>
                        <Grid item xs={4} key={data.name}>
                          <TextField
                            fullWidth
                            size="small"
                            type={data.type}
                            name={data.name}
                            variant="outlined"
                            value={addPolicies.name}
                            label={data.placeholder}
                            onChange={handleShareData}
                            defaultValue={addPolicies[data.name]}
                            inputProps={{
                              style: {
                                paddingTop: "5px",
                              },
                            }}
                          />
                        </Grid>
                      </>
                    ))}
                  </>
                ) : (
                  ""
                )}
              </Grid>
            </FormControl>
          )}
        </DialogContent>
        <DialogActions sx={{ display: "block", marginLeft: "15px" }}>
          <Button color="primary" onClick={onFormSubmit}>
            {buttonSuccessTitle}
          </Button>
          <Button onClick={handleClose}>{buttonCancelTitle}</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
