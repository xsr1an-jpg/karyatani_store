import Navbar from "../components/layout/Navbar";
import Footer from "../components/layout/Footer";

import { PRODUCTS, formatPrice, CUSTOM_CONFIG } from "../data/products"; // Pastikan CUSTOM_CONFIG di-import
import { useCart } from "../context/CartContext";
import { useState, useEffect } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, EffectFade } from "swiper/modules";

import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/effect-fade";

const categories = [
  "all",
  "singkong",
  "pangsit",
  "sistik",
  "pisang",
  "talas",
  "ubi",
];

export default function Home() {
  const { addItem } = useCart();
  const [activeSlide, setActiveSlide] = useState(0);
  const [activeCategory, setActiveCategory] = useState("all");

  // State untuk kontrol Pop-up Bottom Sheet Custom
  const [isBottomSheetOpen, setIsBottomSheetOpen] = useState(false);
  const [customCategory, setCustomCategory] = useState("singkong");
  const [customVariant, setCustomVariant] = useState("");
  const [customWeight, setCustomWeight] = useState(1); // Default 1 kg

  const banners = [
    { image: "/promo1.webp" },
    { image: "/promo2.webp" },
    { image: "/promo3.webp" },
    { image: "/promo4.webp" },
  ];

  // Efek ganti kategori reset rasa bawaan
  useEffect(() => {
    if (CUSTOM_CONFIG[customCategory]) {
      setCustomVariant(CUSTOM_CONFIG[customCategory].variants[0]);
    }
  }, [customCategory]);

  // Handle buka bottom sheet langsung kunci scroll body belakang
  useEffect(() => {
    document.body.style.overflow = isBottomSheetOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [isBottomSheetOpen]);

  // Kalkulasi harga dinamis berdasarkan berat & kategori
  const getCustomPrice = () => {
    const config = CUSTOM_CONFIG[customCategory];
    if (!config) return 0;
    return config.basePricePerKg * customWeight;
  };

  // Kirim pesanan khusus ke dalam keranjang belanja global
  const handleAddCustomToCart = () => {
    const finalPrice = getCustomPrice();
    const customProductObj = {
      id: `custom-${customCategory}-${Date.now()}`, // ID Unik agar tidak bentrok
      name: `${customCategory.charAt(0).toUpperCase() + customCategory.slice(1)} Custom (${customVariant})`,
      category: customCategory,
      price: finalPrice,
      weight: `${customWeight} kg`,
      image: `${customCategory}-original.webp`, // fallback gambar default kategori
      isCustom: true
    };

    addItem(customProductObj);
    setIsBottomSheetOpen(false);
  };

  const filteredProducts =
    activeCategory === "all"
      ? PRODUCTS
      : PRODUCTS.filter((product) => product.category === activeCategory);

  return (
    <>
      <Navbar />

      <main className="page-wrapperr">
        <div className="container">
          {/* Swiper Banner Slider */}
          <Swiper
            modules={[Autoplay, EffectFade]}
            effect="fade"
            autoplay={{ delay: 4500, disableOnInteraction: false }}
            loop={true}
            onSlideChange={(swiper) => setActiveSlide(swiper.realIndex)}
            className="hero-slider"
          >
            {banners.map((banner, index) => (
              <SwiperSlide key={index}>
                <div className="hero-slide">
                  <img src={banner.image} alt="" className="hero-slide__image" />
                  <div className="hero-slide__overlay">
                    <div className="hero-slide__content"></div>
                  </div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>

          <div className="hero-pagination">
            {banners.map((_, index) => (
              <span
                key={index}
                className={`hero-pagination__bullet ${activeSlide === index ? "active" : ""}`}
              />
            ))}
          </div>

          {/* Kategori Tabs */}
          <div className="category-tabs">
            {categories.map((cat) => (
              <button
                key={cat}
                className={`category-btn ${activeCategory === cat ? "active" : ""}`}
                onClick={() => setActiveCategory(cat)}
              >
                {cat === "all" ? "Semua" : cat.charAt(0).toUpperCase() + cat.slice(1)}
              </button>
            ))}
          </div>

          {/* Product Grid */}
          <div className="product-grid">
            
            {/* CARD UKURAN KHUSUS (Selalu Tampil di Baris Pertama) */}
            <div 
  className="product-card product-card--custom" 
  onClick={() => setIsBottomSheetOpen(true)}
  style={{ cursor: 'pointer' }} // Memastikan kursor berubah jadi tangan saat di-hover
>
  <div className="product-card__custom-icon">
    <i className="bi bi-plus-circle-dotted"></i>
  </div>
  <h3>Ukuran Khusus</h3>
  <p>Mulai dari 1 Kg</p>
  <h4>Harga Menyesuaikan</h4>
  
  {/* Tombol tetap dipertahankan sebagai elemen visual pemanis */}
  <button className="btn btn-secondary">
    Atur Ukuran Custom
  </button>
</div>

            {/* Render Produk Reguler */}
            {filteredProducts.map((product) => (
              <div className="product-card" key={product.id}>
                <img src={`/products/${product.image}`} alt={product.name} className="product-image" />
                <h3>{product.name}</h3>
                <p>{product.weight}</p>
                <h4>{formatPrice(product.price)}</h4>
                <button className="btn btn-primary" onClick={() => addItem(product)}>
                  Tambah ke Keranjang
                </button>
              </div>
            ))}
          </div>
        </div>
      </main>

      {/* POP-UP BOTTOM SHEET (Muncul dari Bawah Skala 100% Lebar Layar) */}
      {isBottomSheetOpen && (
        <div className="bottom-sheet-overlay" onClick={() => setIsBottomSheetOpen(false)}>
          <div className="bottom-sheet-content" onClick={(e) => e.stopPropagation()}>
            <div className="bottom-sheet-header">
              <div className="bottom-sheet-drag-handle"></div>
              <h3>Kustomisasi Produk (Min. 1 Kg)</h3>
              <button className="bottom-sheet-close" onClick={() => setIsBottomSheetOpen(false)}>
                <i className="bi bi-x-lg"></i>
              </button>
            </div>

            <div className="bottom-sheet-body">
              {/* Pilih Kategori Utama */}
              <div className="form-group">
                <label>1. Pilih Kategori Cemilan</label>
                <div className="custom-selector-grid">
                  {Object.keys(CUSTOM_CONFIG).map((cat) => (
                    <button
                      key={cat}
                      type="button"
                      className={`selector-item ${customCategory === cat ? 'active' : ''}`}
                      onClick={() => setCustomCategory(cat)}
                    >
                      {cat.charAt(0).toUpperCase() + cat.slice(1)}
                    </button>
                  ))}
                </div>
              </div>

              {/* Pilih Varian Rasa */}
              {CUSTOM_CONFIG[customCategory] && (
                <div className="form-group">
                  <label>2. Pilih Varian Rasa</label>
                  <div className="custom-selector-grid">
                    {CUSTOM_CONFIG[customCategory].variants.map((variant) => (
                      <button
                        key={variant}
                        type="button"
                        className={`selector-item ${customVariant === variant ? 'active' : ''}`}
                        onClick={() => setCustomVariant(variant)}
                      >
                        {variant}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Atur Kelipatan Berat */}
              <div className="form-group">
                <label>3. Atur Berat Produk (Kelipatan 0.5 Kg)</label>
                <div className="weight-counter">
                  <button 
                    disabled={customWeight <= 1}
                    onClick={() => setCustomWeight(prev => Math.max(1, prev - 0.5))}
                  >
                    -
                  </button>
                  <span className="weight-display">{customWeight} Kg</span>
                  <button onClick={() => setCustomWeight(prev => prev + 0.5)}>+</button>
                </div>
              </div>

              <hr />

              {/* Info Total Harga Dinamis */}
              <div className="custom-summary">
                <div>
                  <span className="summary-label">Estimasi Harga:</span>
                  <h2 className="summary-price">{formatPrice(getCustomPrice())}</h2>
                </div>
                <button className="btn btn-primary btn-lg" onClick={handleAddCustomToCart}>
                  Konfirmasi & Masuk Keranjang
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      <Footer />
    </>
  );
}