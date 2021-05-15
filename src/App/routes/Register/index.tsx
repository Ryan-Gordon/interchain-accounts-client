import React from "react";
import { Grid, TextField, Box, Avatar, Icon } from "@material-ui/core";
import { LoadingButton } from '@material-ui/lab';


import SaveIcon from '@material-ui/icons/Save';


import Container from '@material-ui/core/Container';
import { makeRegisterTx } from "../../../api/interchainaccounts"

// Avatar related imports
import PeopleAltIcon from "@material-ui/icons/PeopleAlt";
import * as jdenticon from 'jdenticon'



export function Register(): JSX.Element {
  const [loading, setLoading] = React.useState(false);
  const [address, setAddress] = React.useState("");
  const submitRegistration = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    const resp = await makeRegisterTx().catch((err) => {
      console.log(`Caught error on broadcast of register ${err}`)
      setLoading(false);
    });
    setLoading(false);
  }
  // const avatar = address ? <Icon> <img src={jdenticon.toSvg(address, address.length)}/></Icon>: <PeopleAltIcon />

  return (
    <Container maxWidth="md">
      <Box m={5} color="primary">
        <form onSubmit={submitRegistration}>
          <Grid container spacing={3}>
            <Grid item md={12}>
              <Grid container spacing={2}>
                <Grid item md={12}>
                  <TextField fullWidth label="Address to Register" name={address} size="small" variant="outlined" />
                </Grid>
              </Grid>
            </Grid>
            <Grid item xs={12}>
              <LoadingButton loading={loading} color="secondary" loadingPosition="start"
                startIcon={<SaveIcon />} fullWidth type="submit" variant="contained">
                Register Account
          </LoadingButton>
            </Grid>
          </Grid>
        </form>
      </Box>
    </Container>
  );
}