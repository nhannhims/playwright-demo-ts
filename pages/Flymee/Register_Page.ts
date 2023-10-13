import { Page } from '@playwright/test'
import { Control } from '../../supports/core/Control'
import { ROLE, TYPE } from '../../supports/helps/Settings'
import { assertHaveUrl, assertVisible } from '../../supports/core/BaseAssert'
export class Register_Page {
    #page: Page

    constructor(page: Page) {
        this.#page = page
    }

    #elements = {
        txtRegisterHeader: () => new Control(this.#page, TYPE.ROLE, ROLE.HEADING, { name: '新規会員登録' }),
    }

    /**
     * Verify Title/Heading page display is correct
     * Create By: NhanVH
     * Create At: 2023/10/13
     * Update By: N/A
     * Update At: N/A
     * Description: N/A
     */
    async verifyTitleIsDisplay() {
        await assertVisible(this.#elements.txtRegisterHeader())
    }

    /**
     * Verify url is correct
     * Create By: NhanVH
     * Create At: 2023/10/13
     * Update By: N/A
     * Update At: N/A
     * Description: N/A
     * @param url : url/ apart of url
     */
    async verifyUrlHas(url: string | RegExp) {
        await assertHaveUrl(this.#page, url)
    }
}