import { Brand, BrandResponse } from './types';
import { BrandFormData } from '../components/types';

const API_BASE_URL = '/api/brand';

export class BrandService {
  static async getBrands(): Promise<BrandResponse> {
    const response = await fetch(API_BASE_URL);
    if (!response.ok) {
      throw new Error('Failed to fetch brands');
    }
    return response.json();
  }

  static async getBrand(id: number): Promise<Brand> {
    const response = await fetch(`${API_BASE_URL}/${id}`);
    if (!response.ok) {
      throw new Error('Failed to fetch brand');
    }
    return response.json();
  }

  static async createBrand(data: BrandFormData): Promise<Brand> {
    const formData = new FormData();
    
    if (data.brandLogo) {
      formData.append('logo', data.brandLogo);
    }
    
    if (data.coverImage) {
      formData.append('coverImage', data.coverImage);
    }

    formData.append('colorPalette', JSON.stringify([
      { name: 'primary', value: data.themeColors.base },
      { name: 'light1', value: data.themeColors.lighter1 },
      { name: 'light2', value: data.themeColors.lighter2 },
      { name: 'dark', value: data.themeColors.darker },
    ]));

    formData.append('fontStyle', data.fontFamily);

    const response = await fetch(API_BASE_URL, {
      method: 'POST',
      body: formData,
    });

    if (!response.ok) {
      throw new Error('Failed to create brand');
    }

    return response.json();
  }

  static async updateBrand(id: number, data: BrandFormData): Promise<Brand> {
    const formData = new FormData();
    
    if (data.brandLogo) {
      formData.append('logo', data.brandLogo);
    }
    
    if (data.coverImage) {
      formData.append('coverImage', data.coverImage);
    }

    formData.append('colorPalette', JSON.stringify([
      { name: 'primary', value: data.themeColors.base },
      { name: 'light1', value: data.themeColors.lighter1 },
      { name: 'light2', value: data.themeColors.lighter2 },
      { name: 'dark', value: data.themeColors.darker },
    ]));

    formData.append('fontStyle', data.fontFamily);

    const response = await fetch(`${API_BASE_URL}/${id}`, {
      method: 'PUT',
      body: formData,
    });

    if (!response.ok) {
      throw new Error('Failed to update brand');
    }

    return response.json();
  }

  static async deleteBrand(id: number): Promise<void> {
    const response = await fetch(`${API_BASE_URL}/${id}`, {
      method: 'DELETE',
    });

    if (!response.ok) {
      throw new Error('Failed to delete brand');
    }
  }
} 