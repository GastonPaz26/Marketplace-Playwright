import { url } from "inspector/promises";

export class env {
    // Centraliza las URLs para que todo el proyecto las use
    public static getBaseURL(): string {
        const raw =
            process.env.PLAYWRIGHT_TEST_BASE_URL ||
            process.env.BASE_URL ||
            'https://eventhub.rahulshettyacademy.com';
        let url: URL;
        try {
            url = raw.startsWith('http') ? new URL(raw) : new URL(`https://${raw}`);
        } catch {
            url = new URL('https://eventhub.rahulshettyacademy.com');
        }
        url.protocol = 'https:';
        return url.origin;
    }

    public static getApiURL(): string {
        const API_URL = process.env.API_URL || 'https://api.eventhub.rahulshettyacademy.com/';
        return API_URL.endsWith('/') ? API_URL : `${API_URL}/`;

    }
};