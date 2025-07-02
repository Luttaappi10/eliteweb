require('dotenv').config();
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const axios = require('axios');

const app = express();
app.use(cors());
app.use(bodyParser.json());
app.use(express.static('public')); // serve frontend

// Replace with your actual webhook
const DISCORD_WEBHOOK_URL = process.env.WEBHOOK_URL;

app.post('/submit', async (req, res) => {
  const { name, age, charName, experience, rules } = req.body;

  const payload = {
    embeds: [
      {
        title: "<a:pending1:1291107265155305587> WHITELIST APPLICATION",
        color: 0x5865F2,
        fields: [
          {
            name: "👤 Full Name",
            value: name || "N/A",
            inline: false
          },
          {
            name: "🎂 Age",
            value: age || "N/A",
            inline: false
          },
          {
            name: "🎮 In-Game Character Name",
            value: charName || "N/A",
            inline: false
          },
          {
            name: "📅 RP Experience",
            value: `${experience} years` || "N/A",
            inline: false
          },
          {
            name: "📖 Rules Read?",
            value: rules || "No",
            inline: false
          }
        ],
        timestamp: new Date()
      }
    ]
  };

  try {
    await axios.post(DISCORD_WEBHOOK_URL, payload);
    res.status(200).json({ success: true });
  } catch (err) {
    console.error("❌ Failed to send to Discord:", err);
    res.status(500).json({ error: "Failed to send to Discord" });
  }
});

app.listen(3000, () => {
  console.log("🚀 Server is running on http://localhost:3000");
});
