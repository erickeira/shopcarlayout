const apiUrl = "https://api-dev.shopcar.com.br/";
const urlImg = "https://cdn-dev.shopcar.com.br/redim/360/stored/veiculos/"


function formatadorValor(valor){
    return valor.toLocaleString('pt-br',{style: 'currency', currency: 'BRL'});
}

function getUrlImg(qualidade, tipo){
    return `https://cdn-dev.shopcar.com.br/redim/${qualidade || 500}/stored/${tipo || 'veiculos'}/`
}

function removerSpecials(texto) {
    // eliminando acentuação
    texto = texto.replace(/[ÀÁÂÃÄÅ]/,"A");
    texto = texto.replace(/[àáâãäå]/,"a");
    texto = texto.replace(/[ÈÉÊË]/,"E");
    texto = texto.replace(/[Ç]/,"C");
    texto = texto.replace(/[ç]/,"c");
    return texto.replace(/[^a-z0-9]/gi,''); 
}


export {
    apiUrl,
    urlImg,
    formatadorValor,
    getUrlImg,
    removerSpecials
}