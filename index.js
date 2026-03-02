const { Client, GatewayIntentBits } = require('discord.js');
const { joinVoiceChannel } = require('@discordjs/voice');
const express = require("express");

const app = express();

// 🔥 Servidor fake só pra satisfazer o Render
app.get("/", (req, res) => {
  res.send("Bot está online!");
});

app.listen(process.env.PORT, () => {
  console.log("Servidor web ativo 🚀");
});

const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildVoiceStates
  ]
});

const GUILD_ID = process.env.GUILD_ID;
const VOICE_CHANNEL_ID = process.env.VOICE_CHANNEL_ID;
const TOKEN = process.env.TOKEN;

client.once('ready', async () => {
  console.log(`Logado como ${client.user.tag} ✅`);

  const guild = await client.guilds.fetch(GUILD_ID);
  const channel = await guild.channels.fetch(VOICE_CHANNEL_ID);

  joinVoiceChannel({
    channelId: channel.id,
    guildId: guild.id,
    adapterCreator: guild.voiceAdapterCreator,
    selfDeaf: false
  });

  console.log('Bot entrou na call 24/7 🎧');
});

client.login(TOKEN);
