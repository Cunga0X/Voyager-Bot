const {
	Client,
	MessageComponentInteraction,
	InteractionType,
} = require("discord.js");
const DB = require("../../Models/Verification");
const EditReply = require("../../Systems/EditReply");

module.exports = {
	name: "interactionCreate",

	/**
	 *
	 * @param {Client} client
	 * @param {MessageComponentInteraction} interaction
	 */
	async execute(interaction, client) {
		const { guild, customId, member, type } = interaction;

		if (type !== InteractionType.MessageComponent) return;

		const CustomID = ["verify"];
		if (!CustomID.includes(customId)) return;

		await interaction.deferReply({ ephemeral: true });

		const Data = await DB.findOne({ Guild: guild.id }).catch((err) => {});
		if (!Data) return EditReply(interaction, "❌", "Couldn't find any data!");

		const Role = guild.roles.cache.get(Data.Role);

		if (member.roles.cache.has(Role.id))
			return EditReply(
				interaction,
				"❌",
				"You are already verified as a member!"
			);

		await member.roles.add(Role);

		EditReply(interaction, "✅", "You are now verified as a member!");
	},
};
