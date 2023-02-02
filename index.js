const {Client, Collection, GatewayIntentBits, Partials } = require('discord.js');
require('dotenv').config();
const fs = require('fs');
const OS = require('os');
const Events = require('events');
require('colors');

// Initialzing Client
const client = new Client({
    intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.DirectMessageReactions,
        GatewayIntentBits.DirectMessageTyping,
        GatewayIntentBits.DirectMessages,
        GatewayIntentBits.GuildBans,
        GatewayIntentBits.GuildEmojisAndStickers,
        GatewayIntentBits.GuildIntegrations,
        GatewayIntentBits.GuildInvites,
        GatewayIntentBits.GuildMembers,
        GatewayIntentBits.GuildMessageReactions,
        GatewayIntentBits.GuildMessageTyping,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.GuildPresences,
        GatewayIntentBits.GuildScheduledEvents,
        GatewayIntentBits.GuildVoiceStates,
        GatewayIntentBits.GuildWebhooks,
        GatewayIntentBits.MessageContent
    ],
    partials: [
        Partials.Channel,
        Partials.Message,
        Partials.GuildMember,
        Partials.GuildScheduledEvent,
        Partials.Reaction,
        Partials.ThreadMember,
        Partials.User
    ],
    allowedMentions: {
      parse: ["everyone", "roles", "users"],
      users: [],
      roles: [],
      repliedUser: true,
    },
});

// Increasing Event Listener Size
client.setMaxListeners(0);
Events.defaultMaxListeners = 0;
process.env.UV_THREADPOOL_SIZE = OS.cpus().length;

// Exporting client
module.exports = client;

// Defining useful collection
client.slashCommands = new Collection();
client.legacyCommands = new Collection();
client.aliases = new Collection();
client.categories = fs.readdirSync("./Commands/LegacyCommands");
client.context = new Collection();
client.events = 0;

// Default color for your embed
client.color = 3092790;
// Your Bot's prefix
client.prefix = 't!';
// Default footer for your embed
client.footer = "Keeps it fun!";

// Connecting handlers
["SlashCommands_Handler", "LegacyCommands_Handler", "Event_Handler", "Error_Handler"].forEach(handler => {
  require(`./handlers/${handler}`)(client);
});

// Logging in Discord
if (!process.env.TOKEN) {
  console.log("[NO TOKEN] You did not provide any token. Make a .env file and add".green.bold,
  "TOKEN=YOUR TOKEN".red.bold,
  "in your.env file".green.bold);
  return;
}
client.login(process.env.TOKEN)
.catch(e => console.log(`[DISCORD API] ${e}`.green.bold))
