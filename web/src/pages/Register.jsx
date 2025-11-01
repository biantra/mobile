import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

export default function Register() {
  const [formData, setFormData] = useState({
    fullName: '',
    phoneNumber: '',
    email: '',
    password: '',
    confirmPassword: ''
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { signUp } = useAuth();
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (formData.password !== formData.confirmPassword) {
      setError('Password tidak cocok');
      return;
    }

    if (formData.password.length < 6) {
      setError('Password minimal 6 karakter');
      return;
    }

    setLoading(true);

    try {
      await signUp(
        formData.email,
        formData.password,
        formData.fullName,
        formData.phoneNumber
      );
      navigate('/dashboard');
    } catch (err) {
      setError(err.message || 'Gagal mendaftar');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <div style={styles.logo}>
          <h1 style={styles.title}>DK</h1>
          <p style={styles.subtitle}>Bukittinggi</p>
        </div>

        <h2 style={styles.heading}>Daftar</h2>
        <p style={styles.text}>Buat akun baru untuk memulai</p>

        {error && <div style={styles.error}>{error}</div>}

        <form onSubmit={handleSubmit}>
          <input
            type="text"
            name="fullName"
            placeholder="Nama Lengkap"
            value={formData.fullName}
            onChange={handleChange}
            required
            style={styles.input}
          />
          <input
            type="tel"
            name="phoneNumber"
            placeholder="Nomor Telepon"
            value={formData.phoneNumber}
            onChange={handleChange}
            required
            style={styles.input}
          />
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
            required
            style={styles.input}
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
            required
            style={styles.input}
          />
          <input
            type="password"
            name="confirmPassword"
            placeholder="Konfirmasi Password"
            value={formData.confirmPassword}
            onChange={handleChange}
            required
            style={styles.input}
          />
          <button type="submit" disabled={loading} style={styles.button}>
            {loading ? 'Memproses...' : 'Daftar'}
          </button>
        </form>

        <p style={styles.footer}>
          Sudah punya akun? <Link to="/login" style={styles.link}>Masuk</Link>
        </p>
      </div>
    </div>
  );
}

const styles = {
  container: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: '100vh',
    background: 'linear-gradient(135deg, #0ea5e9 0%, #0284c7 100%)',
    padding: '20px'
  },
  card: {
    background: 'white',
    borderRadius: '16px',
    padding: '40px',
    maxWidth: '420px',
    width: '100%',
    boxShadow: '0 20px 60px rgba(0,0,0,0.15)'
  },
  logo: { textAlign: 'center', marginBottom: '32px' },
  title: { fontSize: '48px', fontWeight: '800', color: '#0ea5e9', margin: 0 },
  subtitle: { fontSize: '14px', color: '#64748b', margin: '4px 0 0 0', fontWeight: '500' },
  heading: { fontSize: '28px', fontWeight: '700', color: '#0f172a', margin: '0 0 8px 0' },
  text: { fontSize: '15px', color: '#64748b', margin: '0 0 24px 0' },
  error: {
    background: '#fee2e2',
    border: '1px solid #fecaca',
    color: '#991b1b',
    padding: '12px 16px',
    borderRadius: '8px',
    marginBottom: '20px',
    fontSize: '14px'
  },
  input: {
    width: '100%',
    padding: '12px 16px',
    border: '2px solid #e2e8f0',
    borderRadius: '8px',
    fontSize: '15px',
    marginBottom: '12px',
    boxSizing: 'border-box',
    outline: 'none'
  },
  button: {
    width: '100%',
    padding: '12px',
    background: '#0ea5e9',
    color: 'white',
    border: 'none',
    borderRadius: '8px',
    fontSize: '16px',
    fontWeight: '600',
    cursor: 'pointer',
    transition: 'all 0.2s'
  },
  footer: { textAlign: 'center', marginTop: '24px', fontSize: '14px', color: '#64748b' },
  link: { color: '#0ea5e9', textDecoration: 'none', fontWeight: '600' }
};
