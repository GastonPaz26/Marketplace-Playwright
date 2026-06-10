import { HomePage } from '@pages/homePage';
import { test, expect } from '@fixtures/api.fixture';
import { EventsPage } from '@pages/eventsPage';
import { EventDetailsPages } from '@pages/eventDetailsPages';
import fs from 'fs';
import { MyEventsPage } from '@pages/myEventsPage';

let homePage: HomePage;
let myEventsPage: MyEventsPage;




test.beforeEach(async ({ page }) => {


    homePage = new HomePage(page);
    myEventsPage = new MyEventsPage(page);

});



test('TC-01:An user can delete a booked event successfully', async ({ page }) => {

    await homePage.goToHome()
    await expect(homePage.homeTitle).toBeVisible();
    await myEventsPage.goToMyBookingsPage();

    await myEventsPage.cancelBooking();





});