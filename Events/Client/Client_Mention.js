const client = require("../../index");
const {
  EmbedBuilder,
  ActionRowBuilder,
  ButtonBuilder,
  ButtonStyle,
} = require("discord.js");
const ms = require("ms");

client.on("messageCreate", async (message) => {
    
  // In case the author is a bot
  if (message.author.bot) return;

  // In case the user tries to dm the bot
  if (!message.guild || !message.guild.available)
    return message.reply("Message Commands are only supported in a Servers");

  const mentionRegex = RegExp(`^<@!?${client.user.id}>$`);
  if (message.content.match(mentionRegex)) {
    message
      .reply({
        embeds: [
          new EmbedBuilder()
            .setColor(client.color)
            .setAuthor({
              name: client.user.username,
              iconURL: client.user.displayAvatarURL(),
            })
            .setDescription(
              `Ayo, you called me? I'm ${client.user.username} Nice to meet you. Type \`/\` & click on my logo to see all my commands!\n\n*This message will be deleted in \`10 seconds\`!*`
            )
            .setThumbnail(client.user.displayAvatarURL())
            .setFooter({ text: client.footer })
            .setTimestamp(),
        ],

        components: [
          new ActionRowBuilder().addComponents(
            new ButtonBuilder()
              .setStyle(ButtonStyle.Link)
              .setURL("https://slang-ayo.up.railway.app/")
              .setLabel("Dashboard"),

            new ButtonBuilder()
              .setStyle(ButtonStyle.Link)
              .setURL("https://dsc.gg/slang-ayo-support")
              .setLabel("Support Server")
          ),
        ],
      })
      .then((msg) => {
        setTimeout(() => {
          msg.delete().catch((err) => {
            if (err.code !== 10008) return console.log(err);
          });
        }, ms("10s"));
      });
  }
});
