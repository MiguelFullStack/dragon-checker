const { tipo } = require("./config/config");
const { foto, torta, manual } = require("./scrappers");


// Esto decidira el tipo de scrapping que realizara el bot


if (tipo === 'foto' ) foto();
if (tipo === 'torta') torta();
if (tipo === 'manual-login' || tipo == 'manual-torta' || tipo == 'manual-foto') manual();

// En caso de colocar un valor incorrecto, el bot mostrara el mensaje
if ( !tipo == 'torta' || !tipo == 'foto' ) 
console.log( 'ERROR'.red,'selecciona un tipo valido', 'torta'.green, 'o' , 'foto'.green, 'dentro de config/config.js' );

