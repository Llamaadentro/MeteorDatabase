export interface IMeteorData {
    key: number,
    name: string,
    mass?: number,
    year?: number,
    class: string,
    coordinates?: {
        latitude: number,
        longitude: number,
    }
};

export const convertToIMeteorData = (entry: any): IMeteorData => {
    return {
        key: entry.id,
        name: entry.name,
        mass: Number(entry?.mass),
        year: new Date(Date.parse(entry.year)).getFullYear(),
        class: entry.recclass,
        coordinates: entry.geolocation ? {
            latitude: parseFloat(entry.reclat),
            longitude: parseFloat(entry.reclong),
        } : undefined
    }
};