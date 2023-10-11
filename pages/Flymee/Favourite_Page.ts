import { Page, expect } from '@playwright/test';
import { Control } from '../../supports/core/Control';
import { ROLE, TYPE } from '../../supports/helps/Settings';
import { LONG_TIMEOUT } from '../../supports/helps/Constants';
export class Favourite_Page {
    #page: Page

    constructor(page: Page) {
        this.#page = page
    }
    //削除しました
    #elements = {
        txtProductName: () => new Control(this.#page, TYPE.XPATH, '//div[@class="item_name" and contains(text(),"%s")]'),
        btnDeleteFavourite: () => new Control(this.#page, TYPE.XPATH, '//div[contains(@class,"js-deleteItem")]'),
        txtDeletedMessage: () => new Control(this.#page, TYPE.XPATH, '//div[contains(text(),"%s")]/ancestor::li//p')
    }

    /**
     * Verify Product Is Exist
     * Create At: NhanVH
     * Create By: 2023/10/11
     * Update At: N/A
     * Update By: N/A
     * Update Description: N/A
     * @param product_name : Name of product
     */
    async verifyProductIsExist(product_name: string) {
        await this.#page.waitForLoadState('domcontentloaded', { timeout: LONG_TIMEOUT })
        expect(this.#elements.txtProductName().setDynamicLocator(product_name).get()).toBeVisible()
    }

    /**
     * Delete Favourite Product
     * Create At: NhanVH
     * Create By: 2023/10/11
     * Update At: N/A
     * Update By: N/A
     * Update Description: N/A
     * @param product_name : Name of product
     */
    async deleteFavouriteProduct(product_name: string) {
        await this.#elements.txtProductName().setDynamicLocator(product_name).get().hover()
        await this.#elements.btnDeleteFavourite().get().hover()
        await this.#elements.btnDeleteFavourite().get().click()
    }

    async verifyMessageShowOnProduct(product_name: string, expected: string) {
        await this.#page.waitForLoadState('domcontentloaded', { timeout: LONG_TIMEOUT })
        await this.#elements.txtDeletedMessage().setDynamicLocator(product_name).get().innerText().then(actual => {
            expect(actual.trim()).toEqual(expected)
        })
    }

    async verifyProductIsNotExist(product_name: string) {
        let actual = (await this.#elements.txtProductName().setDynamicLocator(product_name).get().count()).toString()
        expect(actual).toEqual("0")
    }
}