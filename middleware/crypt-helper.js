"use strict";
const crypto = require("crypto");
const CryptoJS = require("crypto-js");
module.exports = {
	/**
	 * md5
	 * @param string
	 * @returns {string}
	 */
	md5(string) {
		return crypto
			.createHash("md5")
			.update(string)
			.digest("hex");
	},

	/**
	 * aes 对称加密
	 * @param string
	 * @param aesSecret
	 * @returns {string}
	 */
	aesEncrypt(string, aesSecret) {
		aesSecret = aesSecret;
		let cipher = crypto.createCipher("aes192", aesSecret);
		let enc = cipher.update(string, "utf8", "hex");
		enc += cipher.final("hex");
		return enc;
	},

	/**
	 * aes 对称解密
	 * @param string
	 * @param aesSecret
	 * @returns {string}
	 */
	aesDecrypt(string, aesSecret) {
		aesSecret = aesSecret;
		let decipher = crypto.createDecipher("aes192", aesSecret);
		let dec = decipher.update(string, "hex", "utf8");
		dec += decipher.final("utf8");
		return dec;
	},

	/**
	 * sha1 加密
	 * @param str
	 * @returns {string}
	 */
	sha1Encode(str) {
		return crypto
			.createHash("sha1")
			.update(str, "utf8")
			.digest("hex");
	},

	/**
	 * aes 加密
	 * @param string
	 * @param Key
	 * @constructor
	 */
	AesEncryptForJs(string, Key) {
		return CryptoJS.AES.encrypt(string, CryptoJS.enc.Utf8.parse(Key), {
			mode: CryptoJS.mode.ECB,
			padding: CryptoJS.pad.Pkcs7
		}).ciphertext.toString();
	},

	/**
	 * aes 解密
	 * @param string
	 * @param Key
	 * @constructor
	 */
	AesDecryptForJs(string, Key) {
		let encryptedBase64Str = CryptoJS.enc.Base64.stringify(
			CryptoJS.enc.Hex.parse(string)
		);
		return CryptoJS.AES.decrypt(
			encryptedBase64Str,
			CryptoJS.enc.Utf8.parse(Key),
			{
				mode: CryptoJS.mode.ECB,
				padding: CryptoJS.pad.Pkcs7
			}
		).toString(CryptoJS.enc.Utf8);
	},

	/**
	 * rsa 私钥解密
	 * @param string
	 * @param privateKey
	 * @returns {*}
	 * @constructor
	 */
	RSAPrivateDecrypt(string, privateKey) {
		try {
			return crypto
				.privateDecrypt(
					{
						key: privateKey,
						padding: crypto.constants.RSA_PKCS1_PADDING
					},
					Buffer.from(string, "base64")
				)
				.toString("utf8");
		} catch (e) {
			return false;
		}
	},

	/**
	 * 获取 rsa 私钥
	 * @returns {string}
	 */
	getRSAPrivateKey() {
		return this.__privateKey;
	},

	/**
	 * save rsa private key
	 * @param {string} key - set private key
	 */
	setRSAPrivateKey(key) {
		let formatedValue = key.replace(/(?<=(^(\S{64})+))(?<!$)/g, "\n");
		this.__privateKey =
			"-----BEGIN RSA PRIVATE KEY-----\n" +
			formatedValue +
			"\n-----END RSA PRIVATE KEY-----";
		// if need key end with `\n` use reg=/(?<=(^(\S{64})+))|(?=$)/g
	}
};
