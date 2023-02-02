const {
  ApplicationCommandType,
  EmbedBuilder,
  PermissionFlagsBits,
} = require("discord.js");
const ms = require("ms");

module.exports = {
  name: "ping",
  description: "Ping of the Bot",
  cooldown: 3,
  type: ApplicationCommandType.ChatInput,
  BotPerms: [PermissionFlagsBits.SendMessages, PermissionFlagsBits.EmbedLinks],
  ownerOnly: false,
  maintenance: false,
  async execute(client, interaction, args) {
    interaction.reply({
      embeds: [
        new EmbedBuilder()
          .setTitle(`Calculating Ping...`)
          .setDescription(
            `**⏱️ WS Ping : \`${client.ws.ping} MS\`\n\n⏳ Latency : \`${
              Date.now() - interaction.createdTimestamp - 50
            } MS\`\n\n⚙️ Uptime : ${ms(client.uptime)}**`
          )
          .setColor(client.color)
          .setFooter({ text: client.footer })
          .setTimestamp(),
      ],
      content: `**🏓 Pong!**`,
    });
  },
};
