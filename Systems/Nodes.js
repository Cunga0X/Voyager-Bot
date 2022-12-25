const { NODE_HOST, NODE_PORT, NODE_PASS } = require("../config.json");
const nodes = [
	{
		name: "Lavalink",
		id: "main",
		host: NODE_HOST,
		port: NODE_PORT,
		password: NODE_PASS,
		retryAmount: 15,
		retryDelay: 600,
		secure: false,
	},
];

module.exports = nodes;
