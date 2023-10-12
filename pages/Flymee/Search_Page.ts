import { Page, expect } from '@playwright/test'
import { LONG_TIMEOUT } from '../../supports/helps/Constants'
import { Control } from '../../supports/core/Control'
import { TYPE } from '../../supports/helps/Settings'
import { assertVisible } from '../../supports/core/BaseAssert'
export class Search_Page {
    #page: Page

    constructor(page: Page) {
        this.#page = page
    }

    #elements = {
        txtProductName: () => new Control(this.#page, TYPE.XPATH, '//div[@class="search_result_area"]//div[@class="item_name" and contains(text(),"%s")]')
    }

    /**
     * Execute verify product is exist in search page
     * Create At: NhanVH
     * Create By: 2023/10/10
     * Update At: N/A
     * Update By: N/A
     * Update Description: N/A
     * @param product_name : Name of Product
     */
    async verifyProductIsExist(product_name: string) {
        await assertVisible(this.#elements.txtProductName(), product_name)
    }

    /**
     * Execute click a product > Go to Product Detail
     * Create At: NhanVH
     * Create By: 2023/10/11
     * Update At: N/A
     * Update By: N/A
     * Update Description: N/A
     * @param product_name : Name of Product
     */
    async selectProduction(product_name: string) {
        await this.#elements.txtProductName().setDynamicLocator(product_name).click()
        await this.#page.waitForLoadState('domcontentloaded', { timeout: LONG_TIMEOUT })
    }
}