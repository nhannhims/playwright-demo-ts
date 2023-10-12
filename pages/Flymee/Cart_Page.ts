import { Page } from '@playwright/test'
import { Control } from '../../supports/core/Control'
import { TYPE } from '../../supports/helps/Settings'
import { assertEqual, assertNotVisible, assertVisible } from '../../supports/core/BaseAssert'
import { LONG_TIMEOUT, MEDIUM_TIMEOUT } from '../../supports/helps/Constants'
export class Cart_Page {
    #page: Page

    constructor(page: Page) {
        this.#page = page
    }

    #elements = {
        txtProductName: () => new Control(this.#page, TYPE.XPATH, '//div[@class="product_list"]//p[contains(text(),"%s")]'),
        txtQtyProduct: () => new Control(this.#page, TYPE.XPATH, '//div[@class="product_list"]//p[contains(text(),"%s")]/ancestor::li//div[contains(@class,"list_quantity")]/span'),
        txtPriceProduct: () => new Control(this.#page, TYPE.XPATH, '//div[@class="product_list"]//p[contains(text(),"%s")]/ancestor::li//div[contains(@class,"list_price")]'),
        linkDeleteProduct: () => new Control(this.#page, TYPE.XPATH, '//div[@class="product_list"]//p[contains(text(),"%s")]/ancestor::li//button[contains(@class,"delete_button_text")]'),
        txtNoProductMsg: () => new Control(this.#page, TYPE.XPATH, '//section[@class="js-cart"]//div[@class="cart_empty_area_inner"]/p')
    }

    /**
     * Verify Product is exist in Cart Page
     * Create By: NhanVH
     * Create At: 2023/10/12
     * Update By: N/A
     * Update At: N/A
     * Description: N/A
     * @param product_name : Name of product
     */
    async verifyProductIsExit(product_name: string) {
        await assertVisible(this.#elements.txtProductName(), product_name)
    }

    /**
     * Verify Quantity Product 
     * Create By: NhanVH
     * Create At: 2023/10/12
     * Update By: N/A
     * Update At: N/A
     * Description: N/A
     * @param product_name : Name of product
     * @param expected : Value of Quantity Product
     */
    async verifyQuantityProductIsCorrect(product_name: string, expected: number) {
        let actual = await this.#elements.txtQtyProduct().setDynamicLocator(product_name).getText()
        await assertEqual(actual.trim(), expected.toString())
    }

    /**
     * Verify product price
     * Create By: NhanVH
     * Create At: 2023/10/12
     * Update By: N/A
     * Update At: N/A
     * Description: N/A
     * @param product_name : Name of product
     * @param expected : Value of Product Price
     */
    async verifyPriceProductIsCorrect(product_name: string, expected: string) {
        let actual = await this.#elements.txtPriceProduct().setDynamicLocator(product_name).getText()
        await assertEqual(actual.trim(), expected)
    }

    /**
     * Click Hyperlink Delete to delete product
     * Create By: NhanVH
     * Create At: 2023/10/12
     * Update By: N/A
     * Update At: N/A
     * Description: N/A
     * @param product_name : Name of Product
     */
    async clickDeleteProduct(product_name: string) {
        await this.#elements.linkDeleteProduct().setDynamicLocator(product_name).click()
        await this.#elements.linkDeleteProduct().setDynamicLocator(product_name).waitForNotVisible(MEDIUM_TIMEOUT)
        await this.#page.waitForLoadState('domcontentloaded', { timeout: LONG_TIMEOUT })
    }

    /**
     * Verify Message show is correct
     * Create By: NhanVH
     * Create At: 2023/10/12
     * Update By: N/A
     * Update At: N/A
     * Description: N/A
     * @param message : Message No Product In Cart
     */
    async verifyMessageNoProductIsDisplay(message: string) {
        await assertVisible(this.#elements.txtNoProductMsg(), message)
    }

    async verifyMessageNoProductIsNotDisplay(message: string) {
        await assertNotVisible(this.#elements.txtNoProductMsg(), message)
    }

    /**
     * Verify Product is not exist in cart
     * Create By: NhanVH
     * Create At: 2023/10/12
     * Update By: N/A
     * Update At: N/A
     * Description: N/A
     * @param product_name : Name of product
     */
    async verifyProductIsNotExist(product_name: string) {
        await assertNotVisible(this.#elements.txtProductName(), product_name)
    }
}