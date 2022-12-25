const {
	Client,
	ChatInputCommandInteraction,
	EmbedBuilder,
} = require("discord.js");
const ShopItems = require("../../Systems/Items");

module.exports = {
	name: "shop",
	description: "Opens a shop",
	category: "Economy",

	/**
	 *
	 *  @param { ChatInputCommandInteraction } interaction
	 *  @param { Client } client}
	 */
	async execute(interaction, client) {
		await interaction.deferReply();

		const {} = interaction;

		const Sorted = ShopItems.sort((a, b) => a.price - b.price);

		const MappedData = Sorted.map(
			(value) => `\`${value.emoji}\` **${value.name}** - ${value.price}`
		).join("\n");

		const Embed = new EmbedBuilder()
			.setColor("Blurple")
			.setTimestamp()
			.setTitle("Shop")
			.setDescription(`${MappedData}`);

		interaction.editReply({ embeds: [Embed] });
	},
};
