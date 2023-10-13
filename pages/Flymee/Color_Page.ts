import { Page } from '@playwright/test'
import { Control } from '../../supports/core/Control'
import { TYPE } from '../../supports/helps/Settings'
import { assertEqual } from '../../supports/core/BaseAssert'
export class Color_Page {
    #page: Page

    constructor(page: Page) {
        this.#page = page
    }

    #elements = {
        txtTitle: () => new Control(this.#page, TYPE.XPATH, '//div[@class="search_top_left"]//h1[@class="title"]'),
        txtConditionFilter: () => new Control(this.#page, TYPE.XPATH, '//div[contains(text(),"絞り込み条件")]/following-sibling::ul//span')
    }

    /**
     * Verify Color Title
     * Create At: NhanVH
     * Create By: 2023/10/13
     * Update At: N/A
     * Update By: N/A
     * Update Description: N/A
     * @param expected 
     */
    async verifyColorTitleIsCorrect(expected: string) {
        let actual = await this.#elements.txtTitle().getText()
        await assertEqual(actual.trim(), expected)
    }

    /**
     * Verify Color Filter Condition
     * Create At: NhanVH
     * Create By: 2023/10/13
     * Update At: N/A
     * Update By: N/A
     * Update Description: N/A
     * @param expected 
     */
    async verifyColorFilterConditionIsCorrect(expected: string) {
        let actual = await this.#elements.txtConditionFilter().getText()
        await assertEqual(actual.trim(), expected)
    }
}