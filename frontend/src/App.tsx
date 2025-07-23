// App.tsx（ルーティング用）
import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import MyPage from './pages/MyPage';
import ChangePassword from './pages/ChangePassword';

const App: React.FC = () => {
  return (
    <BrowserRouter>
      <Header /> {/* ← ここに配置 */}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/mypage" element={<MyPage />} />
        <Route path="/account/change-password" element={<ChangePassword />} />
      </Routes>
      <Footer /> {/* 必要ならここにも */}
    </BrowserRouter>
  );
};

export default App;
