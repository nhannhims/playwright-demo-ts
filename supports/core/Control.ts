import { BaseControl } from "./BaseControl";

export class Control extends BaseControl {
    async click() {
        await this.hover()
        await this.get().click({ button: 'left', delay: 200 })
    }

    async forceClick() {
        await this.get().click({ button: 'left', force: true, delay: 200 })
    }

    async rightClick() {
        await this.get().click({ button: 'right', delay: 200 })
    }

    async doubleClick() {
        await this.get().dblclick({ button: 'left', delay: 200 })
    }

    async type(text: string) {
        await this.get().fill(text)
    }

    async keyboardType(text: string) {
        await this.get().pressSequentially(text, { delay: 100 })
    }

    async forceType(text: string) {
        await this.get().fill(text, { force: true })
    }

    async press(key: string) {
        await this.get().press(key, { delay: 200 })
    }

    async hover() {
        await this.get().hover()
    }

    async getText(){
        let text = await this.get().innerText()
        return text
    }

    async getAttribute(name: string) {
        let text = await this.get().getAttribute(name)
        return text
    }

    async checkInVisible() {
        let num = await this.get().count()
        let isExist = false
        if (num === 0) {
            isExist = true
        }
        return isExist
    }
}