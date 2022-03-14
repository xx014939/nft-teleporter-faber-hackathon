// Define Moralis server info
const serverUrl = "https://gfxjx7xvagdu.usemoralis.com:2053/server";
const appId = "bb0lJNfM2uBk6sjgJm3QzybpZh6SBLH6MNcuLERk";
Moralis.start({ serverUrl, appId });
let user = Moralis.User.current();
  
// Define login function
async function login() {

if (!user) {
    try {
        user = await Moralis.authenticate({ signingMessage: "Hello World!" })
        initApp();
    } catch(error) {
        console.log(error)
    }
}
else{
    console.log('starting2', user.get('ethAddress'))
    Moralis.enableWeb3();
    initApp();
    }
}

// Call login function immediately on page load and save ETH address
login()
const userWalletAddress = user.get('ethAddress')

async function checkUserExists(address) {
    // Make GET request to express server
    // If 404 response
        // Create new user
}

checkUserExists(userWalletAddress)

// Define submit button function call - saving file upload to IPFS 

async function onSubmit() {
    // Retrieve file
    mainFile = document.getElementById('myFile').files[0]
    console.log('here it is -->', mainFile)

    // Save to IPFS
    const data = mainFile
    const file = new Moralis.File(data.name, data)
    await file.saveIPFS({useMasterKey:true});

    // Console log IPFS URL, and IPFS file CID
    console.log(file.ipfs(), file.hash())

    // Create Metadata based on user input
    let imageURL = file.ipfs()
    let imageHash = file.hash()

    let metadata = {
        name: threedName,
        description: document.querySelector('#input_description').value,
        image: "/ipfs/" + imageHash
    }
    console.log(metadata);
    const jsonFile = new Moralis.File("metadata.json", {base64 : btoa(JSON.stringify(metadata))});
    await jsonFile.saveIPFS();
    let metadataHash = jsonFile.hash();
    console.log(metadataHash)

    // POST file info to Express server

}