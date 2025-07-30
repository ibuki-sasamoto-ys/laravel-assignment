import React, { useState } from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import { ACCOUNT_FIELDS, ADDRESS_FIELDS } from "../constants/options";

const Wrapper = styled.div`
  max-width: 720px;
  margin: 64px auto;
`;

const Form = styled.div`
  padding: 2rem;
  border: 1px solid #ccc;
  border-radius: 8px;
  background-color: #f7f7f7;
`;

const Title = styled.h1`
  margin-bottom: 1rem;
`;

const Subtitle = styled.h2`
  margin-bottom: 1rem;
`;

const Column = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1 1 48%;
  min-width: 200px;
  margin-bottom: 2px;
`;

const Row = styled.div`
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
  gap: 10px;
`;

const Label = styled.label`
  display: block;
  font-weight: bold;
  margin-bottom: 0.25rem;
`;

const Input = styled.input`
  width: 100%;
  padding: 0.5rem;
  font-size: 1rem;
  border: 1px solid #ccc;
  border-radius: 4px;
  box-sizing: border-box;
`;

const Error = styled.div`
  color: red;
  font-size: 0.875rem;
  margin-top: 0.25rem;
`;

const SubmitButton = styled.button`
  display: block;
  width: 200px;
  margin: 2rem auto 0;
  padding: 0.6rem;
  font-size: 1rem;
  background-color: ${({ disabled }) => (disabled ? "#ccc" : "#FFB118")};
  color: #fff;
  border: none;
  border-radius: 4px;
  cursor: ${({ disabled }) => (disabled ? "not-allowed" : "pointer")};
  opacity: ${({ disabled }) => (disabled ? 0.6 : 1)};
`;

const Register: React.FC = () => {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    last_name: "",
    first_name: "",
    last_name_kana: "",
    first_name_kana: "",
    email: "",
    password: "",
    tel: "",
    postal: "",
    prefecture: "",
    city: "",
    address: "",
    building: "",
  });

  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  const validate = () => {
    const newErrors: { [key: string]: string } = {};
    Object.entries(form).forEach(([key, value]) => {
      if (!value && key !== "building") newErrors[key] = "必須項目です。";
      if (key === "email" && value && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
        newErrors[key] = "メールアドレスの形式が異なります。";
      }
    });
    return newErrors;
  };

  const handleSubmit = async () => {
    const errs = validate();
    setErrors(errs);
    if (Object.keys(errs).length > 0) return;

    try {
      const res = await fetch("http://localhost:8080/api/auth/sign-up/", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...form, username: form.email }),
      });

      if (!res.ok) {
        throw new window.Error("登録に失敗しました");
      }

      console.log("登録成功", form);
      navigate("/");
    } catch (err) {
      console.error(err);
      alert("登録中にエラーが発生しました");
    }
  };

  const handleChange = (field: string, value: string) => {
    setForm({ ...form, [field]: value });
    setErrors((prev) => ({ ...prev, [field]: "" }));
  };

  const canSubmit = Object.entries(form).every(([key, value]) => (key === "building" ? true : value !== ""));

  return (
    <Wrapper>
      <Title>新規会員登録</Title>
      <Form>
        <Subtitle>アカウント情報</Subtitle>
        <Row>
          {ACCOUNT_FIELDS.map(({ name, label }) => (
            <Column key={name}>
              <Label>{label}</Label>
              <Input
                type={name === "password" ? "password" : "text"}
                value={form[name as keyof typeof form]}
                onChange={(e) => handleChange(name, e.target.value)}
              />
              {errors[name] && <Error>{errors[name]}</Error>}
            </Column>
          ))}
        </Row>
        <Subtitle>お届け先</Subtitle>
        <Row>
          {ADDRESS_FIELDS.map(({ name, label }) => (
            <Column key={name}>
              <Label>{label}</Label>
              <Input type="text" value={form[name as keyof typeof form]} onChange={(e) => handleChange(name, e.target.value)} />
              {errors[name] && <Error>{errors[name]}</Error>}
            </Column>
          ))}
        </Row>
        <SubmitButton disabled={!canSubmit} onClick={handleSubmit}>
          登録する
        </SubmitButton>
      </Form>
    </Wrapper>
  );
};

export default Register;
