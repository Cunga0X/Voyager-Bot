const {
	Client,
	ChatInputCommandInteraction,
	ButtonBuilder,
	ActionRowBuilder,
	ButtonStyle,
	EmbedBuilder,
} = require("discord.js");
const EditReply = require("../../Systems/EditReply");
const DB = require("../../Models/Verification");

module.exports = {
	name: "verify",
	description: "Integrated Verification System",
	UserPerms: ["ManageGuild"],
	category: "Moderation",
	options: [
		{
			name: "role",
			description: "Select the verified members role",
			type: 8,
			required: true,
		},
		{
			name: "channel",
			description: "Select the channel where the message will be sent",
			type: 7,
			required: true,
		},
	],

	/**
	 * @param {Client} client
	 * @param {ChatInputCommandInteraction} interaction
	 */
	async execute(interaction, client) {
		await interaction.deferReply({ ephemeral: true });

		const { options, guild, channel } = interaction;

		const role = options.getRole("role");
		const Channel = options.getChannel("channel") || channel;

		let Data = await DB.findOne({ Guild: guild.id }).catch((err) => {});

		if (!Data) {
			Data = new DB({ Guild: guild.id, Role: role.id });

			await Data.save();
		} else {
			Data.Role = role.id;
			await Data.save();
		}

		Channel.send({
			embeds: [
				new EmbedBuilder()
					.setColor("Blurple")
					.setTitle("✅ | Verification")
					.setDescription("Click the button to verify"),
			],
			components: [
				new ActionRowBuilder().addComponents(
					new ButtonBuilder()
						.setCustomId("verify")
						.setLabel("Verify")
						.setStyle(ButtonStyle.Success)
				),
			],
		});

		return EditReply(
			interaction,
			"✅",
			`Successfully sent verification message.`
		);
	},
};
