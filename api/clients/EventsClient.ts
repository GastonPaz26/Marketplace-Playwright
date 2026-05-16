// api/clients/ShowAllEventsClient.ts
import { APIRequestContext, expect } from '@playwright/test';
import { env } from '@utils/env';

interface Event {
    id: number;
    title: string;
    description: string;
    category: string;
    venue: string;
    city: string;
    eventDate: string;
    price: string;
    totalSeats: number;
    availableSeats: number;
    imageUrl: string;
    isStatic: boolean;
    userId: number | null;
    createdAt: string;
    updatedAt: string;
}

interface EventsResponse {
    success: boolean;
    data: Event[];
    pagination: {
        total: number;
        page: number;
        limit: number;
        totalPages: number;
    };
}

export class ShowAllEventsClient {
    private readonly apiUrl: string;

    constructor(private request: APIRequestContext) {
        this.apiUrl = env.getApiURL();
    }

    // ── MÉTODO 1: hace la llamada HTTP y devuelve la respuesta parseada ────────
    // responsabilidad: solo comunicarse con la API
    async showAllEvents(
        category: string,
        city: string,
        search: string,
        page: number,
        limit: number
    ): Promise<EventsResponse> {               // ← ahora devuelve el JSON ya parseado
        const response = await this.request.get('events', {
            params: { category, city, search, page, limit },
        });

        // única assertion válida acá — es parte del transporte, no del negocio
        expect(response.status()).toBe(200);

        return response.json() as Promise<EventsResponse>;
        // parsea y devuelve el JSON tipado — el test decide qué verificar
    }

    // ── MÉTODO 2: encapsula las validaciones de negocio ───────────────────────
    // responsabilidad: saber qué significa "una respuesta válida de conferencias"
    assertAllEventsAreCategory(events: EventsResponse, expectedCategory: string): void {

        expect(events.success).toBe(true);
        // verifica que la API no devolvió un error de negocio

        expect(events.data.length).toBeGreaterThan(0);
        // verifica que vino al menos un resultado

        for (const event of events.data) {
            expect(event.category).toBe(expectedCategory);
            // verifica que CADA evento tiene la categoría correcta
        }

        expect(events.pagination.total).toBeGreaterThan(0);
        // verifica que la paginación tiene sentido
    }
}