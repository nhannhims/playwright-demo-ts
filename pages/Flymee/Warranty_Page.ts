import { Page } from '@playwright/test';
import { Control } from '../../supports/core/Control';
import { ROLE, TYPE } from '../../supports/helps/Settings';
import { assertEqual, assertVisible } from '../../supports/core/BaseAssert';
export class Warranty_Page {
    #page: Page

    constructor(page: Page) {
        this.#page = page
    }

    #elements = {
        txtWarrantyTitle: () => new Control(this.#page, TYPE.ROLE, ROLE.HEADING, { name: '保証について' }),
        txtContent: () => new Control(this.#page, TYPE.XPATH, '(//div[@class="help_contents"]//div/p)[2]')
    }

    /**
     * Execute verify Warranty Title Page
     * Create By: NhanVH
     * Create At: 2023/10/13
     * Update By: N/A
     * Update At: N/A
     * Description: N/A
     */
    async verifyWarrantyTitle() {
        await assertVisible(this.#elements.txtWarrantyTitle())
    }

    /**
     * Execute verify content Warranty page
     * Create By: NhanVH
     * Create At: 2023/10/13
     * Update By: N/A
     * Update At: N/A
     * Description: N/A
     * @param expected : Expected result
     */
    async verifyWarrantyContent(expected: string) {
        let actual = await this.#elements.txtContent().getText()
        await assertEqual(actual.toString(), expected)
    }
}