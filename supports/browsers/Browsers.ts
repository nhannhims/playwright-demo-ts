import { Page } from '@playwright/test'
import { Navigations } from './Navigations'
import { assertGreaterThan } from '../core/BaseAssert'
export class Browsers {
    #page: Page

    constructor(page: Page) {
        this.#page = page
    }

    async getDefaultTab() {
        let tabs = this.#page.context().pages()
        return tabs[0]
    }

    async getNewTab() {
        let tabs = this.#page.context().pages()
        if (tabs.length > 1) {
            return tabs[tabs.length - 1]
        } else {
            return tabs[0]
        }
    }
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

    async createNewTab(url: string) {
        let newPage = await this.#page.context().newPage()
        let Navigation = new Navigations(newPage)
        await Navigation.to(url)
        return newPage
    }

    async switchToFront(page: Page) {
        this.#page = page
        this.#page.bringToFront()
    }

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