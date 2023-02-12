// PLEASE READ README.md BEFORE MAKING ANY CHANGES. JOIN THE SUPPORT SERVER FROM SUPPORT.md

// Initialising Client
const client = require('../../Structures/index');
// PREFIX
const Prefix = client.config.prefix;
// --==--==--==--==--==--==--==
const { EmbedBuilder, Collection, PermissionsBitField } = require('discord.js');
const cooldowns = new Map();
const ms = require('ms');

client.on('messageCreate', async (message) => {
	// In case the author is a bot
	if (message.author.bot) return;

	// In case the user tries to dm the bot
	if (!message.guild || !message.guild.available) {
		return message.reply('Message Commands are only supported in a Servers');
	}

	// Checking if the user used PREFIX
	if (message.content.startsWith(Prefix)) {
		if (!message.member) {
			message.member = await message.guild.members.fetch(message.author.id);
		}
		const args = message.content.slice(Prefix.length).trim().split(/ +/g);
		const cmd = args.shift().toLowerCase();
		if (cmd.length == 0) return;
		let command = client.messageCommands.get(cmd);
		if (!command) command = client.messageCommands.get(client.aliases.get(cmd));

		if (command) {
			// Registering command in map to get cooldowns
			if (!cooldowns.has(command.name)) {
				cooldowns.set(command.name, new Collection());
			}

			const current_time = Date.now();
			const time_stamps = cooldowns.get(command.name);
			const cooldown_amount = command.cooldown * 1000;

			// If time_stamps has a key with the author's id then check the expiration time to send a message to a user.
			if (time_stamps.has(message.author.id)) {
				const expiration_time =
					time_stamps.get(message.author.id) + cooldown_amount;

				if (current_time < expiration_time) {
					const time_left = expiration_time - current_time;

					return message.channel.send({
						embeds: [
							new EmbedBuilder()
								.setDescription(
									`**You are on a cooldown of \`${ms(
										cooldown_amount,
									)}\`.\n\nCooldown Ends: <t:${(
										(Date.now() + time_left) /
										1000
									).toFixed(0)}:R>**`,
								)
								.setColor(client.color)
								.setFooter({ text: client.footer })
								.setTimestamp(),
						],
					});
				}
			}

			// If the author's id is not in time_stamps then add them with the current time.
			time_stamps.set(message.author.id, current_time);
			// Delete the user's id once the cooldown is over.
			setTimeout(() => time_stamps.delete(message.author.id), cooldown_amount);
		}

		// Basic Permission Check
		if (command) {
			if (
				!message.channel
					.permissionsFor(message.guild.members.me)
					.has(PermissionsBitField.Flags.SendMessages)
			) {
				message.author
					.send({
						embeds: [
							new EmbedBuilder()
								.setDescription(
									'I don\'t have `SEND_MESSAGE` Permission in that Channel',
								)
								.setColor('DarkRed')
								.setFooter({ text: client.footer })
								.setTimestamp(),
						],
					})
					.catch(() => null);
				return;
			}
			if (
				!message.channel
					.permissionsFor(message.guild.members.me)
					.has(PermissionsBitField.Flags.EmbedLinks)
			) {
				return message.channel.send(
					`\`\`\`
                I don't have \`SEND_EMBED_LINKS\` Permission in this Channel
                \`\`\``,
				);
			}
			if (
				!message.channel
					.permissionsFor(message.guild.members.me)
					.has(PermissionsBitField.Flags.ReadMessageHistory)
			) {
				return message.channel.send({
					embeds: [
						new EmbedBuilder()
							.setDescription(
								'I don\'t have `READ_MESSAGE_HISTORY` Permission in this Channel',
							)
							.setColor('DarkRed')
							.setFooter({ text: client.footer })
							.setTimestamp(),
					],
				});
			}
			if (
				!message.channel
					.permissionsFor(message.guild.members.me)
					.has(PermissionsBitField.Flags.UseExternalEmojis)
			) {
				return message.channel.send({
					embeds: [
						new EmbedBuilder()
							.setDescription(
								'I don\'t have `USE_EXTERNAL_EMOJIS` Permission in this Channel',
							)
							.setColor('DarkRed')
							.setFooter({ text: client.footer })
							.setTimestamp(),
					],
				});
			}
			command.execute(client, message, args);
		}
	}
});
