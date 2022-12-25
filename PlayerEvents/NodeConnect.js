const { Client } = require("discord.js");
const { Node } = require("erela.js");
const chalk = require("chalk");

module.exports = {
	name: "nodeConnect",

	/**
	 *
	 *  @param { Node } node
	 *  @param { Client } client
	 */
	async execute(node, client) {
		console.log(chalk.green(`${node.options.name} connected`));
	},
};
