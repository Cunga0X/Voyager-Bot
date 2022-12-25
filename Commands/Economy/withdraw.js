const { Client, ChatInputCommandInteraction } = require("discord.js");
const AccountDB = require("../../Models/Account");
const Reply = require("../../Systems/Reply");
const EditReply = require("../../Systems/EditReply");

module.exports = {
	name: "withdraw",
	description: "Withdraws wallet to the bank",
	category: "Economy",
	options: [
		{
			name: "amount",
			description: "Specify amount to withdraw (use 'all' for all money)",
			required: true,
			type: 3,
		},
	],

	/**
	 *
	 *  @param { ChatInputCommandInteraction } interaction
	 *  @param { Client } client}
	 */
	async execute(interaction, client) {
		const { options, user } = interaction;

		const Amount = options.getString("amount");

		let Data = await AccountDB.findOne({ User: user.id });
		if (!Data) return Reply(interaction, "❌", `Please create an account!`);

		if (Amount.toLowerCase() === "all") {
			if (Data.Bank === 0)
				return Reply(interaction, "❌", `You don't have enough money!`);

			await interaction.deferReply({ ephemerals: true });

			Data.Wallet += Data.Bank;
			Data.Bank = 0;

			await Data.save();

			return EditReply(interaction, "✅", `All money has been withdrawn`);
		} else {
			const Converted = Number(Amount);

			if (isNaN(Converted) === true)
				return Reply(
					interaction,
					"❌",
					`The amount can only be a number or \'all\'!`,
					true
				);
			if (Data.Bank < parseInt(Converted) || Converted === Infinity)
				return Reply(interaction, "❌", `You don't have enough money!`, true);

			await interaction.deferReply({ ephemerals: true });

			Data.Wallet += parseInt(Converted);
			Data.Bank += parseInt(Converted);
			Data.Bank = Math.abs(Data.Bank);

			await Data.save();

			return EditReply(
				interaction,
				"✅",
				`Withdrawn ${parseInt(Converted)} from the bank.`
			);
		}
	},
};
