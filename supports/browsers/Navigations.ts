import { Page } from '@playwright/test'
import { LONG_TIMEOUT } from '../helps/Constants'
export class Navigations {
    #page: Page
    constructor(page: Page) {
        this.#page = page
    }

    async visit(url: string) {
        await this.#page.context().clearCookies()
        await this.#page.context().clearPermissions()
        await this.#page.goto(url, { waitUntil: 'domcontentloaded', timeout: LONG_TIMEOUT })
    }

    async to(url: string) {
        await this.#page.goto(url, { waitUntil: 'domcontentloaded', timeout: LONG_TIMEOUT })
    }

    async Refresh() {
        await this.#page.reload({ waitUntil: 'domcontentloaded', timeout: LONG_TIMEOUT })
    }

    async Back() {
        await this.#page.goBack({ waitUntil: 'domcontentloaded', timeout: LONG_TIMEOUT })
    }

    async Forward() {
        await this.#page.goForward({ waitUntil: 'domcontentloaded', timeout: LONG_TIMEOUT })
    }
}