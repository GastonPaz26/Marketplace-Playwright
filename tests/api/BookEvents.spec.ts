import { test, expect } from '../../fixtures/api.fixture';

import { ShowAllEventsClient } from '../../api/clients/EventsClient';
import { env } from '@utils/env';
import { BookingsClient } from '@api/clients/BookingsClient';


test('TC-API-02: User can book an event with valid data',
    async ({ authenticatedApiContext }) => {


        const showAllEventsClient = new ShowAllEventsClient(authenticatedApiContext);

        const responseEvent = await showAllEventsClient.showAllEvents('Conference', '', '', 1, 10);
        expect(responseEvent.data).toBe(200);

        expect(showAllEventsClient.assertAllEventsAreCategory(responseEvent, 'Conference')).toBeTruthy();
        const bookingsClient = new BookingsClient(authenticatedApiContext);

        const bookingResponse = await bookingsClient.bookEvent(1, 'John Doe', 'john.doe@example.com', '123-456-7890', 2);
        bookingsClient.bookEvent(1, 'John Doe', 'john.doe@example.com', '123-456-7890', 2);
        expect(bookingResponse.status()).toBe(200);
        expect


    });




