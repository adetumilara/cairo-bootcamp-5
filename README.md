# Cairo Bootcamp 5.0
This repository contains all the codes for Cairo Bootcamp 5.0

## Set up instructions
To set up this repository, you will need to install [Starkup](https://github.com/software-mansion/starkup). 

StarkUp installs and setup the following packages in your machine: 
- Scarb -  the Cairo package manager
- Starknet Foundry - the Cairo and Starknet testing framework
- Universal Sierra Compiler  - compiler for any ever-existing Sierra version
- Cairo Profiler - profiler for Cairo programming language & Starknet
- Cairo Coverage - utility for coverage reports generation for code written in Cairo programming language
- CairoLS - vscode extension


Run the following command to install StarkUp: 
```bash
curl --proto '=https' --tlsv1.2 -sSf https://sh.starkup.sh | sh
```

## Build and Test Contracts
To build and test the contracts, run the following commands

**Build contracts**
```bash
scarb build
```

**Run contract tests**
```bash
scarb run test
```

> `scarb run test` runs `snforge test` under the hood. So you can optionally use `snforge test` to test the contracts