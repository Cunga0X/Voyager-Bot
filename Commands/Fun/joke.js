const { ChatInputCommandInteraction, EmbedBuilder } = require("discord.js");
const fetch = (...args) => import("node-fetch").then(({ default: fetch }) => fetch(...args));

module.exports = {
	name: "joke",
	description: "Get random joke",
	category: "Fun",

	/**
	 *
	 * @param {ChatInputCommandInteraction} interaction
	 */

	async execute(interaction) {
		const embed = new EmbedBuilder();
		interaction.deferReply();

		await fetch("https://official-joke-api.appspot.com/random_joke").then(async (res) => {
			let joke = await res.json();

			return interaction.editReply({
				embeds: [embed.setTitle(`Here\'s your joke`).setDescription(`${joke.setup}\n\n${joke.punchline}`).setColor("Blurple")],
			});
		});
	},
};
