const { Client, Guild, EmbedBuilder, ActionRowBuilder, ButtonBuilder, ButtonStyle, ChannelTypes, ChannelType } = require("discord.js");

module.exports = {
	name: "guildCreate",

	/**
	 *
	 * @param {Guild} guild
	 * @param {Client} client}
	 */
	async execute(guild, client) {
		const { name, members, channels } = guild;

		let channelToSend;

		channels.cache.forEach((channel) => {
			if (channel.type === ChannelType.GuildText && !channelToSend && channel.permissionsFor(members.me).has("SendMessages"))
				channelToSend = channel;
		});

		if (!channelToSend) return;

		const Embed = new EmbedBuilder()
			.setColor("Blurple")
			.setAuthor({ name: name, iconURL: guild.iconURL() })
			.setDescription("Hey, this is **Voyager**! Thanks for inviting me to your server!")
			.setFooter({ text: "Developed by Chunga#2777" })
			.setTimestamp();

		const Row = new ActionRowBuilder().addComponents(
			new ButtonBuilder()
				.setStyle(ButtonStyle.Link)
				.setURL(
					"https://discord.com/api/oauth2/authorize?client_id=1046523551127195730&permissions=2193117150839&scope=bot%20applications.commands"
				)
				.setLabel("Invite Me")
		);

		channelToSend.send({ embeds: [Embed], components: [Row] });
	},
};
