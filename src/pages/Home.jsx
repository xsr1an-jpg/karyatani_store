import Navbar from "../components/layout/Navbar";
import Footer from "../components/layout/Footer";

import { PRODUCTS, formatPrice } from "../data/products";
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
  
const banners = [
  {
    image: "/promo1.webp",
  },
  {
    image: "/promo2.webp",
  },
  {
    image: "/promo3.webp",
  },
  {
    image: "/promo4.webp",
  },
];

  const filteredProducts =
    activeCategory === "all"
      ? PRODUCTS
      : PRODUCTS.filter(
          (product) => product.category === activeCategory
        );
        
  return (
    <>

      <Navbar />

      <main className="page-wrapperr">
        <div className="container">
<Swiper
  modules={[Autoplay, EffectFade]}
  effect="fade"
  autoplay={{
    delay: 4500,
    disableOnInteraction: false,
  }}
  loop={true}
  onSlideChange={(swiper) => {
    setActiveSlide(swiper.realIndex);
  }}
  className="hero-slider"
>
  {banners.map((banner, index) => (
    <SwiperSlide key={index}>
      <div className="hero-slide">
        <img
          src={banner.image}
          alt={banner.title}
          className="hero-slide__image"
        />

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
      className={`hero-pagination__bullet ${
        activeSlide === index ? "active" : ""
      }`}
    />
  ))}
</div>

          <div className="category-tabs">
  {categories.map((cat) => (
    <button
      key={cat}
      className={`category-btn ${
        activeCategory === cat ? "active" : ""
      }`}
      onClick={() => setActiveCategory(cat)}
    >
      {cat === "all"
        ? "Semua"
        : cat.charAt(0).toUpperCase() + cat.slice(1)}
    </button>
  ))}
</div>

          <div className="product-grid">
            {filteredProducts.map((product) => (
              <div className="product-card" key={product.id}>
                <img
  src={`/products/${product.image}`}
  alt={product.name}
  className="product-image"
/>

                <h3>{product.name}</h3>

                <p>{product.weight}</p>

                <h4>{formatPrice(product.price)}</h4>

                <button
                  className="btn btn-primary"
                  onClick={() => addItem(product)}
                >
                  Tambah ke Keranjang
                </button>
              </div>
            ))}
          </div>
        </div>
      </main>

      <Footer />
    </>
  );
}