
const {faker} = require('@faker-js/faker');

const login = async({page}) => {
    const btnLogin = '#__next > div:nth-child(1) > div > span > header > div:nth-child(7) > a'
    const urlCuentaCreada = 'https://www.walmart.com/account/?action=Create&rm=true'
    
    await page.waitForSelector(btnLogin);
    const existLogin = await page.$eval(btnLogin, el => el.href);
    console.log(existLogin);
    if(existLogin.includes('https://www.walmart.com/account/login?vid=oaoh') === true) {
        const userEmail = faker.internet.email();
        const userPassword = faker.internet.password();
        await page.goto('https://www.walmart.com/account/signup?vid=oaoh')
        await page.waitForSelector('#first-name-su');
        await page.type('#first-name-su', faker.name.firstName());
        await page.type('#last-name-su', faker.name.lastName());
        await page.type('#email-su', userEmail);
        await page.type('#password-su', userPassword);
        await page.click('#sign-up-form > button.button.m-margin-top.text-inherit')
        await page.waitForTimeout(1000)
        if(urlCuentaCreada === 'https://www.walmart.com/account/?action=Create&rm=true') return console.log('Cuenta creada correctamente');
    }
    return console.log('usuario ya existe');
}

module.exports = {login};