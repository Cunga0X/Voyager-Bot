const { ChatInputCommandInteraction, EmbedBuilder } = require("discord.js");
const fetch = (...args) => import("node-fetch").then(({ default: fetch }) => fetch(...args)); // since require is not supported, we will use this
//workaround to import node-fetch

module.exports = {
	name: "meme",
	description: "Get random meme",
	category: "Fun",

	/**
	 *
	 * @param {ChatInputCommandInteraction} interaction
	 */

	async execute(interaction) {
		interaction.deferReply();
		const embed = new EmbedBuilder();

		await fetch("https://www.reddit.com/r/memes/random/.json").then(async (res) => {
			let meme = await res.json();

			console.log(meme);

			let title = meme[0].data.children[0].data.title;
			let url = meme[0].data.children[0].data.url;
			let author = meme[0].data.children[0].data.author;

			await interaction.editReply({
				embeds: [embed.setTitle(title).setImage(url).setURL(url).setColor("Blurple").setFooter({ text: author })],
			});
		});
	},
};
