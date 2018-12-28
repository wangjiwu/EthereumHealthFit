deployer

```bush
# console one 
testrpc

# console two
#进入控制台
truffle console
#进行编译  （可选）
compile –compile-all 
#进行合约部署
migrate  --reset


```


console 

```
#create member

contract.creatMember.sendTransaction("wjw", "url", {from:ac0, value:0, gas:1000000})


```


js

```


```

testrpc是启动一条私有链 并且初始10个测试用户
然后 用 truffle migrate 在此私有链上部署合约 默认是第一个用户部署
我部署合约的用户就是合约的里的owner字段  只有此用户才能进行transfer


