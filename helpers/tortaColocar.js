const tortaColocar = async ({page}) => {
    await page.bringToFront();
    const urlTorta = 'https://www.walmart.com/order-ahead/cake/809951197/customize/size';
    const tortaBtnCheckSelector = '#app-container > div > div.show-desktop.route-customize > div > div:nth-child(3) > div > button > span'
    const chooseStoreInputSelector = '#app-container > div > div.select-store-zip-entry.select-store-search-box > div.select-store-location-box-wrapper > div > div:nth-child(2) > form > div.zipcode-form-field.field.field--secondary > input'
    const chooseStoreRadioSelector = '#store-5867 > div.select-store-option > label > span'
    const chooseStoreBtnContinue = '#store-continue-button > span';
    const checkoutSelector = '#app-container > div > div > div.scheduler-container > div.scheduler-footer > div > button.button.scheduler-buttons-primary.button--primary'
    const tlfSelector = 'body > div.js-content > div > div.checkout-wrapper > div > div.accordion-inner-wrapper > div.checkout-accordion > div > div > div > div:nth-child(2) > div.CXO_module_container > div.CXO_module_body.ResponsiveContainer > div > div > div > form > div > div:nth-child(1) > div > div > div > div.pickup-person-primary-form-fields > div.pickup-people-mobile-field > div.field.field--primary > input'
    
    await page.goto('https://www.walmart.com/checkout/orderahead#/');
    const expiredTorta = await page.$('body > div.js-content > div > div.modal-root > div.modal.modal--active-fill.responsive-modal.CXO-modal-ny > div.modal-content');

    if(expiredTorta){
        await page.goto(urlTorta);
        
        await page.waitForSelector(tortaBtnCheckSelector);
        await page.click(tortaBtnCheckSelector);

        await page.waitForTimeout(4000);
        const editStore = await page.$('#app-container > div > div > div.show-desktop.route-scheduler > div > div:nth-child(1) > div > div > div > button > span');
        // verifica si ya hay zip
        if(editStore) {   
            await page.waitForSelector(chooseStoreInputSelector);
            await page.type(chooseStoreInputSelector, '10005');
            await page.keyboard.press('Enter');
            await page.waitForSelector(chooseStoreRadioSelector);
            await page.click(chooseStoreRadioSelector);
            await page.waitForSelector(chooseStoreBtnContinue)
            await page.click(chooseStoreBtnContinue);
            await page.waitForTimeout(3000);
        }
        const editChoose = await page.$(checkoutSelector)
        
        // verifica sino existe boton del check
        if(editChoose){
            await page.waitForSelector(checkoutSelector);
            await page.click(checkoutSelector);
            await page.waitForTimeout(3000);
            await page.waitForSelector(tortaBtnCheckSelector);
            await page.click(tortaBtnCheckSelector)
            await page.waitForTimeout(5000);
        }
        await page.waitForTimeout(8000);
        const tlf = await page.$(tlfSelector);
        if(tlf)await page.type(tlfSelector, '2121234567');
        await page.waitForTimeout(1000);
        await page.click('body > div.js-content > div > div.checkout-wrapper > div > div.accordion-inner-wrapper > div.checkout-accordion > div > div > div > div:nth-child(2) > div.CXO_module_container > div.CXO_module_body.ResponsiveContainer > div > div > div > form > div > div.Grid-col.u-size-1.u-size-1-m > div > div > button');
        await page.waitForTimeout(2000);
        return false
    }
    await page.waitForTimeout(5000);
    const tlf = await page.$(tlfSelector);
    if(tlf) {
        await page.type(tlfSelector, '2121234567')
        await page.waitForTimeout(1000);
        await page.click('body > div.js-content > div > div.checkout-wrapper > div > div.accordion-inner-wrapper > div.checkout-accordion > div > div > div > div:nth-child(2) > div.CXO_module_container > div.CXO_module_body.ResponsiveContainer > div > div > div > form > div > div.Grid-col.u-size-1.u-size-1-m > div > div > button');
        await page.waitForTimeout(2000);
    };
    return true;
}

module.exports = {tortaColocar};