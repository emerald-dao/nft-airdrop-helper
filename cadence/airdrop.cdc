import CONTRACT_NAME from CONTRACT_ADDRESS
import NonFungibleToken from 0x1d7e57aa55817448

transaction(addresses: [Address]) {

  let GiverCollection: &CONTRACT_NAME.Collection

  prepare(signer: AuthAccount) {
    self.GiverCollection = signer.borrow<&CONTRACT_NAME.Collection>(from: STORAGE_PATH)
                              ?? borrow("[ERROR] The signer does not have a collection set up.")
  }

  pre {

  }

  execute {
    for address in addresses {
      let RecipientCollection = getAccount(address).getCapability(PUBLIC_PATH)
                                    .borrow<&CONTRACT_NAME.Collection{NonFungibleToken.Receiver}>()
                                    ?? panic("[ERROR] The recipient with address ".concat(address.toString()).concat(" does not have a collection sert up."))
      RecipientCollection.deposit(token: <- nft)
    }
  }
}