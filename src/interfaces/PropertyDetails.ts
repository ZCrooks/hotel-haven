export interface PropertyDetails {
    name: string,
    rating: number,
    address: string,
    type: string,
    beds: number,
    images: string[],
    bathrooms: number
    bedrooms: number,
    persons: number,
    totalPrice: number,
    pricePerNight: number,
    reviewsCount: number,
    hostPic: string,
    previewAmenities: string[],
    amenityIds: number[],
    price: {[key: string] : any}
    lng: number,
    lat: number
}