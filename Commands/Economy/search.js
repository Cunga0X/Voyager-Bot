const {
	Client,
	ChatInputCommandInteraction,
	EmbedBuilder,
	ActionRowBuilder,
	ComponentType,
	ButtonBuilder,
	ButtonStyle,
} = require("discord.js");
const ms = require("ms");
const AccountDB = require("../../Models/Account");
const ActionsDB = require("../../Models/MoneyActions");
const Reply = require("../../Systems/Reply");

module.exports = {
	name: "search",
	description: "Search in random places",
	category: "Economy",

	/**
	 *
	 *  @param { ChatInputCommandInteraction } interaction
	 *  @param { Client } client}
	 */
	async execute(interaction, client) {
		const { user } = interaction;

		let Data = await AccountDB.findOne({ User: user.id });
		if (!Data) return Reply(interaction, "❌", `Please create an account!`);

		let Adata = await ActionsDB.findOne({ User: user.id });

		const locations = [
			"Car",
			"Sock",
			"Wallet",
			"Grass",
			"Treasure Box",
			"Sidewalk",
		];

		const location = locations
			.sort(() => Math.random() - Math.random())
			.slice(0, 3);

		let components = [];

		location.forEach(async (x) => {
			let name = x;
			let idName = name.toLowerCase().toString();
			let xName = name;

			components.push(
				new ButtonBuilder()
					.setStyle(ButtonStyle.Primary)
					.setCustomId(idName)
					.setLabel(xName)
			);
		});

		const Row = new ActionRowBuilder().addComponents(components);

		const Amount = Math.floor(Math.random() * 5000) + 500;

		if (!Adata) {
			await interaction.deferReply();

			let Timeout = Date.now() + ms("1m");

			Adata = new ActionsDB({
				User: user.id,
				Search: Timeout,
			});
			Search();

			await Adata.save();
		} else {
			if (Adata.Search > Date.now())
				return Reply(
					interaction,
					"❌",
					`You have already searched once, come back <t:${parseInt(
						Adata.Search / 1000
					)}:R>`,
					true
				);

			await interaction.deferReply();

			let Timeout = Date.now() + ms("1m");

			Adata.Search = Timeout;
			await Adata.save();
			Search();
		}
		async function Search() {
			const Embed = new EmbedBuilder().setColor("Random");

			const Page = await interaction.editReply({
				embeds: [
					Embed.setDescription(
						`❓ | Where do you want to search?\nPick an option\n${location.join(
							", "
						)}`
					),
				],
				components: [Row],
			});

			const col = await Page.createMessageComponentCollector({
				componentType: ComponentType.Button,
				time: ms("30s"),
			});

			col.on("collect", async (i) => {
				if (i.user.id !== user.id) return;

				const Searched = i.customId.toUpperCase();

				Data.Wallet += Amount;
				await Data.save();

				return interaction.editReply({
					embeds: [
						Embed.setDescription(
							`You've found $${Amount} by searching ${Searched}.`
						),
					],
					components: [],
				});
			});
			col.on("end", async (collected) => {
				if (collected.size === 0) {
					return interaction.editReply({
						embeds: [
							Embed.setDescription(
								`❌ | You didn't provide a respone in time.`
							),
						],
						components: [],
					});
				}
			});
		}
	},
};
