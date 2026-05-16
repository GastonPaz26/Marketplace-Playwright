import { APIRequestContext, expect } from '@playwright/test';
import { env } from '../../utils/env';
import { BookingPayload } from '@test-data/factories/bookingFactory';
import { BookingResponse } from '@api/models/BookingResponse';





export class BookingsClient {
    private readonly apiUrl: string;


    constructor(private request: APIRequestContext) {
        this.apiUrl = env.getApiURL();
    };


    async bookEvent(payload: BookingPayload): Promise<BookingResponse> {
        const response = await this.request.post(`${this.apiUrl}bookings`, {
            data: payload
        });

        await expect(response.status()).toBe(201);
        return response.json();

    };

};


