const readline = require('readline');
const fs = require('fs');
const path = require('path');
const fcl = require("@onflow/fcl");
const { serverAuthorization } = require('./helpers');

fcl.config()
  .put("accessNode.api", "https://rest-mainnet.onflow.org")

const address_list = fs.readFileSync(path.resolve(__dirname, 'address_list.csv'), 'utf8');
const airdrop_tx = fs.readFileSync(path.resolve(__dirname, 'cadence/airdrop.cdc'), 'utf8');

async function askQuestion(query) {
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  });

  return new Promise(resolve => rl.question(query, ans => {
    rl.close();
    resolve(ans);
  }))
}

function replaceWithProperValues(txCode) {
  return txCode
    .replaceAll('CONTRACT_NAME', process.env.CONTRACT_NAME)
    .replaceAll('CONTRACT_ADDRESS', process.env.CONTRACT_ADDRESS)
    .replaceAll('STORAGE_PATH', process.env.STORAGE_PATH)
    .replaceAll('PUBLIC_PATH', process.env.PUBLIC_PATH)
}

async function execute() {
  const addresses = address_list.replace(/\s+/g, '').split(',');
  if (addresses.length >= 100) {
    console.log("[ERROR] You must input <= 100 addresses at a time due to gas limits on Flow.");
    return;
  }

  const question = addresses.join('\n');
  const ans = await askQuestion(question + "\nYOU ARE MINTING TO THE ADDRESSES ABOVE\n" + "Type OK to confirm\n");
  if (ans !== 'OK') {
    console.log('[CANCELLED] The user did not type OK.')
  }

  const transactionId = await fcl.mutate({
    cadence: replaceWithProperValues(airdrop_tx),
    args: (arg, t) => {
      arg(addresses, t.Array(t.Address))
    },
    proposer: serverAuthorization,
    payer: serverAuthorization,
    authorizations: [serverAuthorization],
    limit: 9999
  });

  console.log(`Transaction: https://flowscan.org/transaction/${transactionId}`);
  console.log('[PENDING] ...');

  const { status, statusCode, errorMessage } = await fcl.tx(transactionId).onceSealed();

  if (status === 4 && statusCode === 0) {
    console.log('[SUCCESS]');
  } else {
    console.log('[ERROR]', errorMessage);
  }

}

execute();