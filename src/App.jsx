import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import AppRouter from "./router/AppRouter";
import { ToastContainer } from "react-toastify";
import logo from "./assets/logo.svg";

import "react-toastify/dist/ReactToastify.css";

function App() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Kunci scroll layar saat animasi loader berjalan
    document.body.style.overflow = "hidden";

    // Set minimal waktu loading berputar selama 3 detik
    const minimumTime = new Promise((resolve) =>
      setTimeout(resolve, 3000)
    );

    // Memastikan aset-aset halaman web telah selesai dimuat sempurna
    const pageLoaded = new Promise((resolve) => {
      if (document.readyState === "complete") {
        resolve();
      } else {
        window.addEventListener("load", resolve, {
          once: true,
        });
      }
    });

    // Jalankan kedua instruksi bersamaan sebelum mematikan loader
    Promise.all([minimumTime, pageLoaded]).then(() => {
      setLoading(false);
      document.body.style.overflow = "auto";
    });

    // Cleanup function untuk mengembalikan overflow body jika komponen unmount
    return () => {
      document.body.style.overflow = "auto";
    };
  }, []);

  // Tampilan layar loading animasi
  if (loading) {
    return (
      <div className="loader-screen">
        <div className="loader-wrapper">
          <div className="loader-glow" />

          {/* Animasi Ring Berputar */}
          <motion.div
            animate={{
              rotate: 360,
            }}
            transition={{
              repeat: Infinity,
              duration: 5,
              ease: "linear",
            }}
            className="loader-ring"
          />

          {/* Animasi Logo Membesar-Mengecil */}
          <motion.img
            src={logo}
            alt="Logo"
            animate={{
              scale: [1, 1.15, 1],
            }}
            transition={{
              repeat: Infinity,
              duration: 5,
              ease: "easeInOut",
            }}
            className="loader-logo"
          />

          {/* Animasi Teks Berkedip Halus */}
          <motion.p
            animate={{
              opacity: [0.3, 1, 0.3],
              y: [0, -3, 0],
            }}
            transition={{
              repeat: Infinity,
              duration: 1.6,
            }}
            className="loader-text"
          >
            MEMUAT PRODUK...
          </motion.p>
        </div>
      </div>
    );
  }

  // Tampilan utama aplikasi saat loading selesai
  return (
    <>
      <AppRouter />

      <ToastContainer
        position="bottom-right"
        autoClose={2000}
        hideProgressBar={false}
        newestOnTop
        closeOnClick
        pauseOnHover
        theme="light"
      />
    </>
  );
}

export default App;