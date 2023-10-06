import { test } from '../pages/BaseTest';
import { expect } from '@playwright/test';

test('has title', async ({ page }) => {
  await page.goto('https://playwright.dev/');

  // Expect a title "to contain" a substring.
  await expect(page).toHaveTitle(/Playwright/);
});

test('get started link', async ({ page, MainPage }) => {
  await page.goto('https://playwright.dev/');

  // Click the get started link.
  // await page.getByRole('link', { name: 'Get started' }).click();
  await MainPage.GotoGetStartedPage()

  // Expects page to have a heading with the name of Installation.
  // await expect(page.getByRole('heading', { name: 'Installation' })).toBeVisible();
});
