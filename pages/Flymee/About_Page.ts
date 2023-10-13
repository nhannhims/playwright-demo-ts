import { Page } from '@playwright/test'
import { Control } from '../../supports/core/Control'
import { ROLE, TYPE } from '../../supports/helps/Settings'
import { FLYMEE_VERIVY } from '../../modals/enum/flymee/flymee'
import { assertVisible } from '../../supports/core/BaseAssert'
export class About_Page {
    #page: Page

    constructor(page: Page) {
        this.#page = page
    }

    #elements = {
        txtAboutTitle: () => new Control(this.#page, TYPE.ROLE, ROLE.HEADING, { name: '返品・交換・キャンセルについて' }),
        txtAboutContent: () => new Control(this.#page, TYPE.TEXT, FLYMEE_VERIVY.ABOUT_CONTENT)
    }

    /**
     * Switch to New Page (About Page)
     * Create By: NhanVH
     * Create At: 2023/10/13
     * Update By: N/A
     * Update At: N/A
     * Description: N/A
     * @param page : About Page
     */
    async switchToNewPage(page: Page) {
        this.#page = page
    }

    /**
     * Execute verify the title about page
     * Create By: NhanVH
     * Create At: 2023/10/13
     * Update By: N/A
     * Update At: N/A
     * Description: N/A
     */
    async verifyAboutPageTitleIsDisplay() {
        await assertVisible(this.#elements.txtAboutTitle())
    }

    /**
     * Verify Content of About page
     * Create By: NhanVH
     * Create At: 2023/10/13
     * Update By: N/A
     * Update At: N/A
     * Description: N/A
     */
    async verifyAboutPageContentIsDisplay() {
        await assertVisible(this.#elements.txtAboutContent())
    }
}