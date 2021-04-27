const { MessageEmbed } = require('discord.js');

const get = require('node-fetch');

module.exports = {
    name: 'level',
    aliases: ['lvl', 'l'],
    async run(client, message, args) {
        const lev = args.join(' ');
        if (!lev) return 'еблан где название или айди хоть';
        const l = await get('http://cafeed.ddns.net/zeroserver/api/levels'),
        u = await get('http://cafeed.ddns.net/zeroserver/api/users'),
        s = await get('http://cafeed.ddns.net/zeroserver/api/songs'),
        l2 = await l.json(),
        u2 = await u.json(),
        s2 = await s.json();

        const level = l2.find(x => x.levelName == lev || x.levelID == lev);
        
        if (!level) return 'дурачок ты, нет такого лвла';
        
        const user = u2.find(x => x.accountID == level.accountID),
        song = s2.value.find(x => x.songID == level.songID);
        const { levelName, levelID, accountID, downloads, likes, starStars } = level,
        { userName } = user,
        { authorName, name, songID } = song;

        const embed = new MessageEmbed({
            title: `${levelName}`, color: 'RED', fields: [
                {
                    name: 'Инфа', value: `**Название:** ${levelName}\t**Айди:** ${levelID}\n**Автор:** ${userName}\n**Загрузок:** ${downloads}\t**Лайков:** ${likes}\n**Звёзд:** ${starStars}\n**Музыка:** ${authorName} - ${name} (айди: ${songID})`
                }
            ]
        });
        message.channel.send(embed);
        return true;
    }
}