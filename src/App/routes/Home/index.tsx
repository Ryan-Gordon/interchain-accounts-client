import React from "react";
import {Button, Grid} from "@material-ui/core";
import {makeRegisterTx, makeAddressQuery, makeBankQuery, COSM_DEV_ADDRESS_1, IBC_ACCOUNT} from "../../../api/interchainaccounts"

export function Home(): JSX.Element {

    return (
        <div>
        <Grid container direction="column" alignItems="center">
          <Grid>
            <Button
              variant="contained"
              color="primary"
              onClick={() => {
                makeRegisterTx()
              }}
            >
              Make Register Tx
            </Button>
          </Grid>
          <Grid>
            <Button
              variant="contained"
              color="primary"
              onClick={() => {
                makeAddressQuery(COSM_DEV_ADDRESS_1)
              }}
            >
              Make Address Query 
            </Button>
          </Grid>
          <Grid>
            <Button
              variant="contained"
              color="primary"
              onClick={() => {
                makeBankQuery(IBC_ACCOUNT)
              }}
            >
              Make Bank Query
            </Button>
          </Grid>
          <Grid>
            <Button
              variant="contained"
              color="primary"
              onClick={() => {
                alert("clicked");
              }}
            >
              {" "}
              Make Register Tx
            </Button>
          </Grid>
          <Grid>
            <Button
              variant="contained"
              color="primary"
              onClick={() => {
                alert("clicked");
              }}
            >
              {" "}
              Make Register Tx
            </Button>
          </Grid>
          <Grid>
            <Button
              variant="contained"
              color="primary"
              onClick={() => {
                alert("clicked");
              }}
            >
              {" "}
              Make Register Tx
            </Button>
          </Grid>
          <Grid>
            <Button
              variant="contained"
              color="primary"
              onClick={() => {
                alert("clicked");
              }}
            >
              {" "}
              Make Register Tx
            </Button>
          </Grid>
        </Grid>
      </div>
    );
}