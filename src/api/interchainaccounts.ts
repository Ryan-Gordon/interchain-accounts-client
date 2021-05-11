import { DirectSecp256k1HdWallet, Registry } from "@cosmjs/proto-signing";
import { createProtobufRpcClient, QueryClient } from "@cosmjs/stargate";
import { toAccAddress } from "@cosmjs/stargate/build/queries/utils"
import { defaultRegistryTypes, SigningStargateClient, coins } from "@cosmjs/stargate";
import { setupBankExtension } from "@cosmjs/stargate/build/queries/bank"
import { Bech32 } from "@cosmjs/encoding"
import { MsgRegisterAccount, MsgSend as InterTxMsgSend } from "../codec/intertx/tx";
import { QueryClientImpl } from "../codec/intertx/query";
import { Tendermint34Client } from "@cosmjs/tendermint-rpc";

const myRegistry = new Registry([
  ...defaultRegistryTypes,
  ["/intertx.MsgRegisterAccount", MsgRegisterAccount],
  ["/intertx.MsgSend", InterTxMsgSend],
]);

const MNEMONIC_1 = // Replace with your own mnemonic
  "alley afraid soup fall idea toss can goose become valve initial strong forward bright dish figure check leopard decide warfare hub unusual join cart";

const MNEMONIC_2="record gift you once hip style during joke field prize dust unique length more pencil transfer quit train device arrive energy sort steak upset"

export const DEFAULT_ENDPOINT = "localhost:16657"
export const SECOND_ENDPOINT = "localhost:26657"
export const COSM_DEV_ADDRESS_1 = "cosmos1mjk79fjjgpplak5wq838w0yd982gzkyfrk07am";
export const COSM_DEV_ADDRESS_2 = "cosmos17dtl0mjt3t77kpuhg2edqzjpszulwhgzuj9ljs";
export const IBC_ACCOUNT = "cosmos1pt6ar8lawmvvq5haxc3l3zhjfl04u56fs2ndh9"


export async function getClientforWalletMnemonic(endpoint: string = DEFAULT_ENDPOINT, mnemonic: string = MNEMONIC_1) {
  const wallet = await DirectSecp256k1HdWallet.fromMnemonic(mnemonic);
  const client = await SigningStargateClient.connectWithSigner(endpoint, wallet, {
    registry: myRegistry,
  });
  return client
}
export async function makeRegisterTx() {

  const client = await getClientforWalletMnemonic();
  const myAddress = COSM_DEV_ADDRESS_1;
  const message = {
    typeUrl: "/intertx.MsgRegisterAccount", // Same as above
    value: {
      owner: myAddress,
      sourcePort: "ibcaccount",
      sourceChannel: "channel-0",
      chainId: "test-1"
    },
  };
  const fee = {
    amount: [
      {
        denom: "stake", // Use the appropriate fee denom for your chain
        amount: "90000",
      },
    ],
    gas: "90000",
  };
  // Inside an async function...
  // This method uses the registry you provided
  const response = await client.signAndBroadcast(myAddress, [message], fee);
  console.log("Finished makeBroadcastTx Request")
  return response
}

export async function makeAddressQuery(queryAddress:string) {
  // The Tendermint client knows how to talk to the Tendermint RPC endpoint
  const tendermintClient = await Tendermint34Client.connect(DEFAULT_ENDPOINT);

  // The generic Stargate query client knows how to use the Tendermint client to submit unverified ABCI queries
  const queryClient = new QueryClient(tendermintClient);

  // This helper function wraps the generic Stargate query client for use by the specific generated query client
  const rpcClient = createProtobufRpcClient(queryClient);

  // Here we instantiate a specific query client which will have the custom methods defined in the .proto file
  const queryService = new QueryClientImpl(rpcClient);

  // Now you can use this service to submit queries
  const queryResult = await queryService.IBCAccountFromAddress({
    address: toAccAddress(queryAddress),
    port: "ibcaccount",
    channel: "channel-0"
  });
  console.log("Finished makeAddressQueryTx Request")
  console.log(Bech32.encode("cosmos", queryResult.address))
}

export async function makeBankQuery(queryAddress: string) {
  // The Tendermint client knows how to talk to the Tendermint RPC endpoint
  const tendermintClient = await Tendermint34Client.connect(SECOND_ENDPOINT);

  // The generic Stargate query client knows how to use the Tendermint client to submit unverified ABCI queries
  // const queryClient = new QueryClient(tendermintClient);
  const queryClient = QueryClient.withExtensions(
    tendermintClient,
    setupBankExtension,
    // You can add up to 8 extensions
  );

  // This helper function wraps the generic Stargate query client for use by the specific generated query client
//   const rpcClient = createProtobufRpcClient(queryClient);

  // Here we instantiate a specific query client which will have the custom methods defined in the .proto file
//   const queryService = new QueryClientImpl(rpcClient);
  

  // Now you can use this service to submit queries
  const queryResult = await queryClient.bank.balance(queryAddress, "stake")
  console.log("Finished makeBankQueryTx Request")
  console.log(`Account ${queryAddress} has a balance of ${queryResult.amount} ${queryResult.denom}`)
}

export async function makeBankSendTx(sendAddress: string, receivingAddress:string, amount:number, denom:string, chain:string){
  const client = await getClientforWalletMnemonic(chain, MNEMONIC_2);
  
  const transferAmount = coins(amount, denom)
  // const signedTX = await client.sendIbcTokens(sendAddress, receivingAddress, transferAmount)
  const response = await client.sendTokens(sendAddress, receivingAddress, transferAmount);
  console.log("Finished bank send Request")
  console.log(response)
}

export async function makeIntertxSendTx(sendAddress:string, receivingAddress:string, amount:number, denom:string, gas:number = 90000){
  const client = await getClientforWalletMnemonic();
  const transferAmount = coins(amount, denom)
  const message = {
    typeUrl: "/intertx.MsgSend", // Same as above
    value: {
      sender: toAccAddress(sendAddress),
      toAddress: toAccAddress(receivingAddress),
      sourcePort: "ibcaccount",
      sourceChannel: "channel-0",
      chainId: "test-1",
      amount: transferAmount
    },
  };
  const fee = {
    amount: [
      {
        denom: denom, // Use the appropriate fee denom for your chain
        amount: "90000",
      },
    ],
    gas: "90000",
  };

  //TODO: Review just using 
  // const response = await client.sendIbcTokens(sendAddress, receivingAddress, transferAmount, "ibcaccount", "channel-0");

  const response = await client.signAndBroadcast(sendAddress, [message], fee);
  console.log("Finished intertx send Request")
  console.log(response)
  
}