"use client";
import {
  Connector,
  useAccount,
  useBalance,
  useConnect,
  useContract,
  useDisconnect,
  useReadContract,
  useSendTransaction,
} from "@starknet-react/core";
import { useState } from "react";
import { counter_abi } from "./abi/counter_abi";
import { COUNTER_CA, myProvider } from "./utils/utils";
import { CallData, Contract } from "starknet";

export default function page() {
  const [showModal, setShowModal] = useState(false);
  const { isConnected, address, account } = useAccount();
  const { connectors, connect } = useConnect({});
  const { disconnect } = useDisconnect();
  const { data: balance } = useBalance({
    address,
  });
  const { contract } = useContract({
    abi: counter_abi,
    address: COUNTER_CA,
  });

  const {
    data: count,
    isPending: countIsLoading,
    refetch: refetchCount,
    isFetching: countIsRefetching,
    error: countError,
  } = useReadContract({
    abi: counter_abi,
    functionName: "get_count",
    address: COUNTER_CA,
    args: [],
  });

  // async function getCount() {
  //   const counter_contract = new Contract(counter_abi, COUNTER_CA, myProvider);
  //   console.log(counter_contract, "contract starknet js");

  //   const result = await counter_contract.get_count();
  //   console.log(result);
  // }

  const {
    sendAsync: increaseCount,
    error: increaseCountError,
    data: increaseCountData,
    isPending: increaseCountIsPending,
  } = useSendTransaction({
    calls:
      contract && COUNTER_CA
        ? [contract.populate("increase_count", [1])]
        : undefined,
  });

  async function increaseCountJs() {
    const res = await account?.execute({
      contractAddress: COUNTER_CA,
      entrypoint: "increase_count",
      calldata: CallData.compile([1]),
    });

    // const status = await myProvider.waitForTransaction(res?.transaction_hash);

    console.log(res);
  }

  return (
    <div className="relative">
      <nav className="py-3 px-[80px] flex justify-end">
        {!isConnected && !address ? (
          <button
            className="py-2 px-5 rounded-md bg-white text-black cursor-pointer"
            onClick={() => setShowModal(true)}
          >
            Connect wallet
          </button>
        ) : (
          <div className="flex gap-x-2 items-center">
            <div className="py-1 px-3 rounded-full bg-[#d7d7d7] text-white font-bold">
              {address?.slice(0, 5)}...{address?.slice(-4)}
            </div>
            <div>{Number(balance?.value)} ETH</div>
            <button
              onClick={() => disconnect()}
              className="py-2 px-5 rounded-md bg-white text-black cursor-pointer"
            >
              Disconnect
            </button>
          </div>
        )}
      </nav>

      <div className="flex flex-col justify-center items-center py-[120px]">
        <h1 className="text-[80px] font-bold h-[120px]">
          {countIsLoading || countIsRefetching ? (
            <span className="text-base font-normal">Loading count...</span>
          ) : (
            count
          )}
        </h1>
        <div className="flex justify-center gap-x-2">
          <button
            className="py-2 px-5 rounded-md bg-white text-black cursor-pointer"
            onClick={() => increaseCountJs()}
          >
            Increase count
          </button>
          <button
            className="py-2 px-5 rounded-md bg-white text-black cursor-pointer"
            onClick={() => refetchCount()}
            // onClick={() => getCount()}
          >
            Refetch count
          </button>
          <button className="py-2 px-5 rounded-md bg-white text-black cursor-pointer">
            Decrease count
          </button>
        </div>
      </div>

      {showModal && (
        <div
          className="absolute inset-0 bg-black backdrop-blur-sm flex justify-center items-center h-[100vh]"
          onClick={() => setShowModal(false)}
        >
          <div
            className=""
            onClick={(e) => {
              e.stopPropagation();
            }}
          >
            <h3 className="text-2xl mb-4">Connect your wallet now!</h3>

            <div className="flex flex-col gap-y-3">
              {connectors.map((connector: Connector) => {
                return (
                  <button
                    className="flex gap-x-2 py-2 px-5 bg-white rounded-md text-black items-center font-medium justify-center"
                    onClick={() => {
                      connect({ connector });
                      setShowModal(false);
                    }}
                  >
                    <img
                      src={connector.icon as string}
                      className="w-[40px]"
                      alt=""
                    />
                    <span>{connector.name}</span>
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
