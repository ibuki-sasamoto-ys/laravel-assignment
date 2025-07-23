export type GenreType = 'ALL' | 'MAN' | 'WOMAN';

export type Sex = 'すべて' | 'メンズ' | 'レディース' | 'ユニセックス';

export type Category = {
  categoryId: string;
  name: string;
};

export type PriceRange = 'all' | '0-1000' | '1000-5000' | '5000-10000' | '10000-';
export type SortKey = 'default' | 'new' | 'price-asc' | 'price-desc';

export type ProductSize = {
  code: string;
  name: string;
};

export type Product = {
  productId: string;        
  name: string;
  price: number;
  genreType: GenreType;     
  category: Category;
  images: string[];         
  summary: string;
  detail: string;
  sizes: ProductSize[];
  isFavorite: boolean;      
};

export type FilterParams = {
  keyword?: string;
  category?: string;
  sizes?: string[];
  minPrice?: number;
  maxPrice?: number;
  genre?: GenreType;
};
