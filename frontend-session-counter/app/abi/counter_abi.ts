import { Abi } from "starknet";

export const counter_abi: Abi = [
  {
    type: "impl",
    name: "CounterImpl",
    interface_name: "contract::ICounter",
  },
  {
    type: "interface",
    name: "contract::ICounter",
    items: [
      {
        type: "function",
        name: "increase_count",
        inputs: [
          {
            name: "amount",
            type: "core::integer::u16",
          },
        ],
        outputs: [],
        state_mutability: "external",
      },
      {
        type: "function",
        name: "decrease_count",
        inputs: [
          {
            name: "amount",
            type: "core::integer::u16",
          },
        ],
        outputs: [],
        state_mutability: "external",
      },
      {
        type: "function",
        name: "get_count",
        inputs: [],
        outputs: [
          {
            type: "core::integer::u16",
          },
        ],
        state_mutability: "view",
      },
    ],
  },
  {
    type: "event",
    name: "contract::Counter::Event",
    kind: "enum",
    variants: [],
  },
];
