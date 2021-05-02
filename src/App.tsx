import React, { Component } from "react";
import ReactDOM from "react-dom";
import logo from './logo.svg';
import './App.css';
import { DirectSecp256k1HdWallet, Registry } from "@cosmjs/proto-signing";
import { defaultRegistryTypes, SigningStargateClient } from "@cosmjs/stargate";
import { MsgRegisterAccount } from "./codec/intertx/tx";
const myRegistry = new Registry([
  ...defaultRegistryTypes,
  ["/register.account", MsgRegisterAccount] // Replace with your own type URL and Msg class
]);
const mnemonic = // Replace with your own mnemonic
  "economy stock theory fatal elder harbor betray wasp final emotion task crumble siren bottom lizard educate guess current outdoor pair theory focus wife stone";

// Inside an async function...
const signer = await DirectSecp256k1HdWallet.fromMnemonic(
  mnemonic,
  { prefix: "myprefix" }, // Replace with your own Bech32 address prefix
);
const client = await SigningStargateClient.connectWithSigner(
  "my.endpoint.com", // Replace with your own RPC endpoint
  signer,
  {
    registry: myRegistry,
  },
);

async function makeBroadcastTx() {
  const myAddress = "wasm1pkptre7fdkl6gfrzlesjjvhxhlc3r4gm32kke3";
  const message = {
    typeUrl: "/my.custom.MsgXxx", // Same as above
    value: {
      foo: "bar",
    },
  };
  const fee = {
    amount: [
      {
        denom: "udenom", // Use the appropriate fee denom for your chain
        amount: "120000",
      },
    ],
    gas: "10000",
  };
  // Inside an async function...
  // This method uses the registry you provided
  const response = await client.signAndBroadcast(myAddress, [message], fee);
}

class App extends Component {
  
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <p>
            Edit <code>src/App.tsx</code> and save to reload.
        </p>
          <a
            className="App-link"
            href="https://reactjs.org"
            target="_blank"
            rel="noopener noreferrer"
          >
            Learn React
        </a>
        </header>
      </div>
    );
  }
}

export default App;
