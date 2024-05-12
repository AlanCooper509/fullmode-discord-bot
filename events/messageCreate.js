const { Events } = require('discord.js');

module.exports = {
	name: Events.MessageCreate,
	async execute(message) {
        if (message.content == '' || message.author.bot) return;
        console.log(message);
    }
};