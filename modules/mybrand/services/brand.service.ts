import { Brand, BrandResponse } from './types';
import { BrandFormData, ImageWithAlt, ThemeColors } from '../components/types';
import { brandFormSchema } from '../components/schema';
import { getUser } from '@/lib/data/admin';
import { Tenant } from '@/payload-types';
import { getPayloadAuthHeaders } from '@/lib/data/cookies';
import { AppRouterInstance } from 'next/dist/shared/lib/app-router-context.shared-runtime';

const API_BASE_URL = 'http://localhost:3000';
const MEDIA_API_URL = `${API_BASE_URL}/api/media`;

class BrandServiceError extends Error {
  constructor(message: string, public code?: string, public details?: any) {
    super(message);
    this.name = 'BrandServiceError';
  }
}

export class BrandService {
  private static async uploadMedia(imageWithAlt: ImageWithAlt): Promise<string> {
    if (!imageWithAlt?.file) {
      throw new BrandServiceError('No file provided for upload');
    }

    try {
      const { user } = await getUser();
      const tenantId = (user?.tenants?.[0]?.tenant as Tenant)?.id;

      const formData = new FormData();
      formData.append('file', imageWithAlt.file);
      formData.append('_payload', JSON.stringify({
        alt: imageWithAlt.alt || '',
        tenant: tenantId,
      }));

      const response = await fetch(MEDIA_API_URL, {
        method: 'POST',
        credentials: 'include',
        body: formData
      });

      if (!response.ok) {
        const errorText = await response.text();
        let errorDetails;
        try {
          errorDetails = JSON.parse(errorText);
        } catch {
          errorDetails = errorText;
        }
        throw new BrandServiceError(
          `Upload failed (${response.status}): ${errorDetails?.message || errorText}`,
          'UPLOAD_FAILED',
          errorDetails
        );
      }

      const data = await response.json();
      const mediaId = data.doc?.id;
      
      if (!mediaId) {
        throw new BrandServiceError(
          'Upload succeeded but no media ID returned',
          'INVALID_RESPONSE'
        );
      }

      return mediaId;
    } catch (error) {
      if (error instanceof BrandServiceError) {
        throw error;
      }
      throw new BrandServiceError(
        'Failed to upload media',
        'UPLOAD_ERROR',
        error
      );
    }
  }

  static async getBrands(): Promise<BrandResponse> {
    try {
      const { user } = await getUser();
      const tenantId = (user?.tenants?.[0]?.tenant as Tenant)?.id;
      const authHeaders = await getPayloadAuthHeaders();

      const response = await fetch(`${API_BASE_URL}/api/mybrand?depth=1&fallback-locale=null&where[tenant][equals]=${tenantId}`, {
        credentials: 'include',
        headers: {
          'Accept': 'application/json',
          ...authHeaders
        },
      });
      
      if (!response.ok) {
        const error = await response.json();
        throw new BrandServiceError(
          error.message || 'Failed to fetch brands',
          'FETCH_ERROR',
          error
        );
      }

      const data = await response.json();
      console.log('Brands API response:', data);
      return data;
    } catch (error) {
      if (error instanceof BrandServiceError) {
        throw error;
      }
      throw new BrandServiceError(
        'Failed to fetch brands',
        'FETCH_ERROR',
        error
      );
    }
  }

  static async getBrand(id: number): Promise<Brand> {
    try {
      const { user } = await getUser();
      const tenantId = (user?.tenants?.[0]?.tenant as Tenant)?.id;
      const authHeaders = await getPayloadAuthHeaders();

      const response = await fetch(`${API_BASE_URL}/api/mybrand/${id}?depth=0&fallback-locale=null`, {
        credentials: 'include',
        headers: {
          'Accept': 'application/json',
          ...authHeaders
        },
      });

      if (!response.ok) {
        const error = await response.json();
        throw new BrandServiceError(
          error.message || 'Failed to fetch brand',
          'FETCH_ERROR',
          error
        );
      }

      return response.json();
    } catch (error) {
      if (error instanceof BrandServiceError) {
        throw error;
      }
      throw new BrandServiceError(
        'Failed to fetch brand',
        'FETCH_ERROR',
        error
      );
    }
  }

  static async createBrand(data: BrandFormData, router: AppRouterInstance): Promise<Brand> {
    try {
      // Validate form data against schema
      const validatedData = brandFormSchema.parse(data);
      const { user } = await getUser();
      const tenantId = (user?.tenants?.[0]?.tenant as Tenant)?.id;
      const authHeaders = await getPayloadAuthHeaders();

      // Validate required files
      if (!validatedData.brandLogo?.file) {
        throw new BrandServiceError('Brand logo is required', 'VALIDATION_ERROR');
      }
      if (!validatedData.coverImage?.file) {
        throw new BrandServiceError('Cover image is required', 'VALIDATION_ERROR');
      }

      // Upload media files
      const [logoId, coverId] = await Promise.all([
        this.uploadMedia(validatedData.brandLogo),
        this.uploadMedia(validatedData.coverImage),
      ]);

      // Create brand payload
      const brandData = {
        logo: logoId,
        coverImage: coverId,
        colorPalette: this.formatColorPalette(validatedData.themeColors),
        fontStyle: validatedData.fontFamily,
        tenant: tenantId,
      };

      const response = await fetch(`${API_BASE_URL}/api/mybrand?depth=0&fallback-locale=null`, {
        method: 'POST',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
          ...authHeaders
        },
        body: JSON.stringify(brandData),
      });

      if (!response.ok) {
        const error = await response.json();
        throw new BrandServiceError(
          error.message || 'Failed to create brand',
          'CREATE_ERROR',
          error
        );
      }

      const result = await response.json();
      router.refresh();
      return result;
    } catch (error) {
      if (error instanceof BrandServiceError) {
        throw error;
      }
      throw new BrandServiceError(
        'Failed to create brand',
        'CREATE_ERROR',
        error
      );
    }
  }

  static async updateBrand(id: number, data: BrandFormData, router: AppRouterInstance): Promise<Brand> {
    try {
      // Validate form data against schema
      const validatedData = brandFormSchema.parse(data);
      const { user } = await getUser();
      const tenantId = (user?.tenants?.[0]?.tenant as Tenant)?.id;
      const authHeaders = await getPayloadAuthHeaders();

      // Upload any new images if provided
      const brandData: any = {
        colorPalette: this.formatColorPalette(validatedData.themeColors),
        fontStyle: validatedData.fontFamily,
        tenant: tenantId,
      };

      if (validatedData.brandLogo?.file) {
        brandData.logo = await this.uploadMedia(validatedData.brandLogo);
      }

      if (validatedData.coverImage?.file) {
        brandData.coverImage = await this.uploadMedia(validatedData.coverImage);
      }

      const response = await fetch(`${API_BASE_URL}/api/mybrand/${id}?depth=0&fallback-locale=null`, {
        method: 'PATCH',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
          ...authHeaders
        },
        body: JSON.stringify(brandData),
      });

      if (!response.ok) {
        const error = await response.json();
        throw new BrandServiceError(
          error.message || 'Failed to update brand',
          'UPDATE_ERROR',
          error
        );
      }

      const result = await response.json();
      router.refresh();
      return result;
    } catch (error) {
      if (error instanceof BrandServiceError) {
        throw error;
      }
      throw new BrandServiceError(
        'Failed to update brand',
        'UPDATE_ERROR',
        error
      );
    }
  }

  static async deleteBrand(id: number, router: AppRouterInstance): Promise<void> {
    try {
      const { user } = await getUser();
      const tenantId = (user?.tenants?.[0]?.tenant as Tenant)?.id;
      const authHeaders = await getPayloadAuthHeaders();

      const response = await fetch(`${API_BASE_URL}/api/mybrand/${id}?depth=0&fallback-locale=null`, {
        method: 'DELETE',
        credentials: 'include',
        headers: {
          'Accept': 'application/json',
          ...authHeaders
        },
      });

      if (!response.ok) {
        const error = await response.json();
        throw new BrandServiceError(
          error.message || 'Failed to delete brand',
          'DELETE_ERROR',
          error
        );
      }

      router.refresh();
    } catch (error) {
      if (error instanceof BrandServiceError) {
        throw error;
      }
      throw new BrandServiceError(
        'Failed to delete brand',
        'DELETE_ERROR',
        error
      );
    }
  }

  private static formatColorPalette(colors: ThemeColors) {
    return [
      { name: 'primary', value: colors.base },
      { name: 'light1', value: colors.lighter1 },
      { name: 'light2', value: colors.lighter2 },
      { name: 'dark', value: colors.darker },
    ];
  }
}