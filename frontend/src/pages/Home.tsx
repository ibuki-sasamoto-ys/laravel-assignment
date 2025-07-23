import React, { useState, useEffect, useCallback } from 'react';
import styled from 'styled-components';
import Slider from '../components/Slider';
import SexFilter from '../components/SexFilter';
import Sidebar from '../components/Sidebar';
import { SortKey, Sex, PriceRange, FilterParams } from '../types';
import { SEX_OPTIONS } from '../constants/options';
import { useProducts } from '../hooks/useProducts';
import { ProductContent } from '../feature/products/components/productContent';
import { getPriceRangeValues, convertSexToGenreType } from '../utils';

const Main = styled.main`
  max-width: 980px;
  width: 100%;
  margin: 0 auto;
`;

const ContentLayout = styled.div`
  display: flex;
  justify-content: space-between;
  flex: 1;
  gap: 48px;
  width: 100%;
  margin: 0 auto 128px;
`;

const LoadingContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 400px;
  font-size: 18px;
  color: #666;
`;

const ErrorContainer = styled.div`
  background-color: #fff3cd;
  border: 1px solid #ffeaa7;
  color: #856404;
  padding: 16px;
  border-radius: 8px;
  margin: 20px 0;
  font-size: 14px;
`;

const Home: React.FC = () => {
  const { products, loading, error, isApiConnected, fetchProductsWithFilters } = useProducts();
  const [selectedSex, setSelectedSex] = useState<Sex>('すべて');
  const [selectedCategory, setSelectedCategory] = useState<string>('すべて');
  const [selectedPriceRange, setSelectedPriceRange] = useState<PriceRange>('all');
  const [selectedSizes, setSelectedSizes] = useState<string[]>([]); 
  const [sortOrder, setSortOrder] = useState<SortKey>('default');

  const handleFilterChange = useCallback(() => {
    if (!isApiConnected) return;
    if (isApiConnected) {
      const priceRange = getPriceRangeValues(selectedPriceRange);

      const filters: FilterParams = {
        category: selectedCategory,
        sizes: selectedSizes,
        genre: convertSexToGenreType(selectedSex),
        minPrice: priceRange.min,
        maxPrice: priceRange.max
      };
      fetchProductsWithFilters(filters);
    }
  }, [
    selectedCategory, 
    selectedSizes, 
    selectedSex, 
    selectedPriceRange, 
    isApiConnected, 
    fetchProductsWithFilters
  ]);

  useEffect(() => {
    handleFilterChange();
  }, [handleFilterChange, selectedCategory, selectedPriceRange, selectedSex, selectedSizes.length]);
  
  return (
    <>
      <Slider />
      <Main>
        <SexFilter
          sexes={SEX_OPTIONS} 
          selectedSex={selectedSex}
          onSexClick={setSelectedSex}
          onSortChange={setSortOrder}
        />
        <ContentLayout>
          <Sidebar
            selectedSizes={selectedSizes}
            onCategoryChange={setSelectedCategory}
            onPriceRangeChange={setSelectedPriceRange}
            onSizeChange={setSelectedSizes}
          />
          <div>
            {loading && (
              <LoadingContainer>
                商品を読み込み中...
              </LoadingContainer>
            )}
            {error && (
              <ErrorContainer>
                {error}
              </ErrorContainer>
            )}
            {!loading && (
              <ProductContent 
                products={products}
                sex={selectedSex}
                category={selectedCategory}
                priceRange={selectedPriceRange}
                sortOrder={sortOrder}
                sizes={selectedSizes}
                isApiConnected={isApiConnected}
              />
            )}
          </div>
        </ContentLayout>
      </Main>
    </>
  );
};

export default Home;