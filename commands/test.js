module.exports = {
    name: 'test',
    run(client, message, args) {
        message.channel.send('член');
        return true;
    }
}