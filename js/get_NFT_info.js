let requestJSONInfoBtn = document.getElementById("get_json_info");
let weaponInfoDiv = document.getElementById("weapon_info");
let getnftownerbtn = document.getElementById("getnftowner_button");
let registerbtn = document.getElementById("register_button");
let registermarketbtn = document.getElementById("register_market_button");
let getnftvaluebtn = document.getElementById("getnftvalue_button");


let requestJSONInfoEvent = async () => {
    let tokenIdInput = document.getElementById("token_id");
    let tokenId = tokenIdInput.value;
    if (!tokenId){
        alert("토큰 아이디를 입력해주세요.");
        tokenIdInput.focus();
        return;
    }
    console.log("토큰아이디: ",tokenId);

    //call smart contract
    let contract = await getContractInstance();
    let result = await contract.methods.getUri(tokenId).call();
    console.log("getURI result:",result);
    weaponInfoDiv.innerHTML = `<div>URI: ${result}</div>`;
}

let getownerevent = async() => {
    let tokenIdInput = document.getElementById("getnftowner_input");
    let tokenId = tokenIdInput.value;
    if (!tokenId){
        alert("토큰 아이디를 입력해주세요.");
        tokenIdInput.focus();
        return;
    }
    console.log("토큰아이디: ",tokenId);

    //call smart contract
    let contract = await getContractInstance();
    let result = await contract.methods.ownerOf(tokenId).call();
    console.log("ownerOf result:",result);
    getnftowner_res.innerHTML = `<div>URI: ${result}</div>`;

}

let registerbtnevent= async() => {
    let nftURIInput = document.getElementById("nft_register_input");
    let URI = nftURIInput.value;
    if (!URI){
        alert("URI를 입력해주세요.");
        nftURIInput.focus();
        return;
    }
    console.log("URI: ",URI);

    //registerNFT(URI)
    const from = await web3.eth.getAccounts().then(accounts => accounts[0]);
    console.log("account:",from)

    let contract = await getContractInstance();
    contract.methods.registerNFT(URI).send({from: from, gas:3000000})
    .once('sending', (payload) => { console.log(payload);})
    .on('error', function(error){ console.error(error) })
    .then(function(receipt){
        console.log(receipt);
        console.log("registerNFT result:",receipt.events.Transfer.returnValues[2]);
    });
}

let registermarketevent = async() => {
    let nftURIInput = document.getElementById("nft_register_market_input");
    let URI = nftURIInput.value;
    if (!URI){
        alert("URI를 입력해주세요.");
        nftURIInput.focus();
        return;
    }
    let nftvalueInput = document.getElementById("nft_market_register_input");
    let nftvalue = nftvalueInput.value;
    if (!nftvalue){
        alert("value를 입력해주세요.");
        nftvalueInput.focus();
        return;
    }
    console.log("URI: ",URI, "nftvalue: ", nftvalue);

    //registerNFTtomarket(URI,value)
    const from = await web3.eth.getAccounts().then(accounts => accounts[0]);
    console.log("account:",from)

    let contract = await getContractInstance();
    contract.methods.registerNFTToMarket(URI, nftvalue).send({from: from, gas:3000000})
    .once('sending', (payload) => { console.log(payload);})
    .on('error', function(error){ console.error(error) })
    .then(function(receipt){
        console.log(receipt);
        console.log("registerNFTMarket result:",receipt.events.Transfer.returnValues[2]);
    });
}

let getvalueevent = async() => {
    let tokenIdInput = document.getElementById("getvalue_input");
    let tokenId = tokenIdInput.value;
    if (!tokenId){
        alert("토큰 아이디를 입력해주세요.");
        tokenIdInput.focus();
        return;
    }
    console.log("토큰아이디: ",tokenId);

    //call smart contract
    let contract = await getContractInstance();
    let result = await contract.methods.getNFTValue(tokenId).call();
    console.log("getValue result:",result);
    getnftvalue_res.innerHTML = `<div>value: ${result}</div>`;

}


requestJSONInfoBtn.addEventListener("click", requestJSONInfoEvent);
getnftownerbtn.addEventListener("click",getownerevent);
registerbtn.addEventListener("click",registerbtnevent);
registermarketbtn.addEventListener("click",registermarketevent);
getnftvaluebtn.addEventListener("click",getvalueevent);