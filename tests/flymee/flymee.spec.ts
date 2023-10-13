import { FLYMEE_MAIN_MENU, FLYMEE_NAV, FLYMEE_SEARCH, FLYMEE_TEST_DATA, FLYMEE_VERIVY } from '../../modals/enum/flymee/flymee'
import { test } from '../../pages/BaseTest'
import projectConfig from '../../supports/project-config'

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

    test('TC0003 - Verify Product in Cart Page is correct', async ({ Navigation, HomePage, SearchPage, ProductDetailPage, CartPage }) => {
        await test.step('Step 1 - Access to Flymee web application', async () => {
            await Navigation.visit(projectConfig.env.production.url)
        })

        await test.step('Step 2 - Find a product has name', async () => {
            await HomePage.searchByProductName(FLYMEE_SEARCH.PRODUCT_HAS_NAME)
        })

        await test.step('Step 3 - Select that product & select quantity is 1', async () => {
            await SearchPage.selectProduction(FLYMEE_SEARCH.PRODUCT_HAS_NAME)
            await ProductDetailPage.setQuantity(1)
        })

        await test.step('Step 4 - Click [Add to cart] button', async () => {
            await ProductDetailPage.clickAddToCart()
        })

        await test.step('Verify Step 4 - Product, Quantity & Price same as before add to cart', async () => {
            await CartPage.verifyProductIsExit(FLYMEE_TEST_DATA.DATA1.PRODUCT_NAME)
            await CartPage.verifyQuantityProductIsCorrect(FLYMEE_TEST_DATA.DATA1.PRODUCT_NAME, 1)
            await CartPage.verifyPriceProductIsCorrect(FLYMEE_TEST_DATA.DATA1.PRODUCT_NAME, FLYMEE_TEST_DATA.DATA1.PRODUCT_PRICE)
        })
    })

    test('TC0004 - Verify the product is deleted in Cart Page', async ({ Navigation, HomePage, SearchPage, ProductDetailPage, CartPage }) => {
        await test.step('Step 1 - Access to Flymee web application', async () => {
            await Navigation.visit(projectConfig.env.production.url)
        })

        await test.step('Step 2 - Find a product has name', async () => {
            await HomePage.searchByProductName(FLYMEE_SEARCH.PRODUCT_HAS_NAME)
        })

        await test.step('Step 3 - Select that product & select quantity is 1', async () => {
            await SearchPage.selectProduction(FLYMEE_SEARCH.PRODUCT_HAS_NAME)
            await ProductDetailPage.setQuantity(1)
        })

        await test.step('Step 4 - Click [Add to cart] button', async () => {
            await ProductDetailPage.clickAddToCart()
        })

        await test.step('Step 5 - Click Delete hyperlink on that product', async () => {
            await CartPage.verifyProductIsExit(FLYMEE_TEST_DATA.DATA1.PRODUCT_NAME)
            await CartPage.clickDeleteProduct(FLYMEE_TEST_DATA.DATA1.PRODUCT_NAME)
        })

        await test.step('Step 6 - Incase only one product in cart', async () => {
            await CartPage.verifyMessageNoProductIsDisplay(FLYMEE_VERIVY.CART_NO_PRODUCT)
            await CartPage.verifyProductIsNotExist(FLYMEE_TEST_DATA.DATA1.PRODUCT_NAME)
        })

        await test.step('Step 6 - Incase more one product in cart', async () => {
            await Navigation.to(projectConfig.env.production.url)
            await HomePage.searchByProductName(FLYMEE_TEST_DATA.DATA1.PRODUCT_NAME)
            await SearchPage.selectProduction(FLYMEE_TEST_DATA.DATA1.PRODUCT_NAME)
            await ProductDetailPage.AddProductToCard(1)

            await Navigation.to(projectConfig.env.production.url)
            await HomePage.searchByProductName(FLYMEE_TEST_DATA.DATA2.PRODUCT_NAME)
            await SearchPage.selectProduction(FLYMEE_TEST_DATA.DATA2.PRODUCT_NAME)
            await ProductDetailPage.AddProductToCard(1)

            await CartPage.verifyProductIsExit(FLYMEE_TEST_DATA.DATA1.PRODUCT_NAME)
            await CartPage.verifyProductIsExit(FLYMEE_TEST_DATA.DATA2.PRODUCT_NAME)
            await CartPage.clickDeleteProduct(FLYMEE_TEST_DATA.DATA1.PRODUCT_NAME)

            await CartPage.verifyMessageNoProductIsNotDisplay(FLYMEE_VERIVY.CART_NO_PRODUCT)
            await CartPage.verifyProductIsNotExist(FLYMEE_TEST_DATA.DATA1.PRODUCT_NAME)
        })
    })

    test('TC0005 - Verify Register Page is Display & URL incase go to at Home Page', async ({ Navigation, HomePage, RegisterPage }) => {
        await test.step('Step 1 - Access to Flymee web application', async () => {
            await Navigation.visit(projectConfig.env.production.url)
        })

        await test.step('Step 2 - Click Hyperlink Register on Main menu', async () => {
            await HomePage.selectMainMenu(FLYMEE_MAIN_MENU.MEMBER_REGISTRATION)
        })

        await test.step('Verify Step 2 - Verify Register Screen & URL', async () => {
            await RegisterPage.verifyUrlHas(FLYMEE_VERIVY.REGISTER_URL)
            await RegisterPage.verifyTitleIsDisplay()
        })
    })

    test('TC0006 - Verify Register Page & URL Incase go to at Cart page', async ({ Navigation, HomePage, SearchPage, ProductDetailPage, CartPage, RegisterPage }) => {
        await test.step('Step 1 - Access to Flymee web application', async () => {
            await Navigation.visit(projectConfig.env.production.url)
        })

        await test.step('Step 2 - Find a product has name', async () => {
            await HomePage.searchByProductName(FLYMEE_SEARCH.PRODUCT_HAS_NAME)
        })

        await test.step('Step 3 - Select that product & select quantity', async () => {
            await SearchPage.selectProduction(FLYMEE_SEARCH.PRODUCT_HAS_NAME)
            await ProductDetailPage.setQuantity(1)
        })

        await test.step('Step 4 - Click [Add to cart] button', async () => {
            await ProductDetailPage.clickAddToCart()
        })

        await test.step('Step 5 - Click [Register] hyperlink', async () => {
            await CartPage.clickRegisterHyperlink()
        })

        await test.step('Verify Step 5 - Verify Register screen & URL', async () => {
            await RegisterPage.verifyUrlHas(FLYMEE_VERIVY.REGISTER_URL)
            await RegisterPage.verifyTitleIsDisplay()
        })
    })

    test('TC0007 - Verify Warranty Page & Content', async ({ Navigation, HomePage, SearchPage, ProductDetailPage, WarrantyPage }) => {
        await test.step('Step 1 - Access to Flymee web application', async () => {
            await Navigation.visit(projectConfig.env.production.url)
        })

        await test.step('Step 2 - Find a product has name', async () => {
            await HomePage.searchByProductName(FLYMEE_SEARCH.PRODUCT_HAS_NAME)
        })

        await test.step('Step 3 - Select that product', async () => {
            await SearchPage.selectProduction(FLYMEE_SEARCH.PRODUCT_HAS_NAME)
        })

        await test.step('Step 4 - Click [About Warranty] hyperlink', async () => {
            await ProductDetailPage.clickAboutWarrantyHyperlink()
        })

        await test.step('Verify Step 4 - Verify Warranty Screen & Content', async () => {
            await WarrantyPage.verifyWarrantyTitle()
            await WarrantyPage.verifyWarrantyContent(FLYMEE_VERIVY.WARRANTY_CONTENT)
        })
    })

    test('TC0008 - Verify About Page & Content', async ({ Navigation, HomePage, SearchPage, ProductDetailPage, CartPage, AboutPage, Browser }) => {
        await test.step('Step 1 - Access to Flymee web application', async () => {
            await Navigation.visit(projectConfig.env.production.url)
        })

        await test.step('Step 2 - Find a product has name', async () => {
            await HomePage.searchByProductName(FLYMEE_SEARCH.PRODUCT_HAS_NAME)
        })

        await test.step('Step 3 - Select that product & select quantity', async () => {
            await SearchPage.selectProduction(FLYMEE_SEARCH.PRODUCT_HAS_NAME)
        })

        await test.step('Step 4 - Click [Add to cart] button', async () => {
            await ProductDetailPage.AddProductToCard(1)
        })

        await test.step('Step 5 - Click [About ...] hyperlink', async () => {
            await CartPage.clickAboutHyperlink()
        })

        await test.step('Verify Step 5 - Verify About Title & Content', async () => {
            let page = await Browser.getNewTab()
            await Browser.switchToFront(page)
            await AboutPage.switchToNewPage(page)
            await AboutPage.verifyAboutPageTitleIsDisplay()
            await AboutPage.verifyAboutPageContentIsDisplay()
        })
    })

    test('TC0009 - Verify Total Price In Cart', async ({ Navigation, HomePage, SearchPage, ProductDetailPage, CartPage }) => {
        await test.step('Step 1 - Access to Flymee web application', async () => {
            await Navigation.visit(projectConfig.env.production.url)
        })

        await test.step('Step 2 - Find a product has name', async () => {
            await HomePage.searchByProductName(FLYMEE_SEARCH.PRODUCT_HAS_NAME)
        })

        await test.step('Step 3 - Select that product', async () => {
            await SearchPage.selectProduction(FLYMEE_SEARCH.PRODUCT_HAS_NAME)
        })

        await test.step('Step 4 - Click [Add to cart] button', async () => {
            await ProductDetailPage.AddProductToCard(1)
        })

        await test.step('Step 5 - Click Image of that product', async () => {
            await CartPage.selectProduct(FLYMEE_SEARCH.PRODUCT_HAS_NAME)
        })

        await test.step('Step 6 - Select quantity is 4 and click [Add to cart]', async () => {
            await ProductDetailPage.AddProductToCard(4)
        })

        await test.step('Verify Step 6 - Verify Quantity is updated and Total Price', async () => {
            await CartPage.verifyQuantityProductIsCorrect(FLYMEE_SEARCH.PRODUCT_HAS_NAME, 5)
            await CartPage.verifyTotalPriceIsCorrect(5, FLYMEE_TEST_DATA.DATA1.PRODUCT_PRICE)
        })
    })

    test('TC0010 - Verify Category Name Display', async ({ Navigation, HomePage, CategoryPage }) => {
        await test.step('Step 1 - Access to Flymee web application', async () => {
            await Navigation.visit(projectConfig.env.production.url)
        })

        await test.step('Step 2 - Select [Tableware] in [Category] menu', async () => {
            await HomePage.selectNavigationMenu(FLYMEE_NAV.CATEGORY.NAME, FLYMEE_NAV.CATEGORY.OPTION.TABLEWARE)
        })

        await test.step('Step 3 - Verify Category Screen has title & condition filter is correct', async () => {
            await CategoryPage.verifyCategoryTitleIsCorrect(FLYMEE_VERIVY.CATEGORY_TITLE.TABLEWARE)
            await CategoryPage.verifyCategoryFilterConditionIsCorrect(FLYMEE_VERIVY.CATEGORY_FILTER.TABLEWARE)
        })
    })

    test('TC0011 - Verify Color Name Display', async ({ Navigation, HomePage, ColorPage }) => {
        await test.step('Step 1 - Access to Flymee web application', async () => {
            await Navigation.visit(projectConfig.env.production.url)
        })

        await test.step('Step 2 - Select [Yellow] in [Color] menu', async () => {
            await HomePage.selectNavigationMenu(FLYMEE_NAV.COLOR.NAME, FLYMEE_NAV.COLOR.OPTION.YELLOW)
        })

        await test.step('Step 3 - Verify Color Screen has title & condition filter is correct', async () => {
            await ColorPage.verifyColorTitleIsCorrect(FLYMEE_VERIVY.COLOR_TITLE.YELLOW)
            await ColorPage.verifyColorFilterConditionIsCorrect(FLYMEE_VERIVY.COLOR_FILTER.YELLOW)
        })
    })
})