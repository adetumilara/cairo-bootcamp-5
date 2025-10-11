import { RpcProvider } from "starknet";

export const myProvider = new RpcProvider({
  nodeUrl: process.env.NEXT_PUBLIC_RPC_URL,
});

export const COUNTER_CA =
  "0x040261e1bdc9b58ca9a6ff68942c8b573b7673518de7a2104c066bcd423ce2ff";
