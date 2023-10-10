import { FLYMEE_SEARCH } from '../modals/enum/flymee/flymee';
import { test } from '../pages/BaseTest';

test('has title', async ({ Navigation, MainPage }) => {
  await Navigation.visit('https://playwright.dev/')
  await MainPage.verifyHomePageTitle()
});

test('get started link', async ({ Navigation, MainPage }) => {
  await Navigation.visit('https://playwright.dev/')
  await MainPage.gotoGetStartedPage()
});

test('flymee - seach product is exist', async ({ Navigation, HomePage, SearchPage }) => {
  await test.step('Step 1: Access tp Flymee Page', async () => {
    await Navigation.visit('https://flymee.jp/')
  })

  await test.step('Step 2: Search a product', async () => {
    await HomePage.searchByProductName(FLYMEE_SEARCH.PRODUCT_NAME)
  })

  await test.step('Step 3: Verify Product is exist in search page', async () => {
    await SearchPage.verifyProductIsExist(FLYMEE_SEARCH.PRODUCT_NAME)
  })

});

test('flymee - Test Multiple Tabs', async ({ Navigation, HomePage, SearchPage, MainPage, Browser }) => {
  await test.step('Step 1: Execute verify in tab 0', async () => {
    await Navigation.visit('https://flymee.jp/')
    await HomePage.searchByProductName(FLYMEE_SEARCH.PRODUCT_NAME)
    await SearchPage.verifyProductIsExist(FLYMEE_SEARCH.PRODUCT_NAME)
  })

  await test.step('Step 2: Create new tab and go to url', async () => {
    await Browser.createNewTab('https://playwright.dev/')
  })

  const FlymeePage = await Browser.getTabByIndex(0)
  const PlayWrightPage = await Browser.getTabByIndex(1)

  await test.step('Step 3: At Tab 1, Verify Playwright', async () => {
    await MainPage.switchToMainPage(PlayWrightPage)
    await Browser.switchToFront(PlayWrightPage)
    await MainPage.gotoGetStartedPage()
  })

  await test.step('Step 3: At Tab 0, go to home page and verify again', async () => {
    await Browser.switchToFront(FlymeePage)
    await Navigation.to('https://flymee.jp/')
    await HomePage.searchByProductName(FLYMEE_SEARCH.PRODUCT_NAME)
    await SearchPage.verifyProductIsExist(FLYMEE_SEARCH.PRODUCT_NAME)
  })
});
