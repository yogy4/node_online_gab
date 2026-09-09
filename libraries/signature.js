const crpyto = require('crypto')
const fs = require('fs')
// const path = require('path')




// const cpath = path.resolve(__dirname, './config/key')
const private_key = fs.readFileSync('./config/keys/private-key.pem', 'utf-8')
const doc = fs.readFileSync('sample_sig.txt')


const signer = crpyto.createSign('RSA-SHA256')
signer.write(doc)
signer.end()

const signature = signer.sign(private_key, 'base64')
console.log('Digital Signature ', signature)
fs.writeFileSync('signature.txt', signature)