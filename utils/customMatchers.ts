import { expect } from '@playwright/test';

expect.extend({

    toEqualIgnoreCase(received: string, expected: string) {

        const pass =
            received.trim().toLowerCase() ===
            expected.trim().toLowerCase();

        if (pass) {
            return {
                pass: true,
                message: () =>
                    `expected "${received}" not to equal "${expected}" ignoring case`
            };
        }

        return {
            pass: false,
            message: () =>
                `expected "${received}" to equal "${expected}" ignoring case`
        };
    }

});