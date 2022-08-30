const { ethers } = require("hardhat")


export const hash =  async (signer:any) => {
    // Example hash
    const message_ipfs = ethers.utils.toUtf8Bytes("https://gateway.pinata.cloud/ipfs/QmUTPbs79BgYNmHJSsQrEhawE7mCYtvnv99bqbz911Y54k") 
    const hash = ethers.utils.keccak256(message_ipfs)
    const sig = await signer.signMessage(hash)
    return (sig as string)
}

export const keyPublicAdmin: string[] = [
    "0x55BD7E92250903186CEb3938c70F103654a38De1",
    "0x7662d8BaCA99EBf47cF53012e020c61DdF078475"
]

export const keyPublicVisit:string[] = [
    "0x398f30990f1f8eA8582eE5132AD5563e1F5bbB30"
]



