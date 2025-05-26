import { Tenant, Territory } from "@/payload-types";
import config from "@payload-config";
import { getPayload } from "payload";
import { getUser } from "./admin";
import { apiRequest, payloadApiRequest } from "../utils/endpoints/api";

export const getTerritories = async (): Promise<Territory[]> => {
    try {
        const payload = await getPayload({ config });
        const { user } = await getUser();
        const tenant_id = (user?.tenants?.[0]?.tenant as Tenant)?.id;

        if (!tenant_id) {
            throw new Error('No tenant ID found for the user');
        }

        const result = await payload.find({
            collection: "territory",
            where: { tenant: { equals: tenant_id } },
        });
        return result.docs;
    } catch (error) {
        console.error('Error fetching territories:', error);
        throw new Error('Failed to fetch territories');
    }
};

export const getTerritoriesBasesOnLocation = async (
    latitude: number,
    longitude: number
): Promise<any> => {
    try {
        const { user } = await getUser();
        const tenant_id = (user?.tenants?.[0]?.tenant as Tenant)?.id;

        if (!tenant_id) {
            throw new Error('No tenant ID found for the user');
        }

        if (!latitude || !longitude) {
            throw new Error('Invalid coordinates provided');
        }

        const result = await payloadApiRequest({
            method: "GET",
            url: `/api/territory-contains?lng=${longitude}&lat=${latitude}&tenant_id=${tenant_id}`
        });
        return result;
    } catch (error) {
        console.error('Error fetching territories by location:', error);
        throw new Error('Failed to fetch territories by location');
    }
};

export const createTerritory = async (territory: Territory): Promise<Territory> => {
    try {
        const payload = await getPayload({ config });
        const { user } = await getUser();
        const tenant_id = (user?.tenants?.[0]?.tenant as Tenant)?.id;

        if (!tenant_id) {
            throw new Error('No tenant ID found for the user');
        }

        if (!territory) {
            throw new Error('Territory data is required');
        }

        const result = await payload.create({
            collection: "territory",
            data: {
                ...territory,
                tenant: tenant_id,
            },
        });
        return result;
    } catch (error) {
        console.error('Error creating territory:', error);
        throw new Error('Failed to create territory');
    }
};

export const updateTerritory = async (territory: Territory): Promise<Territory> => {
    try {
        const payload = await getPayload({ config });
        const { user } = await getUser();
        const tenant_id = (user?.tenants?.[0]?.tenant as Tenant)?.id;

        if (!tenant_id) {
            throw new Error('No tenant ID found for the user');
        }

        if (!territory?.id) {
            throw new Error('Territory ID is required for update');
        }

        const result = await payload.update({
            collection: "territory",
            id: territory.id,
            data: {
                ...territory,
                tenant: tenant_id,
            },
        });
        return result;
    } catch (error) {
        console.error('Error updating territory:', error);
        throw new Error('Failed to update territory');
    }
};

export const deleteTerritory = async (territory: Territory): Promise<Territory> => {
    try {
        const payload = await getPayload({ config });

        if (!territory?.id) {
            throw new Error('Territory ID is required for deletion');
        }

        const result = await payload.delete({
            collection: "territory",
            id: territory.id,
        });
        return result;
    } catch (error) {
        console.error('Error deleting territory:', error);
        throw new Error('Failed to delete territory');
    }
};