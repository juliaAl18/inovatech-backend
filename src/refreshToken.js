const dotenv = require('dotenv');
const axios = require('axios');

dotenv.config();

const refreshToken = async () => {
    const token = process.env.ACCESS_TOKEN;
    const apiInstagram = 'https://graph.instagram.com';

    try {
        const response = await axios.get(`${apiInstagram}/refresh_access_token?grant_type=ig_refresh_token&access_token=${token}`);
        if (response.status === 200) {
            console.log('Refresh do token realizado com sucesso');
        } else {
            console.log('Falha ao realizar o refresh do token');
        }
    } catch (error) {
        console.error('Erro ao tentar atualizar o token:', error.message);
    }
}

module.exports = {
    refreshToken
};
