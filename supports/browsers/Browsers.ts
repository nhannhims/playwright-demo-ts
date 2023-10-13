import { Page } from '@playwright/test'
import { Navigations } from './Navigations'
import { assertGreaterThan } from '../core/BaseAssert'
export class Browsers {
    #page: Page

    constructor(page: Page) {
        this.#page = page
    }

    /**
     * Return Default Tab
     * @returns : Page
     */
    async getDefaultTab() {
        let tabs = this.#page.context().pages()
        return tabs[0]
    }

    /**
     * Return last tab
     * @returns : Page
     */
    async getNewTab() {
        let tabs = this.#page.context().pages()
        if (tabs.length > 1) {
            return tabs[tabs.length - 1]
        } else {
            return tabs[0]
        }
    }

    /**
     * Return tab by id
     * @param idx : id of tab, start at 0
     * @returns 
     */
    async getTabByIndex(idx: number) {
        let tabs = this.#page.context().pages()
        if (idx < 0) {
            return tabs[0]
        } else if (idx > tabs.length) {
            return tabs[tabs.length - 1]
        } else {
            return tabs[idx]
        }
    }

    /**
     * Create new tab and go to url & return new page
     * @param url 
     * @returns 
     */
    async createNewTab(url: string) {
        let newPage = await this.#page.context().newPage()
        let Navigation = new Navigations(newPage)
        await Navigation.to(url)
        return newPage
    }

    /**
     * Switch Tab
     * @param page : Page
     */
    async switchToFront(page: Page) {
        this.#page = page
        this.#page.bringToFront()
    }

    /**
     * Wait For New Tab Available
     * @param timeout : time wait new tab available
     * @param current : number of current tabs
     */
    async waitForNewTabAvailable(timeout: number, current: number) {
        let num = Math.round(timeout / 1000)
        let count = 0
        for (let i = 0; i < num; i++) {
            count = this.#page.context().pages().length
            if (count > current) {
                break
            } else {
                await this.#page.waitForTimeout(1000)
            }
        }
        await assertGreaterThan(count, current)
    }
}