import { Locator, Page } from '@playwright/test';


export class HomePage {
    readonly page: Page;
    readonly browseEventButton: Locator;
    readonly homeTitle: Locator;


    constructor(page: Page) {
        this.page = page;
        this.browseEventButton = page.getByRole('link', { name: 'Browse Events →', exact: true });
        this.homeTitle = page.getByRole('heading', { name: 'Discover & Book' });
    }

    async goToHome() {
        await this.page.goto('/');
    }

    async clickBrowseEvents() {
        await this.browseEventButton.click();
    }


}