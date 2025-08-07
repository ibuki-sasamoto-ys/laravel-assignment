import React, { useState } from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";

const Wrapper = styled.div`
  display: flex;
  max-width: 800px;
  margin: 64px auto;
  border: 1px solid #ccc;
  border-radius: 8px;
  overflow: hidden;
`;

const FormSide = styled.div`
  flex: 1;
  padding: 2rem;
`;

const InfoSide = styled.div`
  flex: 1;
  background-color: #f9f9f9;
  padding: 2rem;
`;

const Input = styled.input`
  width: 100%;
  margin-bottom: 1rem;
  padding: 0.5rem;
  font-size: 1rem;
`;

const Button = styled.button<{ disabled: boolean }>`
  width: 100%;
  padding: 0.6rem;
  font-size: 1rem;
  background-color: ${({ disabled }) => (disabled ? "#ccc" : "#333")};
  color: #fff;
  border: none;
  cursor: ${({ disabled }) => (disabled ? "not-allowed" : "pointer")};
`;

const Login: React.FC = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const isValid = email !== "" && password !== "";

  const handleLogin = async () => {
    if (!isValid) return;

    try {
        // 1. CSRF Cookieを取得（必須）
        await fetch("http://localhost:8080/sanctum/csrf-cookie", {
          credentials: "include",
        });

        // 2. ログイン処理
        const res = await fetch("http://localhost:8080/api/auth/login", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: email, // ← SimpleJWTでは username で送る必要あり
          password: password,
        }),
        });

      if (!res.ok) {
        const error = await res.json();
        console.error("ログイン失敗:", error);
        alert("ログインに失敗しました");
        return;
      }

      const data = await res.json();
      console.log("ログイン成功:", data);
      localStorage.setItem("access_token", data.access);
      localStorage.setItem("refreshToken", data.refresh);
      navigate("/");
    } catch (err) {
      console.error("通信エラー:", err);
      alert("通信中にエラーが発生しました");
    }
  };

  return (
    <Wrapper>
      <FormSide>
        <h2>ログイン</h2>
        <Input type="email" placeholder="メールアドレス" value={email} onChange={(e) => setEmail(e.target.value)} />
        <Input type="password" placeholder="パスワード" value={password} onChange={(e) => setPassword(e.target.value)} />
        <Button disabled={!isValid} onClick={handleLogin}>
          ログイン
        </Button>
        <p style={{ marginTop: "1rem" }}>
          <a href="#">パスワードを忘れた方はこちら（未実装）</a>
        </p>
      </FormSide>
      <InfoSide>
        <h3>初めてご利用の方</h3>
        <p>新規会員登録で便利な機能をご利用いただけます。</p>
        <Button disabled={false} onClick={() => navigate("/register")}>
          新規会員登録
        </Button>
      </InfoSide>
    </Wrapper>
  );
};

export default Login;
