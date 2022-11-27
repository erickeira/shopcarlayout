const apiUrl = "https://api-dev.shopcar.com.br/";
const urlImg = "https://cdn-dev.shopcar.com.br/redim/360/stored/veiculos/"


function formatadorValor(valor){
    return `R$ ${valor},00`
}

function getUrlImg(qualidade, tipo){
    return `https://cdn-dev.shopcar.com.br/redim/${qualidade || 500}/stored/${tipo || 'veiculos'}/`
}


export {
    apiUrl,
    urlImg,
    formatadorValor,
    getUrlImg,
}