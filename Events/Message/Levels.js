const { Client, Message, EmbedBuilder, DataResolver } = require("discord.js");
const levelDB = require("../../Models/Levels");
const ChannelDB = require("../../Models/LevelUpChannel");

module.exports = {
	name: "messageCreate",

	/**
	 *
	 *  @param { Message} message
	 *  @param { Client } client}
	 */
	async execute(message, client) {
		const { author, guild } = message;
		if (!guild || author.bot) return;

		levelDB.findOne({ Guild: guild.id, User: author.id }, async (err, data) => {
			if (err) throw err;

			if (!data) {
				levelDB.create({
					Guild: guild.id,
					User: author.id,
					XP: 0,
					Level: 0,
				});
			}
		});

		const ChannelData = await ChannelDB.findOne({ Guild: guild.id });

		const give = Math.floor(Math.random() * 29) + 1;

		const data = await levelDB.findOne({ Guild: guild.id, User: author.id });
		if (!data) return;

		const requiredXP = data.Level * data.Level * 100 + 100;

		if (data.XP + give >= requiredXP) {
			data.XP += give;
			data.Level += 1;
			await data.save();

			if (ChannelData) {
				const Channel = guild.channels.cache.get(ChannelData.Channel);
				if (!Channel) return;

				Channel.send({
					content: `${author}`,
					embeds: [new EmbedBuilder().setColor("Blurple").setDescription(`Congrats, you've reached ${data.Level} level`)],
				});
			}
		} else {
			data.XP += give;
			await data.save();
		}
	},
};
