const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');

dotenv.config();

const app = express();
app.use(cors());

const port = 3000;
const token = process.env.ACCESS_TOKEN;
const apiInstagram = 'https://graph.instagram.com';

app.get('/', (req, res) => {
  res.send('Bem vindo!');
});

app.get('/feed-rss', (req, res) => {

});

app.listen(port, () => {
    console.log(`App rodando na porta ${port}`);
});