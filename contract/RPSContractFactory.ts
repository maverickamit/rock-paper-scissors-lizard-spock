import { ethers } from "ethers";
import { abi, bytecode } from "./abi/RPS";
import getProviderSigner from "../src/utils/ethereum";

const getRPSContractFactory = async () => {
  const { signer } = await getProviderSigner();

  return new ethers.ContractFactory(abi, bytecode, signer);
};

export default getRPSContractFactory;
