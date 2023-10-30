import { ethers } from "ethers";

let signer: ethers.Signer | null = null;

let provider: ethers.BrowserProvider | null = null;

const getProviderSigner = async () => {
  if (window.ethereum) {
    try {
      provider = new ethers.BrowserProvider(window.ethereum);
    } catch (e) {
      console.log("error", e);
    }
  } else {
    console.log("MetaMask is not installed");
  }

  if (provider) {
    try {
      signer = await provider.getSigner();
    } catch (e) {
      console.log("error", e);
    }
  } else {
    console.log("Can't find a provider");
  }
  return { provider, signer };
};

export default getProviderSigner;
