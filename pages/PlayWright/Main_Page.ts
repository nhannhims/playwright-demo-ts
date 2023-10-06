import { Page, expect } from '@playwright/test'
import { Control } from '../../supports/core/Control'
import { ROLE, TYPE } from '../../supports/helps/Settings'
export class Main_Page {
    #page: Page

    constructor(page: Page) {
        this.#page = page
    }

    #elements = {
        linkGetStarted: () => new Control(this.#page, TYPE.ROLE, ROLE.LINK, { name: 'Get started' }),
        txtHeading: () => new Control(this.#page, TYPE.ROLE, ROLE.HEADING, { name: 'Installation' })
    }

    async GotoGetStartedPage() {
        await this.#elements.linkGetStarted().get().click()
        await this.#page.waitForLoadState('domcontentloaded', { timeout: 60000 })
        await expect(this.#elements.txtHeading().get()).toBeVisible()
    }
}