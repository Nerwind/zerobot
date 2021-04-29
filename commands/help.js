const { MessageEmbed } = require("discord.js");

module.exports = {
    name: 'help',
    aliases: ['h'],
    hide: true,
    run(client, message, args) {
        const command = args[0];
        let sent = false;

        let embed1 = new MessageEmbed({
            title: 'Команды', color: 'GREEN', footer: {
                text: 'Для помощи по конкретной команде укажите название команды в аргументах',
                iconURL: client.user.displayAvatarURL()
            }
        }),
        embed2;
        for (let c of client.commands.array()) {
            if (c.hide) continue;
            if (command && command == c.name) {
                embed2 = new MessageEmbed({
                    title: `Помощь по команде ${command}`, color: 'GREEN', description: `**Описание:** ${c.desc}\n**Агументы:** ${c.args ? 'обязательны' : 'необязательны'}${c.aliases ? `\n**Алиасы:** ${c.aliases.join(', ')}` : ''}\n**Использование:** \`\`\`.${command} ${c.usage}\`\`\``
                });
                sent = true;
                break;
            } else if (!command || command != c.name) {
                embed1.addField(c.name, c.desc, true);
            }
        }

        if (!sent) {
            message.channel.send(embed1);
        } else {
            message.channel.send(embed2);
        }
        return true;
    }
}