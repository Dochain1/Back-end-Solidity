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
    "0x7662d8BaCA99EBf47cF53012e020c61DdF078475",
    "0x078fc9E8cAe1B2961E1F6e9e543D2A9C05f9B718",
    "0xE063F6C791eb467Ab5Ce7b0bc332ef9C473478AE",
    "0xacf6b34abC84736be4B4b0fC4f791CF6fbc7277c",
    "0x243AFF2a025677993A46Bc4f7910Fd1A4Ee898b5",
    "0x90C73FA3566BDAE5295452C1dAb4e3181e7383f6"
]

export const keyPublicVisit:string[] = [
    "0x398f30990f1f8eA8582eE5132AD5563e1F5bbB30",
    "0x7662d8BaCA99EBf47cF53012e020c61DdF078475",
    "0x078fc9E8cAe1B2961E1F6e9e543D2A9C05f9B718",
    "0xE063F6C791eb467Ab5Ce7b0bc332ef9C473478AE",
    "0xacf6b34abC84736be4B4b0fC4f791CF6fbc7277c",
    "0x243AFF2a025677993A46Bc4f7910Fd1A4Ee898b5",
    "0x90C73FA3566BDAE5295452C1dAb4e3181e7383f6",
    "0x55BD7E92250903186CEb3938c70F103654a38De1"
]



