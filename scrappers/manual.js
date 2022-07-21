const puppeteer = require('puppeteer-extra');
const StealthPlugin = require('puppeteer-extra-plugin-stealth');
const { tipo } = require('../config/config');
puppeteer.use(StealthPlugin());


const manual = async () => {

    const browser = await puppeteer.launch({
        headless: false,
        defaultViewport: null,
        userDataDir: './userData',
        args: ['--start-maximized', '--disable-gpu', '--disable-dev-shm-usage', '--disable-setuid-sandbox', '--no-sandbox']
    });
    
    const page = (await browser.pages())[0];
    await page.setDefaultTimeout(0);

    await page.bringToFront();
    if(tipo == 'manual-login')  await page.goto('https://www.walmart.com/account/login');
    if(tipo == 'manual-torta')  await page.goto('https://www.walmart.com/order-ahead/cake');
    if(tipo == 'manual-foto')   await page.goto('https://photos3.walmart.com/order/prints-builder?finish=glossy&size=4x4&copies=1#');
}

module.exports = {manual};