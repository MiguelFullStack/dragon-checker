const fs = require('fs')
const colors = require("colors");
const { lives } = require("../leer")

const agregarLive = async(data) => {
    
    const bin = data.split('|')[0];
    // agrega live en lives.txt
    await lives.then(txtLives => {
        console.log(txtLives);
        // evitar duplicaciones
        const livesDuplicate = txtLives.filter(card => card === data);
        if (livesDuplicate.length > 0) return console.log(`${data.yellow} este live ya existe en db/live.txt`);
        fs.appendFile('./db/lives.txt', data+'\n', {encoding: 'utf-8'}, (err) => {
            if (err) throw err;
            return console.log(`${bin.green}`);
        })
    })

}

module.exports = { agregarLive}