const { EmbedBuilder } = require('discord.js');
const ms = require('ms');

module.exports = {
	name: 'ping',
	description: 'Ping of the Bot',
	usage: '?ping',
	aliases: ['latency'],
	cooldown: 3,
	async execute(client, message) {
		message.channel.send({
			embeds: [
				new EmbedBuilder()
					.setTitle('Calculating Ping...')
					.setDescription(
						`**⏱️ WS Ping : \`${client.ws.ping} MS\`\n\n⏳ Latency : \`${
							Date.now() - message.createdTimestamp - 50
						} MS\`\n\n⚙️ Uptime : ${ms(client.uptime)}**`,
					)
					.setColor(client.color)
					.setFooter({ text: client.footer })
					.setTimestamp(),
			],
			content: '**🏓 Pong!**',
		});
	},
};
