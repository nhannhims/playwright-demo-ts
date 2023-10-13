import { Page } from '@playwright/test'
import { Control } from '../../supports/core/Control'
import { ROLE, TYPE } from '../../supports/helps/Settings'
import { assertEqual, assertNotVisible, assertVisible } from '../../supports/core/BaseAssert'
import { LONG_TIMEOUT, MEDIUM_TIMEOUT, SHORT_TIMEOUT } from '../../supports/helps/Constants'
import { Browsers } from '../../supports/browsers/Browsers'
import { convertPriceToNumber } from '../../supports/utils/Convert'
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
        txtNoProductMsg: () => new Control(this.#page, TYPE.XPATH, '//section[@class="js-cart"]//div[@class="cart_empty_area_inner"]/p'),
        linkRegister: () => new Control(this.#page, TYPE.ROLE, ROLE.LINK, { name: '新規会員登録はこちら' }),
        linkAbout: () => new Control(this.#page, TYPE.ROLE, ROLE.LINK, { name: '返品・交換・キャンセルについて' }),
        imgProduct: () => new Control(this.#page, TYPE.XPATH, '//div[@class="product_list"]//p[contains(text(),"%s")]/ancestor::li/div[@class="list_image"]/a/img'),
        txtTotalPrice: () => new Control(this.#page, TYPE.XPATH, '//div[@class="sub_total"]/span[@class="amount _bold"]')
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

    /**
     * Select a product in cart page
     * Create By: NhanVH
     * Create At: 2023/10/13
     * Update By: N/A
     * Update At: N/A
     * Description: N/A
     * @param product_name : Name of product
     */
    async selectProduct(product_name: string) {
        await this.#elements.imgProduct().setDynamicLocator(product_name).click()
        await this.#page.waitForLoadState('domcontentloaded', { timeout: LONG_TIMEOUT })
    }

    /**
     * Click Register Hyperlink
     * Create By: NhanVH
     * Create At: 2023/10/13
     * Update By: N/A
     * Update At: N/A
     * Description: N/A
     */
    async clickRegisterHyperlink() {
        await this.#elements.linkRegister().click()
        await this.#page.waitForLoadState('domcontentloaded', { timeout: LONG_TIMEOUT })
    }

    /**
     * Click About Hyperlink
     * Create By: NhanVH
     * Create At: 2023/10/13
     * Update By: N/A
     * Update At: N/A
     * Description: N/A
     */
    async clickAboutHyperlink() {
        await this.#elements.linkAbout().click()
        let Browser = new Browsers(this.#page)
        await Browser.waitForNewTabAvailable(SHORT_TIMEOUT, 1)
        let aboutPage = await Browser.getNewTab()
        await aboutPage.waitForLoadState('domcontentloaded', { timeout: LONG_TIMEOUT })
    }

    async verifyTotalPriceIsCorrect(quantity: number, price: string){
        let singlePrice = await convertPriceToNumber(price)
        let expected = quantity * singlePrice
        let totalPrice = await this.#elements.txtTotalPrice().getText()
        let actual = await convertPriceToNumber(totalPrice)
        await assertEqual(actual, expected)
    }
}