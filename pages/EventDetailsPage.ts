import { BookingsClient } from '@api/clients/BookingsClient';
import { expect } from '@fixtures/api.fixture';
import { Locator, Page } from '@playwright/test';
import { createBookingPayload } from '@test-data/factories/bookingFactory';

export class EventDetailsPage {
    readonly page: Page;
    readonly eventTitle: Locator;
    readonly eventNameInput: Locator;
    readonly eventEmailInput: Locator;
    readonly eventPhoneInput: Locator;
    readonly increaseTicketButton: Locator;
    readonly decreaseTicketButton: Locator;
    readonly ticketCount: Locator;
    readonly confirmbutton: Locator;
    readonly SuccessMessage: Locator;

    constructor(page: Page) {
        this.page = page;
        this.eventTitle = page.getByRole('heading', { level: 1 });
        this.eventNameInput = page.locator('#customerName');
        this.eventEmailInput = page.locator('#customer-email');
        this.eventPhoneInput = page.locator('#phone');
        this.increaseTicketButton = page.getByRole('button', { name: '+' });
        this.decreaseTicketButton = page.getByRole('button', { name: '−' });
        this.ticketCount = page.locator('#ticket-count');
        this.confirmbutton = page.locator('#confirm-booking');
        this.SuccessMessage = page.getByRole('heading', { name: /Booking Confirmed!/ });

    };


    async goToEventDetailsPage(eventId: string) {
        await this.page.goto(`/events/${eventId}`);
    }

    async bookEvent() {
        const bookingData = createBookingPayload()
        await this.eventNameInput.fill(bookingData.customerName);
        await this.eventEmailInput.fill(bookingData.customerEmail);
        await this.eventPhoneInput.fill(bookingData.customerPhone);
        for (let i = 1; i < bookingData.quantity; i++) {
            await this.increaseTicketButton.click();
        }
        await this.confirmbutton.click();
        await expect(this.SuccessMessage).toBeVisible();



    }

}