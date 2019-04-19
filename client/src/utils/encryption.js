import CryptoJS from "crypto-js";
import JSEncrypt from "./jsencrypt";
// aes 加解密
export class Encryptor {

    constructor(key) {
        this.pubKey = key;
    }
	/**
	 * 加密码字符 for RSA
	 * @param value
	 * @returns {string|*|WordArray}
	 */
	encryptForRSA(value = "") {
		let encrypt = new JSEncrypt();
		encrypt.setPublicKey(this.pubKey);
		let encrypted = encrypt.encrypt(value);
		return encrypted;
	}

	/**
	 * 解密RSA
	 * @param encrypted
	 * @returns {string|*|WordArray}
	 */
	decryptForRSA(encrypted) {
		let decrypt = new JSEncrypt();
		decrypt.setPrivateKey("YOU PRIVATE KEY ");
		return decrypt.decrypt(encrypted);
	}

	/**
	 * 动态生成16位的key值 用于AES加密
	 *
	 *
	 * */
	getRandomStr(length) {
		const chars =
			"ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
		const maxPos = chars.length;
		let noceStr = "";
		for (let i = 0; i < (length || 32); i++) {
			noceStr += chars.charAt(Math.floor(Math.random() * maxPos));
		}
		return noceStr;
	}

	//AES 加密
	AESEncryption(keystr, parmasStr) {
		let key = CryptoJS.enc.Utf8.parse(keystr);
		let encrypted = CryptoJS.AES.encrypt(parmasStr, key, {
			mode: CryptoJS.mode.ECB,
			padding: CryptoJS.pad.Pkcs7
		});
		return encrypted.ciphertext.toString();
	}

	//AES 解密
	AESDecrypt(keystrs, parmasStr) {
		let keystr = CryptoJS.enc.Utf8.parse(keystrs);
		let encryptedHexStr = CryptoJS.enc.Hex.parse(parmasStr);
		let encryptedBase64Str = CryptoJS.enc.Base64.stringify(encryptedHexStr);
		let decryptedData = CryptoJS.AES.decrypt(encryptedBase64Str, keystr, {
			mode: CryptoJS.mode.ECB,
			padding: CryptoJS.pad.Pkcs7
		});
		return decryptedData.toString(CryptoJS.enc.Utf8);
	}
}
