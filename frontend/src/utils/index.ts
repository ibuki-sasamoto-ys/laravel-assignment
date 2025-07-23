import { GenreType, Sex, PriceRange } from "../types";

export const convertGenreTypeToSex = (genreType: GenreType): Sex => {
  switch (genreType) {
    case 'MAN':
      return 'メンズ';
    case 'WOMAN':
      return 'レディース';
    case 'ALL':
      return 'ユニセックス';
    default:
      return 'ユニセックス';
  }
};

export const convertSexToGenreType = (sex: Sex): GenreType => {
  switch (sex) {
    case 'メンズ':
      return 'MAN';
    case 'レディース':
      return 'WOMAN';
    case 'ユニセックス':
      return 'ALL';
    default:
      return 'ALL';
  }
};

export const getPriceRangeValues = (priceRange: PriceRange): { min?: number; max?: number } => {
  if (priceRange === 'all') return {};
  
  const [min, max] = priceRange.split('-');
  return {
    min: min ? Number(min) : undefined,
    max: max ? Number(max) : undefined
  };
};