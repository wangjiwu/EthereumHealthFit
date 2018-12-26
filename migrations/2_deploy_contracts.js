
var Fitbody = artifacts.require("./Fitbody.sol");
var Ownable = artifacts.require("./Ownable.sol");

module.exports = function(deployer) {
    deployer.deploy(Fitbody);
    deployer.deploy(Ownable);
  };