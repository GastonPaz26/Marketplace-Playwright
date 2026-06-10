import { Locator, Page } from "@playwright/test";
import { EventDetailsPages } from "./eventDetailsPages";
import fs from 'fs';

export class MyEventsPage {
    readonly page: Page;
    readonly cancelBookingButton: Locator;
    readonly bookingName: Locator;


    constructor(page: Page) {
        this.page = page;
        this.cancelBookingButton = page.locator('#cancel-booking-btn')
        this.bookingName = EventDetailsPages.prototype.eventNameInput;


    };

    async goToMyBookingsPage() {
        await this.page.goto('/bookings');
    };


    async cancelBooking() {

        const data = JSON.parse(
            fs.readFileSync('./temp/booking.json', 'utf8')
        );

        const eventTitle = data.eventTitle;

        await this.page
            .getByTestId('booking-card')
            .filter({
                hasText: eventTitle
            })
            .first()
            .getByTestId('cancel-booking-btn')
            .click();
    }



}