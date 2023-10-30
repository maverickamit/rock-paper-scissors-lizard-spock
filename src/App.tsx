import React, { useState } from "react";
import getProviderSigner from "./utils/ethereum";
import { Button } from "@nextui-org/react";
import "./App.css";

const App = () => {
  const [account, setAccount] = useState<string>();
  const [connected, setConnected] = useState<boolean>(false);

  const connect = async () => {
    const { provider, signer } = await getProviderSigner();
    try {
      const account = await signer?.getAddress();
      setAccount(account);
      if (account) setConnected(true);
    } catch (err) {
      console.warn(`failed to connect..`, err);
    }
  };

  return (
    <div className="App">
      <Button color="primary" onClick={connect}>
        {connected ? "Connected" : "Connect"}
      </Button>
      <p> {account && `Connected account: ${account}`}</p>
    </div>
  );
};

export default App;
