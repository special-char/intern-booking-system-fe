// File: src/endpoints/territoryContains.ts

import { Endpoint } from "payload";

import { PayloadRequest } from "payload";


// Types for polygon coordinates
interface PolygonPoint {
    lat?: number;
    lng?: number;
    [0]?: number; // For array format [lat, lng]
    [1]?: number;
}

interface Territory {
    id: string | number;
    name: string;
    polygon?: PolygonPoint[];
    coordinates?: Array<{
        id: string;
        coordinate: [number, number]; // [lng, lat] format from your data
    }>;
}

interface TerritoryQueryResponse {
    point: {
        lat: number;
        lng: number;
    };
    territories: Territory[];
    count: number;
}

interface ErrorResponse {
    error: string;
}

const pointInPolygon = (point: [number, number], polygon: PolygonPoint[]): boolean => {
    const [queryLat, queryLng] = point;
    let inside = false;

    // Filter out corrupted coordinates first
    const validPolygon = polygon.filter(p => {
        const lat = p.lat;
        const lng = p.lng;
        return lat !== undefined && lng !== undefined &&
            Math.abs(lat) <= 90 && Math.abs(lng) <= 180;
    });

    if (validPolygon.length < 3) {
        console.warn('Polygon has less than 3 valid coordinates after filtering');
        return false;
    }

    for (let i = 0, j = validPolygon.length - 1; i < validPolygon.length; j = i++) {
        const lat1 = validPolygon[i].lat!;
        const lng1 = validPolygon[i].lng!;
        const lat2 = validPolygon[j].lat!;
        const lng2 = validPolygon[j].lng!;

        if (((lat1 > queryLat) !== (lat2 > queryLat)) &&
            (queryLng < (lng2 - lng1) * (queryLat - lat1) / (lat2 - lat1) + lng1)) {
            inside = !inside;
        }
    }

    return inside;
};

export const territoryQuery: Endpoint = {
    path: '/territory-contains',
    method: 'get',
    handler: async (req: PayloadRequest) => {
        const { lat, lng, tenant_id } = req.query as { lat?: string; lng?: string; tenant_id?: string };

        if (!lat || !lng) {
            return new Response(
                JSON.stringify({ error: 'lat and lng parameters are required' }),
                { status: 400, headers: { 'Content-Type': 'application/json' } }
            );
        }

        if (!tenant_id) {
            return new Response(
                JSON.stringify({ error: 'tenant_id parameter is required' }),
            );
        }

        try {
            const point: [number, number] = [parseFloat(lat), parseFloat(lng)];

            if (isNaN(point[0]) || isNaN(point[1])) {
                return new Response(
                    JSON.stringify({ error: 'Invalid lat/lng values. Must be valid numbers.' }),
                    { status: 400, headers: { 'Content-Type': 'application/json' } }
                );
            }

            // Get all territories
            const territories = await req.payload.find({
                collection: 'territory',
                where: { tenant: { equals: tenant_id } },
                limit: 0, // Get all
                req,
            });

            // Filter territories that contain the point
            const containingTerritories = territories.docs.filter((territory: Territory) => {
                // Handle your current data structure with coordinates array
                if (territory.coordinates && territory.coordinates.length >= 3) {
                    // Convert your coordinate format to PolygonPoint format
                    const polygon: PolygonPoint[] = territory.coordinates.map(coord => ({
                        lng: coord.coordinate[0], // longitude
                        lat: coord.coordinate[1], // latitude
                    }));
                    return pointInPolygon(point, polygon);
                }

                // Handle direct polygon field if you have it
                if (territory.polygon && territory.polygon.length >= 3) {
                    return pointInPolygon(point, territory.polygon);
                }

                return false;
            });

            return new Response(
                JSON.stringify({
                    point: { lat: point[0], lng: point[1] },
                    territories: containingTerritories,
                    count: containingTerritories.length
                }),
                { status: 200, headers: { 'Content-Type': 'application/json' } }
            );

        } catch (error) {
            console.error('Territory query error:', error);
            return new Response(
                JSON.stringify({ error: 'Internal server error' }),
                { status: 500, headers: { 'Content-Type': 'application/json' } }
            );
        }
    }
};

// Alternative: Ray casting algorithm (more robust)
const pointInPolygonRayCasting = (point: [number, number], polygon: PolygonPoint[]): boolean => {
    const [lat, lng] = point;
    let intersections = 0;

    for (let i = 0; i < polygon.length; i++) {
        const j = (i + 1) % polygon.length;

        const lat1 = polygon[i].lat || polygon[i][0];
        const lng1 = polygon[i].lng || polygon[i][1];
        const lat2 = polygon[j].lat || polygon[j][0];
        const lng2 = polygon[j].lng || polygon[j][1];

        if (lat1 === undefined || lng1 === undefined || lat2 === undefined || lng2 === undefined) {
            continue; // Skip invalid coordinates
        }

        // Check if ray crosses edge
        if (((lat1 > lat) !== (lat2 > lat)) &&
            (lng < (lng2 - lng1) * (lat - lat1) / (lat2 - lat1) + lng1)) {
            intersections++;
        }
    }

    return intersections % 2 === 1;
};

// Usage example for client-side filtering
export const filterTerritoriesContainingPoint = (
    territories: Territory[],
    queryLat: string | number,
    queryLng: string | number
): Territory[] => {
    const point: [number, number] = [parseFloat(queryLat.toString()), parseFloat(queryLng.toString())];

    if (isNaN(point[0]) || isNaN(point[1])) {
        return [];
    }

    return territories.filter((territory: Territory) => {
        // Handle your current data structure
        if (territory.coordinates && territory.coordinates.length >= 3) {
            const polygon: PolygonPoint[] = territory.coordinates.map(coord => ({
                lng: coord.coordinate[0],
                lat: coord.coordinate[1],
            }));
            return pointInPolygonRayCasting(point, polygon);
        }

        // Handle direct polygon field
        if (territory.polygon && territory.polygon.length >= 3) {
            return pointInPolygonRayCasting(point, territory.polygon);
        }

        return false;
    });
};

// Additional endpoint for checking specific territory
export const territoryCheckPoint: Endpoint = {
    path: '/territory/:id/contains',
    method: 'get',
    handler: async (req: PayloadRequest) => {
        const { lat, lng, id } = req.query as { lat?: string; lng?: string; id?: string };

        if (!lat || !lng || !id) {
            return new Response(
                JSON.stringify({ error: 'lat, lng, and id parameters are required' }),
                { status: 400, headers: { 'Content-Type': 'application/json' } }
            );
        }

        try {
            const point: [number, number] = [parseFloat(lat), parseFloat(lng)];

            if (isNaN(point[0]) || isNaN(point[1])) {
                return new Response(
                    JSON.stringify({ error: 'Invalid lat/lng values. Must be valid numbers.' }),
                    { status: 400, headers: { 'Content-Type': 'application/json' } }
                );
            }

            // Get specific territory
            const territory = await req.payload.findByID({
                collection: 'territory',
                id: id,
                req,
            }) as Territory;

            if (!territory) {
                return new Response(
                    JSON.stringify({ error: 'Territory not found' }),
                    { status: 404, headers: { 'Content-Type': 'application/json' } }
                );
            }

            let contains = false;

            if (territory.coordinates && territory.coordinates.length >= 3) {
                const polygon: PolygonPoint[] = territory.coordinates.map(coord => ({
                    lng: coord.coordinate[0],
                    lat: coord.coordinate[1],
                }));
                contains = pointInPolygonRayCasting(point, polygon);
            }

            return new Response(
                JSON.stringify({
                    territory: {
                        id: territory.id,
                        name: territory.name
                    },
                    query: {
                        lat: point[0],
                        lng: point[1]
                    },
                    contains: contains,
                    success: true
                }),
                { status: 200, headers: { 'Content-Type': 'application/json' } }
            );

        } catch (error) {
            console.error('Territory check point error:', error);
            return new Response(
                JSON.stringify({ error: 'Internal server error', success: false }),
                { status: 500, headers: { 'Content-Type': 'application/json' } }
            );
        }
    }
};