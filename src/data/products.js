// ============================================
// KARYA TANI — Product Data (Clean Version)
// ============================================

export const CATEGORIES = [
  { id: 'all', label: 'Semua', emoji: '🌿', color: '#4f7f5c' },
  { id: 'singkong', label: 'Singkong', emoji: '🌾', color: '#8B6914' },
  { id: 'pangsit', label: 'Pangsit', emoji: '🥟', color: '#C44B2B' },
  { id: 'sistik', label: 'Sistik', emoji: '🥢', color: '#6B3F8C' },
  { id: 'pisang', label: 'Pisang', emoji: '🍌', color: '#C78D00' },
  { id: 'talas', label: 'Talas', emoji: '🟣', color: '#7B4EA0' },
  { id: 'ubi', label: 'Ubi', emoji: '🟠', color: '#C45C1A' },
];

const gradientMap = {
  singkong: ['#F5E6C8', '#D4A853'],
  pangsit: ['#FFE0D9', '#E8654A'],
  sistik: ['#EDD9FF', '#9B59B6'],
  pisang: ['#FFF3C4', '#F0C020'],
  talas: ['#E8D5FF', '#8B5CF6'],
  ubi: ['#FFE0C4', '#E0783C'],
};

const categoryLabel = {
  singkong: 'Singkong',
  pangsit: 'Pangsit',
  sistik: 'Sistik',
  pisang: 'Pisang',
  talas: 'Talas',
  ubi: 'Ubi',
};

function makeProduct(id, category, name, price, weight, image, featured = false) {
  return {
    id,
    category,
    categoryLabel: categoryLabel[category],
    name,
    price,
    weight,
    image,
    featured,
    gradient: gradientMap[category],
    emoji: CATEGORIES.find(c => c.id === category)?.emoji || '🌿',
  };
}

export const PRODUCTS = [
  // Singkong
  makeProduct('sg1', 'singkong', 'Singkong Original', 15000, '335 gram', 'singkong-original.webp', true),
  makeProduct('sg2', 'singkong', 'Singkong Balado', 15000, '335 gram', 'singkong-balado.webp'),
  makeProduct('sg3', 'singkong', 'Singkong Jagung Manis', 15000, '335 gram', 'singkong-jagung-manis.webp'),
  makeProduct('sg5', 'singkong', 'Singkong Ekstra Pedas', 15000, '335 gram', 'singkong-ekstra-pedas.webp'),
  makeProduct('sg6', 'singkong', 'Singkong Misda (Pre-Order)', 15000, '335 gram', 'singkong-misda.webp'),

  // Pangsit
  makeProduct('pg1', 'pangsit', 'Pangsit Bawang', 15000, '335 gram', 'pangsit-bawang.webp', true),
  makeProduct('pg2', 'pangsit', 'Pangsit Ubi Ungu', 15000, '335 gram', 'pangsit-ubiungu.webp'),
  makeProduct('pg3', 'pangsit', 'Pangsit Bayam', 15000, '335 gram', 'pangsit-bayam.webp'),
  makeProduct('pg4', 'pangsit', 'Pangsit Wortel', 15000, '335 gram', 'pangsit-wortel.webp'),
  makeProduct('pg5', 'pangsit', 'Pangsit Labu', 15000, '335 gram', 'pangsit-labu.webp'),
  makeProduct('pg6', 'pangsit', 'Pangsit Buah Naga', 15000, '335 gram', 'pangsit-buahnaga.webp'),

  // Sistik
  makeProduct('st1', 'sistik', 'Sistik Bawang', 15000, '335 gram', 'sistik-bawang.webp', true),
  makeProduct('st2', 'sistik', 'Sistik Ubi Ungu', 15000, '335 gram', 'sistik-ubiungu.webp'),
  makeProduct('st3', 'sistik', 'Sistik Bayam', 15000, '335 gram', 'sistik-bayam.webp'),
  makeProduct('st4', 'sistik', 'Sistik Wortel', 15000, '335 gram', 'sistik-wortel.webp'),
  makeProduct('st5', 'sistik', 'Sistik Labu', 15000, '335 gram', 'sistik-labu.webp'),
  makeProduct('st6', 'sistik', 'Sistik Buah Naga', 15000, '335 gram', 'sistik-buahnaga.webp'),

  // Pisang
  makeProduct('ps1', 'pisang', 'Pisang Original Panjang', 25000, '455 gram', 'pisang-panjang.webp', true),
  makeProduct('ps2', 'pisang', 'Pisang Original Pendek', 25000, '455 gram', 'pisang-pendek.webp'),
  makeProduct('ps3', 'pisang', 'Pisang Manis', 25000, '455 gram', 'pisang-manis.webp'),
  makeProduct('ps4', 'pisang', 'Pisang Manis Gula Merah', 25000, '455 gram', 'pisang-manisgulamerah.webp'),
  makeProduct('ps5', 'pisang', 'Pisang Matang', 25000, '455 gram', 'pisang-matang.webp'),
  makeProduct('ps6', 'pisang', 'Pisang Sale', 25000, '455 gram', 'pisang-sale.webp'),

  // Talas
  makeProduct('tl1', 'talas', 'Talas Original (Besar)', 25000, '420 gram', 'talas-besar.webp'),
  makeProduct('tl2', 'talas', 'Talas Original (Kecil)', 15000, '250 gram', 'talas-kecil.webp', true),
  makeProduct('tl3', 'talas', 'Talas Balado', 25000, '420 gram', 'talas-balado.webp'),

  // Ubi
  makeProduct('ub1', 'ubi', 'Ubi Original', 15000, '300 gram', 'ubi-original.webp', true),
  makeProduct('ub2', 'ubi', 'Ubi Ungu', 15000, '300 gram', 'ubi-ungu.webp', true),
];

// KONFIGURASI HARGA & VARIAN RASA CUSTOM (Minimal 1 Kg)
export const CUSTOM_CONFIG = {
  singkong: {
    basePricePerKg: 45000,
    image: 'produk-custom-singkong.webp',
    variants: ['Original', 'Balado', 'Jagung Manis', 'Ekstra Pedas', 'Misda']
  },
  pangsit: {
    basePricePerKg: 45000,
    image: 'produk-custom-pangsit.webp',
    variants: ['Bawang', 'Ubi Ungu', 'Bayam', 'Wortel', 'Labu', 'Buah Naga']
  },
  sistik: {
    basePricePerKg: 45000,
    image: 'produk-custom-sistik.webp',
    variants: ['Bawang', 'Ubi Ungu', 'Bayam', 'Wortel', 'Labu', 'Buah Naga']
  },
  pisang: {
    basePricePerKg: 55000,
    image: 'produk-custom-pisang.webp',
    variants: ['Original Panjang', 'Original Pendek', 'Manis', 'Gula Merah', 'Matang', 'Sale']
  },
  ubi: {
    basePricePerKg: 50000,
    image: 'produk-custom-ubi.webp',
    variants: ['Original', 'Ungu']
  },
  talas: {
    basePricePerKg: 60000,
    image: 'produk-custom-talas.webp',
    variants: ['Original', 'Balado']
  }
};

export const FEATURED_PRODUCTS = PRODUCTS.filter(p => p.featured);

export const formatPrice = (price) =>
  new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR',
    minimumFractionDigits: 0,
  }).format(price);

export const WHATSAPP_NUMBER = '6285294964110';