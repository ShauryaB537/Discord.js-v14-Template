const { Client, EmbedBuilder } = require("discord.js");
const ChannelID = process.env.ERROR_LOGS;

/**
 * @param {Client} client
 */
module.exports = async (client) => {
  // Embed for the Discord log channel
  const Embed = new EmbedBuilder()
    .setColor(client.color)
    .setTimestamp()
    .setFooter({ text: "Anti-crash handler" })
    .setTitle("⚠️ | Error Encountered");

  // Unhandled Rejection
  process.on("unhandledRejection", (err) => {
    console.log(`[Unhandled Rejection]: ${err}`.green.bold);

    const Channel = client.channels.cache.get(ChannelID);
    if (!Channel)
      return console.log(`[ERROR_LOG] No channelID in .env file`.green.bold);

    Channel.send({
      embeds: [
        Embed.setDescription(
          "**Unhandled Rejection/Catch:\n\n** ```" + err + "```"
        ),
      ],
    });
  });

  // Uncaught Exception
  process.on("uncaughtException", (err, origin) => {
    console.log(`[Uncaught Exception] ${err.message}`.green.bold);

    const Channel = client.channels.cache.get(ChannelID);
    if (!Channel)
      return console.log(`[ERROR_LOG] No channelID in .env file`.green.bold);

    Channel.send({
      embeds: [
        Embed.setDescription(
          "**Uncaught Exception/Catch:\n\n** ```" +
            err +
            "\n\n" +
            origin.toString() +
            "```"
        ),
      ],
    });
  });
};
