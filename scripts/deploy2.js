

const main = async () => {

    const domainContractFactory = await hre.ethers.getContractFactory('Domains');
   const domainContract = await domainContractFactory.deploy('chainshot');
   await domainContract.deployed();

   console.log("Contract deployed to:", domainContract.address);

   // console.log("Contract deployed by:", owner.address);
   
   let txn = await domainContract.register("horizon",{value: hre.ethers.utils.parseEther('0.1')});
   await txn.wait();
   console.log("minted domain horizon.chainshot")

   const address = await domainContract.getAddress("horizon");
   console.log("Owner of domain horizon:", address);

   const balance = await hre.ethers.provider.getBalance(domainContract.address);
   console.log("Contract balance:", hre.ethers.utils.formatEther(balance));

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