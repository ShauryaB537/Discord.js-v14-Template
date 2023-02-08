// PLEASE READ README.md BEFORE MAKING ANY CHANGES. JOIN THE SUPPORT SERVER FROM SUPPORT.md

const { EmbedBuilder } = require('discord.js');

/**
 * @param {Client} client
 */
module.exports = async (client) => {
	client.on('ready', () => {
		const ChannelID = client.config.error_channel_id;
		const Channel = client.channels.cache.get(ChannelID);

		// If there is no Channel id in config.json
		if (!Channel) {
			return console.log(
				'[ERROR_LOG] No channelID/Invalid id in config.json file'.green.bold,
			);
		}

		// Embed for the Discord log channel
		const Embed = new EmbedBuilder()
			.setColor(client.color)
			.setTimestamp()
			.setFooter({ text: 'Anti-crash handler' })
			.setTitle('⚠️ | Error Encountered');

		// Unhandled Rejection
		process.on('unhandledRejection', (err, promise) => {
			console.log(`[Unhandled Rejection]: ${err}\n`.green.bold, promise);

			Channel.send({
				embeds: [
					Embed.setDescription(
						'**Unhandled Rejection/Catch:\n\n** ```' + err + promise + '```',
					),
				],
			});
		});

		// Uncaught Exception
		process.on('uncaughtException', (err, origin) => {
			console.log(`[Uncaught Exception] ${err.message}`.green.bold);

			Channel.send({
				embeds: [
					Embed.setDescription(
						'**Uncaught Exception/Catch:\n\n** ```' +
							err +
							'\n\n' +
							origin.toString() +
							'```',
					),
				],
			});
		});

		// Warning
		process.on('warning', (warning) => {
			console.log(`[WARNING] ${warning}`.green.bold);

			Channel.send({
				embeds: [
					Embed.setDescription(
						'**Uncaught Exception/Catch:\n\n** ```' + warning,
						'```',
					),
				],
			});
		});

	});
};
