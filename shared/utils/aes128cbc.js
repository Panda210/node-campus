import crypto from 'crypto';

const encodeKey = 'dEfAu1tS3cretKeY';
const ivs = '2624750004598718';

const encrypt = (data) => {
  const cipher = crypto.createCipheriv('aes-128-cbc', encodeKey, ivs);
  let crypted = cipher.update(data, 'utf8', 'binary');
  crypted += cipher.final('binary');
  crypted = new Buffer(crypted, 'binary').toString('base64');
  return crypted;
};

const decrypt = (crypted) => {
  crypted = new Buffer(crypted, 'base64').toString('binary');
  const decipher = crypto.createDecipheriv('aes-128-cbc', encodeKey, ivs);
  let decoded = decipher.update(crypted, 'binary', 'utf8');
  decoded += decipher.final('utf8');
  return decoded;
};

export default {
  encrypt,
  decrypt
};
