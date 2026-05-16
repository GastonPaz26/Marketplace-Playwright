// test-data/factories/bookingFactory.ts

import { faker } from '@faker-js/faker/locale/en';


export interface BookingPayload {
    eventId: number;
    customerName: string;
    customerEmail: string;
    customerPhone: string;
    quantity: number;
}

export const createBookingPayload = (
    overrides: Partial<BookingPayload> = {}
): BookingPayload => {
    return {
        eventId: faker.number.int({ min: 1, max: 3 }),
        customerName: faker.person.fullName(),
        customerEmail: faker.internet.email(),
        customerPhone: `+${faker.string.numeric(11)}`,
        quantity: faker.number.int({ min: 1, max: 10 }),

        ...overrides
    };
};