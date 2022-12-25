const { Client, ChatInputCommandInteraction } = require("discord.js");
const EditReply = require("../../Systems/EditReply");
const Reply = require("../../Systems/Reply");

module.exports = {
	name: "skip",
	description: "Skips a song",
	category: "Music",
	BotPerms: ["Connect", "Speak"],

	/**
	 *
	 *  @param { ChatInputCommandInteraction } interaction
	 *  @param { Client } client}
	 */
	async execute(interaction, client) {
		const { guild, member } = interaction;

		const Manager = client.player;
		const player = Manager.players.get(guild.id);
		if (!player) return Reply(interaction, "❌", "No player is here", true);

		const VC = member.voice.channel;
		if (!VC) return Reply(interaction, "❌", "You must be in a voice channel!", true);

		if (guild.members.me.voice.channel && VC.id !== guild.members.me.voice.channelId)
			return Reply(interaction, "❌", "You must be in the same voice channel as me to play a song!", true);

		await interaction.deferReply({ ephemeral: true });

		await player.stop();

		EditReply(interaction, "🎶", "Song has been skipped!", true);
	},
};
