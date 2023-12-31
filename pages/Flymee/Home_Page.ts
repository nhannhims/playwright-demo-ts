import { Control } from '../../supports/core/Control'
import { Page } from '@playwright/test'
import { KEY, ROLE, TYPE } from '../../supports/helps/Settings'
import { LONG_TIMEOUT } from '../../supports/helps/Constants'
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
        btnNavName: () => new Control(this.#page, TYPE.XPATH, '//nav[@role="navigation"]//ul[@class="header_02_left"]//a[text()="%s"]'),
        optNavFocus: () => new Control(this.#page, TYPE.XPATH, '//nav[@role="navigation"]//a[text()="%s"]/following-sibling::div/ul'),
        btnNavOption: () => new Control(this.#page, TYPE.XPATH, '//nav[@role="navigation"]//ul//ul//*[text()="%s"]')
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
        await this.#page.waitForLoadState('domcontentloaded', { timeout: LONG_TIMEOUT })
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
        await this.#page.waitForLoadState('domcontentloaded', { timeout: LONG_TIMEOUT })
    }

    /**
     * Select Menu Option
     * Create At: NhanVH
     * Create By: 2023/10/13
     * Update At: N/A
     * Update By: N/A
     * Update Description: N/A
     * @param menu_name : Name of Menu
     * @param option : Option of Menu
     */
    async selectNavigationMenu(menu_name: string, option: string) {
        await this.#elements.btnNavName().setDynamicLocator(menu_name).hover()
        await this.#elements.optNavFocus().setDynamicLocator(menu_name).hover()
        await this.#elements.btnNavOption().setDynamicLocator(option).click()
        await this.#page.waitForLoadState('domcontentloaded', { timeout: LONG_TIMEOUT })
    }
}