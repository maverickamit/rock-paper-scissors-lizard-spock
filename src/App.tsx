import { useState } from "react";
import getProviderSigner from "./utils/ethereum";
import { Button } from "@nextui-org/react";
import "./App.css";
import AppNavigation from "./components/AppNavigation";
import formatAddress from "./utils/formatAddress";
import { Outlet } from "react-router-dom";

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
    <>
      <AppNavigation>
        <Button color="primary" onClick={connect}>
          {connected ? formatAddress(account!) : "Connect"}
        </Button>
      </AppNavigation>

      <Outlet />
    </>
  );
};

export default App;
