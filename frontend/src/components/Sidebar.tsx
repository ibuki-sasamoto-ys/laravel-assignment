import styled from 'styled-components';
import { PriceRange } from '../types';
import { CATEGORY_OPTIONS, PRICE_RANGE_OPTIONS, SIZE_OPTIONS } from '../constants/options';

type SidebarProps = {
  selectedSizes: string[];
  onCategoryChange: (category: string) => void;
  onPriceRangeChange: (range: PriceRange) => void;
  onSizeChange: (sizes: string[]) => void;
};

const SidebarContainer = styled.div`
  padding: 24px;
  width: 209px;
  box-sizing: border-box;
  background-color: #F7F7F7;
`;

const Section = styled.li`
  margin-bottom: 1.5rem;
  list-style: none;
`;

const Title = styled.span`
  display: block;
  font-weight: bold;
  margin-bottom: 0.5rem;
`;

const Select = styled.select`
  width: 100%;
  padding: 0.4rem 0.6rem;
  border: 1px solid #ccc;
  border-radius: 0.4rem;
  box-sizing: border-box;
`;

const CheckboxList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.4rem;
`;

const CheckboxLabel = styled.label`
  display: flex;
  align-items: center;
  gap: 0.4rem;
  font-size: 14px;
  cursor: pointer;
`;

const SizeOptions = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
`;

const SizeLabel = styled.label`
  display: flex;
  align-items: center;
  gap: 0.3rem;
  cursor: pointer;
`;

const Sidebar: React.FC<SidebarProps> = ({ 
  selectedSizes,
  onCategoryChange, 
  onPriceRangeChange, 
  onSizeChange 
}) => {

  const handleSizeChange = (sizeName: string) => {
    const newSelectedSizes = selectedSizes.includes(sizeName)
      ? selectedSizes.filter(size => size !== sizeName)
      : [...selectedSizes, sizeName];
    
    onSizeChange(newSelectedSizes);
  };

  return (
    <SidebarContainer>
      <ul style={{ padding: 0, margin: 0 }}>
        <Section>
          <Title>カテゴリ</Title>
          <Select onChange={(e) => onCategoryChange(e.target.value)}>
            {CATEGORY_OPTIONS.map((category, index) => (
              <option key={index} value={category.name}>
                {category.name}
              </option>
            ))}
          </Select>
        </Section>

        <Section>
          <Title>価格帯</Title>
          <CheckboxList>
            {PRICE_RANGE_OPTIONS.map(option => (
              <CheckboxLabel key={option.value}>
                <input
                  type="radio"
                  name="price"
                  value={option.value}
                  onChange={(e) => onPriceRangeChange(e.target.value as PriceRange)}
                />
                {option.label}
              </CheckboxLabel>
            ))}
          </CheckboxList>
        </Section>

        <Section>
          <Title>サイズ</Title>
          <SizeOptions>
            {SIZE_OPTIONS.map((size) => (
              <SizeLabel key={size}>
                <input 
                  type="checkbox" 
                  value={size}
                  checked={selectedSizes.includes(size)}
                  onChange={() => handleSizeChange(size)}
                />
                <span>{size}</span>
              </SizeLabel>
            ))}
          </SizeOptions>
        </Section>
      </ul>
    </SidebarContainer>
  );
};

export default Sidebar;