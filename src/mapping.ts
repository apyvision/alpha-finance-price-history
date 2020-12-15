import {Price} from '../generated/schema'
import {Address, BigDecimal, BigInt, log, ethereum} from "@graphprotocol/graph-ts";
import {Bank} from "../generated/Bank/Bank";
import {Chainlink} from "../generated/Bank/Chainlink";


let BI_8 = BigInt.fromI32(8)
let BI_18 = BigInt.fromI32(18)
let BI_10 = BigInt.fromI32(10)
let ZERO_BI = BigInt.fromI32(0)
let ONE_BI = BigInt.fromI32(1)

let ALPHA_CONTRACT_ADDRS = "0x67b66c99d3eb37fa76aa3ed1ff33e8e39f0b9c7a";
let CHAIN_LINK_ETH_USD_CONTRACT = "0x5f4eC3Df9cbd43714FE2740f5E3616155c5b8419";

function exponentToBigDecimal(decimals: BigInt): BigDecimal {
  let bd = BigDecimal.fromString('1')
  for (let i = ZERO_BI; i.lt(decimals as BigInt); i = i.plus(ONE_BI)) {
    bd = bd.times(BigDecimal.fromString('10'))
  }
  return bd
}

function convertTokenToDecimal(tokenAmount: BigInt, exchangeDecimals: BigInt): BigDecimal {
  if (exchangeDecimals == ZERO_BI) {
    return tokenAmount.toBigDecimal()
  }
  return tokenAmount.toBigDecimal().div(exponentToBigDecimal(exchangeDecimals))
}

export function handleBlock(block: ethereum.Block): void {
  let id = block.number.toString();
  let totalEth = Bank.bind(Address.fromString(ALPHA_CONTRACT_ADDRS)).totalETH();
  let totalSupply = Bank.bind(Address.fromString(ALPHA_CONTRACT_ADDRS)).totalSupply();
  let ethUsdPrice = Chainlink.bind(Address.fromString(CHAIN_LINK_ETH_USD_CONTRACT)).latestAnswer();

  log.debug('total ETH is {}, eth usd price is {}, supply is {}', [totalEth.toString(), ethUsdPrice.toString(), totalSupply.toString()])

  let ethPriceUsd = convertTokenToDecimal(ethUsdPrice, BI_8)
  let priceEth = convertTokenToDecimal(totalEth, BI_18).div(convertTokenToDecimal(totalSupply, BI_18));
  let entity = new Price(id)
  entity.priceETH = priceEth;
  entity.priceUSD = ethPriceUsd.times(priceEth);
  entity.save()
}

