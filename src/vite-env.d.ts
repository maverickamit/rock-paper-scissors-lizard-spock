/// <reference types="react-scripts" />
/// <reference types="vite/client" />
interface Window {
  ethereum: any;
}
interface ImportMetaEnv {
  VITE_HASHER_CONTRACT_ADDRESS: string;
}
