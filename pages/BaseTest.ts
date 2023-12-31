import { Home_Page } from './Flymee/Home_Page'
import { Main_Page } from './PlayWright/Main_Page'
import { test as base } from '@playwright/test'
import { Browsers } from '../supports/browsers/Browsers'
import { Navigations } from '../supports/browsers/Navigations'
import { Search_Page } from './Flymee/Search_Page'
import { Product_Detail_Page } from './Flymee/Product_Detail_Page'
import { Favourite_Page } from './Flymee/Favourite_Page'
import { Cart_Page } from './Flymee/Cart_Page'
import { Register_Page } from './Flymee/Register_Page'
import { Warranty_Page } from './Flymee/Warranty_Page'
import { About_Page } from './Flymee/About_Page'
import { Category_Page } from './Flymee/Category_Page'
import { Color_Page } from './Flymee/Color_Page'

type FixturesDefine = {
    Browser: Browsers
    Navigation: Navigations
    HomePage: Home_Page
    SearchPage: Search_Page
    MainPage: Main_Page
    ProductDetailPage: Product_Detail_Page
    FavouritePage: Favourite_Page
    CartPage: Cart_Page
    RegisterPage: Register_Page
    WarrantyPage: Warranty_Page
    AboutPage: About_Page
    CategoryPage: Category_Page
    ColorPage: Color_Page
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
    RegisterPage: async ({ page }, use) => {
        await use(new Register_Page(page))
    },
    WarrantyPage: async ({ page }, use) => {
        await use(new Warranty_Page(page))
    },
    AboutPage: async ({ page }, use) => {
        await use(new About_Page(page))
    },
    CategoryPage: async ({ page }, use) => {
        await use(new Category_Page(page))
    },
    ColorPage: async ({ page }, use) => {
        await use(new Color_Page(page))
    },
    MainPage: async ({ page }, use) => {
        await use(new Main_Page(page))
    }
})