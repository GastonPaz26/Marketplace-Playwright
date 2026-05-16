import { test, expect } from '../../fixtures/api.fixture';

import { ShowAllEventsClient } from '../../api/clients/EventsClient';

import { BookingsClient } from '@api/clients/BookingsClient';

import { createBookingPayload } from '@test-data/factories/bookingFactory';


test('TC-API-02: User can book an event with valid data',
    async ({ authenticatedApiContext }) => {


        const showAllEventsClient = new ShowAllEventsClient(authenticatedApiContext);

        const responseEvent = await showAllEventsClient.showAllEvents('Conference', '', '', 1, 10);
        expect(responseEvent.success).toBeTruthy();
        expect(responseEvent.data[0].category).toBe('Conference');
        const bookingsClient = new BookingsClient(authenticatedApiContext);
        const bookingPayload = createBookingPayload();
        await bookingsClient.bookEvent(bookingPayload);






    });




