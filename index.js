const { Client, GatewayIntentBits } = require('discord.js');
const { joinVoiceChannel } = require('@discordjs/voice');
const express = require("express");

// 🔥 Servidor web pro Render
const app = express();

app.get("/", (req, res) => {
  res.send("Bot está online");
});

app.listen(process.env.PORT, () => {
  console.log("Servidor web ativo 🚀");
});

// 🔍 DEBUG das variáveis
console.log("TOKEN existe?", !!process.env.TOKEN);
console.log("GUILD_ID:", process.env.GUILD_ID);
console.log("VOICE_CHANNEL_ID:", process.env.VOICE_CHANNEL_ID);

const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildVoiceStates
  ]
});

// 🔥 Eventos de debug
client.on("ready", async () => {
  console.log(`🔥 BOT CONECTOU COMO ${client.user.tag} 🔥`);

  try {
    const guild = await client.guilds.fetch(process.env.GUILD_ID);
    const channel = await guild.channels.fetch(process.env.VOICE_CHANNEL_ID);

    joinVoiceChannel({
      channelId: channel.id,
      guildId: guild.id,
      adapterCreator: guild.voiceAdapterCreator,
      selfDeaf: false
    });

    console.log("🎧 Bot entrou na call 24/7");
  } catch (err) {
    console.error("ERRO AO ENTRAR NA CALL:", err);
  }
});

client.on("error", (err) => {
  console.error("ERRO NO CLIENT:", err);
});

client.on("shardError", (err) => {
  console.error("ERRO DE SHARD:", err);
});

console.log("Tentando logar no Discord...");
client.login(process.env.TOKEN)
  .then(() => console.log("Login enviado com sucesso"))
  .catch(err => console.error("ERRO AO LOGAR:", err));
