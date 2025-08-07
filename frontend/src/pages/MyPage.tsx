import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';

const Wrapper = styled.div`
  max-width: 720px;
  margin: 64px auto;
  padding: 2rem;
  border: 1px solid #ccc;
  border-radius: 8px;
  background-color: #fff;
`;

const Section = styled.div`
  margin-bottom: 2rem;
  position: relative;
`;

const Title = styled.h2`
  font-size: 1.5rem;
  margin-bottom: 1rem;
`;

const Info = styled.p`
  margin: 0.25rem 0;
`;

const Input = styled.input`
  width: 100%;
  padding: 0.4rem;
  margin: 0.25rem 0;
  border: 1px solid #ccc;
  border-radius: 4px;
`;

const EditButton = styled.button`
  position: absolute;
  top: 0;
  right: 0;
  background: none;
  border: none;
  color: #007bff;
  cursor: pointer;
  font-size: 0.9rem;
  text-decoration: underline;
`;

const LinkButton = styled.button`
  display: block;
  width: 100%;
  padding: 0.6rem;
  margin-bottom: 1rem;
  background-color: #eee;
  border: 1px solid #ccc;
  border-radius: 4px;
  font-size: 1rem;
  text-align: left;
  cursor: pointer;

  &:hover {
    background-color: #ddd;
  }
`;

type UserInfo = {
  last_name: string;
  first_name: string;
  last_name_kana: string;
  first_name_kana: string;
  postal: string;
  prefecture: string;
  city: string;
  address: string;
  building: string;
  tel: string;
};

const MyPage: React.FC = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState<UserInfo | null>(null);
  const [editing, setEditing] = useState(false);
  const [form, setForm] = useState<UserInfo | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem('access_token');
    if (!token) {
      alert('ログインが必要です');
      navigate('/login');
      return;
    }

    const fetchUserInfo = async () => {
      try {
        const res = await fetch('http://localhost:8080/api/auth/mypage', {
          method: 'GET',
          headers: {
            Authorization: `Bearer ${token}`,
           'Content-Type': 'application/json',
          },
           credentials: 'include',
        });

        if (!res.ok) throw new Error('ユーザー情報取得に失敗');

        const data = await res.json();
        setUser(data);
        setForm(data); // 編集用コピー
      } catch (err) {
        console.error(err);
        alert('ログイン情報の取得に失敗しました');
        localStorage.removeItem('access_token');
        navigate('/login');
      } finally {
        setLoading(false);
      }
    };

    fetchUserInfo();
  }, [navigate]);

  const handleChange = (key: keyof UserInfo, value: string) => {
    if (form) setForm({ ...form, [key]: value });
  };

  const handleSave = async () => {
    const token = localStorage.getItem('access_token');
    try {
      const res = await fetch('http://localhost:8080/api/auth/update/', {
        method: 'PUT',
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify(form),
      });

      if (!res.ok) throw new Error('更新に失敗しました');

      const updated = await res.json();
      setUser(updated);
      setForm(updated);
      setEditing(false);
    } catch (err) {
      console.error(err);
      alert('更新に失敗しました');
    }
  };


  if (loading) return <Wrapper>読み込み中...</Wrapper>;
  if (!user || !form) return <Wrapper>ユーザー情報が見つかりません。</Wrapper>;

  return (
    <Wrapper>
      <Section>
        <Title>会員情報</Title>
        <EditButton onClick={() => setEditing((prev) => !prev)}>
          {editing ? 'キャンセル' : '編集する'}
        </EditButton>

        {editing ? (
          <>
            <Input
              value={form.last_name}
              onChange={(e) => handleChange('last_name', e.target.value)}
              placeholder="姓"
            />
            <Input
              value={form.first_name}
              onChange={(e) => handleChange('first_name', e.target.value)}
              placeholder="名"
            />
            <Input
              value={form.last_name_kana}
              onChange={(e) => handleChange('last_name_kana', e.target.value)}
              placeholder="姓（カナ）"
            />
            <Input
              value={form.first_name_kana}
              onChange={(e) => handleChange('first_name_kana', e.target.value)}
              placeholder="名（カナ）"
            />
            <Input
              value={form.postal}
              onChange={(e) => handleChange('postal', e.target.value)}
              placeholder="郵便番号"
            />
            <Input
              value={form.prefecture}
              onChange={(e) => handleChange('prefecture', e.target.value)}
              placeholder="都道府県"
            />
            <Input
              value={form.city}
              onChange={(e) => handleChange('city', e.target.value)}
              placeholder="市区町村"
            />
            <Input
              value={form.address}
              onChange={(e) => handleChange('address', e.target.value)}
              placeholder="番地"
            />
            <Input
              value={form.building}
              onChange={(e) => handleChange('building', e.target.value)}
              placeholder="建物名・部屋番号"
            />
            <Input
              value={form.tel}
              onChange={(e) => handleChange('tel', e.target.value)}
              placeholder="電話番号"
            />
            <LinkButton onClick={handleSave}>保存する</LinkButton>
          </>
        ) : (
          <>
            <Info>名前：{user.last_name} {user.first_name}</Info>
            <Info>名前（カナ）：{user.last_name_kana} {user.first_name_kana}</Info>
            <Info>
              住所：〒{user.postal} {user.prefecture}{user.city}{user.address}{user.building && ` ${user.building}`}
            </Info>
            <Info>電話番号：{user.tel}</Info>
          </>
        )}
      </Section>

      {!editing && (
        <Section>
          <LinkButton onClick={() => navigate('/like')}>お気に入り</LinkButton>
          <LinkButton onClick={() => navigate('/order-history')}>注文履歴</LinkButton>
          <LinkButton onClick={() => navigate('/account/change-password')}>パスワード変更</LinkButton>
          <LinkButton onClick={() => {
            localStorage.removeItem('access_token');
            navigate('/login');
          }}>ログアウト</LinkButton>
        </Section>
      )}
    </Wrapper>
  );
};

export default MyPage;
