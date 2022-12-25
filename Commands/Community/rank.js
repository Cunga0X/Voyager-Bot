const { Client, ChatInputCommandInteraction, AttachmentBuilder, EmbedBuilder } = require("discord.js");
const Reply = require("../../Systems/Reply");
const levelDB = require("../../Models/Levels");
const Canvacord = require("canvacord");

module.exports = {
	name: "rank",
	description: "Displays rank card",
	category: "Community",
	options: [
		{
			name: "user",
			description: "Select a user",
			required: false,
			type: 6,
		},
	],

	/**
	 *
	 *  @param { ChatInputCommandInteraction } interaction
	 *  @param { Client } client}
	 */
	async execute(interaction, client) {
		const { options, user, guild } = interaction;

		const Member = options.getMember("user") || user;
		const member = guild.members.cache.get(Member.id);

		const Data = await levelDB.findOne({ Guild: guild.id, User: member.id });
		if (!Data) return Reply(interaction, "❌", `${member} has not gained any XP!`);

		await interaction.deferReply();

		const Required = Data.Level * Data.Level * 100 + 100;

		const rank = new Canvacord.Rank()
			.setAvatar(member.displayAvatarURL({ forceStatic: true }))
			.setBackground("IMAGE", "https://cdn.discordapp.com/attachments/1047634549644992624/1052723693375213660/rank-card.png")
			.setCurrentXP(Data.XP)
			.setRequiredXP(Required)
			.setRank(1, "Rank", false)
			.setLevel(Data.Level, "Level")
			.setProgressBar("#FF3AF3", "COLOR")
			.setUsername(member.user.username)
			.setDiscriminator(member.user.discriminator);

		const Card = await rank.build().catch((err) => console.log(err));

		const attachment = new AttachmentBuilder(Card, { name: "rank.png" });

		const Embed = new EmbedBuilder().setColor("Blurple").setTitle(`${member.user.username}'s Rank Card`).setImage("attachment://rank.png");

		interaction.editReply({ embeds: [Embed], files: [attachment] });
	},
};
