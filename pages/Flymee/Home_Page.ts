import { Control } from '../../supports/core/Control'
import { Page } from '@playwright/test'
import { TYPE } from '../../supports/helps/Settings'
export class Home_Page {
    #page: Page

    constructor(page: Page) {
        this.#page = page
    }

    #elements = {
        iptSearch: () => new Control(this.#page, TYPE.XPATH, "//input[@id='js-searchKeywords']")
    }

    /**
     * Execute Search Product By Name > Go to Search Page
     * @param product_name : Name Of Product
     * Create At: NhanVH
     * Create By: 2023/10/10
     * Update At: N/A
     * Update By: N/A
     * Update Description: N/A
     */
    async searchByProductName(product_name: string){
        await this.#elements.iptSearch().get().fill(product_name)
        await this.#elements.iptSearch().get().press('Enter')
    }
}