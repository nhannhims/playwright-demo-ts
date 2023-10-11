import { Locator, expect } from '@playwright/test'

expect.extend({
    toBeNotVisible: async (locator: Locator) => {
        let actual = await locator.count()
        let isValid = false
        if (actual.toString() == "0") {
            isValid = true
        }
        return isValid
    }
})