

export interface BookingResponse {
    success: boolean;
    data: BookingData;
    message: string;
}

export interface BookingData {
    id: number;
    eventId: number;
    customerName: string;
    customerEmail: string;
    customerPhone: string;
    quantity: number;
    totalPrice: number;
    status: 'confirmed' | 'pending' | 'cancelled';
    bookingRef: string;
    createdAt: string;
    updatedAt: string;
    event: Event;
}
