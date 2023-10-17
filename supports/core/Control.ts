import projectConfig from "../project-config";
import { assertEqual } from "./BaseAssert";
import { BaseControl } from "./BaseControl";

export class Control extends BaseControl {
    /**
     * Execute Click Element
     * @param delay : (Optional) Delay time (Default: Get from to Project Config)
     */
    async click(delay?: number) {
        if (delay == undefined || delay == 0) {
            delay = projectConfig.project.setting.delay
        } else {
            delay = delay
        }
        await this.hover()
        await this.get().click({ button: 'left', delay: delay })
    }

    /**
     * Execute Click Element more time by num option
     * @param num : Num of Click you want
     * @param delay : (Optional) Delay time (Default: Get from to Project Config)
     */
    async clickCount(num: number, delay?: number) {
        if (delay == undefined || delay == 0) {
            delay = projectConfig.project.setting.delay
        } else {
            delay = delay
        }
        await this.hover()
        await this.get().click({ button: 'left', delay: delay, clickCount: num })
    }

    /**
     * Execute Click Element Incase Element is cover by another element
     * @param delay : (Optional) Delay time (Default: Get from to Project Config)
     */
    async forceClick(delay?: number) {
        if (delay == undefined || delay == 0) {
            delay = projectConfig.project.setting.delay
        } else {
            delay = delay
        }
        await this.get().click({ button: 'left', force: true, delay: delay })
    }

    /**
     * Execute Right Click Element
     * @param delay : (Optional) Delay time (Default: Get from to Project Config)
     */
    async rightClick(delay?: number) {
        if (delay == undefined || delay == 0) {
            delay = projectConfig.project.setting.delay
        } else {
            delay = delay
        }
        await this.get().click({ button: 'right', delay: delay })
    }

    /**
     * Execute Double Click Element
     * @param delay : (Optional) Delay time (Default: Get from to Project Config)
     */
    async doubleClick(delay?: number) {
        if (delay == undefined || delay == 0) {
            delay = projectConfig.project.setting.delay
        } else {
            delay = delay
        }
        await this.get().dblclick({ button: 'left', delay: delay })
    }

    /**
     * Execute type text to element (Textbox/Textarea)
     * @param text : The Text to input
     */
    async type(text: string) {
        await this.get().fill(text)
    }

    /**
     * Execute Type Text By Keyboard (Textbox/Textarea)
     * @param text : The Text to input
     * @param delay : (Optional) Delay time (Default: Get from to Project Config)
     */
    async keyboardType(text: string, delay?: number) {
        if (delay == undefined || delay == 0) {
            delay = projectConfig.project.setting.delay
        } else {
            delay = delay
        }
        await this.get().pressSequentially(text, { delay: delay })
    }

    /**
     * Execute Type text into element (Textbox/Textarea) incase the element is cover by another element
     * @param text : The text to input
     */
    async forceType(text: string) {
        await this.get().fill(text, { force: true })
    }

    /**
     * Execute Press Key in Keyboard
     * @param key : Keyboard Key like Enter, Backspace ...
     * @param delay : (Optional) Delay time (Default: Get from to Project Config)
     */
    async press(key: string, delay?: number) {
        if (delay == undefined || delay == 0) {
            delay = projectConfig.project.setting.delay
        } else {
            delay = delay
        }
        await this.get().press(key, { delay: delay })
    }

    /**
     * Execute Hover to Element
     */
    async hover() {
        await this.get().hover()
    }

    /**
     * Execute Get Text to element
     * @returns : Result when get text to element
     */
    async getText() {
        let text = await this.get().innerText()
        return text
    }

    /**
     * Execute Get Result to Attribute
     * @param name : Name of Attribute - You can get from Setting.ts > ATTR
     * @returns : Result when get Attribute
     */
    async getAttribute(name: string) {
        let text = await this.get().getAttribute(name)
        return text
    }

    /**
     * Check element is visible or not
     * @returns : Return true: if element visible, false: if element not visible
     */
    async isVisible() {
        return await this.get().isVisible()
    }

    /**
     * Execute Wait Element Not Visible
     * @param timeout : Time wait element not visible
     */
    async waitForNotVisible(timeout: number) {
        let num = Math.round(timeout / 1000)
        for (let i = 0; i < num; i++) {
            if (await this.isVisible() == false) {
                break
            } else {
                await this.get().page().waitForTimeout(1000)
            }
        }
        await assertEqual(await this.isVisible(), false)
    }

    /**
     * Execute wait element visible
     * @param timeout : Time wait element visible
     */
    async waitForVisible(timeout: number) {
        let num = Math.round(timeout / 1000)
        for (let i = 0; i < num; i++) {
            if (await this.isVisible()) {
                break
            } else {
                await this.get().page().waitForTimeout(1000)
            }
        }
        await assertEqual(await this.isVisible(), true)
    }
}