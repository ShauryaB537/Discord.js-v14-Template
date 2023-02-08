// PLEASE READ README.md BEFORE MAKING ANY CHANGES. JOIN THE SUPPORT SERVER FROM SUPPORT.md

const CommandArray = [];
const { readdirSync } = require('fs');
const { ApplicationCommandType } = require('discord.js');

module.exports = (client) => {
	readdirSync('./Commands').forEach((dir) => {
		const commands = readdirSync(`./Commands/${dir}/`).filter((file) =>
			file.endsWith('.js'),
		);
		for (const file of commands) {
			// Defined the command files
			const command = require(`../../Commands/${dir}/${file}`);
			if (command.name) {
				if (
					[
						ApplicationCommandType.Message,
						ApplicationCommandType.User,
					].includes(command.type)
				) {
					client.context.set(command.name, command);
				}
				else {
					client.commands.set(command.name, command);
				}
				CommandArray.push(command);
			}
			else {
				continue;
			}
		}
	});

	// Setting the Slash Commands
	client.on('ready', () => {
		if (client.config.delete_commands === false) {
			if (client.config.global === true) {
				client.application.commands.set(CommandArray);
			}
			else if (client.config.global === false) {
				client.guilds.cache
					.get(client.config.dev_guild_id)
					?.commands.set(CommandArray);
			}
		}
		// Deleting Slash Commands
		else if (client.config.delete_commands === true) {
			client.application.commands.set([]);
			client.guilds.cache.get(client.config.dev_guild_id)?.commands.set([]);
		}
	});
};
