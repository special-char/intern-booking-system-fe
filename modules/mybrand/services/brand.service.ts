import { Brand, BrandResponse } from './types';
import { BrandFormData, ImageWithAlt, ThemeColors } from '../components/types';
import { brandFormSchema } from '../components/schema';

const API_BASE_URL = 'http://localhost:3000/api/mybrand';
const MEDIA_API_URL = 'http://localhost:3000/api/media';

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

    const formData = new FormData();
    formData.append('file', imageWithAlt.file);
    formData.append('alt', imageWithAlt.alt);

    try {
      const response = await fetch(MEDIA_API_URL, {
        method: 'POST',
        credentials: 'include', // This will send cookies for tenant context
        body: formData,
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
      const mediaId = data.doc?.id || data.id;
      
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
      const response = await fetch(API_BASE_URL, {
        credentials: 'include',
        headers: {
          'Accept': 'application/json',
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

      return response.json();
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
      const response = await fetch(`${API_BASE_URL}/${id}`, {
        credentials: 'include',
        headers: {
          'Accept': 'application/json',
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

  static async createBrand(data: BrandFormData): Promise<Brand> {
    try {
      // Validate form data against schema
      const validatedData = brandFormSchema.parse(data);

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
      };

      const response = await fetch(API_BASE_URL, {
        method: 'POST',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
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

      return response.json();
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

  static async updateBrand(id: number, data: BrandFormData): Promise<Brand> {
    try {
      // Validate form data against schema
      const validatedData = brandFormSchema.parse(data);

      // Upload any new images if provided
      const brandData: any = {
        colorPalette: this.formatColorPalette(validatedData.themeColors),
        fontStyle: validatedData.fontFamily,
      };

      if (validatedData.brandLogo) {
        brandData.logo = await this.uploadMedia(validatedData.brandLogo);
      }

      if (validatedData.coverImage) {
        brandData.coverImage = await this.uploadMedia(validatedData.coverImage);
      }

      const response = await fetch(`${API_BASE_URL}/${id}`, {
        method: 'PUT',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
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

      return response.json();
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

  static async deleteBrand(id: number): Promise<void> {
    try {
      const response = await fetch(`${API_BASE_URL}/${id}`, {
        method: 'DELETE',
        credentials: 'include',
        headers: {
          'Accept': 'application/json',
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