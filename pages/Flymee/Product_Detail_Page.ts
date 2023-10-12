import { Page, expect } from '@playwright/test'
import { LONG_TIMEOUT } from '../../supports/helps/Constants'
import { Control } from '../../supports/core/Control'
import { ATTR, ROLE, TYPE } from '../../supports/helps/Settings'
export class Product_Detail_Page {
    #page: Page

    constructor(page: Page) {
        this.#page = page
    }

    #elements = {
        btnFavourite: () => new Control(this.#page, TYPE.ROLE, ROLE.BUTTON, { name: 'お気に入り' })
    }

    /**
     * Click Favourite Icon In Product Detail
     * Create By: NhanVH
     * Create At: 2023/10/12
     * Update By: N/A
     * Update At: N/A
     * Description: N/A
     */
    async clickFavouriteIcon() {
        await this.#page.waitForLoadState('domcontentloaded', { timeout: LONG_TIMEOUT })
        await this.#elements.btnFavourite().click()
    }

    /**
     * Verify Favourite Icon is Active
     * Create By: NhanVH
     * Create At: 2023/10/12
     * Update By: N/A
     * Update At: N/A
     * Description: N/A
     * @param expected : Expected Of Favourite Icon
     */
    async verifyFavouriteIsActive(expected: string) {
        const actual = await this.#elements.btnFavourite().getAttribute(ATTR.CLASS)
        expect(actual).toEqual(expected)
    }
}