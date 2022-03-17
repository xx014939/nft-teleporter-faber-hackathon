# nft-teleporter-faber-hackathon
## NFT Teleporter, is a no code service which alows users to easily create NFT's and NFT collections which they can then teleport into the Metaverse. Currently a proof of concept, our teleporter leverages IPFS's NFT Storage solutions, along with modern day 3D model file types, to allow NFT's to be created through a simple UI, minted and made viewable/interactable in VR (and soon AR) all inside of the web browser with the click of a button! <br> <br> Our service opens the doorway for unique interactive experiences to be attached to NFT's (through IPFS), along with multiple assets simultaneously, which can increase the value and utility of an NFT.

# Get Started 
## Visit our website at nftteleporter.com, and click the "Authenticate Wallet" button at the bottom of the page
<img src="/readme-images/hack-1.PNG"/>

## Click the "Authenticate Wallet" button and sign the authentication method with Metamask
<img src="/readme-images/hack-2.PNG"/>

## Fill out the empty fields on the next page. Please ensure that the 3D object is a GLTF file and hit the "Submit" button
<img src="/readme-images/hack-3.PNG"/>

## From here you can lazy mint your NFT by hitting the "Lazy Mint" button and signing the message with your wallet (please ensure you are on the Ethereum mainnet, no wallet funds will be withdrawn). When this process is complete an alert will popup. 
<img src="/readme-images/hack-4.PNG"/>
<img src="/readme-images/hack-5.PNG"/>

## Once this is finished, close the prompt and proceed with the "Teleport" button to teleport your NFT into a 3D VR traversible environment!
<img src="/readme-images/hack-6.PNG"/>

## You have just lazy minted multiple assets in different dimensions all inside of a single NFT! These assets can be viewed in our simple example scene, but they can also be retrieved via our rest API for any bespoke software you wish to build. To retrieve this data make a GET request to https://warm-journey-29417.herokuapp.com//nfts/{wallet ID}
