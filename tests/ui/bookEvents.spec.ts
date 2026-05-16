import { HomePage } from '@pages/homePage';
import { test, expect } from '@fixtures/api.fixture';





let homePage: HomePage;

test.beforeEach(async ({ page }) => {
    await page.goto('/')

    homePage = new HomePage(page);

});



test('TC-01:An user can book a new event successfully', async ({ page }) => {

    await homePage.goToHome()
    await expect(homePage.homeTitle).toBeVisible();
    await expect(homePage.browseEventButton).toBeVisible();
    await homePage.clickBrowseEvents();




});