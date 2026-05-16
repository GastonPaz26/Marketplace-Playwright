import { test, expect } from '@playwright/test';
import dotenv from 'dotenv';
import { LoginPage } from '@pages/loginPage';
import { HomePage } from '@pages/homePage';

dotenv.config({ path: `.env.${process.env.ENVIRONMENT}` }); // Load environment variables from the appropriate .env file based on the ENVIRONMENT variable

test.use({ storageState: { cookies: [], origins: [] } });
let loginPage: LoginPage;
let homePage: HomePage;

test.beforeEach(async ({ page }) => {
    await page.goto('/')
    loginPage = new LoginPage(page);
    homePage = new HomePage(page);

});



test('TC-01: An user can login successfully', async ({ page }) => {
    await loginPage.goToLoginPage();
    await expect(loginPage.signInTitle).toBeVisible(); // Validate that we are on the login page
    await loginPage.login(
        process.env.USER_EMAIL!,
        process.env.USER_PASSWORD!
    );
    await expect(homePage.homeTitle).toBeVisible(); // validate that we are on the home page after login
});