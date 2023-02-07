// PLEASE READ README.md BEFORE MAKING ANY CHANGES. JOIN THE SUPPORT SERVER FROM SUPPORT.md

const {
	Collection,
	GatewayIntentBits,
	Partials,
	Client,
} = require('discord.js');
require('dotenv').config();
require('colors');
const fs = require('fs');

// Initialzing Client
const client = new Client({
	intents: [
		GatewayIntentBits.Guilds,
		GatewayIntentBits.DirectMessages,
		GatewayIntentBits.GuildMembers,
		GatewayIntentBits.GuildMessages,
		GatewayIntentBits.GuildPresences,
		GatewayIntentBits.MessageContent,
	],
	partials: [
		Partials.Channel,
		Partials.Message,
		Partials.GuildMember,
		Partials.GuildScheduledEvent,
		Partials.Reaction,
		Partials.ThreadMember,
		Partials.User,
	],
	shards: 'auto',
});

// Exporting client
module.exports = client;

// Defining useful collection
client.commands = new Collection();
client.context = new Collection();
client.events = 0;
client.config = require('./config.json');

// Default color for your embed
client.color = 3092790;

// Default footer for your embed
client.footer = 'Keeps it fun!';

// Connecting handlers
const handlerFolder = fs
	.readdirSync('./Structures/Handlers')
	.filter((file) => file.endsWith('.js'));
for (const file of handlerFolder) {
	require(`./Handlers/${file}`)(client);
}

// Logging in to Discord
if (!process.env.TOKEN) {
	console.log(
		'[NO TOKEN] You did not provide any token. Make a .env file and add'.green
			.bold,
		'TOKEN=YOUR TOKEN'.red.bold,
		'in your.env file'.green.bold,
	);
	return;
}
client
	.login(process.env.TOKEN)
	.catch((e) => console.log(`[DISCORD API] ${e}`.green.bold));
