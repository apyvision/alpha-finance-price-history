# APY Vision LP Balances Subgraph

#### Introduction 
This subgraph will index all the Liquidity Pool balances of a user whether they are still in the pool or not. This is useful information as we want to build a history of P+L for their liquidity pool holdings. 

Supports Balancer, Sushiswap and Uniswap -- more to be added later.

This is one of the subgraphs used for [APY Vision](https://apy.vision)

#### Building
To generate the mapping ts files, please do:
```
yarn codegen
```
To deploy, please use:
```
 graph deploy \
    --debug \
    --node https://api.thegraph.com/deploy/ \
    --ipfs https://api.thegraph.com/ipfs/ \
    apyvision/alpha-finance-price-history
```

