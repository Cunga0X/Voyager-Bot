const { Client } = require("discord.js");
const { Player } = require("erela.js");

module.exports = {
	name: "socketClosed",

	/**
	 *
	 *  @param { WebSocket } payload
	 *  @param { Player } player
	 *  @param { Client } client
	 */
	async execute(player, payload, client) {
		await player.destroy();
	},
};
