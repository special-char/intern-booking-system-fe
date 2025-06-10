export interface ColorPalette {
  id: string;
  name: string;
  value: string;
}

export interface Media {
  id: number;
  alt: string;
  url: string;
  thumbnailURL: string | null;
  filename: string;
  mimeType: string;
  filesize: number;
  width: number;
  height: number;
  focalX: number;
  focalY: number;
  createdAt: string;
  updatedAt: string;
}

export interface Brand {
  id: number;
  user: string;
  logo: Media;
  coverImage: Media;
  colorPalette: ColorPalette[];
  fontStyle: string;
  createdAt: string;
  updatedAt: string;
}

export interface PaginatedResponse<T> {
  docs: T[];
  hasNextPage: boolean;
  hasPrevPage: boolean;
  limit: number;
  nextPage: number | null;
  page: number;
  pagingCounter: number;
  prevPage: number | null;
  totalDocs: number;
  totalPages: number;
}

export interface BrandResponse extends PaginatedResponse<Brand> {} 