const crpyto = require('crypto')
const fs = require('fs')

const private_key = fs.readFileSync('./config/key/private-key.pem', 'utf-8')
const doc = fs.readFileSync('sample-doc.txt')


const signer = crpyto.createSign('RSA-SHA256')
signer.write(doc)
signer.end()

const signature = signer.sign(private_key, 'base64')
console.log('Digital Signature ', signature)
fs.writeFileSync('signature.txt', signature)