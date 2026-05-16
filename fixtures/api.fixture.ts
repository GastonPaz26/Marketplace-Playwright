// ── IMPORTS ───────────────────────────────────────────────────────────────────

import { test as base, request, APIRequestContext } from '@playwright/test';
// test as base        → el test original de playwright, lo renombramos a base
//                       para dejar claro que lo vamos a extender con fixtures propias
// request             → permite hacer llamadas HTTP sin necesitar un browser
// APIRequestContext   → el tipo TypeScript que representa ese cliente HTTP

import dotenv from 'dotenv';
// permite leer el archivo .env y cargarlo en process.env

import { env } from '@utils/env';
// tu clase centralizada que maneja las URLs del proyecto
// evita tener process.env.API_URL disperso por todos lados

dotenv.config();
// ejecuta la carga del .env para que E2E_USER, E2E_PASS, etc. estén disponibles


// ── DEFINICIÓN DE TIPOS ───────────────────────────────────────────────────────

type ApiFixtures = {
    apiContext: APIRequestContext;              // cliente HTTP sin token
    authenticatedApiContext: APIRequestContext; // cliente HTTP con token
};
// define qué fixtures vamos a agregar al objeto test
// es solo una declaración de tipos para TypeScript, no ejecuta nada


// ── EXTENSIÓN DEL TEST ────────────────────────────────────────────────────────

export const test = base.extend<ApiFixtures>({
    // crea un nuevo `test` que hereda todo lo de playwright
    // y agrega las dos fixtures definidas arriba
    // los tests que importen este `test` tendrán acceso a apiContext
    // y authenticatedApiContext como parámetros


    // ── FIXTURE 1: cliente sin autenticación ─────────────────────────────────
    // útil para testear endpoints públicos: login, registro, etc.

    apiContext: async ({ }, use) => {
        //            └── {} vacío porque no depende de otras fixtures

        const context = await request.newContext({
            baseURL: env.getApiURL(),
            // usa tu clase env para obtener la URL base de la API
            // todas las requests van a usar esta URL como prefijo

            extraHTTPHeaders: {
                'Content-Type': 'application/json',
                // indica que el body de las requests es JSON
                // se aplica automáticamente a todas las requests de este contexto
            },
        });

        await use(context);
        // ▲ todo lo de ARRIBA es el SETUP (corre antes del test)
        // ▼ todo lo de ABAJO es el TEARDOWN (corre después del test)

        await context.dispose();
        // cierra el cliente HTTP y libera los recursos al terminar el test
    },


    // ── FIXTURE 2: cliente con autenticación ─────────────────────────────────
    // útil para testear endpoints protegidos: eventos, reservas, pagos, etc.

    authenticatedApiContext: async ({ }, use) => {

        // PASO 1: login temporal para obtener el token ───────────────────────

        const tempContext = await request.newContext({
            baseURL: env.getApiURL(),
            // contexto temporal, solo sirve para hacer el login
            // no tiene headers extra porque todavía no tenemos el token
        });
        console.log('API URL:', env.getApiURL());
        console.log('ENV API_URL:', process.env.API_URL);
        const response = await tempContext.post('auth/login', {
            data: {
                email: process.env.USER_EMAIL,    // credenciales del .env
                password: process.env.USER_PASSWORD, // nunca hardcodeadas en el código
            },
        });
        // hace POST a /api/students/login con las credenciales
        // equivalente a un fetch() o axios.post()

        const { token } = await response.json();
        // extrae el token del body de la respuesta
        // asume que la API devuelve algo como: { token: "eyJhbGci..." }
        // ajustá el destructuring según lo que devuelva tu API

        await tempContext.dispose();
        // ya obtuvimos el token, el contexto temporal ya no sirve


        // PASO 2: cliente definitivo con el token ────────────────────────────

        const context = await request.newContext({
            baseURL: env.getApiURL(),
            // misma URL base centralizada

            extraHTTPHeaders: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`,
                // adjunta el token en cada request automáticamente
                // la API lo lee y sabe que el usuario está autenticado
                // formato estándar: "Bearer eyJhbGci..."
            },
        });

        await use(context);
        // pasa el cliente autenticado al test
        // ▲ SETUP  ▼ TEARDOWN

        await context.dispose();
        // limpia el cliente autenticado al terminar el test
    },


}


);







// ── EXPORTS ───────────────────────────────────────────────────────────────────

export const expect = test.expect;
// re-exporta expect para que los tests importen todo desde un solo lugar:
// import { test, expect } from '@fixtures/api.fixture'
// en vez de mezclar imports de @playwright/test y del fixture