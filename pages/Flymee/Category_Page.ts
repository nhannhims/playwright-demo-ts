import { Page } from '@playwright/test'
import { Control } from '../../supports/core/Control'
import { TYPE } from '../../supports/helps/Settings'
import { assertEqual } from '../../supports/core/BaseAssert'
export class Category_Page {
    #page: Page

    constructor(page: Page) {
        this.#page = page
    }

    #elements = {
        txtTitle: () => new Control(this.#page, TYPE.XPATH, '//div[@class="search_top_left"]//h1[@class="title"]'),
        txtConditionFilter: () => new Control(this.#page, TYPE.XPATH, '//div[contains(text(),"絞り込み条件")]/following-sibling::ul//span')
    }

    /**
     * Verify Category Title
     * Create At: NhanVH
     * Create By: 2023/10/13
     * Update At: N/A
     * Update By: N/A
     * Update Description: N/A
     * @param expected 
     */
    async verifyCategoryTitleIsCorrect(expected: string) {
        let actual = await this.#elements.txtTitle().getText()
        await assertEqual(actual.trim(), expected)
    }

    /**
     * Verify Category Filter Condition
     * Create At: NhanVH
     * Create By: 2023/10/13
     * Update At: N/A
     * Update By: N/A
     * Update Description: N/A
     * @param expected 
     */
    async verifyCategoryFilterConditionIsCorrect(expected: string) {
        let actual = await this.#elements.txtConditionFilter().getText()
        await assertEqual(actual.trim(), expected)
    }
}