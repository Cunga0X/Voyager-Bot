const { Client, ChatInputCommandInteraction } = require("discord.js");
const EditReply = require("../../Systems/EditReply");

module.exports = {
	name: "play",
	description: "Plays a song",
	category: "Music",
	BotPerms: ["Connect", "Speak"],
	options: [
		{
			name: "query",
			description: "Provide song name or URL to play",
			type: 3,
			required: true,
		},
	],

	/**
	 *
	 *  @param { ChatInputCommandInteraction } interaction
	 *  @param { Client } client}
	 */
	async execute(interaction, client) {
		await interaction.deferReply({ ephemeral: true });

		const { options, guild, member, channel, user } = interaction;

		const query = options.getString("query");

		const Erela = client.player;

		let res;

		const VC = member.voice.channel;
		if (!VC) return EditReply(interaction, "❌", "You must be in a voice channel!");

		if (guild.members.me.voice.channel && VC.id !== guild.members.me.voice.channelId)
			return EditReply(interaction, "❌", "You must be in the same voice channel as me to play a song!");

		const player = Erela.create({
			guild: guild.id,
			voiceChannel: member.voice.channel.id,
			textChannel: channel.id,
			selfDeafen: true,
		});

		if (player.state !== "CONNECTED") await player.connect();

		try {
			res = await player.search(query, user);

			if (res.loadType === "LOAD_FAILED") {
				if (!player.queue.current) player.destroy();
				return EditReply(interaction, "❌", "An error has occurred");
			} else if (res.loadType === "NO_MATCHES") {
				return EditReply(interaction, "❌", "No matches found");
			} else if (res.loadType === "PLAYLIST_LOADED") {
				player.queue.add(res.tracks);
				if (!player.playing && !player.paused && !player.queue.size) await player.play();
				return EditReply(interaction, "🎶", "Added to queue");
			} else if (["TRACK_LOADED", "SEARCH_RESULT"].includes(res.loadType)) {
				player.queue.add(res.tracks[0]);
				if (!player.playing && !player.paused && !player.queue.size) await player.play();
				return EditReply(interaction, "🎶", "Added to queue");
			}
		} catch (error) {
			console.log(error);
		}
	},
};
