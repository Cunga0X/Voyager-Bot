const { Client, Partials, Collection } = require("discord.js");
const ms = require("ms");
const { promisify } = require("util");
const { glob } = require("glob");
const PG = promisify(glob);
const Ascii = require("ascii-table");
const config = require("./config.json");

const { Channel, GuildMember, Message, Reaction, ThreadMember, User, GuildScheduledEvent } = Partials;
const nodes = require("./Systems/Nodes");
const { Manager } = require("erela.js");
const client = new Client({
	intents: 131071,
	partials: [Channel, GuildMember, Message, Reaction, ThreadMember, User, GuildScheduledEvent],
	allowedMentions: { parse: ["everyone", "users", "roles"] },
	rest: { timeout: ms("1m") },
});

client.commands = new Collection();

client.player = new Manager({
	nodes,
	send: (id, payload) => {
		let guild = client.guilds.cache.get(id);
		if (guild) guild.shard.send(payload);
	},
});

client.on("raw", (d) => client.player.updateVoiceState(d));

const Handlers = ["Events", "Errors", "Commands", "Player"];

Handlers.forEach((handler) => {
	require(`./Handlers/${handler}`)(client, PG, Ascii);
});

module.exports = client;

client.login(config.TOKEN);
