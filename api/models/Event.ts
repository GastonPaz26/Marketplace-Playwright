
export interface Event {
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

export interface EventsResponse {
    success: boolean;
    data: Event[];
    pagination: {
        total: number;
        page: number;
        limit: number;
        totalPages: number;
    };
}