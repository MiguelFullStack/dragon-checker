const colors = require("colors");
const fs = require("fs");
const { deads } = require("./leer/leerDeads");
const { lives } = require("./leer/leerLives");
const { tarjetas } = require("./leer/leerTarjetas");

const bines = Promise.all([tarjetas, deads, lives]).then((values) => {
    // verificar si las tarjetas estan en deads.txt
    const deads = values[1];
    const lives = values[2];
    const tarjetas = values[0].map(data => data.split('|')[0]);
    const mesV = values[0].map(data => data.split('|')[1]);
    const yearV = values[0].map(data => data.split('|')[2]);
    const vencimiento = [`/${mesV[0]}/${yearV[0]}`];
    // verificar tarjetas en deads.txt
    const verifyDeadsDuplicate = tarjetas.filter(card => deads.includes(card));
    const verifyLivesDuplicate = tarjetas.filter(card => lives.includes(card));

    if(verifyDeadsDuplicate.length > 0 || verifyLivesDuplicate.length > 0) console.log(`hay ${verifyDeadsDuplicate.length} deads y ${verifyLivesDuplicate.length} lives duplicadas, estas seran eliminadas`);
        
    // quitando duplicadas de live y dead
    const tarjetasTotalFiltradas = tarjetas.filter(card => deads.includes(card) == false && lives.includes(card) == false);
    const tarjetasTotal = tarjetasTotalFiltradas.map(data => `${data}${vencimiento}`);
    // guardar en archivo
    const save = vencimiento.concat(tarjetasTotalFiltradas).join('\n');

    fs.writeFile('./cards/tarjetas.txt', save, (err) => {
        if (err) throw err;
        console.log('archivo guardado');
    });
    return tarjetasTotal;
}).catch(err => console.log(err));

module.exports = {
    bines
}