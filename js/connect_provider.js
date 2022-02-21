// Setting for HttpProvider

//using Metamask;
if (window.ethereum) {
  window.web3 = new Web3(window.ethereum);
  window.ethereum.enable();
  console.log("connected Metamask!\n");
} else {
  console.log("connected to local network!");
  let web3 = new Web3(new Web3.providers.HttpProvider('http://localhost:7545'));
}
