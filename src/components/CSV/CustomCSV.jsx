import React from "react";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Card,
  Checkbox,
  FormControlLabel,
  FormGroup,
  Grid,
  Typography,
} from "@mui/material";
import {
  common,
  inverterSlots,
  inverterStrings,
  inverters,
} from "./csvParameters";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  formControl: {
    minWidth: 120,
  },
  dateStyle: {
    width: 140,
  },
  root: {
    width: "100%",
  },
  heading: {
    fontSize: theme.typography.pxToRem(15),
    fontWeight: theme.typography.fontWeightRegular,
  },
  formControlLabelStyle: {
    margin: 0,
    // padding: 0,
  },
}));
const CustomCSV = ({
  commonParams,
  commonSelectAll,
  invertersSelectAll,
  globalSelectAll,
  invertersParams,
  inverterSlotsParams,
  inverterStringsParams,
  handleCommonParamChange,
  inverterSlotsSelectAll,
  inverterStringsSelectAll,
  handleCommonSelectAllChange,
  handleInvertersSelectAllChange,
  handleInverterSlotsSelectAllChange,
  handleInverterStringsSelectAllChange,
  handleInvertersParamChange,
  handleInverterStringsParamChange,
  handleInverterSlotsParamChange,
}) => {
  const classes = useStyles();

  return (
    <>
      <div className={classes.root} style={{ marginTop: "1.5rem" }}>
        <Accordion defaultExpanded>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel1a-content"
            id="panel1a-header"
            style={{ paddingTop: 0, paddingBottom: 0 }}
          >
            <Grid container alignItems="center">
              <Grid item>
                <Typography style={{ color: "#000" }}>Common</Typography>
              </Grid>
              <Grid item style={{ marginRight: "2rem" }}>
                <FormControlLabel
                  className={classes.formControlLabelStyle}
                  onClick={(event) => event.stopPropagation()}
                  control={
                    <Checkbox
                      checked={commonSelectAll}
                      onChange={handleCommonSelectAllChange}
                      size="small"
                      name="checkedA"
                      color="primary"
                    />
                  }
                  label={<span style={{ fontSize: ".9rem" }}>Select All</span>}
                />
              </Grid>
            </Grid>
          </AccordionSummary>
          <AccordionDetails>
            <FormGroup row>
              {commonParams?.map((element, index) => (
                <FormControlLabel
                  key={element.label}
                  control={
                    <Checkbox
                      checked={element?.checked}
                      onChange={(event) =>
                        handleCommonParamChange(element?.label)
                      }
                      size="small"
                      name={element?.label.replace(/\s/g, "")}
                      color="default"
                    />
                  }
                  label={element?.label}
                />
              ))}
            </FormGroup>
          </AccordionDetails>
        </Accordion>
        <Accordion defaultExpanded>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel1a-content"
            id="panel1a-header"
            style={{ paddingTop: 0, paddingBottom: 0 }}
          >
            <Grid container alignItems="center" justify="space-between">
              <Grid item>
                <Typography style={{ color: "#000" }}>Inverters</Typography>
              </Grid>
              <Grid item style={{ marginRight: "2rem" }}>
                <FormControlLabel
                  className={classes.formControlLabelStyle}
                  onClick={(event) => event.stopPropagation()}
                  control={
                    <Checkbox
                      checked={invertersSelectAll}
                      onChange={handleInvertersSelectAllChange}
                      size="small"
                      name="checkedA"
                      color="primary"
                    />
                  }
                  label={<span style={{ fontSize: ".9rem" }}>Select All</span>}
                />
              </Grid>
            </Grid>
          </AccordionSummary>
          <AccordionDetails>
            <FormGroup row>
              {invertersParams.map((element, index) => (
                <FormControlLabel
                  key={element.label}
                  control={
                    <Checkbox
                      checked={element.checked}
                      onChange={(event) =>
                        handleInvertersParamChange(element.label)
                      }
                      size="small"
                      name={element.label.replace(/\s/g, "")}
                      color="default"
                    />
                  }
                  label={element.label}
                />
              ))}
            </FormGroup>
          </AccordionDetails>
        </Accordion>
        <Accordion defaultExpanded>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel1a-content"
            id="panel1a-header"
            style={{ paddingTop: 0, paddingBottom: 0 }}
          >
            <Grid container alignItems="center" justify="space-between">
              <Grid item>
                <Typography style={{ color: "#000" }}>
                  Inverter Slots
                </Typography>
              </Grid>
              <Grid item style={{ marginRight: "2rem" }}>
                <FormControlLabel
                  className={classes.formControlLabelStyle}
                  onClick={(event) => event.stopPropagation()}
                  control={
                    <Checkbox
                      checked={inverterSlotsSelectAll}
                      onChange={handleInverterSlotsSelectAllChange}
                      size="small"
                      name="checkedA"
                      color="primary"
                    />
                  }
                  label={<span style={{ fontSize: ".9rem" }}>Select All</span>}
                />
              </Grid>
            </Grid>
          </AccordionSummary>
          <AccordionDetails>
            <FormGroup row>
              {inverterSlotsParams.map((element, index) => (
                <FormControlLabel
                  key={element.label}
                  control={
                    <Checkbox
                      checked={element.checked}
                      onChange={(event) =>
                        handleInverterSlotsParamChange(element.label)
                      }
                      size="small"
                      name={element.label.replace(/\s/g, "")}
                      color="default"
                    />
                  }
                  label={element.label}
                />
              ))}
            </FormGroup>
          </AccordionDetails>
        </Accordion>
        <Accordion defaultExpanded>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel1a-content"
            id="panel1a-header"
            style={{ paddingTop: 0, paddingBottom: 0 }}
          >
            <Grid container alignItems="center" justify="space-between">
              <Grid item>
                <Typography style={{ color: "#000" }}>
                  Inverter Strings
                </Typography>
              </Grid>
              <Grid item style={{ marginRight: "2rem" }}>
                <FormControlLabel
                  className={classes.formControlLabelStyle}
                  onClick={(event) => event.stopPropagation()}
                  control={
                    <Checkbox
                      checked={inverterStringsSelectAll}
                      onChange={handleInverterStringsSelectAllChange}
                      size="small"
                      name="checkedA"
                      color="primary"
                    />
                  }
                  label={<span style={{ fontSize: ".9rem" }}>Select All</span>}
                />
              </Grid>
            </Grid>
          </AccordionSummary>
          <AccordionDetails>
            <FormGroup row>
              {inverterStringsParams.map((element, index) => (
                <FormControlLabel
                  key={element.label}
                  control={
                    <Checkbox
                      checked={element.checked}
                      onChange={(event) =>
                        handleInverterStringsParamChange(element.label)
                      }
                      size="small"
                      name={element.label.replace(/\s/g, "")}
                      color="default"
                    />
                  }
                  label={element.label}
                />
              ))}
            </FormGroup>
          </AccordionDetails>
        </Accordion>
      </div>
    </>
  );
};

export default CustomCSV;
