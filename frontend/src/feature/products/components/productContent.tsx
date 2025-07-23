import { useMemo } from "react";
import ProductList from "./ProductList";
import { Product, Sex, PriceRange, SortKey } from "../../../types";
import { dummyProducts } from "../../../constants/options";
import { convertSexToGenreType } from "../../../utils";

type ProductContentProps = {
  products: Product[];
  sex: Sex;
  category: string;
  priceRange: PriceRange;
  sortOrder: SortKey;
  sizes: string[];
  isApiConnected: boolean;
};

export const ProductContent: React.FC<ProductContentProps> = ({ 
  products, 
  sex, 
  category, 
  priceRange, 
  sortOrder,
  sizes,
  isApiConnected
}) => {

  const filteredAndSortedProducts = useMemo(() => {
    let sourceProducts: Product[];

    if (isApiConnected) {
      sourceProducts = products;
    } else {
      const baseProducts = products.length > 0 ? products : dummyProducts;
      
      const [min, max] = priceRange.split('-');
      sourceProducts = baseProducts.filter((product) => {
        const matchSex = sex === 'すべて' || product.genreType === convertSexToGenreType(sex);
        
        const matchCategory = category === 'すべて' || product.category.name === category;
        
        const matchPrice = priceRange === 'all' ||
          (Number(min) <= product.price && (max ? product.price <= Number(max) : true));
        
        const matchSize = sizes.length === 0 || 
          product.sizes.some(size => sizes.includes(size.name));
        
        return matchSex && matchCategory && matchPrice && matchSize;
      });
    }

    const sorted = [...sourceProducts].sort((a, b) => {
      if (sortOrder === 'price-asc') return a.price - b.price;
      if (sortOrder === 'price-desc') return b.price - a.price;
      return 0;
    });

    return sorted;
  }, [products, sex, category, priceRange, sortOrder, sizes, isApiConnected]);
  
  if (filteredAndSortedProducts.length === 0) {
    return <p>条件に一致する商品が見つかりませんでした。</p>;
  }
  
  return <ProductList products={filteredAndSortedProducts} />;
};