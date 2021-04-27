const { MessageEmbed } = require('discord.js'),
get = require('node-fetch');

module.exports = {
    name: 'user',
    aliases: ['u'],
    async run(client, message, args) {
        let name = args.join(' ');
        if (!name) return 'а где.';
        const u = await get('http://cafeed.ddns.net/zeroserver/api/users'),
        u2 = await u.json(),
        user = u2.find(x => x.userName == name || x.accountID == name);
        if (!user) return 'дурачок такого юзера нет';
        const { userName, accountID, coins, userCoins, stars, diamonds, orbs, demons, creatorPoints, youtube } = user;

        const embed = new MessageEmbed({
            title: userName, color: 'RED', fields: [
                {
                    name: 'Инфа о пользователе', value: `**Имя:** ${userName}\t**Айди:** ${accountID}\n**Пройдено демонов:** ${demons}\t**Звёзд:** ${stars}\n**Монеток:** ${coins}\t**Пользовательских монеток:** ${userCoins}\n**Алмазов:** ${diamonds || 0}\t**Орбов:** ${orbs || 0}\n**Креатор поинтов:** ${creatorPoints}${youtube ? `\t**Ссылка на ютуб:** [тык](https://www.youtube.com/channel/${youtube})` : ''}`
                }
            ]
        });
        message.channel.send(embed);
        return true;
    }
}