let slash = [];
let a = 0;
let c = 0;
let e = 0;
const { readdirSync } = require("fs");
const { ApplicationCommandType } = require('discord.js');

module.exports = (client) => {
    readdirSync(`./Commands/SlashCommands`).forEach(dir => {
        const commands = readdirSync(`./Commands/SlashCommands/${dir}/`).filter(file => file.endsWith(".js"));
        for (let file of commands) {
            let pull = require(`../Commands/SlashCommands/${dir}/${file}`);
            if (pull.name) {
                if ([ApplicationCommandType.Message, ApplicationCommandType.User].includes(pull.type)){
                    client.context.set(pull.name, pull)
                    a++
                } else {
                    client.slashCommands.set(pull.name, pull);
                    c++
                }
                slash.push(pull);
            } else {
                e++;
                continue;
            };
            
            
        };
    });

    // To set an empty Slash Command
    const EmptyArray = [];

    // Setting the Slash Commands
    client.on("ready", () => {
        client.application.commands.set(slash); // Replace `slash` with `EmptyArray` to set no Slash Commands
      });
};