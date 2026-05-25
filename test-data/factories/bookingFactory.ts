// test-data/factories/bookingFactory.ts

import { faker } from '@faker-js/faker/locale/en';


export interface BookingPayload {
    eventId: number;
    customerName: string;
    customerEmail: string;
    customerPhone: string;
    quantity: number;
    password: string;
    confirmPassword: string;
}


export const createBookingPayload = (
    overrides: Partial<BookingPayload> = {}
): BookingPayload => {
    const password = faker.internet.password();



    return {
        eventId: faker.number.int({ min: 1, max: 3 }),
        customerName: faker.person.fullName(),
        customerEmail: generateGmail(),
        customerPhone: `+${faker.string.numeric(11)}`,
        quantity: faker.number.int({ min: 1, max: 3 }),
        password: password,
        confirmPassword: password,




        ...overrides
    };


};

export function generateGmail() {
    return `test@gmail.com`;
}
