import { APIRequestContext } from '@playwright/test';
import { env } from '../../utils/env';



interface Booking {
    id: number;
    customerName: string;
    customerEmail: string;
    customerPhone: string;
    quantity: number;
}


export interface BookingResponse {
    success: boolean;
    data: BookingData;
    message: string;
}

export interface BookingData {
    id: number;
    eventId: number;
    customerName: string;
    customerEmail: string;
    customerPhone: string;
    quantity: number;
    totalPrice: number;
    status: string;
    bookingRef: string;
    createdAt: string;
    updatedAt: string;
    event: Event;
}


export class BookingsClient {
    private readonly apiUrl: string;


    constructor(private request: APIRequestContext) {
        this.apiUrl = env.getApiURL();
    };

    async bookEvent(
        eventId: number,
        customerName: string,
        customerEmail: string,
        customerPhone: string,
        quantity: number) {
        return await this.request.post('${this.apiUrl}/bookings', {
            data: {
                eventId,
                customerName,
                customerEmail,
                customerPhone,
                quantity
            }
        });

    };

};


