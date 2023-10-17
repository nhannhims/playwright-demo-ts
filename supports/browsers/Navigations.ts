import { Page } from '@playwright/test'
import { LONG_TIMEOUT } from '../helps/Constants'
import projectConfig from '../project-config'
export class Navigations {
    #page: Page
    constructor(page: Page) {
        this.#page = page
    }

    /**
     * Go to URL but clear cookies
     * @param url
     */
    async visit(url?: string) {
        let baseUrl: string
        if(url == undefined || url == '') {
            let environment = process.env.ENV
            if(environment == undefined) {
                baseUrl = projectConfig.env.default.url
            } else {
                baseUrl = projectConfig.env[environment].url
            }
        } else {
            baseUrl = url
        }
        await this.#page.context().clearCookies()
        await this.#page.goto(baseUrl, { waitUntil: 'domcontentloaded', timeout: LONG_TIMEOUT })
    }

    /**
     * Go to URL with no option
     * @param url
     */
    async to(url: string) {
        await this.#page.goto(url, { waitUntil: 'domcontentloaded', timeout: LONG_TIMEOUT })
    }

    /**
     * Refresh a page
     */
    async refresh() {
        await this.#page.reload({ waitUntil: 'domcontentloaded', timeout: LONG_TIMEOUT })
    }

    /**
     * Back to last page
     */
    async back() {
        await this.#page.goBack({ waitUntil: 'domcontentloaded', timeout: LONG_TIMEOUT })
    }

    /**
     * Next to last page
     */
    async forward() {
        await this.#page.goForward({ waitUntil: 'domcontentloaded', timeout: LONG_TIMEOUT })
    }
}