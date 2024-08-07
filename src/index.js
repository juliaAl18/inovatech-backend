const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const axios = require('axios');
const { refreshToken } = require('./refreshToken');
const cron = require('node-cron');

dotenv.config();

// Serviço agendado que faz o refresh do token diariamente:
cron.schedule('0 0 * * *', async () => {
  console.log('Executando a função que faz o refresh do access token...');
  await refreshToken();
}, {
  scheduled: true,
  timezone: "America/Sao_Paulo"
});

const app = express();
app.use(cors());
app.use(express.json());

const port = 3000;

app.get('/', (req, res) => {
  return res.json({ data: { msg: 'Bem vindo!' }});
});

app.get('/feed-rss', async (req, res) => {
  const token = process.env.ACCESS_TOKEN;
  const apiInstagram = 'https://graph.instagram.com';
  let posts = [];

  try {
    const response = await axios.get(`${apiInstagram}/me/media?access_token=${token}&fields=media_url,media_type,caption,permalink`).then((response) => response.data);
    posts = response.data;
  } catch (error) {
    console.error('Error fetching Instagram posts:', error);
    return res.status(500).json({ data: { error: 'Error fetching Instagram posts' }});
  }

  if (posts.length === 0) {
    return res.status(204).json({ data: { msg: 'Não foram encontrados posts!' }});
  } else {
    return res.json({data: posts});
  }
});

app.listen(port, () => {
  console.log(`App rodando na porta ${port}`);
});
