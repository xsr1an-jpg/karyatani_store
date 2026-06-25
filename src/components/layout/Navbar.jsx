import { useState, useEffect } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { useCart } from '../../context/CartContext';
import './Navbar.css';
import "bootstrap-icons/font/bootstrap-icons.css";
const NAV_LINKS = [
  { to: '/', label: 'Home' },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const { totalItems } = useCart();
  const location = useLocation();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    setMobileOpen(false);
  }, [location]);

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [mobileOpen]);
const isCartPage = location.pathname === "/keranjang";
  return (
    <>
      <header className={`navbar ${scrolled ? 'navbar--scrolled' : ''}`}>
        <div className="container navbar__inner">
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

          {/* Desktop Nav */}
{!isCartPage && (
  <nav className="navbar__links" aria-label="Navigasi utama">
    <NavLink
      to="/"
      end
      className={({ isActive }) =>
        `navbar__link ${isActive ? 'navbar__link--active' : ''}`
      }
    >
      Home
    </NavLink>

    <a
      href="#"
      className="navbar__link"
      onClick={(e) => {
        e.preventDefault();
        alert("Landing page sedang dibuat 😁");
      }}
    >
      Tentang
    </a>

    <a
      href="#kontak"
      className="navbar__link"
      onClick={(e) => {
        e.preventDefault();
        document.getElementById("kontak")?.scrollIntoView({
          behavior: "smooth",
        });
      }}
    >
      Kontak
    </a>
  </nav>
)}

          {/* Right actions */}
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
      <span>Home</span>
    </Link>
  ) : (
    <>
      <Link
        to="/keranjang"
        className="navbar__cart"
        aria-label={`Keranjang, ${totalItems} produk`}
      >
       <i
  className="bi bi-cart3"
  style={{ fontSize: "28px" }}
></i>

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

      <button
        className={`navbar__hamburger ${mobileOpen ? "open" : ""}`}
        onClick={() => setMobileOpen(v => !v)}
        aria-label="Toggle menu"
      >
        <span />
        <span />
        <span />
      </button>
    </>
  )}
</div>
        </div>
      </header>
    </>
  );
}
