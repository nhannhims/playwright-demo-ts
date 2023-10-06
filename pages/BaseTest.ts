import { Home_Page } from './Flymee/Home_Page'
import { Main_Page } from './PlayWright/Main_Page'
import { test as base } from '@playwright/test'

type FixturesDefine = {
    HomePage: Home_Page
    MainPage: Main_Page
}

export const test = base.extend<FixturesDefine>({
    HomePage: async ({ page }, use) => {
        await use(new Home_Page(page))
    },
    MainPage: async ({ page }, use) => {
        await use(new Main_Page(page))
    }
})