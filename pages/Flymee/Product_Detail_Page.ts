import { Page } from '@playwright/test'
import { LONG_TIMEOUT } from '../../supports/helps/Constants'
import { Control } from '../../supports/core/Control'
import { ATTR, ROLE, TYPE } from '../../supports/helps/Settings'
import { assertEqual } from '../../supports/core/BaseAssert'
export class Product_Detail_Page {
    #page: Page

    constructor(page: Page) {
        this.#page = page
    }

    #elements = {
        btnFavourite: () => new Control(this.#page, TYPE.ROLE, ROLE.BUTTON, { name: 'お気に入り' }),
        btnQuantityMinus: () => new Control(this.#page, TYPE.XPATH, '//div[@class="cart_quantity"]//div[contains(@class,"minus")]'),
        btnQuantityPlus: () => new Control(this.#page, TYPE.XPATH, '//div[@class="cart_quantity"]//div[contains(@class,"plus")]'),
        iptQuantity: () => new Control(this.#page, TYPE.XPATH, '//div[@class="cart_quantity"]//div[contains(@class,"quantity")]/input[not(@name="changeUnit")]'),
        btnAddToCart: () => new Control(this.#page, TYPE.ROLE, ROLE.BUTTON, { name: 'カートに入れる' }),
        linkAboutWarranty: () => new Control(this.#page, TYPE.ROLE, ROLE.LINK, { name: '保証について' })
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
        await this.#elements.btnFavourite().click()
        await this.#page.waitForLoadState('domcontentloaded', { timeout: LONG_TIMEOUT })
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
        await assertEqual(actual, expected)
    }

    /**
     * Execute set quantity for product
     * Create By: NhanVH
     * Create At: 2023/10/12
     * Update By: N/A
     * Update At: N/A
     * Description: N/A
     * @param num : number of quantity product
     */
    async setQuantity(num: number) {
        await this.#page.waitForLoadState('domcontentloaded', { timeout: LONG_TIMEOUT })
        let currentQty = await this.#elements.iptQuantity().getAttribute(ATTR.VALUE)
        // Incase Current Quantity  = 1 and set Quantity > 1
        if (Number(currentQty) == 1 && num > 1) {
            await this.#elements.btnQuantityPlus().clickCount(num - 1)
        }
        // Incase Current Quantity > 1 and set Quantity < Current Quantity
        if (Number(currentQty) > num) {
            await this.#elements.btnQuantityMinus().clickCount(Number(currentQty) - num)
        }
        // Incase Current Quantity > 1 and set Quantity > Current Quantity
        if (Number(currentQty) > 1 && Number(currentQty) < num) {
            await this.#elements.btnQuantityPlus().clickCount(num - Number(currentQty))
        }
    }

    /**
     * Execute Click to Add to cart
     * Create By: NhanVH
     * Create At: 2023/10/12
     * Update By: N/A
     * Update At: N/A
     * Description: N/A
     */
    async clickAddToCart() {
        await this.#elements.btnAddToCart().click()
        await this.#page.waitForURL('https://flymee.jp/cart/', { timeout: LONG_TIMEOUT })
        await this.#page.waitForLoadState('domcontentloaded', { timeout: LONG_TIMEOUT })
    }

    /**
     * Execute Add Product to cart with quantity
     * Create By: NhanVH
     * Create At: 2023/10/12
     * Update By: N/A
     * Update At: N/A
     * Description: N/A
     * @param num : Number of quantity product
     */
    async AddProductToCard(num: number) {
        await this.setQuantity(num)
        await this.clickAddToCart()
    }

    /**
     * Execute click warranty hyperlink
     * Create By: NhanVH
     * Create At: 2023/10/12
     * Update By: N/A
     * Update At: N/A
     * Description: N/A
     */
    async clickAboutWarrantyHyperlink() {
        await this.#elements.linkAboutWarranty().click()
        await this.#page.waitForLoadState('domcontentloaded', { timeout: LONG_TIMEOUT })
    }
}