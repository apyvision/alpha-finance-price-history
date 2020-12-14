# APY Vision LP Balances Subgraph

#### Introduction 
Interest Bearing ETH price history subgraph (it's not available on Uniswap).

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


