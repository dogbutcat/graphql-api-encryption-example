import ApolloClient from "apollo-boost";
import axios from "axios";
import { Response } from "node-fetch";

import config from "../config/config";
import { Encryptor } from "./encryption";

const encryptImp = new Encryptor(config.publicKey);

function createResponseFromAxiosResp(axiosResp, data) {
	data = data || axiosResp.data;
	// use Response will cause url be empty, as apollo-link-http use response.text() to get string data
	let ret = new Response(JSON.stringify(data), {
		...axiosResp
	});
	return ret;
}

export const client = new ApolloClient({
	uri: "http://localhost:9000/graphql",
	fetch: (url, option) => {
		let __body = option.body,
			__randomKey = encryptImp.getRandomStr(16);
		let reqBody = {
			"a2V5": encryptImp.encryptForRSA(__randomKey),
			"ZGF0YQ==": encryptImp.AESEncryption(__randomKey, __body)
		};
		return axios.post(url, reqBody).then(resp => {
			let __decryptData = JSON.parse(
				encryptImp.AESDecrypt(__randomKey, resp.data.data)
			);
			return Promise.resolve(createResponseFromAxiosResp(resp, __decryptData));
		});
		// return fetch(url, {...option, body: JSON.stringify(reqBody)})
	}
});

/**
 * body: (...)
bodyUsed: true
headers: Headers {}
ok: true
redirected: false
status: 200
statusText: "OK"
type: "cors"
url: "http://localhost:9000/graphql"
 */
