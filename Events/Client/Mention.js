const { Client, Message, EmbedBuilder, ActionRowBuilder, ButtonBuilder, ButtonStyle } = require("discord.js");

module.exports = {
	name: "messageCreate",

	/**
	 *
	 * @param {Message} message
	 * @param {Client} client}
	 */
	async execute(message, client) {
		const { author, guild, content } = message;
		const { user } = client;

		if (!guild || author.bot) return;
		if (content.includes("@here") || content.includes("@everyone")) return;
		if (!content.includes(user.id)) return;

		return message.reply({
			embeds: [
				new EmbedBuilder()
					.setColor("Blurple")
					.setAuthor({
						name: user.username,
						iconURL: user.displayAvatarURL(),
					})
					.setDescription(`Hey, you called me? I'm Voyager! Nice to meet you. Type\`/\` & click on my logo to see all my commands!`)
					.setThumbnail(user.displayAvatarURL())
					.setFooter({ text: "Introduction to Voyager" })
					.setTimestamp(),
			],

			components: [
				new ActionRowBuilder().addComponents(
					new ButtonBuilder()
						.setStyle(ButtonStyle.Link)
						.setURL(
							"https://discord.com/api/oauth2/authorize?client_id=1046523551127195730&permissions=2193117150839&scope=bot%20applications.commands"
						)
						.setLabel("Invite Me")
				),
			],
		});
	},
};
