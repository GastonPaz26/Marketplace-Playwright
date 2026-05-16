import { Page } from '@playwright/test';

export async function waitForApiResponse(
    page: Page,
    url: string,
    method: string,
    status: number,
) {
    await page.waitForResponse(
        (response) =>
            response.url().includes(url) &&
            response.request().method() === method &&
            response.status() === status,
    );
}