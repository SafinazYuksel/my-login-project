import { useState } from 'react';
import { Form, FormGroup, Label, Input, Button, FormFeedback } from 'reactstrap';
import { useNavigate } from 'react-router-dom';

const initialForm = { email: '', password: '', terms: false };

const errorMessages = {
  email: 'Lütfen geçerli bir e-posta adresi giriniz.',
  password: 'Şifreniz en az 8 karakter olmalı, harf ve rakam içermelidir.',
};

export default function Login() {
  const [form, setForm] = useState(initialForm);
  const navigate = useNavigate();

  // 1. Validasyon Fonksiyonları
  const isEmailValid = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  const isStrongPassword = (pw) => /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/.test(pw);

  // 2. TÜRETİLMİŞ STATE (Hatanın çözümü burasıdır!)
  // Artık useEffect ve setIsValid state'ine ihtiyacımız yok.
  // Her render'da bu değerler otomatik ve anlık olarak hesaplanır.
  const emailCheck = isEmailValid(form.email);
  const passwordCheck = isStrongPassword(form.password);
  const termsCheck = form.terms === true;
  const isValid = emailCheck && passwordCheck && termsCheck;

  // Hata mesajlarının görünüp görünmeyeceği de anlık hesaplanır
  const errors = {
    email: form.email.length > 0 && !emailCheck,
    password: form.password.length > 0 && !passwordCheck,
  };

  const handleChange = (event) => {
    const { name, value, type, checked } = event.target;
    const newValue = type === 'checkbox' ? checked : value;
    setForm({ ...form, [name]: newValue });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (isValid) navigate('/success');
  };

  return (
    <div className="container mt-5" style={{ maxWidth: '400px' }}>
      <Form onSubmit={handleSubmit} className="p-4 border rounded shadow-sm">
        <h2 className="text-center mb-4">Login</h2>
        
        <FormGroup>
          <Label for="email">Email</Label>
          <Input
            id="email"
            name="email"
            type="email"
            onChange={handleChange}
            value={form.email}
            invalid={errors.email}
          />
          {errors.email && <FormFeedback>{errorMessages.email}</FormFeedback>}
        </FormGroup>

        <FormGroup>
          <Label for="password">Password</Label>
          <Input
            id="password"
            name="password"
            type="password"
            onChange={handleChange}
            value={form.password}
            invalid={errors.password}
          />
          {errors.password && <FormFeedback>{errorMessages.password}</FormFeedback>}
        </FormGroup>

        <FormGroup check className="mb-3">
          <Input
            id="terms"
            name="terms"
            type="checkbox"
            onChange={handleChange}
            checked={form.terms}
          />
          <Label htmlFor="terms" check>Şartları kabul ediyorum</Label>
        </FormGroup>

        <Button color="primary" block disabled={!isValid}>
          Sign In
        </Button>
      </Form>
    </div>
  );
}