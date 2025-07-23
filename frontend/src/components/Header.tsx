import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { Link, useLocation } from 'react-router-dom';

const HeaderWrap = styled.header`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 1rem 2rem;
  background-color: #fff;
  border-bottom: 1px solid #ddd;
`;

const Logo = styled.img`
  height: 40px;
`;

const Nav = styled.nav`
  display: flex;
  align-items: center;
  gap: 1.2rem;

  a {
    text-decoration: none;
    color: #333;
    font-weight: 500;
    display: flex;
    align-items: center;

    img {
      height: 24px;
      width: 24px;
    }
  }
`;

const Header: React.FC = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const location = useLocation(); // URL変更をトリガーにする

  useEffect(() => {
    const token = localStorage.getItem('access_token');
    setIsLoggedIn(!!token);
  }, [location]); // URLが変わるたびにチェック

  return (
    <HeaderWrap>
      <Link to="/">
        <Logo src="/images/logo.svg" alt="ロゴ" />
      </Link>
      <Nav>
        {isLoggedIn ? (
          <Link to="/mypage">マイページ</Link>
        ) : (
          <Link to="/login">ログイン</Link>
        )}
        <Link to="/like"><img src="/images/heart.svg" alt="お気に入り" /></Link>
        <Link to="/cart"><img src="/images/cart.svg" alt="カート" /></Link>
      </Nav>
    </HeaderWrap>
  );
};

export default Header;
