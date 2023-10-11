import { FLYMEE_MAIN_MENU, FLYMEE_SEARCH, FLYMEE_VERIVY } from "../../modals/enum/flymee/flymee";
import { test } from "../../pages/BaseTest";
import projectConfig from "../../supports/project-config";

test.describe('Flymee Testscript', () => {
    test('TC0001 - Verify favourite icon', async ({ Navigation, HomePage, SearchPage, ProductDetailPage }) => {
        await test.step('Step 1: Acccess to Flymee Web Application', async () => {
            await Navigation.visit(projectConfig.env.production.url)
        })

        await test.step('Step 2: Find a product anymore', async () => {
            await HomePage.searchByProductName(FLYMEE_SEARCH.PRODUCT_NAME)
        })

        await test.step('Verify Step 2: Product is exist in Search Page', async () => {
            await SearchPage.verifyProductIsExist(FLYMEE_SEARCH.PRODUCT_NAME)
        })

        await test.step('Step 3: Select that product', async () => {
            await SearchPage.selectProduction(FLYMEE_SEARCH.PRODUCT_NAME)
        })

        await test.step('Step 4: At Product Detail > Click Favourite Icon', async () => {
            await ProductDetailPage.clickFavouriteIcon()
        })

        await test.step('Verify Step 4: Favourite icon change to red', async () => {
            await ProductDetailPage.verifyFavouriteIsActive(FLYMEE_VERIVY.FAVOURITE_ACTIVE)
        })
    })

    test('TC0002 - Verify Cart Page', async ({ Navigation, HomePage, SearchPage, ProductDetailPage, FavouritePage }) => {
        await test.step('Step 1: Access to Flymee web application', async () => {
            await Navigation.visit(projectConfig.env.production.url)
        })

        await test.step('Step 2: Find a product has name ', async () => {
            await HomePage.searchByProductName(FLYMEE_SEARCH.PRODUCT_HAS_NAME)
        })

        await test.step('Step 3: At Search Page > Select that product', async () => {
            await SearchPage.selectProduction(FLYMEE_SEARCH.PRODUCT_HAS_NAME)
        })

        await test.step('Step 4: At Product Detail > Click favourite icon', async () => {
            await ProductDetailPage.clickFavouriteIcon()
        })

        await test.step('Step 5: Select Favourite in Main Menu', async () => {
            await HomePage.selectMainMenu(FLYMEE_MAIN_MENU.FAVOURITE)
        })

        await test.step('Verify Step 5: At Favourite Page > Product at Step 4 is display', async () => {
            await FavouritePage.verifyProductIsExist(FLYMEE_SEARCH.PRODUCT_HAS_NAME)
        })

        await test.step('Step 6: At Favourite Page > Delete that product', async () => {
            await FavouritePage.deleteFavouriteProduct(FLYMEE_SEARCH.PRODUCT_HAS_NAME)
        })

        await test.step('Verify Step 6: At Favourite Page > Verify message display on product', async () => {
            await FavouritePage.verifyMessageShowOnProduct(FLYMEE_SEARCH.PRODUCT_HAS_NAME, FLYMEE_VERIVY.FAVOURITE_MESSAGE_DELETED)
        })

        await test.step('Step 7: At Favourite Page > Refresh Page', async () => {
            await Navigation.refresh()
        })

        await test.step('Verify Step 7: At Favourite Page > Verify that product is not display', async () => {
            await FavouritePage.verifyProductIsNotExist(FLYMEE_SEARCH.PRODUCT_HAS_NAME)
        })
    })
})