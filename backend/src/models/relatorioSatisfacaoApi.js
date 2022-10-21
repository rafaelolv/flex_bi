import avaliacoes from './../dadosSimulados/avaliacoes';

const API = {};

API.carregaDadosRelatorioSatisfacao = () => {
    return new Promise (async(resolve, reject) => {
        try {
            const data = await JSON.parse(avaliacoes);
            resolve(data);
        } catch (err) {
            reject(err);
        }
    });
}

module.exports = API;