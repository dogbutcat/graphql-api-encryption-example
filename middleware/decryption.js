let cryptoHelper = require("./crypt-helper");

let _reserveRespJsonFunc;

function decryption(req, res, next) {
	// bypass request from /graphql
	if ("a2V5" in req.body && "ZGF0YQ==" in req.body) {
		let __key = req.body["a2V5"],
			__data = req.body["ZGF0YQ=="],
			__aesKey = "",
			__rawStrBody = "";

		if (!__key || !__data) next();

		__aesKey = cryptoHelper.RSAPrivateDecrypt(
			__key,
			cryptoHelper.getRSAPrivateKey()
		);
		if (!__aesKey || !__aesKey.match(/^[A-Za-z0-9]{16}$/)) next();

		__rawStrBody = cryptoHelper.AesDecryptForJs(__data, __aesKey);
		if (!__rawStrBody) next();

		try {
			req.body = JSON.parse(__rawStrBody);
		} catch (error) {
			next();
		}

		// override res.json in Express
		_reserveRespJsonFunc = _reserveRespJsonFunc || res.json;
		res.json = function(jsonResp) {
			let encData = cryptoHelper.AesEncryptForJs(
				JSON.stringify(jsonResp),
				__aesKey
			);
			_reserveRespJsonFunc.call(this, { data: encData });
		};

		next();
	} else {
		// revert res.json
		// res.json = _reserveRespJsonFunc || res.json;
		next();
	}
}

module.exports = {
	decryption
};
