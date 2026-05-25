- **CI/CD Integrado:** Flujos automatizados con GitHub Actions.
- **Calidad de Código:** Git Hooks con Husky, ESLint y Prettier.
- **Multi-Ambiente:** Configuración dinámica de entornos (QA, Local, etc.) mediante archivos `.env`.
- **Estructura Modular:** Organización clara para facilitar la escalabilidad y mantenimiento.

## 🔐 Estrategia de Autenticación

El proyecto utiliza una estrategia de **autenticación global** para optimizar el tiempo de ejecución:

1.  **Global Setup (`auth/global.setup.ts`):** Se ejecuta antes de los tests. Realiza el login una sola vez y guarda el estado (cookies/localStorage) en `assets/auth/state.json`.
2.  **Reutilización de Sesión:** Los tests en la carpeta `tests/ui/` cargan automáticamente este estado a través de la configuración de `playwright.config.ts`.
3.  **Bypass de Autenticación:** Para tests que requieren probar específicamente el flujo de login o registro (donde no queremos estar logueados), se utiliza `test.use({ storageState: { cookies: [], origins: [] } })` para limpiar la sesión en ese archivo específico.

---

## 🏗️ Estructura del Proyecto

```text
project/
│
├── .github/workflows/    # Contiene las configuraciones de GitHub Actions para CI/CD.
│   └── playwright.yml    # Workflow principal para ejecutar tests de Playwright en CI.
│
├── api/                  # Módulos para interactuar con la API del Marketplace.
│   ├── clients/          # Clientes de API que encapsulan las llamadas HTTP a endpoints específicos.
│   │   ├── AuthClient.ts     # Cliente para la API de autenticación (login, registro).
│   │   ├── EventsClient.ts   # Cliente para la API de gestión de eventos.
│   │   ├── BookingClient.ts  # Cliente para la API de gestión de reservas.
│   │   └── PaymentClient.ts  # Cliente para la API de procesamiento de pagos.
│   │
│   ├── models/           # Definiciones de interfaces/tipos para los datos de la API.
│   │   ├── Event.ts          # Modelo de datos para un evento.
│   │   ├── Booking.ts        # Modelo de datos para una reserva.
│   │   └── User.ts           # Modelo de datos para un usuario.
│   │
│   └── payloads/         # Objetos de datos (payloads) para las peticiones API.
│       ├── booking.payload.ts # Payloads de ejemplo para la creación/actualización de reservas.
│       └── payment.payload.ts # Payloads de ejemplo para las transacciones de pago.
│
├── auth/                 # Módulos para la gestión de autenticación y sesiones.
│   ├── global.setup.ts   # Script de configuración global de Playwright para autenticación (ej. generar archivos de estado de sesión).
 │   │   # Este script se ejecuta una vez antes de todos los tests. Verifica si ya existe un estado de sesión autenticado.
│   │   # Si no existe, realiza un login a través de la UI usando las credenciales de `.env` y guarda el estado de la sesión
│   │   # en un archivo `state.json` para que los tests posteriores puedan reutilizar la sesión sin necesidad de loguearse de nuevo.
│   ├── authHelpers.ts    # Funciones auxiliares para la autenticación (ej. generar tokens, manejar cookies).
│   │
│   └── storage/          # Almacenamiento de estados de autenticación para diferentes roles.
│       ├── user.json         # Estado de sesión para un usuario estándar.
│       ├── admin.json        # Estado de sesión para un usuario administrador.
│       └── organizer.json    # Estado de sesión para un usuario organizador.
│
├── constants/            # Constantes globales del proyecto.
│   ├── endpoints.ts      # Definición de endpoints de API.
│   ├── routes.ts         # Definición de rutas de UI.
│   └── messages.ts       # Mensajes de error o éxito comunes.
│
├── fixtures/             # Fixtures personalizadas de Playwright para extender el objeto `test`.
│   ├── pages.fixture.ts  # Fixtures para inicializar Page Objects en los tests de UI.
│   ├── api.fixture.ts    # Fixtures para inicializar clientes de API en los tests.
│   │   # Extiende el objeto `test` de Playwright para proporcionar dos contextos de API:
│   │   # - `apiContext`: Un cliente HTTP sin autenticación, útil para endpoints públicos (login, registro).
│   │   # - `authenticatedApiContext`: Un cliente HTTP que realiza un login temporal para obtener un token
│   │   #   y luego adjunta este token en el encabezado `Authorization` de todas las solicitudes,
│   │   #   ideal para interactuar con endpoints protegidos.
│   │   # Utiliza `dotenv` para cargar variables de entorno y `env` para centralizar las URLs base.
│   └── users.fixture.ts  # Fixtures para datos de usuario predefinidos o generados.
│
├── pages/                # Page Object Models (POM) para la interacción con la UI.
│   ├── LoginPage.ts          # Objeto de página para la página de inicio de sesión.
│   ├── HomePage.ts           # Objeto de página para la página principal.
│   ├── EventsPage.ts         # Objeto de página para la página de listado de eventos.
│   ├── EventDetailsPage.ts   # Objeto de página para la página de detalles de un evento.
│   ├── BookingPage.ts        # Objeto de página para la página de reservas.
│   └── CheckoutPage.ts       # Objeto de página para la página de checkout/pago.
│
├── test-data/            # Datos de prueba estáticos o generados para los tests.
│   ├── users.ts          # Datos de usuarios de prueba.
│   ├── events.ts         # Datos de eventos de prueba.
│   ├── bookings.ts       # Datos de reservas de prueba.
│   └── paymentCards.ts   # Datos de tarjetas de pago de prueba.
│
├── tests/                # Contiene todos los archivos de prueba (.spec.ts).
│   ├── ui/               # Pruebas de interfaz de usuario (End-to-End).
│   │   ├── auth/         # Pruebas de autenticación de UI (login, registro).
│   │   │   ├── login.spec.ts   # Test de inicio de sesión de usuario.
│   │   │   └── signup.spec.ts  # Test de registro de nuevo usuario.
│   │   │
│   │   ├── events/       # Pruebas relacionadas con eventos en la UI.
│   │   │   ├── browseEvents.spec.ts # Test de navegación y visualización de eventos.
│   │   │   ├── eventDetails.spec.ts # Test de detalles de un evento específico.
│   │   │   └── searchEvents.spec.ts # Test de búsqueda de eventos.
│   │   │
│   │   ├── bookings/     # Pruebas de reservas en la UI.
│   │   │   ├── createBooking.spec.ts # Test de creación de una reserva.
│   │   │   ├── cancelBooking.spec.ts # Test de cancelación de una reserva.
│   │   │   └── bookingHistory.spec.ts # Test de historial de reservas.
│   │   │
│   │   └── payments/     # Pruebas de pagos en la UI.
│   │       └── paymentCheckout.spec.ts # Test del flujo de pago y checkout.
│   │
│   └── api/              # Contiene las pruebas de API.
│       ├── auth/         # Pruebas de autenticación de API.
│       │   └── login.api.spec.ts # Contiene tests para el inicio de sesión a través de la API.
│       │
│       ├── events/       # Pruebas de API relacionadas con eventos.
│       │   └── getEvents.api.spec.ts # Contiene tests para la obtención de eventos a través de la API.
│       │
│       └── bookings/     # Pruebas de API relacionadas con reservas.
│           └── createBooking.api.spec.ts # Contiene tests para la creación de reservas a través de la API.
│
├── utils/                # Funciones de utilidad generales.
│   ├── env.ts            # Utilidades para la gestión de variables de entorno, incluyendo la obtención de URLs base y de API.
│   │   # Centraliza la configuración y recuperación de URLs base para el proyecto.
│   │   # Proporciona métodos estáticos `getBaseURL()` para la URL de la UI y `getApiURL()` para la URL de la API,
│   │   # permitiendo definir estas URLs a través de variables de entorno (`PLAYWRIGHT_TEST_BASE_URL`, `BASE_URL`, `API_URL`) con valores por defecto.
│   ├── networkUtils.ts   # Utilidades para operaciones de red, como la espera o intercepción de peticiones.
│   ├── fakerUtils.ts     # Utilidades para generar datos aleatorios (usando librerías como Faker.js).
│   ├── dateUtils.ts      # Utilidades para manipulación de fechas.
│   └── randomUtils.ts    # Utilidades para generar datos aleatorios genéricos.
│
├── playwright.config.ts  # Archivo de configuración principal de Playwright.
├── tsconfig.json         # Configuración de TypeScript para el proyecto.
├── package.json          # Metadatos del proyecto y scripts de npm.
│
├── .env.qa               # Variables de entorno específicas para el entorno de QA.
├── .env.staging          # Variables de entorno específicas para el entorno de Staging.
├── .env.example          # Plantilla de variables de entorno (sin valores sensibles).
└── .gitignore            # Archivo para especificar archivos y directorios ignorados por Git.
.