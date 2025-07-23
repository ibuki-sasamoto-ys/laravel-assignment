import React from 'react';
import styled from 'styled-components';

// styled-components定義
const FooterWrap = styled.footer`
  text-align: center;
  padding: 1rem;
  background-color: #f8f8f8;
  font-size: 0.9rem;
  color: #666;
`;

// コンポーネント本体
const Footer: React.FC = () => {
  return (
    <FooterWrap>
      &copy; {new Date().getFullYear()} sample.com, Inc. All Rights Reserved.
    </FooterWrap>
  );
};

export default Footer;