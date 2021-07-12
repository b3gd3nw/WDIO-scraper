import MapPage from  '../pageobjects/map.page';

// запуск скрапинга всех адресов
describe('Scrap addresses', () => {
    const addresses = require('../../address/data.json');
    if(addresses) {
        addresses.address.forEach(address => {
            // запуск скрапинга определенного адреса
            it(`scraping ${address}`, async () => {
                await MapPage.open();
                await MapPage.goTo();
                await MapPage.findAddress(address);
                await MapPage.hover();
            });
        })
    }
});


