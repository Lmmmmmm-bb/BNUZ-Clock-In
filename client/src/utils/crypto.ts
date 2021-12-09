import { AES, enc } from 'crypto-ts';

export const encrypt = (text: string, secret: string) => {
  return AES.encrypt(text, secret).toString();
};

export const decrypt = (encryptText: string, secret: string) => {
  return AES.decrypt(encryptText, secret).toString(enc.Utf8);
};
