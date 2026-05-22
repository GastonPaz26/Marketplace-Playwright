import { Page } from "@playwright/test";


export const mockRegisterSuccess = {
    status: () => 201,
    json: async () => ({
        success: true,
        token: 'fake-token',
        user: {
            id: 1,
            email: 'student@gmail.com'
        }
    })
};

