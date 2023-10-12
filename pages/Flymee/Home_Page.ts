import { Control } from '../../supports/core/Control'
import { Page } from '@playwright/test'
import { KEY, ROLE, TYPE } from '../../supports/helps/Settings'
export class Home_Page {
    #page: Page

    constructor(page: Page) {
        this.#page = page
    }

    #elements = {
        //HEADER
        iptSearch: () => new Control(this.#page, TYPE.XPATH, "//input[@id='js-searchKeywords']"),
        // HEADER - MAIN MENU
        btnMenuName: () => new Control(this.#page, TYPE.XPATH, '//div[@class="header_01"]//ul//a[text()="%s"]'),
        // HEADER - CATEGORY MENU
    }

    /**
     * Execute Search Product By Name > Go to Search Page
     * Create At: NhanVH
     * Create By: 2023/10/10
     * Update At: N/A
     * Update By: N/A
     * Update Description: N/A
     * @param product_name : Name Of Product
     */
    async searchByProductName(product_name: string) {
        await this.#elements.iptSearch().click()
        await this.#elements.iptSearch().type(product_name)
        await this.#elements.iptSearch().press(KEY.ENTER)
    }

    /**
     * Select Menu with Name in Main Menu
     * Create At: NhanVH
     * Create By: 2023/10/11
     * Update At: N/A
     * Update By: N/A
     * Update Description: N/A
     * @param menu_name : Name of Menu
     */
    async selectMainMenu(menu_name: string) {
        await this.#elements.btnMenuName().setDynamicLocator(menu_name).click()
    }
}