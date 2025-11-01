import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { supabase } from '../lib/supabase';

export default function Dashboard() {
  const { user, profile, signOut } = useAuth();
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    loadServices();
  }, []);

  const loadServices = async () => {
    try {
      const { data } = await supabase
        .from('services')
        .select('*')
        .eq('is_active', true)
        .order('created_at');
      setServices(data || []);
    } catch (error) {
      console.error('Error loading services:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSignOut = async () => {
    try {
      await signOut();
      navigate('/login');
    } catch (error) {
      console.error('Error signing out:', error);
    }
  };

  const formatBalance = (balance) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 0,
    }).format(balance || 0);
  };

  return (
    <div style={styles.container}>
      <header style={styles.header}>
        <div style={styles.headerTop}>
          <h1 style={styles.brandName}>DK Bukittinggi</h1>
          <button onClick={handleSignOut} style={styles.logoutButton}>
            Keluar
          </button>
        </div>

        <div style={styles.profileCard}>
          <div style={styles.profileInfo}>
            <div style={styles.avatar}>
              {profile?.full_name?.charAt(0).toUpperCase() || 'U'}
            </div>
            <div>
              <h2 style={styles.userName}>{profile?.full_name || 'User'}</h2>
              <p style={styles.userPhone}>{profile?.phone_number || ''}</p>
            </div>
          </div>
          <div style={styles.balanceCard}>
            <p style={styles.balanceLabel}>Saldo DK-Pay</p>
            <p style={styles.balanceAmount}>{formatBalance(profile?.balance)}</p>
          </div>
        </div>
      </header>

      <main style={styles.main}>
        <section style={styles.section}>
          <h3 style={styles.sectionTitle}>Layanan Kami</h3>

          {loading ? (
            <p style={styles.loading}>Memuat layanan...</p>
          ) : (
            <div style={styles.servicesGrid}>
              {services.map((service) => (
                <div
                  key={service.id}
                  style={styles.serviceCard}
                  onClick={() => alert(`Layanan ${service.name} akan segera tersedia!`)}
                >
                  <div style={styles.serviceIcon}>{service.icon}</div>
                  <h4 style={styles.serviceName}>{service.name}</h4>
                  <p style={styles.serviceDesc}>{service.description}</p>
                </div>
              ))}
            </div>
          )}
        </section>

        <section style={styles.section}>
          <h3 style={styles.sectionTitle}>Promo Spesial</h3>
          <div style={styles.promoCard}>
            <div style={styles.promoIcon}>🎉</div>
            <div>
              <h4 style={styles.promoTitle}>Diskon 50% untuk pengguna baru!</h4>
              <p style={styles.promoDesc}>Berlaku untuk semua layanan transportasi</p>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}

const styles = {
  container: { minHeight: '100vh', background: '#f8fafc' },
  header: { background: 'linear-gradient(135deg, #0ea5e9 0%, #0284c7 100%)', padding: '24px 20px 32px', color: 'white' },
  headerTop: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' },
  brandName: { fontSize: '24px', fontWeight: '800', margin: 0 },
  logoutButton: {
    background: 'rgba(255, 255, 255, 0.2)',
    border: 'none',
    color: 'white',
    padding: '8px 16px',
    borderRadius: '8px',
    fontSize: '14px',
    fontWeight: '600',
    cursor: 'pointer'
  },
  profileCard: {
    background: 'rgba(255, 255, 255, 0.15)',
    backdropFilter: 'blur(10px)',
    borderRadius: '16px',
    padding: '20px',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    gap: '16px'
  },
  profileInfo: { display: 'flex', alignItems: 'center', gap: '16px' },
  avatar: {
    width: '56px',
    height: '56px',
    borderRadius: '50%',
    background: 'white',
    color: '#0ea5e9',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: '24px',
    fontWeight: '700'
  },
  userName: { fontSize: '18px', fontWeight: '700', margin: '0 0 4px 0' },
  userPhone: { fontSize: '14px', margin: 0, opacity: 0.9 },
  balanceCard: { textAlign: 'right' },
  balanceLabel: { fontSize: '12px', margin: '0 0 4px 0', opacity: 0.9 },
  balanceAmount: { fontSize: '20px', fontWeight: '700', margin: 0 },
  main: { maxWidth: '1200px', margin: '0 auto', padding: '24px 20px' },
  section: { marginBottom: '32px' },
  sectionTitle: { fontSize: '20px', fontWeight: '700', color: '#0f172a', margin: '0 0 16px 0' },
  loading: { textAlign: 'center', padding: '40px', color: '#64748b' },
  servicesGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fill, minmax(160px, 1fr))',
    gap: '16px'
  },
  serviceCard: {
    background: 'white',
    border: '2px solid #e2e8f0',
    borderRadius: '16px',
    padding: '24px 16px',
    cursor: 'pointer',
    textAlign: 'center',
    transition: 'all 0.2s'
  },
  serviceIcon: { fontSize: '48px', marginBottom: '12px' },
  serviceName: { fontSize: '16px', fontWeight: '700', color: '#0f172a', margin: '0 0 8px 0' },
  serviceDesc: { fontSize: '13px', color: '#64748b', margin: 0, lineHeight: '1.5' },
  promoCard: {
    background: 'white',
    border: '2px solid #fbbf24',
    borderRadius: '16px',
    padding: '20px',
    display: 'flex',
    gap: '16px',
    alignItems: 'center'
  },
  promoIcon: { fontSize: '40px' },
  promoTitle: { fontSize: '16px', fontWeight: '700', color: '#0f172a', margin: '0 0 4px 0' },
  promoDesc: { fontSize: '14px', color: '#64748b', margin: 0 }
};
