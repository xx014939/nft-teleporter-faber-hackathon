// Prompt user to enter wallet ID

let text; // stores ID
let person = prompt("Please enter your Wallet ID:", "Wallet ID");
if (person == null || person == "") {
  text = "User cancelled the prompt."
} else {
  text = person
}

console.log("the text is --->", text)

// GET IPFS URL's from server

async function getAssets (walletID) {
    const response = await fetch(`http://localhost:3000/nfts/${walletID}`)
    let data = await response.json()
    console.log(data)
    assetURLs = data.ipfsImageLinks[0].split(',')
    console.log('asset urls', assetURLs)
    console.log('asset urls2', data.ipfsImageLinks[1])

    // 2D Image
    const image2D = assetURLs[0]
    console.log('2d image', image2D)

    // 3D Image
    const image3D = assetURLs[1]
    console.log('3d image', image3D)

    // Create AFRAME page 
    document.querySelector('.testing').innerHTML = 
    `
    <a-scene>
        
    <a-assets>
    <a-asset-item id="test" src="${image3D}"></a-asset-item>
    </a-assets>
    <a-entity position="-1 1 -3" gltf-model="#test"></a-entity>

    <a-sphere position="0 1.25 -5" radius="1.25" color="#EF2D5E"></a-sphere>
    <a-cylinder position="1 0.75 -3" radius="0.5" height="1.5" color="#FFC65D" src="${image2D}" id="cylinder"></a-cylinder>
    <a-plane position="0 0 -4" rotation="-90 0 0" width="4" height="4" color="#7BC8A4"></a-plane>
    <a-sky color="#ECECEC"></a-sky>
    </a-scene>`
}

getAssets(text)