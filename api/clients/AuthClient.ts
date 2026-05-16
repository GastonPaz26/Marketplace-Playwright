import { APIRequestContext } from '@playwright/test';
import { env } from '../../utils/env';

export class AuthClient {
    private readonly apiUrl: string;

    constructor(private request: APIRequestContext) {
        this.apiUrl = env.getApiURL();
    }

    async register(email: string, password: string, confirmPassword: string) {
        return await this.request.post(
            `${this.apiUrl}auth/register`,
            {
                data: {
                    email,
                    password,
                    confirmPassword,
                },
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