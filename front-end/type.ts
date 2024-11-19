export interface TravelState {
    travel: {
        origin: {
            location:{
                lat: number;
                lng: number;
            };
            description: string;
        } | null;
        distance: {
            text: string;
            value: number;
        };
        destination: {
            location:{
                lat: number;
                lng: number;
            };
            description: string;
        } | null;
        travelTimeInformation: null | {
            distance: {
                text: string;
                value: number;
            };
            duration: {
                text: string;
                value: number;
            };
        };
        routeWaypoints: Array<{
            latitude: number;
            longitude: number;
        }> | null;
    }
}