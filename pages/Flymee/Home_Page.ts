import { Control } from '../../supports/core/Control'
import { Page } from '@playwright/test'
import { TYPE } from '../../supports/helps/Settings'
export class Home_Page {
    #page: Page

    constructor(page: Page) {
        this.#page = page
    }

    #elements = {
        iptSearch: () => new Control(this.#page, TYPE.XPATH, "")
    }
}