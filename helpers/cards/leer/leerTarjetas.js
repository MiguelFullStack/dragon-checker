const fs = require("fs");

// leer archivo cards/tarjetas.txt
const tarjetas = new Promise((resolve, reject) => {
    fs.readFile('./db/tarjetas.txt', 'utf8', (err, data) => {
        if (err) reject(err)

        // eliminar lineas vacias
        data = data.split('\n').filter(line => line.length > 0)
        const vencimiento = data.filter(line => line.includes('|'))
        const bin = data.filter(line => line.includes('|') == false)
        
        // bin y vencimiento
        const binCompleto = bin.map(line => `${line}${vencimiento}`);   
        resolve(binCompleto);
    })
});

module.exports = { tarjetas };