const { ChatInputCommandInteraction } = require("discord.js");

module.exports = {
	name: "pixelate",
	description: "Get a pixelated form of a user's avatar",
	category: "Fun",
	options: [
		{
			name: "user",
			description: "select a user",
			type: 6,
			required: true,
		},
	],

	/**
	 *
	 * @param {ChatInputCommandInteraction} interaction
	 */

	async execute(interaction) {
		const { options } = interaction;
		const user = options.getUser("user");

		if (!user) {
			user = interaction.user;
		}

		let avatarUrl = user.avatarURL({ size: 512, extension: "jpg" });
		let canvas = `https://some-random-api.ml/canvas/pixelate?avatar=${avatarUrl}`;

		await interaction.reply({
			content: canvas,
		});
	},
};
