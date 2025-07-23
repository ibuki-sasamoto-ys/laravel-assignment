// ProductList.tsx
import styled from 'styled-components';
import { Product } from '../../../types';

type ProductListProps = {
  products: Product[];
};

const ProductGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 48px;
`;

const ProductCard = styled.a`
  display: block;
  text-decoration: none;
  color: inherit;
  padding: 1px;
`;

const ProductImage = styled.img`
  width: 209px;
  height: 209px;
  object-fit: cover;
  display: block;
  margin: 0 auto 14px;
  background-color: #ddd;
`;

const ProductTitle = styled.h3`
  font-size: 14px;
  font-weight: 400;
  line-height: 21px;
  color: #444;
  margin: 0 0 0.8px;
`;

const ProductPrice = styled.p`
  font-size: 18px;
  font-weight: 700;
  line-height: 27px;
  color: #555;
  margin: 0;

  span {
    font-size: 12px;
    font-weight: 400;
    line-height: 18px;
  }
`;

const ProductList: React.FC<ProductListProps> = ({ products }) => {
  return (
    <ProductGrid>
      {products.map((product) => (
        <ProductCard key={product.productId} href={`/product/${product.productId}`}>
          <ProductImage 
            src={product.images.length > 0 ? product.images[0] : '/images/no-image.jpg'} 
            alt={product.name} 
          />
          <ProductTitle>{product.name}</ProductTitle>
          <ProductPrice>
            ¥{product.price.toLocaleString()} <span>（税込み）</span>
          </ProductPrice>
        </ProductCard>
      ))}
    </ProductGrid>
  );
};

export default ProductList;