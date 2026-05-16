
import { Locator, Page } from '@playwright/test';

export class LoginPage {
    readonly page: Page;
    readonly emailInput: Locator;
    readonly passwordInput: Locator;
    readonly loginButton: Locator;
    readonly signInTitle: Locator;


    constructor(page: Page) {
        this.page = page;
        this.signInTitle = page.getByRole('heading', { name: 'Sign In' });
        this.emailInput = page.locator('#email');
        this.passwordInput = page.locator('#password');
        this.loginButton = page.locator('#login-btn');
    };


    async goToLoginPage() {
        await this.page.goto('/login');
    }



    async login(email: string, password: string) {

        await this.emailInput.fill(email);
        await this.passwordInput.fill(password);
        await this.loginButton.click();
    }

}
