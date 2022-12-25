const {
	Client,
	ContextMenuCommandInteraction,
	ApplicationCommandType,
	EmbedBuilder,
} = require("discord.js");

module.exports = {
	name: "Avatar",
	category: "Context",
	type: ApplicationCommandType.User,
	context: true,

	/**
	 *
	 *  @param { ContextMenuCommandInteraction } interaction
	 *  @param { Client } client}
	 */
	async execute(interaction) {
		await interaction.deferReply();

		const { guild, targetId } = interaction;

		const target = await guild.members.cache.get(targetId);

		const Embed = new EmbedBuilder()
			.setColor("Random")
			.setAuthor({
				name: `${target.user.username} 's Avatar`,
				iconURL: target.user.displayAvatarURL(),
			})
			.setImage(target.user.displayAvatarURL({ size: 512 }))
			.setFooter({ text: "Avatar by Voyager" })
			.setTimestamp();

		return interaction.editReply({ embeds: [Embed] });
	},
};
