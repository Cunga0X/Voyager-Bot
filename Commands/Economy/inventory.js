const {
	Client,
	ChatInputCommandInteraction,
	EmbedBuilder,
} = require("discord.js");
const ShopItems = require("../../Systems/Items");
const AccountDB = require("../../Models/Account");
const Reply = require("../../Systems/Reply");

module.exports = {
	name: "inventory",
	description: "Opens a inventory",
	category: "Economy",

	/**
	 *
	 *  @param { ChatInputCommandInteraction } interaction
	 *  @param { Client } client}
	 */
	async execute(interaction, client) {
		const { user } = interaction;

		const Data = await AccountDB.findOne({ User: user.id });
		if (!Data)
			return Reply(interaction, "❌", "Please create an account first!");

		if (!Data.Inventory || Object.keys(Data.Inventory).length === 0)
			return Reply(interaction, "❌", "You have no items available.", true);

		await interaction.deferReply();

		const inventory = Object.keys(Data.Inventory).sort();

		const MappedData = inventory
			.map((a) => {
				const Item = ShopItems.find((val) => val.value === a);

				return `${Item.emoji} **${Item.name} -** ${
					Data.Inventory[Item.value]
				} | *ID* \`${Item.value}\``;
			})
			.join("\n");

		const Embed = new EmbedBuilder()
			.setColor("Blurple")
			.setTimestamp()
			.setAuthor({ name: `${user.username}'s Inventory` })
			.setDescription(`${MappedData}`);

		interaction.editReply({ embeds: [Embed] });
	},
};
