import { Home_Page } from './Flymee/Home_Page'
import { Main_Page } from './PlayWright/Main_Page'
import { test as base } from '@playwright/test'
import { Browsers } from '../supports/browsers/Browsers'
import { Navigations } from '../supports/browsers/Navigations'
import { Search_Page } from './Flymee/Search_Page'
import { Product_Detail_Page } from './Flymee/Product_Detail_Page'
import { Favourite_Page } from './Flymee/Favourite_Page'
import { Cart_Page } from './Flymee/Cart_Page'

type FixturesDefine = {
    Browser: Browsers
    Navigation: Navigations
    HomePage: Home_Page
    SearchPage: Search_Page
    MainPage: Main_Page
    ProductDetailPage: Product_Detail_Page
    FavouritePage: Favourite_Page
    CartPage: Cart_Page
}

export const test = base.extend<FixturesDefine>({
    Browser: async ({ page }, use) => {
        await use(new Browsers(page))
    },
    Navigation: async ({ page }, use) => {
        await use(new Navigations(page))
    },
    HomePage: async ({ page }, use) => {
        await use(new Home_Page(page))
    },
    SearchPage: async ({ page }, use) => {
        await use(new Search_Page(page))
    },
    ProductDetailPage: async ({ page }, use) => {
        await use(new Product_Detail_Page(page))
    },
    FavouritePage: async ({ page }, use) => {
        await use(new Favourite_Page(page))
    },
    CartPage: async ({ page }, use) => {
        await use(new Cart_Page(page))
    },
    MainPage: async ({ page }, use) => {
        await use(new Main_Page(page))
    }
})