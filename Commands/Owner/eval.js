// PLEASE READ README.md BEFORE MAKING ANY CHANGES. JOIN THE SUPPORT SERVER FROM SUPPORT.md

const { ApplicationCommandOptionType, EmbedBuilder, PermissionFlagsBits, ApplicationCommandType } = require('discord.js');
const { inspect } = require('util');

module.exports = {
	name: 'eval',
	description: 'Evaluate some code [Dev Only]',
	type: ApplicationCommandType.ChatInput,
	botPerms: [PermissionFlagsBits.Administrator],
	devOnly: true,
	maintenance: false,
	options: [
		{
			name: 'code',
			description: 'Code to execute',
			type: ApplicationCommandOptionType.String,
			required: true,
		},
	],

	async execute(client, interaction) {
		const code = interaction.options.get('code').value;

		try {
			const result = await eval(code);
			if (result === process.env.TOKEN) return;
			if (result === process.env.CLIENT_SECRET) return;
			if (result === process.env.MONGODBURL) return;
			let output = result;
			if (typeof result !== 'string') {
				output = inspect(result);
			}
			interaction.reply({
				embeds: [
					new EmbedBuilder()
						.setAuthor({ name: 'Output:' })
						.setDescription('```js\n' + output + '\n```')
						.setColor('GREEN')
						.setFooter({ text: client.footer })
						.setTimestamp(),
				],
				ephemeral: true,
			});
			console.log(`Eval Command done by ${interaction.user.tag}\n`.red.bold);
		}
		catch (e) {
			interaction.reply({
				embeds: [
					new EmbedBuilder()
						.setAuthor({ name: 'Error!' })
						.setDescription('An error occured! Check console...')
						.setColor('Red')
						.setFooter({ text: client.footer })
						.setTimestamp(),
				],
				ephemeral: true,
			});
			console.log(`Eval Command done by ${interaction.user.tag}\n`.red.bold + e);
		}
	},
};
