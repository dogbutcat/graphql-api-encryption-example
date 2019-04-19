const express = require("express"),
	graphqlHTTP = require("express-graphql"),
	bodyParser = require("body-parser"),
	schema = require("./schema"),
	{ decryption: decryptMiddleware } = require("./middleware/decryption"),
	cryptoHelper = require("./middleware/crypt-helper"),
	config = require("./config/config");

const app = express();

app.use((req, res, next) => {
	res.header("Access-Control-Allow-Origin", "http://localhost:5000");
	res.header(
		"Access-Control-Allow-Headers",
		"Content-Type,Content-Length,Accept,X-Requested-With"
	);
	res.header("Access-Control-Allow-Methods", "PUT,POST,GET,DELETE,OPTIONS");
	if (req.method == "OPTIONS") {
		res.sendStatus(204);
	} else {
		next();
	}
});
// app.use('/graphql',graphqlHTTP({
// 	schema,
// 	graphiql: true
// }));

cryptoHelper.setRSAPrivateKey(config.privateKey);
app.use(
	"/graphql",
	bodyParser.json(),
	decryptMiddleware,
	graphqlHTTP({
		schema,
		graphiql: true
	})
);

const PORT = process.env.PORT || 9000;

app.listen(PORT, () => console.log(`server running on port ${PORT}`));
