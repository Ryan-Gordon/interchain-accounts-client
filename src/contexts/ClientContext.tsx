// Adapted from https://github.com/CosmWasm/ibc-visualizer/blob/main/src/contexts/ClientContext.tsx
import React, { useEffect } from "react";

import { createProtobufRpcClient, QueryClient } from "@cosmjs/stargate";
import { setupBankExtension } from "@cosmjs/stargate/build/queries/bank";
import { Tendermint34Client } from "@cosmjs/tendermint-rpc";
import { config } from "../config";

export type IbcClient = QueryClient;

export interface ClientContextType {
    readonly getClient: () => IbcClient;
}

const defaultClientContext: ClientContextType = {
    getClient: (): IbcClient => {
        throw new Error("not yet initialized");
    },
};

const ClientContext = React.createContext<ClientContextType>(defaultClientContext);

export const useClient = (): ClientContextType => React.useContext(ClientContext);

export function ClientProvider({ children }: React.HTMLAttributes<HTMLOrSVGElement>): JSX.Element {
    const [tmClient, setTmClient] = React.useState<Tendermint34Client>();
    const [ibcClient, setIbcClient] = React.useState<IbcClient>();
    const [value, setValue] = React.useState<ClientContextType>(defaultClientContext);
    const [clientsAvailable, setClientsAvailable] = React.useState(false);

    useEffect(() => {
        (async function updateTmClient() {
            const tmClient = await Tendermint34Client.connect(config.rpcUrl);
            setTmClient(tmClient);
        })();
    }, []);

    useEffect(() => {
        if (!tmClient) return;

        (async function updateIbcClient() {
            const ibcClient = QueryClient.withExtensions(tmClient, setupBankExtension);
            setIbcClient(ibcClient);
        })();
    }, [tmClient]);

    useEffect(() => {
        if (!tmClient || !ibcClient) return;

        setValue({ getClient: () => ibcClient });
        setClientsAvailable(true);
    }, [ibcClient, tmClient]);

    return clientsAvailable ? (
        <ClientContext.Provider value={value}>{children}</ClientContext.Provider>
    ) : (
        <div className="container mx-auto">Setting up client …</div>
    );
}