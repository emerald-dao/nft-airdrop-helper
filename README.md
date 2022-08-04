# NFT Airdrop Tool

This is a tool that lets non-technical people airdrop to their communities in a safe way, so you never have to give someone else your private key.

## CREATED BY EMERALD CITY DAO

## Steps

Here are the steps you must follow.

### Step 1

Go to the `.env` file and add in all the required info.

**PRIVATE_KEY** - Your private key (NOTE: NEVER SHARE THIS WITH ANYBODY)

**CONTRACT_NAME** - The name of your collection's contract (ex. FLOAT)

**CONTRACT_ADDRESS** - The contract address of your collection's contract (ex. 0x2d4c3caffbeab845)

**PUBLIC_PATH** - The public path of your collection (ex. /public/FLOATCollectionPublicPath)

**STORAGE_PATH** - The storage path of your collection (ex. /public/FLOATCollectionStoragePath)

**SIGNER_ADDRESS** - The address of the person that has the assets and is sending them (ex. 0x921ea449dffec68a)

**SIGNER_KEYID** - The key id of the public key that is being used to send the transaction (ex. 0)

### Step 2

Go to the `address_list.csv` file and add all your addresses in, separated by commas like it is shown in the example.

### Step 3

Open up a terminal to the directory of this tool and type `npm i`

### Step 4

Then, in the same spot, run `node main.js`

### Step 5

Confirm everything looks correct and type `OK`

### Step 6

Watch the magic happen