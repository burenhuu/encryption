import crypto from "crypto";

let secretKey = "yourSecretKey";
const algorithm = "aes-256-cbc";
const key = crypto.scryptSync(secretKey, "GfG", 32);
const iv = crypto.randomBytes(16);

export function encrypt(text) {
  let cipher = crypto.createCipheriv(algorithm, Buffer.from(key), iv);
  let encrypted = cipher.update(text);
  encrypted = Buffer.concat([encrypted, cipher.final()]);
  return `${iv.toString("hex")}:${encrypted.toString("hex")}`;
}

export function decrypt(text) {
  const [ivData, encryptedData] = text.split(":");
  let iv = Buffer.from(ivData, "hex");
  let encryptedText = Buffer.from(encryptedData, "hex");
  let decipher = crypto.createDecipheriv(algorithm, Buffer.from(key), iv);
  let decrypted = decipher.update(encryptedText);
  decrypted = Buffer.concat([decrypted, decipher.final()]);
  return decrypted.toString();
}

var output = encrypt("TEST");
console.log(output);
console.log(decrypt(output));
