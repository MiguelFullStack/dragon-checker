const { tarjetas } = require("../helpers/cards/leer");

let cards=[];
let cards0=[];
let fechaMes=[];
let fechaAño=[];

tarjetas.then(data => {
    
    for (var j of data) {
        if (cards0.includes(j)==false) {
            cards0.push(j)
        }
    }
    for (var i of cards0){
        var card= i.split('|')[0];
        var mes =  i.split('|')[1];
        var ano=parseInt(i.split('|')[2]);
        cards.push(card);
        fechaMes.push(mes);
        fechaAño.push(ano);
    }

});

module.exports = {
    cards,
    fechaMes,
    fechaAño,
};
