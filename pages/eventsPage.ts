import { Locator, Page } from '@playwright/test';
export class EventsPage {

    readonly page: Page;
    readonly bookNowButtons: Locator;
    readonly upcomingEventsTitle: Locator;

    readonly eventCards: Locator;

    constructor(page: Page) {
        const randomIndex = Math.floor(Math.random() * 3)

        this.page = page;
        this.upcomingEventsTitle = page.getByRole('heading', { name: 'Upcoming Events' });
        this.bookNowButtons = page.getByRole('link', { name: 'Book Now' })
        this.eventCards = page.locator('[data-testid="event-card"]').nth(randomIndex);
        ;
    };

    async goToEventsPage() {
        await this.page.goto('/events');
    }


    async getPriceFromCard(card: Locator): Promise<Locator> {
        return card.locator('[data-testid="book-now-btn"]');
    }


    async getBookNowFromCard(card: Locator): Promise<Locator> {
        return card.locator('[data-testid="book-now-btn"]');
    }






}