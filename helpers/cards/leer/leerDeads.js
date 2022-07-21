const fs = require("fs");

// Leer las deads
const deads = new Promise((resolve, reject) => {
    fs.readFile('./db/deads.txt', 'utf8', (err, data) => {
        if (err) reject(err)
        // eliminar lineas vacias
        resolve(data.split('\n').filter(line => line.length > 0));
    })
});


module.exports = { deads };