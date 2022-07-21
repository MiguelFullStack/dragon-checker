const fs = require('fs');

const barridoTarjetas = (tarjeta) => {

    fs.readFile('./db/tarjetas.txt', 'utf8', (err, data) => {
        // eliminar la tarjeta
        const tarjetas = data.split('\n').filter(line => line.length > 0);
        // eliminar la tarjeta
        const tarjetasTotal = tarjetas.filter(card => card != tarjeta);

        if (tarjetas.length === tarjetasTotal.length) {
            return console.log('se ha colocado una tarjeta invalida');
        }
        
        // guardar en archivo
        const save = tarjetasTotal.join('\n');
        // console.log(save.includes(tarjeta));
        fs.writeFile('./db/tarjetas.txt', save, (err) => {
            if (err) throw err;
            return;
        })
        return; 
    })
}

module.exports = {
    barridoTarjetas
}