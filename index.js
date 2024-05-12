// Require the necessary discord.js classes
const { Client, GatewayIntentBits } = require('discord.js');
const fs = require('node:fs');
require('dotenv').config()

// Create a new client instance
const client = new Client({
    intents: [
        GatewayIntentBits.Guilds,
		GatewayIntentBits.GuildMessages,
		GatewayIntentBits.MessageContent,
    ]
});

// Contants
const eventsPath = "./events";

// Load the Event Listeners
fs.readdir(eventsPath, (err, eventFiles) => {
    eventFiles.forEach((file) => {
        const event = require(`./events/${file}`);
        if (event.once) {
            client.once(event.name, (...args) => event.execute(...args));
        } else {
            client.on(event.name, (...args) => event.execute(...args));
        }
    });
});

client.login(process.env.DISCORD_TOKEN);

// ===============================================
// Everything below here is temporary calling code
// (for initial testing purposes only)
// ===============================================

sendMessage = require('./actions/sendMessage');
giveRole = require('./actions/giveRole');

const USERS = {
    "selrg": '193142397142695936',
    "purewasian": '325047531576754186'
}

// const USER_ID = USERS.purewasian;
const USER_ID = USERS.selrg;
const GUILD_ID = '1215081626527342613';   // Dummy Server
const CHANNEL_ID = '1215081627017936999'; // Dummy Server: #general channel
const ROLE_ID = '1219759540556529664';    // "Test" role for Dummy Server

async function test() {
    const guild = await client.guilds.fetch(GUILD_ID);
    const user = await guild.members.fetch(USER_ID);
    const channel = await client.channels.fetch(CHANNEL_ID);
    const role = guild.roles.cache.get(ROLE_ID);    

    // uncomment any of the functions below to test "actions"

    // sendMessage.toUser(user, 'this is a secret message do not share');
    // sendMessage.toChannel(channel, '**bold and brash**');
    // giveRole.toUser(user, role);
}

test();