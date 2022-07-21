const fs = require("fs");

// Leer las lives
const lives = new Promise((resolve, reject) => {
    fs.readFile('./db/lives.txt', 'utf8', (err, data) => {
        if (err) reject(err)
        // eliminar lineas vacias
        return resolve(data.split('\n').filter(line => line.length > 0));
    })
});

module.exports = { lives };