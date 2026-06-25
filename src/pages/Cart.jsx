import { useState, useEffect } from "react";
import Navbar from "../components/layout/Navbar";
import Footer from "../components/layout/Footer";
import ProductImage from "../components/product/ProductImage";
import { useCart } from "../context/CartContext";
import { formatPrice } from "../data/products";
import "bootstrap-icons/font/bootstrap-icons.css";
export default function Cart() {
  const {
  items,
  totalPrice,
  increaseQty,
  decreaseQty,
  clearCart
} = useCart();

const [showModal, setShowModal] = useState(false);
const [customerName, setCustomerName] = useState("");
const totalItems = items.reduce(
  (total, item) => total + item.qty,
  0
);
useEffect(() => {
  if (showModal) {
    document.body.style.overflow = "hidden";
  } else {
    document.body.style.overflow = "auto";
  }

  return () => {
    document.body.style.overflow = "auto";
  };
}, [showModal]);

  return (
    <>
      <Navbar />

      <main className="page-wrapper">
        <div className="container">

  {items.length === 0 ? (
    <div className="empty-cart">
  <i className="bi bi-cart-x empty-cart__icon"></i>

  <h3>Keranjang Kosong</h3>

  <p>
    Belum ada produk yang ditambahkan ke keranjang.
  </p>
</div>
  ) : (
    <>
      <div className="product-grid">
        {items.map((item) => (
          <div className="product-card" key={item.id}>
  <img
    src={`/products/${item.image}`}
    alt={item.name}
    className="product-image"
  />

  <h3>{item.name}</h3>

  <p>{item.weight}</p>

  <h4>{formatPrice(item.price * item.qty)}</h4>

  <div className="qty-control">
    <button onClick={() => decreaseQty(item.id)}>
      -
    </button>

    <span>{item.qty}</span>

    <button onClick={() => increaseQty(item.id)}>
      +
    </button>
  </div>
</div>
        ))}
      </div>

      <div
        style={{
          marginTop: "20px",
          display: "flex",
          gap: "10px",
          flexWrap: "wrap",
        }}
      >
        <div className="cart-actions">
  <button
    className="btn btn-outline"
    onClick={clearCart}
  >
    Reset Keranjang
  </button>

  <button
    className="btn btn-primary"
    onClick={() => setShowModal(true)}
  >
    Pesan Sekarang
  </button>
</div>
      </div>

<div className="cart-summary">
  <div className="summary-item">
    <span>Jumlah Produk:</span>
    <strong>{totalItems}</strong>
  </div>

  <div className="summary-item">
    <span>Total Harga :</span>
    <strong>{formatPrice(totalPrice)}</strong>
  </div>
</div>
    </>
  )}
</div>
{showModal && (
  <div className="checkout-modal">
    <div className="checkout-box">
      <h2>Konfirmasi Pesanan</h2>

      <input
        type="text"
        placeholder="Nama Anda"
        value={customerName}
        onChange={(e) =>
          setCustomerName(e.target.value)
        }
      />

<div className="checkout-list">
  {items.map((item) => (
    <p key={item.id}>
      {/* Jika custom tampilkan nama + berat, jika reguler tampilkan nama + x qty */}
      {item.isCustom ? (
        <span>{item.name} ({item.weight})</span>
      ) : (
        <span>{item.name} x {item.qty}</span>
      )}
    </p>
  ))}
</div>

      <h3>Total: {formatPrice(totalPrice)}</h3>
<h4>Jumlah Produk: {totalItems}</h4>
      
<div className="modal-actions">
  <button
    className="btn btn-outline"
    onClick={() => setShowModal(false)}
  >
    Batal
  </button>

<button
  className="btn btn-primary"
  onClick={() => {
    if (!customerName.trim()) {
      alert("Nama wajib diisi");
      return;
    }

    const pesan = `
Halo Karya Tani

Nama: ${customerName}

Pesanan:
${items
  .map((i) => {
    // Jika produk adalah custom, tampilkan beratnya. Jika reguler, tampilkan qty (bungkus).
    const jumlahBeli = i.isCustom ? i.weight : `${i.qty} bungkus`;
    return `- ${i.name} (${jumlahBeli})`;
  })
  .join("\n")}

Jumlah Jenis Produk:
${totalItems}

Total:
${formatPrice(totalPrice)}
`;

    window.open(
      `https://wa.me/6285294964110?text=${encodeURIComponent(pesan)}`
    );

    setShowModal(false);
  }}
>
  Konfirmasi
</button>
</div>

      
    </div>
  </div>
)}
      </main>

      <Footer />
    </>
  );
}