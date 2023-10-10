import { Page, expect } from '@playwright/test'
import { LONG_TIMEOUT } from '../../supports/helps/Constants'
import { Control } from '../../supports/core/Control'
import { TYPE } from '../../supports/helps/Settings'
export class Search_Page {
    #page: Page

    constructor(page: Page) {
        this.#page = page
    }

    #elements = {
        txtProductName: () => new Control(this.#page, TYPE.XPATH, "//div[@class='item_name' and contains(text(),'%s')]")
    }

    /**
     * Execute verify product is exist in search page
     * @param product_name : Name of Product
     * Create At: NhanVH
     * Create By: 2023/10/10
     * Update At: N/A
     * Update By: N/A
     * Update Description: N/A
     */
    async verifyProductIsExist(product_name: string) {
        await this.#page.waitForLoadState('domcontentloaded', { timeout: LONG_TIMEOUT })
        await expect(this.#elements.txtProductName().setDynamicLocator(product_name).get()).toBeVisible()
    }
}