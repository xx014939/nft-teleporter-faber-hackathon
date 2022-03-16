async function walletAuth () {

    // Define Moralis server info
    const serverUrl = "https://gfxjx7xvagdu.usemoralis.com:2053/server";
    const appId = "bb0lJNfM2uBk6sjgJm3QzybpZh6SBLH6MNcuLERk";
    Moralis.start({ serverUrl, appId });
    let user = Moralis.User.current();
  

    // Authenticate User
    if (!user) {
        try {
            user = await Moralis.authenticate({ signingMessage: "Authenticate Wallet" })
        } catch(error) {
            console.log(error)
        }
    }
    else{
        Moralis.enableWeb3();
    }

    // Push wallet to express server to create an empty object
    var xhr = new XMLHttpRequest();
        xhr.open("POST", "http://localhost:3000/nfts");
        xhr.setRequestHeader("Accept", "application/json");
        xhr.setRequestHeader("Content-Type", "application/json");

        const userAddress = user.get('ethAddress')

        xhr.onreadystatechange = function () {
        if (xhr.readyState === 4) {
            console.log(xhr.status);
            console.log(xhr.responseText);
            // Show user their unique ID
            walletID = JSON.parse(xhr.responseText)
            document.querySelector('.login-form__wallet-id').innerHTML = walletID._id
            document.querySelector('.login-form__id-message').style.display = "block"
            document.querySelector('.upload-nft').style.display = 'block'
            document.querySelector('.button-container').style.display = 'flex'
        }};

        var newUser = `{
            "walletAddress": "${String(userAddress)}",
            "ipfsImageLinks": [],
            "ipfsMetadataLinks": []
        }`;

        xhr.send(newUser);

}

