import { test, expect } from '../../fixtures/api.fixture';

import { ShowAllEventsClient } from '../../api/clients/EventsClient';

import { BookingsClient } from '@api/clients/BookingsClient';

import { createBookingPayload } from '@test-data/factories/bookingFactory';


test('TC-API-02: User can book an event with valid data',
    async ({ authenticatedApiContext }) => {


        const showAllEventsClient =
            new ShowAllEventsClient(authenticatedApiContext);

        const responseEvent = await
            showAllEventsClient.showAllEvents(
                'Conference',
                '',
                '',
                1,
                10);

        expect(responseEvent.success).toBeTruthy();


        showAllEventsClient.assertAllEventsAreCategory(responseEvent, 'Conference');


        const selectedEvent = responseEvent.data[0];


        const bookingPayload = createBookingPayload({
            eventId: selectedEvent.id
        }

        );

        const bookingsClient = new BookingsClient(authenticatedApiContext);
        const bookingResponse = await bookingsClient.bookEvent(bookingPayload);

        expect(bookingResponse.success).toBeTruthy();

        expect(bookingResponse.data.customerName).toEqualIgnoreCase(
            bookingPayload.customerName);

        expect(bookingResponse.data.customerEmail).toEqualIgnoreCase(
            bookingPayload.customerEmail);


        expect(bookingResponse.data).toMatchObject({
            eventId: bookingPayload.eventId,
            customerPhone: bookingPayload.customerPhone,
            quantity: bookingPayload.quantity,
        });


    });
