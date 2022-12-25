const { Client } = require("discord.js");
const ms = require("ms");
const mongoose = require("mongoose");
const { MONGO_DB } = require("../../config.json");
const chalk = require("chalk");

module.exports = {
	name: "ready",

	/**
	 * @param {Client} client
	 */
	async execute(client) {
		const { user, ws } = client;

		client.player.init(user.id);

		console.log(chalk.green(`${user.tag} is now online!`));

		setInterval(() => {
			const ping = ws.ping;

			user.setActivity({
				name: `Space Race`,
				type: 5,
			});
		}, ms("5s"));

		if (!MONGO_DB) return;

		mongoose.set("strictQuery", false);
		mongoose
			.connect(MONGO_DB, {
				useNewUrlParser: true,
				useUnifiedTopology: true,
			})
			.then(() => {
				console.log(chalk.bgGreen("\nConnected to Database!"));
			});
	},
};
