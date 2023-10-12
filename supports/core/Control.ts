import projectConfig from "../project-config";
import { assertEqual } from "./BaseAssert";
import { BaseControl } from "./BaseControl";

export class Control extends BaseControl {
    async click(delay?: number) {
        if (delay == undefined || delay == 0) {
            delay = projectConfig.project.delay
        } else {
            delay = delay
        }
        await this.hover()
        await this.get().click({ button: 'left', delay: delay })
    }

    async countClick(num: number, delay?: number) {
        if (delay == undefined || delay == 0) {
            delay = projectConfig.project.delay
        } else {
            delay = delay
        }
        await this.hover()
        await this.get().click({ button: 'left', delay: delay, clickCount: num })
    }

    async forceClick(delay?: number) {
        if (delay == undefined || delay == 0) {
            delay = projectConfig.project.delay
        } else {
            delay = delay
        }
        await this.get().click({ button: 'left', force: true, delay: delay })
    }

    async rightClick(delay?: number) {
        if (delay == undefined || delay == 0) {
            delay = projectConfig.project.delay
        } else {
            delay = delay
        }
        await this.get().click({ button: 'right', delay: delay })
    }

    async doubleClick(delay?: number) {
        if (delay == undefined || delay == 0) {
            delay = projectConfig.project.delay
        } else {
            delay = delay
        }
        await this.get().dblclick({ button: 'left', delay: delay })
    }

    async type(text: string) {
        await this.get().fill(text)
    }

    async keyboardType(text: string, delay?: number) {
        if (delay == undefined || delay == 0) {
            delay = projectConfig.project.delay
        } else {
            delay = delay
        }
        await this.get().pressSequentially(text, { delay: delay })
    }

    async forceType(text: string) {
        await this.get().fill(text, { force: true })
    }

    async press(key: string, delay?: number) {
        if (delay == undefined || delay == 0) {
            delay = projectConfig.project.delay
        } else {
            delay = delay
        }
        await this.get().press(key, { delay: delay })
    }

    async hover() {
        await this.get().hover()
    }

    async getText() {
        let text = await this.get().innerText()
        return text
    }

    async getAttribute(name: string) {
        let text = await this.get().getAttribute(name)
        return text
    }

    async isNotVisible() {
        let num = await this.get().count()
        let isExist = false
        if (num === 0) {
            isExist = true
        }
        return isExist
    }

    async waitForNotVisible(timeout: number) {
        let num = Math.round(timeout / 1000)
        for (let i = 0; i < num; i++) {
            if (await this.isNotVisible()) {
                break
            } else {
                await this.get().page().waitForTimeout(1000)
            }
        }
        await assertEqual(await this.isNotVisible(), true)
    }
}