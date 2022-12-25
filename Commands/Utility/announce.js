const { Client, ChatInputCommandInteraction, ModalBuilder, TextInputBuilder, TextInputStyle, ActionRowBuilder } = require("discord.js");

module.exports = {
	name: "announcement",
	description: "Announce message",
	category: "Utility",
	UserPerms: ["ManageGuild"],
	BotPerms: ["ManageGuild"],

	/**
	 *
	 *  @param { ChatInputCommandInteraction } interaction
	 *  @param { Client } client}
	 */
	async execute(interaction, client) {
		const modal = new ModalBuilder().setCustomId("announce-modal").setTitle("New Announcement");

		const messageInput = new TextInputBuilder()
			.setCustomId("message-input")
			.setLabel("Message")
			.setStyle(TextInputStyle.Paragraph)
			.setRequired(true)
			.setPlaceholder("Enter the announcement message");

		const Row = new ActionRowBuilder().addComponents(messageInput);

		modal.addComponents(Row);

		await interaction.showModal(modal);
	},
};
