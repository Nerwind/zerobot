const { Message, Client, MessageEmbed } = require('discord.js');

module.exports = {
    name: 'message',

    /**
     * Message event
     * @param {Message} message 
     * @param {Client} client 
     */
    run(message, client) {
        if (!message.guild || message.author.bot || !message.content.startsWith('.')) return;

        const args = message.content.slice(1).trim().split(' '),
        commandName = args.shift(),
        command = client.commands.get(commandName) || client.commands.find(c => c.aliases && c.aliases.includes(commandName));
        let result = command.run(client, message, args);
        if (result !== true) {
            const embed = new MessageEmbed({
                title: 'АШЫПКА АШЫПКА АШЫПКААААА', color: 'RED', description: `ВНЕМАНИЕ АШЫПКА ТРЕВОГА\n${result}`, footer: {
                    text: 'ZeroBot by nerwind93'
                }
            });
            message.channel.send(embed);
        }
    }
}