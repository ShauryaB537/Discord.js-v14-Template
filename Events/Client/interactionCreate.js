const client = require("../../index");
const { EmbedBuilder, InteractionType, Collection } = require(`discord.js`);
const owners_file = require("../../Storage/owners.json");
const cooldowns = new Map();
const ms = require("ms");

client.on("interactionCreate", async (interaction) => {
  const { user, guild, member, type } = interaction;

  if (!guild || user.bot) return;
  if (type !== InteractionType.ApplicationCommand) return;

  // Checking if command exists
  if (interaction.isContextMenuCommand()) {
    const command = client.context.get(interaction.commandName);
    if (command) command.execute(client, interaction);
    else {
      interaction.reply({
        embeds: [
          new EmbedBuilder()
            .setTitle("Deprecated Menu Command")
            .setDescription("❌ | I am pretty tired rn. Try again later!")
            .setFooter({ text: client.footer })
            .setTimestamp(),
        ],
        ephemeral: true,
      });
      await client.application.commands.delete(command);
    }
    return;
  }

  //Return if command does not exists
  if (!interaction.isChatInputCommand()) return;

  const cmd = client.slashCommands.get(interaction.commandName);

  // If command does not exists
  if (!cmd) {
    interaction.reply({
      embeds: [
        new EmbedBuilder()
          .setTitle("Deprecated Menu Command")
          .setDescription("❌ | I am pretty tired rn. Try again later!")
          .setFooter({ text: client.footer })
          .setTimestamp(),
      ],
      ephemeral: true,
    });
    await client.application.commands.delete(cmd);
    return;
  }

  //Check User Permissions (UserPerms)
  if (cmd.UserPerms && cmd.UserPerms.length !== 0) {
    if (!member.permissions.has(cmd.UserPerms))
      return interaction.reply({
        embeds: [
          new EmbedBuilder()
            .setTitle("Invalid Perms")
            .setDescription(
              `❌ | You need \`${cmd.UserPerms.join(
                ", "
              )}\` permission(s) to execute this command!`
            )
            .setFooter({ text: client.footer })
            .setTimestamp(),
        ],
        ephemeral: true,
      });
  }

  //Check Bot Permissions (BotPerms)
  if (cmd.BotPerms && cmd.BotPerms.length !== 0) {
    if (!member.permissions.has(cmd.BotPerms))
      return interaction.reply({
        embeds: [
          new EmbedBuilder()
            .setTitle("Invalid Perms")
            .setDescription(
              `❌ | I need \`${cmd.BotPerms.join(
                ", "
              )}\` permission(s) to execute this command!`
            )
            .setFooter({ text: client.footer })
            .setTimestamp(),
        ],
        ephemeral: true,
      });
  }

  // Under Maintenance Commands (maintenance)
  if (cmd.maintenance) {
    if (!owners_file.owners.includes(interaction.user.id)) {
      return interaction.reply({
        embeds: [
          new EmbedBuilder()
            .setTitle("Maintenance")
            .setDescription(
              "❌ | This command is on maintenance please try later, Thank you!"
            )
            .setFooter({ text: client.footer })
            .setTimestamp(),
        ],
        ephemeral: true,
      });
    }
  }

  //Owner Only Command (ownerOnly)
  if (cmd.ownerOnly) {
    if (!owners_file.owners.includes(interaction.user.id)) {
      return interaction.reply({
        embeds: [
          new EmbedBuilder()
            .setTitle("Owner Only Command")
            .setDescription(
              "❌ | Only the Bot Developers are allowed to run this command!"
            )
            .setFooter({ text: client.footer })
            .setTimestamp(),
        ],
        ephemeral: true,
      });
    }
  }

  // COOLDOWN
  const command = cmd;
  if (command) {
    // Registering command in map to get cooldowns
    if (!cooldowns.has(command.name)) {
      cooldowns.set(command.name, new Collection());
    }

    const current_time = Date.now();
    const time_stamps = cooldowns.get(command.name);
    const cooldown_amount = command.cooldown * 1000;

    // If time_stamps has a key with the author's id then check the expiration time to send a message to a user.
    if (time_stamps.has(interaction.user.id)) {
      const expiration_time =
        time_stamps.get(interaction.user.id) + cooldown_amount;

      if (current_time < expiration_time) {
        const time_left = expiration_time - current_time;

        return interaction.reply({
          embeds: [
            new EmbedBuilder()
              .setDescription(
                `**You are on a cooldown of \`${ms(
                  cooldown_amount
                )}\`.\n\nCooldown Ends: <t:${(
                  (Date.now() + time_left) /
                  1000
                ).toFixed(0)}:R>**`
              )
              .setColor(interaction.guild.members.me.displayHexColor)
              .setFooter({ text: client.footer })
              .setTimestamp(),
          ],
          ephemeral: true,
        });
      }
    }

    // If the author's id is not in time_stamps then add them with the current time.
    time_stamps.set(interaction.user.id, current_time);
    // Delete the user's id once the cooldown is over.
    setTimeout(() => time_stamps.delete(interaction.user.id), cooldown_amount);
    //setTimeout(() => interaction.channel.messages.delete(message), cooldown_amount); [THIS IS KINDA BUGGED. WILL TRY TO FIX THIS IN THE NEXT VERSION.]
  }

  const args = [];

  for (let option of interaction.options.data) {
    if (option.type == 1) {
      if (option.name) args.push(option.name);
      option.options?.forEach((x) => {
        if (x.value) args.push(x.value);
      });
    } else if (option.type == 2) {
      if (option.name) args.push(option.name);
      option.options?.forEach((x) => {
        if (x.type == 1) {
          if (x.name) args.push(x.name);
          x.options?.forEach((i) => {
            if (i.value) args.push(i.value);
          });
        }
      });
    } else {
      if (option.value) args.push(option.value);
    }
  }

  if (!interaction.member) {
    interaction.member = await interaction.guild.members.fetch(
      interaction.user.id
    );
  }

  cmd.execute(client, interaction, args);
});
