import { ethers } from "ethers";
import { abi } from "./abi/Hasher";
import getProviderSigner from "../src/utils/ethereum";

const getHasherContract = async () => {
  const { provider } = await getProviderSigner();

  const address = import.meta.env.VITE_HASHER_CONTRACT_ADDRESS;

  const hasherContract = new ethers.Contract(address, abi, provider);

  return hasherContract;
};

export default getHasherContract;
