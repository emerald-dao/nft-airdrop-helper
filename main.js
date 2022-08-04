const readline = require('readline');
const fs = require('fs');
const path = require('path');

const address_list = fs.readFileSync(path.resolve(__dirname, 'address_list.csv'), 'utf8')

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
}

execute();