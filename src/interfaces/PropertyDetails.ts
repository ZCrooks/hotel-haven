export interface PropertyDetails {
    name: string,
    rating: number,
    address: string,
    type: string,
    beds: number,
    images: string[],
    id: number,
    bathrooms: number
    bedrooms: number,
    persons: number,
    totalPrice: number,
    pricePerNight: number,
    reviewsCount: number,
    hostThumbnail: string,
    previewAmenities: string[],
    amenityIds: number[],
    price: {[key: string] : any}
    lng: number,
    lat: number,
    deeplink: string,
    isSuperhost: string
}