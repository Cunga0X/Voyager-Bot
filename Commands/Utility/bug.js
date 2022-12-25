const { Client, ChatInputCommandInteraction, ModalBuilder, TextInputBuilder, TextInputStyle, ActionRowBuilder } = require("discord.js");

module.exports = {
	name: "bug",
	description: "Report a bug",
	category: "Utility",

	/**
	 *
	 *  @param { ChatInputCommandInteraction } interaction
	 *  @param { Client } client}
	 */
	async execute(interaction, client) {
		const modal = new ModalBuilder().setCustomId("BugModal").setTitle("Bug Report");

		const bugNameInput = new TextInputBuilder()
			.setCustomId("bugNameInput")
			.setLabel("Command Name")
			.setStyle(TextInputStyle.Short)
			.setRequired(true)
			.setPlaceholder("/command name");

		const bugDescriptionInput = new TextInputBuilder()
			.setCustomId("bugDescriptionInput")
			.setLabel("Please describe a bug you encountered")
			.setStyle(TextInputStyle.Paragraph)
			.setRequired(true)
			.setPlaceholder("Enter description here");

		const firstActionRow = new ActionRowBuilder().addComponents(bugNameInput);
		const secondActionRow = new ActionRowBuilder().addComponents(bugDescriptionInput);

		modal.addComponents(firstActionRow, secondActionRow);

		await interaction.showModal(modal);
	},
};
