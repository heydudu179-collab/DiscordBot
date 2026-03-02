const { Client, GatewayIntentBits } = require("discord.js");
const express = require("express");

// ===== SERVIDOR WEB (Render precisa disso) =====
const app = express();

app.get("/", (req, res) => {
  res.send("Bot está rodando 🚀");
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log("Servidor web ativo 🚀");
});

// ===== DISCORD CLIENT =====
const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent,
    GatewayIntentBits.GuildMembers,
    GatewayIntentBits.GuildVoiceStates
  ]
});

// ===== READY =====
client.once("ready", () => {
  console.log(`✅ Bot ONLINE como ${client.user.tag}`);
});

// ===== ERRO GLOBAL =====
process.on("unhandledRejection", error => {
  console.error("Erro não tratado:", error);
});

// ===== LOGIN =====
client.login(process.env.TOKEN)
  .then(() => console.log("Login enviado pro Discord"))
  .catch(err => console.error("❌ Erro no login:", err));
