const { MessageEmbed } = require('discord.js');
const get = require('node-fetch');

module.exports = {
    name: 'top',
    aliases: ['scores', 't', 'sc'],
    args: false,
    desc: 'Топ игроков на ZeroServer\'е (для просмотра топа креаторов напишите "creators" в первом аргументе)',
    usage: '[creators]',
    async run(client, message, args) {
        let t;
        if (args[0] == 'creators') t = await get('http://cafeed.ddns.net/zeroserver/api/scores/creators');
        else t = await get('http://cafeed.ddns.net/zeroserver/api/scores/global');
        const top = await t.json();

        const o = new Map();
        top.forEach((x, i) => {
            o.set(i + 1, x.userName);
        });

        const embed = new MessageEmbed({
            title: `Топ ${args[0] == 'creators' ? 'креаторов' : 'игроков'}`, color: 'BLUE'
        });

        o.forEach((x, p) => {
            embed.addField(p, x);
        });

        message.channel.send(embed);
        return true;
    }
}