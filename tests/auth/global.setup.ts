// auth/global.setup.ts
import { test as setup, expect } from '@playwright/test';
import fs from 'fs';
import path from 'path';
import dotenv from 'dotenv';
import { LoginPage } from '@pages/loginPage';
import { waitForApiResponse } from '@utils/networkUtils';

dotenv.config();

const authStatePath =
    process.env.AUTH_STATE_PATH ?? path.join(process.cwd(), 'assets', 'auth', 'state.json');

setup('generar sesión autenticada', async ({ page }) => {
    // Si ya existe un estado guardado, no hace falta regenerarlo
    if (fs.existsSync(authStatePath)) {
        console.log('✔ Estado de sesión ya existe, se omite el login.');
        return;
    }

    const email = process.env.USER_EMAIL;
    const password = process.env.USER_PASSWORD;

    if (!email || !password) {
        throw new Error('Debes configurar USER_EMAIL y USER_PASSWORD en el .env');
    }

    const loginPage = new LoginPage(page);

    await loginPage.goToLoginPage();
    await loginPage.login();
    await waitForApiResponse(page, '/auth/login', 'POST', 200);

    // Asegura que el directorio exista y guarda el estado
    fs.mkdirSync(path.dirname(authStatePath), { recursive: true });
    await page.context().storageState({ path: authStatePath });

    console.log(`✔ Estado de sesión guardado en: ${authStatePath}`);
});