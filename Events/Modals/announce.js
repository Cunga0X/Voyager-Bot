const { Client, ModalSubmitInteraction, InteractionType, EmbedBuilder } = require("discord.js");
const EditReply = require("../../Systems/EditReply");

module.exports = {
	name: "interactionCreate",

	/**
	 *  @param {Client} client
	 *  @param {ModalSubmitInteraction} interaction
	 */
	async execute(interaction, client) {
		const { type, customId, guild, user, fields, channel } = interaction;

		if (type !== InteractionType.ModalSubmit) return;
		if (!guild || user.bot) return;

		if (customId !== "announce-modal") return;

		await interaction.deferReply({ ephemeral: true });

		const messageInput = fields.getTextInputValue("message-input");

		const Embed = new EmbedBuilder()
			.setColor("Blurple")
			.setTitle("Announcement")
			.setThumbnail(guild.iconURL())
			.setDescription(messageInput)
			.setTimestamp();

		EditReply(interaction, "✅", `Announcement is now live in ${channel}.}`);

		channel.send({ embeds: [Embed] }).then(async (msg) => {
			await msg.react("👍");
			await msg.react("👎");
		});
	},
};
