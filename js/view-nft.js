// Prompt user to enter wallet ID

let text; // stores ID
let person = prompt("Please enter your Wallet ID:", "Wallet ID");
if (person == null || person == "") {
  text = "User cancelled the prompt.";
} else {
  text = "Hello " + person + "! How are you today?";
}

// GET IPFS URL's from server

async function getAssets (walletID) {
    const response = await fetch(`http://localhost:3000/nfts/${walletID}`)
    let data = await response.json()
    console.log(data)

    // 2D Image
    const image2D = data.ipfsImageLinks[0]
    document.getElementById('cylinder').src = image2D

    // 3D Image
    const image3D = data.ipfsImageLinks[1]
    document.getElementById('id').src = image3D
}

getAssets()