import { HomePage } from '@pages/homePage';
import { test, expect } from '@fixtures/api.fixture';
import { EventsPage } from '@pages/eventsPage';
import { EventDetailsPages } from '@pages/eventDetailsPages';
import fs from 'fs';

let homePage: HomePage;
let eventsPage: EventsPage;


test.beforeEach(async ({ page }) => {


    homePage = new HomePage(page);
    eventsPage = new EventsPage(page);

});



test('TC-01:An user can book a new event successfully', async ({ page }) => {

    await homePage.goToHome()
    await expect(homePage.homeTitle).toBeVisible();
    await expect(homePage.browseEventButton).toBeVisible();
    await homePage.clickBrowseEvents();
    const eventDetailsPage = new EventDetailsPages(page);
    const bookNowButton = await eventsPage.getBookNowFromCard(eventsPage.eventCards);
    await bookNowButton.click();
    await eventDetailsPage.bookEvent();


    const eventTitle = await eventDetailsPage.eventTitle.textContent();

    fs.writeFileSync(
        './temp/booking.json',
        JSON.stringify({ eventTitle })
    );


});