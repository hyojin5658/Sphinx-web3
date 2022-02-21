let requestJSONInfoBtn = document.getElementById("get_json_info");
let weaponInfoDiv = document.getElementById("weapon_info");
let getnftownerbtn = document.getElementById("getnftowner_button");
let registerbtn = document.getElementById("register_button");
let registermarketbtn = document.getElementById("register_market_button");
let getnftvaluebtn = document.getElementById("getnftvalue_button");
let buynftbtn = document.getElementById("buy-nft");
let buytokenbtn = document.getElementById("buy_token");
let balancebtn = document.getElementById("balance_btn");
let balanceInfoDIv = document.getElementById("balance_info");


let getgameratiobtn = document.getElementById("get_game_ratio");
let getgameratiodiv = document.getElementById("get_game_ratio_div");
let registergameratiobtn = document.getElementById("register_game_ratio_btn");



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

let buynftevent = async() => {
    let tokenIdInput = document.getElementById("token-id-nft");
    let tokenId = tokenIdInput.value;
    if (!tokenId){
        alert("토큰 아이디를 입력해주세요.");
        tokenIdInput.focus();
        return;
    }
    console.log("토큰아이디: ",tokenId);

    //buyimgnft token
    const from = await web3.eth.getAccounts().then(accounts => accounts[0]);
    console.log("account:",from)

    let contract = await getContractInstance();
    contract.methods.buyimgnft(tokenId).send({from: from, gas:3000000})
    .once('sending', (payload) => { console.log(payload);})
    .on('error', function(error){ console.error(error) })
    .then(function(receipt){
        console.log(receipt);
        console.log("registerNFT result:",receipt.events.Transfer.returnValues[2]);
    });


}

let buytokenevent = async() => {
    let tokenAmountInput = document.getElementById("buy_token_amount");
    let tokenAmount = tokenAmountInput.value;
    if (!tokenAmount){
        alert("구매할 토큰 개수 입력해주세요.");
        tokenAmountInput.focus();
        return;
    }
    console.log("구매할 토큰 개수: ",tokenAmount);

    let tokencontract = await getTokenContractInstance();
    const from = await web3.eth.getAccounts().then(accounts => accounts[0]);
    tokencontract.methods.buy().send({from: from, gas:3000000,value: tokenAmount})
    .once('sending', (payload) => { console.log(payload);})
    .on('error', function(error){ console.error(error) })
    .then(function(receipt){
        console.log(receipt);
        console.log("b result:",receipt.events.Transfer.returnValues[2]);
    });
}

let balanceevent = async() => {
    let addressInput = document.getElementById("balance_address");
    let address = addressInput.value;
    if (!address){
        alert("구매할 토큰 개수 입력해주세요.");
        addressInput.focus();
        return;
    }
    console.log("address: ",address);

    
    let tokencontract = await getTokenContractInstance();
    let balance = await tokencontract.methods.balanceOf(address).call();
    console.log(balance);
    balanceInfoDIv.innerHTML=`<div>value: ${balance}</div>`
}

let getgameratioevent = async() => {
    let game1 = document.getElementById("game_name_1").value;
    let game2 = document.getElementById("game_name_2").value;

    let ratiocontract = await getRatioContractInstance();
    const from = await web3.eth.getAccounts().then(accounts => accounts[0]);
    let result = await ratiocontract.methods.getratio(game1,game2).call();
    console.log(result);

    getgameratiodiv.innerHTML=`<div>100: ${result}</div>`
}

let registergameratioevent = async() => {
    let game1 = document.getElementById("game_register_1").value;
    let game2 = document.getElementById("game_register_2").value;
    let ratio = document.getElementById("game_register_num").value;

    let ratiocontract = await getRatioContractInstance();
    const from = await web3.eth.getAccounts().then(accounts => accounts[0]);
    ratiocontract.methods.registerRatio(game1, game2, ratio).send({from: from, gas:3000000})
    .once('sending', (payload) => { console.log(payload);})
    .on('error', function(error){ console.error(error) })
    .then(function(receipt){
        console.log(receipt);
    });
}


requestJSONInfoBtn.addEventListener("click", requestJSONInfoEvent);
getnftownerbtn.addEventListener("click",getownerevent);
registerbtn.addEventListener("click",registerbtnevent);
registermarketbtn.addEventListener("click",registermarketevent);
getnftvaluebtn.addEventListener("click",getvalueevent);
buynftbtn.addEventListener("click",buynftevent);
buytokenbtn.addEventListener("click",buytokenevent);
balancebtn.addEventListener("click",balanceevent);

getgameratiobtn.addEventListener("click",getgameratioevent);
registergameratiobtn.addEventListener("click",registergameratioevent);