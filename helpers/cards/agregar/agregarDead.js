const fs = require('fs')
const colors = require("colors");
const { deads } = require("../leer")

const agregarDeads = async(data) => {
    
    const txtLives = await deads;

    // evitar duplicaciones
    const livesDuplicate = txtLives.filter(card => card == data);
    if (livesDuplicate.length > 0) return console.log(`${data.yellow} este ${'dead'.red} ya existe en db/deads.txt`);
    
    fs.appendFile('./db/deads.txt', data+'\n',{encoding: 'utf-8'}, (err) => {
        if (err) throw err;
        return console.log(`${data.red}`);
    })

}

module.exports = { agregarDeads }