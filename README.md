# Kalkulator BMI (Body Mass Index)

Website kalkulator BMI profesional dengan UI modern menggunakan warna biru muda, putih, dan teks hitam.

## 📋 Fitur

- ✅ Perhitungan BMI akurat berdasarkan berat dan tinggi badan
- ✅ Kategori BMI (Kekurangan BB, Normal, Kelebihan BB, Obesitas)
- ✅ Deskripsi dan rekomendasi untuk setiap kategori
- ✅ Informasi berat ideal berdasarkan tinggi badan
- ✅ Validasi input real-time
- ✅ Animasi smooth dan responsif
- ✅ Menyimpan history perhitungan (localStorage)
- ✅ Mobile-friendly dan responsive design
- ✅ Arsitektur modular dengan pemisahan concern

## 🎨 Teknologi

- **HTML5** - Struktur markup semantik
- **CSS3** - Styling dengan variabel CSS, Flexbox, Grid
- **Vanilla JavaScript (ES6+)** - Logika aplikasi dengan class-based architecture
- **LocalStorage API** - Penyimpanan history

## 📁 Struktur Folder

```
bmi-calculator/
├── index.html          # File HTML utama
├── css/
│   └── style.css       # Styling lengkap dengan responsive design
├── js/
│   ├── api.js          # BMI Calculator API (logika perhitungan)
│   ├── ui.js           # UI Handler (manipulasi DOM)
│   └── app.js          # Main Application Controller
├── assets/             # Folder untuk gambar/icon (optional)
└── README.md           # Dokumentasi
```

## 🚀 Cara Menggunakan

1. **Clone atau download project**
2. **Buka `index.html` di browser**
3. **Atau gunakan local server:**
   ```bash
   # Menggunakan Python
   python -m http.server 8000
   
   # Atau menggunakan Node.js
   npx http-server
   ```
4. Akses di `http://localhost:8000`

## 📖 Dokumentasi API

### BMICalculator Class

#### `calculateBMI(weight, height)`
Menghitung nilai BMI.
- **Parameters:**
  - `weight` (number): Berat badan dalam kg
  - `height` (number): Tinggi badan dalam cm
- **Returns:** (number) Nilai BMI dengan 1 desimal

#### `getCategory(bmi)`
Mendapatkan kategori BMI.
- **Parameters:**
  - `bmi` (number): Nilai BMI
- **Returns:** (Object) `{ category, class, description }`

#### `validateInput(weight, height)`
Validasi input form.
- **Parameters:**
  - `weight` (number): Berat badan
  - `height` (number): Tinggi badan
- **Returns:** (Object) `{ isValid, errors }`

#### `getIdealWeight(height)`
Menghitung range berat ideal.
- **Parameters:**
  - `height` (number): Tinggi badan dalam cm
- **Returns:** (Object) `{ min, max }`

### UIHandler Class

#### `showResult(bmi, category)`
Menampilkan hasil perhitungan.

#### `hideResult()`
Menyembunyikan hasil.

#### `showErrors(errors)`
Menampilkan pesan error.

#### `resetForm(form)`
Mereset form ke kondisi awal.

#### `animateCounter(targetValue, duration)`
Animasi counter untuk nilai BMI.

## 📊 Formula BMI

```
BMI = Berat (kg) / (Tinggi (m))²
```

## 🎯 Kategori BMI

| Kategori | Rentang BMI |
|----------|-------------|
| Kekurangan Berat Badan | < 18.5 |
| Normal | 18.5 - 24.9 |
| Kelebihan Berat Badan | 25.0 - 29.9 |
| Obesitas | ≥ 30.0 |

## 🎨 Palet Warna

- **Primary Color:** `#87CEEB` (Sky Blue)
- **Secondary Color:** `#ADD8E6` (Light Blue)
- **Accent Color:** `#4A90E2` (Medium Blue)
- **Background:** `#FFFFFF` (White)
- **Text:** `#000000` (Black)

## 📱 Responsive Breakpoints

- **Desktop:** > 768px
- **Tablet:** 768px
- **Mobile:** < 480px

## ✨ Fitur Tambahan

### LocalStorage History
Aplikasi menyimpan 10 perhitungan terakhir di localStorage.

```javascript
// Akses history
window.bmiApp.getHistory();

// Clear history
window.bmiApp.clearHistory();
```

### Keyboard Navigation
- **Tab:** Navigasi antar input
- **Enter:** Submit atau pindah ke input berikutnya

### Real-time Validation
Input akan ter-highlight merah jika:
- Nilai kosong atau negatif
- Berat > 500 kg
- Tinggi > 300 cm

## 🔧 Customization

### Mengubah Warna
Edit variabel CSS di `css/style.css`:

```css
:root {
    --primary-color: #87CEEB;
    --secondary-color: #ADD8E6;
    --accent-color: #4A90E2;
    /* ... */
}
```

### Menambah Bahasa
Edit label dan teks di `index.html` dan `js/api.js`.

## 🐛 Troubleshooting

### Form tidak submit
- Pastikan JavaScript enabled di browser
- Check console untuk error
- Pastikan semua file JS ter-load dengan benar

### Animasi tidak smooth
- Update browser ke versi terbaru
- Enable hardware acceleration

## 📝 To-Do / Future Enhancement

- [ ] Multi-language support
- [ ] Export hasil ke PDF
- [ ] Grafik tracking BMI overtime
- [ ] Integration dengan API kesehatan
- [ ] Dark mode
- [ ] Progressive Web App (PWA)
- [ ] Unit testing

## 📄 License

MIT License - Bebas digunakan untuk project pribadi maupun komersial.

## 👨‍💻 Author

Dibuat dengan ❤️ untuk membantu monitoring kesehatan.

## 🙏 Credits

- Formula BMI: World Health Organization (WHO)
- Icon dan design inspiration: Material Design
- Font: Segoe UI

---

**Note:** Kalkulator ini hanya untuk referensi umum. Untuk evaluasi kesehatan yang akurat, konsultasikan dengan dokter atau ahli kesehatan profesional.
