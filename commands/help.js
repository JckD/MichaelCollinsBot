const { prefix } = require('../config.json');

module.exports = {
    name : 'help',
    description : 'List of all of commands or info about a specific command.',
    aliases : ['commands', 'h'],
    usage : ['command name'],
    cooldown : 5,
    execute(message, args) {

        const data = [];
        const { commands } = message.client;

        if (!args.length) {

            data.push('Here\'s what I can do: ');
            data.push(commands.map(command => command.name).join(', '));
            data.push(`\nYou can send \`${prefix}help [command name]\` to get info on a specific command!`);

            return message.author.send(data, { split : true })
                .then(() => {
                    if (message.channel.type === 'dm') return;
                    message.reply('I\'ve snet you a DM with all my commands!');
                })
                .catch(error => {
                    console.error(`Could not seld help DM to ${message.author.tag}.\n`, error);
                    message.reply('It seems like I can\'t DM you! Do you have Dms disabled?');
                });
        }

        const name = args[0].toLowerCase();
        const command = commands.get(name) || commands.find(c => c.alilases && c.aliases.includes(name));

        if(!command) {
            return message.reply('that\'s not a valid command!');
        }

        data.push(`\nName: ${command.name}`);

        if (command.aliases) data.push(`Aliases: ${command.aliases.join(', ')}`);
        if(command.description) data.push(`Description: ${command.description}`);
        if(command.usage) data.push(`Usage: ${prefix}${command.name} ${command.usage}`);

        data.push(`Cooldown: ${command.cooldown || 3} seconds(s)`);

        message.channel.send(data, { split : true });
    },
};