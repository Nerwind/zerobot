// реквайре))) \\

const { readdirSync } = require('fs'),
{ Client, Collection } = require('discord.js'),
client = new Client();

// загрузка команд и ивентов \\

client.commands = new Collection();

for (let cmd of readdirSync('./commands')) {
    const command = require(`./commands/${cmd}`);
    client.commands.set(command.name, command);
}

for (let evt of readdirSync('./events')) {
    const event = require(`./events/${evt}`);
    client.on(event.name, (...params) => event.run(...params, client));
}

// а вот хуй тебе а не токен \\

client.login(require('./config.json').token);