import { Page, expect } from '@playwright/test'
import { LONG_TIMEOUT } from '../../supports/helps/Constants'
import { Control } from '../../supports/core/Control'
import { ROLE, TYPE } from '../../supports/helps/Settings'
export class Product_Detail_Page {
    #page: Page

    constructor(page: Page) {
        this.#page = page
    }

    #elements = {
        btnFavourite: () => new Control(this.#page, TYPE.ROLE, ROLE.BUTTON, { name: 'お気に入り' })
    }

    async clickFavouriteIcon() {
        await this.#page.waitForLoadState('domcontentloaded', { timeout: LONG_TIMEOUT })
        await this.#elements.btnFavourite().get().click()
    }

    async verifyFavouriteIsActive(expected: string) {
        const actual = await this.#elements.btnFavourite().get().getAttribute('class')
        expect(actual).toEqual(expected)
    }
}