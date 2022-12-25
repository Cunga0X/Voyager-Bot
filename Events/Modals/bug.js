const { Client, ModalSubmitInteraction, InteractionType, EmbedBuilder } = require("discord.js");
const EditReply = require("../../Systems/EditReply");

module.exports = {
	name: "interactionCreate",

	/**
	 *  @param {Client} client
	 *  @param {ModalSubmitInteraction} interaction
	 */
	async execute(interaction, client) {
		const { type, customId, guild, user, fields } = interaction;

		if (type !== InteractionType.ModalSubmit) return;
		if (!guild || user.bot) return;

		if (customId !== "BugModal") return;
		await interaction.deferReply({ ephemeral: true });

		const bugNameInput = fields.getTextInputValue("bugNameInput");
		const bugDescriptionInput = fields.getTextInputValue("bugDescriptionInput");

		const Embed = new EmbedBuilder()
			.setColor("Red")
			.setTitle("New Bug")
			.setThumbnail(guild.iconURL())
			.setDescription(`**Bug Name:** \`${bugNameInput}\`\n** Description:** \`${bugDescriptionInput}\``)
			.setTimestamp();

		EditReply(interaction, "✅", "Bug report sent successfully.");

		const channel = client.channels.cache.get("1046857151022383244");

		channel.send({ embeds: [Embed] }).then(async (msg) => {
			await msg.react("✅");
			await msg.react("❌");
		});
	},
};
