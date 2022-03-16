// Define Moralis server info
const serverUrl = "https://gfxjx7xvagdu.usemoralis.com:2053/server";
const appId = "bb0lJNfM2uBk6sjgJm3QzybpZh6SBLH6MNcuLERk";
Moralis.start({ serverUrl, appId });
let user = Moralis.User.current();

// Submit button onclick function

async function onSubmit() {
    // Retrieve wallet ID
    walletID = document.getElementById('walletID').value

    // Retrieve & model files
    imageFile = document.getElementById('myFile').files[0]
    console.log('here is the image -->', imageFile)

    imageFile3D = document.getElementById('myFile3d').files[0]
    console.log('here is the image -->', imageFile)

    // Retrieve metadata
    let nftName = document.getElementById('nftName').value
    let nftDescription = document.getElementById('nftDescription').value

    // Save to IPFS
    const data = imageFile
    const file = new Moralis.File(data.name, data)
    await file.saveIPFS({useMasterKey:true});

    const data3D = imageFile3D
    const file3D = new Moralis.File(data.name, data)
    await file3D.saveIPFS({useMasterKey:true});

    // Console log IPFS URL, and IPFS file CID
    console.log(file.ipfs(), file.hash())

    // Create Metadata based on user input
    let imageURL = file.ipfs()
    let imageHash = file.hash()

    let image3DURL = file.ipfs()
    let image3DHash = file.hash()

    let metadata = {
        ipfs2DImageLink: imageURL,
        ipfs3DImageLink: image3DURL,
        ipfsMetadataLinks: [
            {
                name: nftName,
                description: nftDescription,
                image: "/ipfs/" + imageHash,
                model: "/ipfs/" + image3DHash
            }
        ],
    }
    console.log(metadata);
    const jsonFile = new Moralis.File("metadata.json", {base64 : btoa(JSON.stringify(metadata))});
    await jsonFile.saveIPFS();
    let tokenURI = jsonFile.hash();
    console.log("The NFT Token URI is -->", tokenURI)

    // Retrieve existing data associated with wallet
    const response = await fetch(`http://localhost:3000/nfts/${walletID}`)
    const payload = await response.json()

    let existinImageLinks = payload.ipfsImageLinks
    // Append new IPFS hash to array
    existinImageLinks.push(imageURL)
    existinImageLinks.push(image3DURL)

    let existingMetadata = payload.ipfsMetadataLinks
    // Append new IPFS hash to array
    existingMetadata.push(tokenURI)

    let existingAddress = payload.walletAddress

    // PATCH info to Express server
    var xhr = new XMLHttpRequest();
    xhr.open("PATCH", `http://localhost:3000/nfts/${walletID}`);
    xhr.setRequestHeader("Accept", "application/json");
    xhr.setRequestHeader("Content-Type", "application/json");

    xhr.onreadystatechange = function () {
    if (xhr.readyState === 4) {
        console.log(xhr.status);
        console.log(xhr.responseText);
    }};

    var existingUser = `{
        "walletAddress": "${existingAddress}",
        "ipfsImageLinks": "${String(existinImageLinks)}",
        "ipfsMetadataLinks": "${String(existingMetadata)}"
    }`;

    xhr.send(existingUser);

    // Make teleport button visible to user
    document.querySelector('.teleport-button').style.display = 'block'

}