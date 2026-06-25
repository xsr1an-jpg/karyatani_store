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
        </div>
      </header>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileOpen && (
          <>
            <motion.div
              className="mobile-overlay"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              onClick={() => setMobileOpen(false)}
            />
            <motion.nav
              className="mobile-menu"
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', stiffness: 300, damping: 32 }}
              aria-label="Navigasi mobile"
            >
              <div className="mobile-menu__header">
                <span className="navbar__logo">
                   <img
    src="/favicon.svg"
    alt="Karya Tani"
    className="navbar__logo-img"
  />

  <span className="navbar__logo-text">
    Karya Tani <strong>Store</strong>
  </span></span>
                <button
                  className="mobile-menu__close"
                  onClick={() => setMobileOpen(false)}
                  aria-label="Tutup menu"
                >
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
                    <line x1="18" y1="6" x2="6" y2="18"/>
                    <line x1="6" y1="6" x2="18" y2="18"/>
                  </svg>
                </button>
              </div>

              <div className="mobile-menu__links">
                {NAV_LINKS.map(({ to, label }, i) => (
                  <motion.div
                    key={to}
                    initial={{ opacity: 0, x: 24 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.06 + 0.1 }}
                  >
                    <NavLink
                      to={to}
                      end={to === '/'}
                      className={({ isActive }) =>
                        `mobile-menu__link ${isActive ? 'mobile-menu__link--active' : ''}`
                      }
                    >
                      {label}
                    </NavLink>
                  </motion.div>
                  
                ))}

                <motion.div
  initial={{ opacity: 0, x: 24 }}
  animate={{ opacity: 1, x: 0 }}
  transition={{ delay: 0.2 }}
>
  <a
    href="#"
    className="mobile-menu__link"
    onClick={(e) => {
      e.preventDefault();
      setMobileOpen(false);
      alert("Landing page sedang dibuat 😁");
    }}
  >
    Tentang
  </a>
</motion.div>

<motion.div
  initial={{ opacity: 0, x: 24 }}
  animate={{ opacity: 1, x: 0 }}
  transition={{ delay: 0.25 }}
>
  <a
    href="#kontak"
    className="mobile-menu__link"
    onClick={(e) => {
      e.preventDefault();
      setMobileOpen(false);

      setTimeout(() => {
        document.getElementById("kontak")?.scrollIntoView({
          behavior: "smooth",
        });
      }, 200);
    }}
  >
    Kontak
  </a>
</motion.div>

                <motion.div
                  initial={{ opacity: 0, x: 24 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: NAV_LINKS.length * 0.06 + 0.1 }}
                >
              
                </motion.div>
              </div>
            </motion.nav>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
