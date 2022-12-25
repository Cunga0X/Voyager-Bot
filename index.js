const { Client, Partials, Collection } = require("discord.js");
const ms = require("ms");
const { promisify } = require("util");
const { glob } = require("glob");
const PG = promisify(glob);
const Ascii = require("ascii-table");
const config = require("./config.json");

const { Channel, GuildMember, Message, Reaction, ThreadMember, User, GuildScheduledEvent } = Partials;

const client = new Client({
	intents: 131071,
	partials: [Channel, GuildMember, Message, Reaction, ThreadMember, User, GuildScheduledEvent],
	allowedMentions: { parse: ["everyone", "users", "roles"] },
	rest: { timeout: ms("1m") },
});

client.commands = new Collection();

const Handlers = ["Events", "Errors", "Commands"];

Handlers.forEach((handler) => {
	require(`./Handlers/${handler}`)(client, PG, Ascii);
});

module.exports = client;

client.login(config.TOKEN);
