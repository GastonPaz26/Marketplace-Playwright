import { APIRequestContext } from '@playwright/test';
import { env } from '../../utils/env';
import { BookingPayload } from '@test-data/factories/bookingFactory';


export class AuthClient {
    private readonly apiUrl: string;

    constructor(private request: APIRequestContext) {
        this.apiUrl = env.getApiURL();
    }

    async register(newUserPayload: BookingPayload) {

        const newUser = {
            customerEmail: newUserPayload.customerEmail,
            password: newUserPayload.password,
            confirmPassword: newUserPayload.confirmPassword,

            // valores fijos
            role: 'customer',
        };

        return await this.request.post(
            `${this.apiUrl}auth/register`,
            {
                data: newUser,
            }
        );
    }

    async login(
        email: string,
        password: string


    ) {
        return await this.request.post(
            `${this.apiUrl}auth/login`,
            {
                data: {
                    email,
                    password,
                },
            }
        );
    }
}