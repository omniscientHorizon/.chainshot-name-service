const main = async () => {
  const [owner, hacker] = await hre.ethers.getSigners();
     const domainContractFactory = await hre.ethers.getContractFactory('Domains');
    const domainContract = await domainContractFactory.deploy('chainshot');
	await domainContract.deployed();

    console.log("Contract deployed to:", domainContract.address);
    console.log("Contract owner:", owner.address);

	// console.log("Contract deployed by:", owner.address);
	
	let txn = await domainContract.register("horizon",{value: hre.ethers.utils.parseEther('111')});
	await txn.wait();

    const address = await domainContract.getAddress("horizon");
    console.log("Owner of domain horizon:", address);

    const balance = await hre.ethers.provider.getBalance(domainContract.address);
    console.log("Contract balance:", hre.ethers.utils.formatEther(balance));

    
  // Quick! Grab the funds from the contract! (as hacker)
  try{
    txn = await domainContract.connect(hacker).withdraw();
    await txn.wait();
  }
  catch(error){
    console.log("Could not rob contract");
  }

    let settingImage = await domainContract.setImage("horizon", "https://64.media.tumblr.com/47d8dd3697aeaac11388eabb4931faef/tumblr_ptas5g6NZj1qki3p4_640.png");
    await settingImage.wait();
    const imageSet = await domainContract.getImage("horizon");
    console.log("image set by horizon:", imageSet);

    let settingUserName = await domainContract.setUserName("horizon","omnisceintHorizon");
    await settingUserName.wait();
    let username = await domainContract.getUserName("horizon");
    console.log("Username:", username);

    let settingBio = await domainContract.setBio("horizon","I am a 17 y/o Solidity Dev");
    await settingBio.wait();
    let bioSet = await domainContract.getBio("horizon");
    console.log("About Me:", bioSet);

    let ownerBalance = await hre.ethers.provider.getBalance(owner.address);
  console.log("Balance of owner before withdrawal:", hre.ethers.utils.formatEther(ownerBalance));

  // Oops, looks like the owner is saving their money!
  txn = await domainContract.connect(owner).withdraw();
  await txn.wait();
  
  // Fetch balance of contract & owner
  const contractBalance = await hre.ethers.provider.getBalance(domainContract.address);
  ownerBalance = await hre.ethers.provider.getBalance(owner.address);

  console.log("Contract balance after withdrawal:", hre.ethers.utils.formatEther(contractBalance));
  console.log("Balance of owner after withdrawal:", hre.ethers.utils.formatEther(ownerBalance));

        
}

const runMain = async () => {
  try {
    await main();
    process.exit(0);
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
};

runMain();