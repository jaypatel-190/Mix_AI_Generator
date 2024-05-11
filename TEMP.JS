const express = require("express");
const bodyParser = require("body-parser");
const crypto = require("crypto");

const app = express();
const port = 3000;

app.use(bodyParser.json());

function generateKeyPair() {
  const { publicKey, privateKey } = crypto.generateKeyPairSync("rsa", {
    modulusLength: 2048,
  });
  return {
    private_key: privateKey.export({ format: "pem", type: "pkcs1" }).toString(),
    public_key: publicKey.export({ format: "pem", type: "pkcs1" }).toString(),
  };
}

function encrypt(publicKey, message) {
  const bufferMessage = Buffer.from(message, "utf-8");
  const encrypted = crypto.publicEncrypt(
    { key: publicKey, padding: crypto.constants.RSA_PKCS1_PADDING },
    bufferMessage
  );
  return encrypted.toString("base64");
}

function decrypt(privateKey, cipherText) {
  const bufferCipherText = Buffer.from(cipherText, "base64");
  const decrypted = crypto.privateDecrypt(
    { key: privateKey, padding: crypto.constants.RSA_PKCS1_PADDING },
    bufferCipherText
  );
  return decrypted.toString("utf-8");
}

app.get("/generate-keypair", (req, res) => {
  const keyPair = generateKeyPair();
  res.json(keyPair);
});

app.post("/encrypt", (req, res) => {
  const { public_key, message } = req.body;
  const cipherText = encrypt(public_key, message);
  res.json({ cipher_text: cipherText });
});

app.post("/decrypt", (req, res) => {
  const { private_key, cipher_text } = req.body;
  const plainText = decrypt(private_key, cipher_text);
  res.json({ plain_text: plainText });
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
