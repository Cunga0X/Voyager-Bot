const { Client } = require("discord.js");
const chalk = require("chalk");

/**
 * @param {Client} client
 */
module.exports = async (client, PG, Ascii) => {
	let Loaded = 0;

	const EventFiles = await PG(`${process.cwd()}/PlayerEvents/*.js`);

	EventFiles.map(async (file) => {
		const event = require(file);

		client.player.on(event.name, (...args) => event.execute(...args, client));

		await Loaded++;
	});

	if (Loaded !== 0) console.log(chalk.magenta(`Loaded ${Loaded} player events`));
};
