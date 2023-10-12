import { Page, expect } from '@playwright/test';
import { Control } from '../../supports/core/Control';
import { ROLE, TYPE } from '../../supports/helps/Settings';
import { LONG_TIMEOUT } from '../../supports/helps/Constants';
export class Favourite_Page {
    #page: Page

    constructor(page: Page) {
        this.#page = page
    }

    #elements = {
        txtProductName: () => new Control(this.#page, TYPE.XPATH, '//div[@class="item_name" and contains(text(),"%s")]'),
        btnDeleteFavourite: () => new Control(this.#page, TYPE.XPATH, '//div[contains(text(),"%s")]/ancestor::li//div[@class="image_delete_cover js-deleteItem"]'),
        txtDeletedMessage: () => new Control(this.#page, TYPE.XPATH, '//div[contains(text(),"%s")]/ancestor::li//div[@class="favorite_delete_cover js-deletedItem"]/p')
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
        await this.#elements.txtProductName().setDynamicLocator(product_name).hover()
        await this.#elements.btnDeleteFavourite().setDynamicLocator(product_name).click()
    }

    /**
     * Verify Message Show On Product When Delete Product Favourite
     * Create At: NhanVH
     * Create By: 2023/10/12
     * Update At: N/A
     * Update By: N/A
     * Update Description: N/A
     * @param product_name : Name of Product
     * @param expected : Message expected you want verify
     */
    async verifyMessageShowOnProduct(product_name: string, expected: string) {
        await this.#page.waitForLoadState('domcontentloaded', { timeout: LONG_TIMEOUT })
        let actual = await this.#elements.txtDeletedMessage().setDynamicLocator(product_name).getText()
        expect(actual.trim()).toEqual(expected)
    }

    /**
     * Verify Product Is Not Exist On Favourite Page When deleted
     * @param product_name : Name Of Product
     */
    async verifyProductIsNotExist(product_name: string) {
        let actual = await this.#elements.txtProductName().setDynamicLocator(product_name).checkInVisible()
        expect(actual).toBeTruthy()
    }
}