const {ethers, run, network} = require("hardhat")

async function main(){
  const deployedContract = await ethers.deployContract("Transactions");

  await deployedContract.waitForDeployment();

  console.log("SimpleStorage Contract Address:", await deployedContract.getAddress());
}

main()
  	.then(()=>process.exit(0))
  	.catch((error)=>{
      console.log(error)
      process.exit(1)
    })