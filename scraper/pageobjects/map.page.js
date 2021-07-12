import Page from './page';

/**
 * page containing specific selectors and methods for a specific page
 */
class MapPage extends Page {

    /**
     * define selectors using getter methods
     */
    get body () { return $('body')}
    get button () { return $('button.plannen-zoeken') }
    get input () { return $('#search-by-adres') }
    get searchBtn () { return $('.rpnl-icons.search.active') }
    get planenList () { return $('/html/body/rpnl-root/viewer/div/div/plannen/ul[2]/div[2]') }
    get planInfoBtn () { return $('.plannen_plan-info-title') }
    get infoList () { return $('.plekinfo_list.ng-star-inserted') }
    get closeSidebarBtn () { return $('div.left-panel-toggle') }
    get address () { return $('div.locatie-weergavenaam') }

    /**
     * clicks plannen zoeken
     */
    async goTo () {
        await (await this.button).click();
    }
    
    /**
     * fills the address field and clicks search 
     * 
     * @param {*} address 
     */
    async findAddress(address) {
        await (await this.input).waitForDisplayed();
        await (await this.input).addValue(address);
        await (await this.searchBtn).click();
        await (await this.planenList).click();
    }

    /**
     * runs cursor throug all points in the righ sidebar and calls screenshot method for each 
     */
    async hover() { 
        await (await this.closeSidebarBtn).click();
        let list = await (await this.infoList);
        let as = await list.$$('a');
        let length = as.length;
        let counter = 0;
        let address = await (await this.address).getText();
        while(counter <= length-4) {
            await as[counter].moveTo();
            super.timeout(100000);
            await this.screen(await (await as[counter].$('ul.pk-li-it--info li.pk-li-it--label')).getText(), address);
            counter++;
        }
    }

    /**
     * gets name and address, creates the folder with the address and stores the screeenshot in it 
     * 
     * @param {*} name 
     * @param {*} address 
     */
    async screen(name, address) {
        const fs = require('fs');
        if (!fs.existsSync(`results/${address}`)) {
            fs.mkdirSync(`results/${address}`);
        }
        await (await this.body).saveScreenshot(`results/${address}/${name}.png`);
    }

    /**
     * overwrite specifc options to adapt it to page object
     */
    open () {
        return super.open('https://www.ruimtelijkeplannen.nl/viewer/view');
    }
}

export default new MapPage();
