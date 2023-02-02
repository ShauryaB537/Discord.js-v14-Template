const client = require("../../index");
const {
  EmbedBuilder,
  ActionRowBuilder,
  ButtonBuilder,
  ButtonStyle,
  ChannelType,
} = require("discord.js");

client.on("guildCreate", async (guild) => {
  const { name, members, channels } = guild;

  let channelToSend;

  channels.cache.forEach((channel) => {
    if (
      channel.type === ChannelType.GuildText &&
      !channelToSend &&
      channel.permissionsFor(members.me).has("SendMessages")
    )
      channelToSend = channel;
  });

  if (!channelToSend) return;

  const Embed = new EmbedBuilder()
    .setColor(client.color)
    .setAuthor({ name: name, iconURL: guild.iconURL() })
    .setDescription(
      `Ayo!, this is **${client.user.username}**! Thanks for inviting me to your server!`
    )
    .setFooter({ text: client.footer })
    .setTimestamp();

  const Row = new ActionRowBuilder().addComponents(
    new ButtonBuilder()
      .setStyle(ButtonStyle.Link)
      .setURL("https://slang-ayo.up.railway.app/")
      .setLabel("Dashboard"),

    new ButtonBuilder()
      .setStyle(ButtonStyle.Link)
      .setURL("https://dsc.gg/slang-ayo-support")
      .setLabel("Support Server")
  );

  channelToSend.send({ embeds: [Embed], components: [Row] });
});
