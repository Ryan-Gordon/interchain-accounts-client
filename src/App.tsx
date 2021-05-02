import React, { Component } from "react";
import ReactDOM from "react-dom";
import logo from './logo.svg';
import './App.css';
import { DirectSecp256k1HdWallet, Registry } from "@cosmjs/proto-signing";
import { defaultRegistryTypes, SigningStargateClient } from "@cosmjs/stargate";
import { MsgRegisterAccount, MsgSend } from "./codec/intertx/tx";

const myRegistry = new Registry([
  ...defaultRegistryTypes,
  ["/register.account", MsgSend],
  ["/test", MsgRegisterAccount]
]);
const mnemonic = // Replace with your own mnemonic
  "alley afraid soup fall idea toss can goose become valve initial strong forward bright dish figure check leopard decide warfare hub unusual join cart";


async function makeBroadcastTx() {
  // Inside an async function...
  const signer = await DirectSecp256k1HdWallet.fromMnemonic(
    mnemonic,
    { prefix: "cosmos1" }, // Replace with your own Bech32 address prefix
  );
  const client = await SigningStargateClient.connectWithSigner(
    "localhost:16657", // Replace with your own RPC endpoint
    signer,
    {
      registry: myRegistry,
    },
  );

  const myAddress = "cosmos1mjk79fjjgpplak5wq838w0yd982gzkyfrk07am";
  const message = {
    typeUrl: "/register.account", // Same as above
    value: {
      owner: myAddress,
      sourcePort: "ibcaccount",
      sourceChannel: "channel-0"
    },
  };
  const fee = {
    amount: [
      {
        denom: "stake", // Use the appropriate fee denom for your chain
        amount: "200000",
      },
    ],
    gas: "200000",
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
