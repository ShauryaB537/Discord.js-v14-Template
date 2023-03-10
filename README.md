# Introduction

Hello! I am Shaurya Bansal. I live in India. I am a programmer and a web developer. Feel free to use my djs template to get a head start. `My Discord tag - fin#6856`

# Discord.js v14 Template

A basic Discord.js v14 template to get your started.

## Startup

- Create a file named `.env`.
- An example has been created `example.env`.
- Enter the following details to it:

```
TOKEN=YOUR TOKEN
MONGODBURL=YOUR MONGODB URL [Only required for commands which requires some data to store]
```

- Save the file.
- Go to `config.json` and enter the following details to it:
```
{
	"prefix": "s!",
  "global": true,
  "delete_commands": false,
  "dev_guild_id": "1059888290104348792",
  "dev_id": ["657592248224972811"],
  "client_id": "1067822298641473556",
  "error_channel_id": "1037603640506056704"
}
```
- Set `prefix` as your message command prefix.
- Set `global` true if you want the commands to be in all the guilds and set it to false if you want the commands to be just in a single guild i.e. `dev_guild_id`.
- Set `delete_commands` as true only when you want to delete all you commands from a single guild or globally.
- Set `dev_guild_id` as your developer server's id.
- `dev_id` is an array. Provide all the ids of your bot devs. NOTE: THE DEVS HAVE ACCESS TO EVAL COMMANDS.
- Set `client_id` as your bot's id.
- Set `error_channel_id` as the id of the channel where you want the error logs of your bot.


After doing this open `Setup` folder
- First run `install.bat`
- After that go forward and run `start.bat`

Congrats!! Your bot should be online now.

## Configuration

- You can change your default embed color by changing

```
client.color="Your Color";
```

in `./index.js` line 48.

- You can change your default footer by changing

```
client.footer="Your footer";
```

in `./index.js` line 51.

## Template's Features

The template is very easy to use and is beginner friendly. This template supports slash commands and message commansds. It has a cool console. It also has cooldown features. Error handler to send the errors to a discord channel. It sends an embed on mentioning the bot. It also sends an embed on joining a server. You can set the necessary permissions for the with `botPerms` and also set the required user perms with `userPerms`. You can also set the commands as developer only with `devOnly` and also set it on maintenance with `maintenance`. I have also added a linter i.e. `eslint`. You can check the rules `./.eslintrc.json`. These are the rules suggested in the djs guide.

## Slash Command Example
```
const {
	ApplicationCommandType,
	PermissionFlagsBits,
} = require('discord.js');

module.exports = {
	name: 'command',
	description: 'Command Example',
	cooldown: 3,
	type: ApplicationCommandType.ChatInput,
	botPerms: [PermissionFlagsBits.SendMessages, PermissionFlagsBits.EmbedLinks],
	userPerms: [PermissionFlagsBits.SendMessages, PermissionFlagsBits.EmbedLinks],
	devOnly: false,
	maintenance: false,

	async execute(client, interaction) {
		interaction.reply({ content: "This a command example" })
	},
};
```

## Message Command Example
```
const { EmbedBuilder } = require('discord.js');
const ms = require('ms');

module.exports = {
	name: 'command',
	description: 'Command Example',
	usage: 's!command',
	aliases: ['latency'],
	cooldown: 3,
	async execute(client, message) {
		message.channel.send({ content: "This a command example" });
	},
};
```

## Next Version's Features

- I am going to add a ton of features in the next version like
- Automatic cooldown delete
- and much more. So stay tuned!

## Suggested Extentions for VSC

- Prettier ESLint
- ESLint
- Discord Rich Presence

## Credits

- FiredragonPlayz#0087
- Elitex#0007

# Thank you for using the template. Don't forget to star this repo!

In case of any bug, please open a pull request.
