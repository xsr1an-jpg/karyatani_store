import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useCart } from '../../context/CartContext';
import './Navbar.css';
import "bootstrap-icons/font/bootstrap-icons.css";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const { totalItems } = useCart();
  const location = useLocation();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const isCartPage = location.pathname === "/keranjang";

  return (
    <header className={`navbar ${scrolled ? 'navbar--scrolled' : ''}`}>
      <div className="container navbar__inner">
        {/* Sisi Kiri: Kondisional antara Logo Toko atau Judul Keranjang */}
        {isCartPage ? (
          <span className="navbar__logo-text" style={{ fontSize: '1.25rem', fontWeight: '600' }}>
            Keranjang
          </span>
        ) : (
          <Link to="/" className="navbar__logo">
            <img
              src="/favicon.svg"
              alt="Karya Tani"
              className="navbar__logo-img"
            />
            <span className="navbar__logo-text">
              Karya Tani <strong>Store</strong>
            </span>
          </Link>
        )}

        {/* Sisi Kanan: Kondisional antara Tombol Kembali atau Icon Keranjang */}
        <div className="navbar__actions">
          {isCartPage ? (
            <Link to="/" className="navbar__back">
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M19 12H5" />
                <path d="M12 19l-7-7 7-7" />
              </svg>
              <span>Kembali</span>
            </Link>
          ) : (
            <Link
              to="/keranjang"
              className="navbar__cart"
              aria-label={`Keranjang, ${totalItems} produk`}
            >
              <i className="bi bi-cart3" style={{ fontSize: "28px" }}></i>

              {totalItems > 0 && (
                <motion.span
                  key={totalItems}
                  className="navbar__badge"
                  initial={{ scale: 0.5, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                >
                  {totalItems > 99 ? "99+" : totalItems}
                </motion.span>
              )}
            </Link>
          )}
        </div>
      </div>
    </header>
  );
}