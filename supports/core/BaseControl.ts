import { Page } from '@playwright/test'
import { TYPE } from '../helps/Settings'
export class BaseControl {
    #page: Page
    #find_type: string
    #element: any
    #option: any
    #iframe: any

    constructor(page: Page, find_type: string, element: any, option?: any, iframe?: any) {
        this.#page = page
        this.#find_type = find_type
        this.#element = element
        this.#option = option
        this.#iframe = iframe
    }

    get() {
        if (this.#iframe == null || this.#iframe == '' || this.#iframe == undefined) {
            switch (this.#find_type) {
                case TYPE.XPATH:
                    if (this.#option == null || this.#option == '' || this.#option == undefined) {
                        return this.#page.locator(this.#element)
                    } else {
                        return this.#page.locator(this.#element, this.#option)
                    }
                case TYPE.CSS:
                    if (this.#option == null || this.#option == '' || this.#option == undefined) {
                        return this.#page.locator(this.#element)
                    } else {
                        return this.#page.locator(this.#element, this.#option)
                    }
                case TYPE.TITLE:
                    if (this.#option == null || this.#option == '' || this.#option == undefined) {
                        return this.#page.getByTitle(this.#element)
                    } else {
                        return this.#page.getByTitle(this.#element, this.#option)
                    }
                case TYPE.ROLE:
                    if (this.#option == null || this.#option == '' || this.#option == undefined) {
                        return this.#page.getByRole(this.#element)
                    } else {
                        return this.#page.getByRole(this.#element, this.#option)
                    }
                case TYPE.LABEL:
                    if (this.#option == null || this.#option == '' || this.#option == undefined) {
                        return this.#page.getByLabel(this.#element)
                    } else {
                        return this.#page.getByLabel(this.#element, this.#option)
                    }
                case TYPE.PLACEHOLDER:
                    if (this.#option == null || this.#option == '' || this.#option == undefined) {
                        return this.#page.getByPlaceholder(this.#element)
                    } else {
                        return this.#page.getByPlaceholder(this.#element, this.#option)
                    }
                case TYPE.TEXT:
                    if (this.#option == null || this.#option == '' || this.#option == undefined) {
                        return this.#page.getByText(this.#element)
                    } else {
                        return this.#page.getByText(this.#element, this.#option)
                    }
                case TYPE.ALT_TEXT:
                    if (this.#option == null || this.#option == '' || this.#option == undefined) {
                        return this.#page.getByAltText(this.#element)
                    } else {
                        return this.#page.getByAltText(this.#element, this.#option)
                    }
                case TYPE.TEST_ID:
                    return this.#page.getByTestId(this.#element)
                default:
                    throw new Error("This find type is not define");
            }
        } else {
            switch (this.#find_type) {
                case TYPE.XPATH:
                    if (this.#option == null || this.#option == '' || this.#option == undefined) {
                        return this.#page.frameLocator(this.#iframe).locator(this.#element)
                    } else {
                        return this.#page.frameLocator(this.#iframe).locator(this.#element, this.#option)
                    }
                case TYPE.CSS:
                    if (this.#option == null || this.#option == '' || this.#option == undefined) {
                        return this.#page.frameLocator(this.#iframe).locator(this.#element)
                    } else {
                        return this.#page.frameLocator(this.#iframe).locator(this.#element, this.#option)
                    }
                case TYPE.TITLE:
                    if (this.#option == null || this.#option == '' || this.#option == undefined) {
                        return this.#page.frameLocator(this.#iframe).getByTitle(this.#element)
                    } else {
                        return this.#page.frameLocator(this.#iframe).getByTitle(this.#element, this.#option)
                    }
                case TYPE.ROLE:
                    if (this.#option == null || this.#option == '' || this.#option == undefined) {
                        return this.#page.frameLocator(this.#iframe).getByRole(this.#element)
                    } else {
                        return this.#page.frameLocator(this.#iframe).getByRole(this.#element, this.#option)
                    }
                case TYPE.LABEL:
                    if (this.#option == null || this.#option == '' || this.#option == undefined) {
                        return this.#page.frameLocator(this.#iframe).getByLabel(this.#element)
                    } else {
                        return this.#page.frameLocator(this.#iframe).getByLabel(this.#element, this.#option)
                    }
                case TYPE.PLACEHOLDER:
                    if (this.#option == null || this.#option == '' || this.#option == undefined) {
                        return this.#page.frameLocator(this.#iframe).getByPlaceholder(this.#element)
                    } else {
                        return this.#page.frameLocator(this.#iframe).getByPlaceholder(this.#element, this.#option)
                    }
                case TYPE.TEXT:
                    if (this.#option == null || this.#option == '' || this.#option == undefined) {
                        return this.#page.frameLocator(this.#iframe).getByText(this.#element)
                    } else {
                        return this.#page.frameLocator(this.#iframe).getByText(this.#element, this.#option)
                    }
                case TYPE.ALT_TEXT:
                    if (this.#option == null || this.#option == '' || this.#option == undefined) {
                        return this.#page.frameLocator(this.#iframe).getByAltText(this.#element)
                    } else {
                        return this.#page.frameLocator(this.#iframe).getByAltText(this.#element, this.#option)
                    }
                case TYPE.TEST_ID:
                    return this.#page.frameLocator(this.#iframe).getByTestId(this.#element)
                default:
                    throw new Error("This find type is not define");
            }
        }
    }

    setDynamicLocator(...texts: string[]) {
        for (let text of texts) {
            this.#element = this.#element.replace("%s", text)
        }
        return this
    }

    getLocator() {
        return this.#element
    }
}