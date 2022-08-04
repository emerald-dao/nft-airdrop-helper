const { SHA3 } = require("sha3");

var EC = require('elliptic').ec;
const ec = new EC('p256');

const PRIVATE_KEY = process.env.PRIVATE_KEY;

const sign = (message) => {
  const key = ec.keyFromPrivate(Buffer.from(PRIVATE_KEY, "hex"));
  const sig = key.sign(hash(message)); // hashMsgHex -> hash
  const n = 32;
  const r = sig.r.toArrayLike(Buffer, "be", n);
  const s = sig.s.toArrayLike(Buffer, "be", n);
  return Buffer.concat([r, s]).toString("hex");
}

const hash = (message) => {
  const sha = new SHA3(256);
  sha.update(Buffer.from(message, "hex"));
  return sha.digest();
}

const serverAuthorization = async (account) => {

  const addr = process.env.SIGNER_ADDRESS;
  const keyId = process.env.SIGNER_KEYID;

  return {
    ...account,
    tempId: `${addr}-${keyId}`,
    addr: fcl.sansPrefix(addr),
    keyId: Number(keyId),
    signingFunction: async (signable) => {
      return {
        addr: fcl.withPrefix(addr),
        keyId: Number(keyId),
        signature: sign(signable)
      }
    }
  }
}

module.exports = {
  serverAuthorization
}