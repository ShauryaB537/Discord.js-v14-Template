// PLEASE READ README.md BEFORE MAKING ANY CHANGES. JOIN THE SUPPORT SERVER FROM SUPPORT.md

const { readdirSync } = require('fs');

module.exports = (client) => {
	readdirSync('./Commands/MessageCommands').forEach((dir) => {
		const commands = readdirSync(`./Commands/MessageCommands/${dir}/`).filter(
			(file) => file.endsWith('.js'),
		);
		for (const file of commands) {
			const pull = require(`../../Commands/MessageCommands/${dir}/${file}`);
			if (pull.name) {
				client.messageCommands.set(pull.name, pull);
			}
			else {
				continue;
			}
			if (pull.aliases && Array.isArray(pull.aliases)) {pull.aliases.forEach((alias) => client.aliases.set(alias, pull.name));}
		}
	});
};
