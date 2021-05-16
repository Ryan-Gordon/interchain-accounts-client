import React from "react";
import { Grid, TextField, Box, Avatar, Icon } from "@material-ui/core";
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import { DefaultTheme } from "@material-ui/styles";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import { LoadingButton } from "@material-ui/lab";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import FormHelperText from "@material-ui/core/FormHelperText";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";

import SaveIcon from "@material-ui/icons/Save";

import Container from "@material-ui/core/Container";
import { makeRegisterTx } from "../../../api/interchainaccounts";

import Stepper from "@material-ui/core/Stepper";
import Step from "@material-ui/core/Step";
import StepLabel from "@material-ui/core/StepLabel";

export const Register: React.FC = () => {
  const [loading, setLoading] = React.useState(false);
  const [address, setAddress] = React.useState("");
  const [zone, setZone] = React.useState("");
  const [initialLiquidityAmount, setInitialLiquidityAmount] =
    React.useState("");

  // Stepper Values
  const [activeStep, setActiveStep] = React.useState(0);
  const [steps, setStepValues] = React.useState([
    "Register Account",
    "???",
    "Profit",
  ]);
  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleReset = () => {
    setActiveStep(0);
  };

  const submitRegistration = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    const resp = await makeRegisterTx().catch((err) => {
      console.log(`Caught error on broadcast of register ${err}`);
      setLoading(false);
    });

    setLoading(false);
  };

  const handleZoneChange = (event: React.ChangeEvent<{ value: unknown }>) => {
    setZone(event.target.value as string);
  };

  return (
    <Container maxWidth="md">
      <Card variant="outlined">
        <CardContent>
          <form onSubmit={submitRegistration}>
            <Grid container spacing={5}>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Address to Register"
                  name={address}
                  size="small"
                  variant="outlined"
                />
              </Grid>
              <Grid item xs={3}>
                <FormControl fullWidth variant="outlined">
                  <InputLabel>Zone</InputLabel>
                  <Select
                    value={zone}
                    onChange={handleZoneChange}
                    label="Chain"
                  >
                    <MenuItem value={"gaia"}>gaia</MenuItem>
                    <MenuItem value={"bifrost"}>bifrost</MenuItem>
                  </Select>
                  <FormHelperText>
                    Select a zone to launch against
                  </FormHelperText>
                </FormControl>
              </Grid>
              <Grid item xs={9}>
                <TextField
                  fullWidth
                  label="Amount"
                  name={initialLiquidityAmount}
                  size="small"
                  variant="outlined"
                />
              </Grid>
              <Grid item xs={12}>
                <LoadingButton
                  loading={loading}
                  color="primary"
                  loadingPosition="start"
                  startIcon={<SaveIcon />}
                  fullWidth
                  type="submit"
                  variant="contained"
                >
                  Register Account
                </LoadingButton>
              </Grid>
              <Grid item xs={12}>
                <Stepper alternativeLabel activeStep={activeStep}>
                  {steps.map((label) => (
                    <Step key={label}>
                      <StepLabel>{label}</StepLabel>
                    </Step>
                  ))}
                </Stepper>
              </Grid>
            </Grid>
          </form>
        </CardContent>
      </Card>
    </Container>
  );
};
