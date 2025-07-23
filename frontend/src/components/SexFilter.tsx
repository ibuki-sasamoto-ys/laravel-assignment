// SexFilter.tsx
import React from 'react';
import styled from 'styled-components';
import { Sex, SortKey } from '../types';
import { SORT_OPTIONS } from '../constants/options';

type SexFilterProps = {
  sexes: Sex[];
  selectedSex: Sex;
  onSexClick: (sex: Sex) => void;
  onSortChange: (sortKey: SortKey) => void;
};

const FilterWrap = styled.div`
  margin-bottom: 32px;
`;

const FilterList = styled.ul`
  display: flex;
  gap: 16px;
  list-style: none;
  padding: 0;
  margin: 0 0 50px;
`;

const FilterItem = styled.li`
  button {
    all: unset;
    background-color: #f7f7f7;
    color: #444;
    padding: 0.5rem 1rem;
    border-radius: 0.5rem;
    cursor: pointer;
    transition: 0.2s;

    &:hover,
    &:active {
      color: #fff;
      background-color: #444;
    }
  }
`;

const FilterHeader = styled.div`
  display: flex;
  justify-content: space-between;

  span {
    font-size: 24px;
    font-weight: 700;
  }

  select {
    font-size: 16px;
    padding: 0.3rem 0.5rem;
  }
`;

const SexFilter: React.FC<SexFilterProps> = ({ sexes, selectedSex, onSexClick, onSortChange }) => {
  return (
    <FilterWrap>
      <FilterList>
        {sexes.map((sex) => (
          <FilterItem key={sex}> 
            <button type="button" onClick={() => onSexClick(sex)}>
              {sex}
            </button>
          </FilterItem>
        ))}
      </FilterList>

      <FilterHeader>
        <span>{selectedSex}</span>
        <select onChange={(e) => onSortChange(e.target.value as SortKey)}>
          {SORT_OPTIONS.map(option => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      </FilterHeader>
    </FilterWrap>
  );
};

export default SexFilter;
