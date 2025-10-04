use openzeppelin::token::erc20::interface::{IERC20Dispatcher, IERC20DispatcherTrait};
use snforge_std::{ContractClassTrait, DeclareResultTrait, declare};
use starknet::{ContractAddress, contract_address_const};
use test::interfaces::IStaking::{IStakingDispatcher, IStakingDispatcherTrait};

fn deploy_contract() -> (IStakingDispatcher, ContractAddress, ContractAddress) {
    let contract = declare("Staking").unwrap().contract_class();
    // Define constructor calldata
    let (strk_address, reward_address) = deploy_erc20();
    let mut constructor_args = array![reward_address.into(), strk_address.into()];

    let (contract_address, _) = contract.deploy(@constructor_args).unwrap();

    (IStakingDispatcher { contract_address }, strk_address, reward_address)
}

fn deploy_erc20() -> (ContractAddress, ContractAddress) {
    let owner: ContractAddress = contract_address_const::<'aji'>();
    let name: ByteArray = "STRK";
    let sym: ByteArray = "Sym";
    let reward: ByteArray = "Reward";
    let reward_sym: ByteArray = "RWD";
    // Deploy mock ERC20
    let erc20_class = declare("RewardERC20").unwrap().contract_class();

    // Pass ByteArray directly for name and symbol
    let mut calldata = ArrayTrait::new();
    owner.serialize(ref calldata);
    name.serialize(ref calldata);
    sym.serialize(ref calldata);
    
    let (strk_address, _) = erc20_class.deploy(@calldata).unwrap();

    let mut usdc_calldata =  ArrayTrait::new();
    owner.serialize(ref usdc_calldata);
    reward.serialize(ref usdc_calldata);
    reward_sym.serialize(ref usdc_calldata);
    let (reward_address, _) = erc20_class.deploy(@usdc_calldata).unwrap();

    (strk_address, reward_address)
}


#[test]
fn test_deployment() {
    let (dispatcher, strk_address, reward_address) = deploy_contract();
    let s_address = dispatcher.get_strk_address();
    let r_address = dispatcher.get_reward_address();

    assert(s_address == strk_address, 'invalid strk address');
    assert(r_address == reward_address, 'invalid reward address');
}
// fn test_increase_balance() {
//     let amount = 1;
//     let add = 10;
//     let contract_address = deploy_contract(amount);

//     let dispatcher = IHelloStarknetDispatcher { contract_address };

//     let balance_before = dispatcher.get_balance();
//     assert(balance_before == amount, 'Invalid balance');

//     dispatcher.increase_balance(add);

//     let balance_after = dispatcher.get_balance();
//     assert(balance_after == (amount + add), 'Invalid balance');
// }
// #[test]
// #[ignore]
// #[feature("safe_dispatcher")]
// fn test_cannot_increase_balance_with_zero_value() {
//     let contract_address = deploy_contract();

//     let safe_dispatcher = IHelloStarknetSafeDispatcher { contract_address };

//     let balance_before = safe_dispatcher.get_balance().unwrap();
//     assert(balance_before == 0, 'Invalid balance');

//     match safe_dispatcher.increase_balance(0) {
//         Result::Ok(_) => core::panic_with_felt252('Should have panicked'),
//         Result::Err(panic_data) => {
//             assert(*panic_data.at(0) == 'Amount cannot be 0', *panic_data.at(0));
//         }
//     };
// }


