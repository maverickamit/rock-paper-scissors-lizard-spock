import { ethers } from "ethers";
import { abi } from "./abi/RPS";
import getProviderSigner from "../src/utils/ethereum";

const getRPSContract = async (address: string) => {
  const { signer } = await getProviderSigner();
  const formattedAddress = ethers.getAddress(address);
  const RPSContract = new ethers.Contract(formattedAddress, abi, signer);

  return RPSContract;
};

export default getRPSContract;
