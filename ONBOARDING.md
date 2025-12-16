# 🚀 Panduan Onboarding - Synergy Backend

Selamat datang di tim Smart Zone Guardian! Dokumen ini akan memandu Anda untuk menyiapkan dan menjalankan proyek backend di lingkungan lokal Anda.

> **Saran:** Menambahkan satu kalimat tujuan untuk memberikan konteks yang lebih jelas di awal.
> Tujuan dari panduan ini adalah untuk memastikan setiap anggota tim dapat menjalankan proyek secara mandiri dalam waktu sesingkat mungkin.

---

## 1. Prasyarat

Pastikan perangkat lunak berikut sudah terinstal dan terkonfigurasi dengan benar di komputer Anda.

> **Saran:** Mengelompokkan prasyarat berdasarkan kategori dan menambahkan perintah verifikasi untuk memudahkan pengecekan.

**A. Lingkungan Pengembangan**

- **Git:** Untuk kontrol versi.
  - Verifikasi: `git --version`
- **Node.js v24.x:** Lingkungan runtime JavaScript.
  - Sangat dianjurkan instal melalui `nvm` ([Windows](https://github.com/coreybutler/nvm-windows/releases) / [Mac/Linux](https://github.com/nvm-sh/nvm)).
  - Verifikasi: `node -v` dan `npm -v`
- **Docker Desktop:** Untuk manajemen kontainer (jika ada dependensi seperti database lokal).
  - Verifikasi: Pastikan aplikasi Docker berjalan.

**B. Editor Kode**

- **Visual Studio Code:** Editor yang direkomendasikan.
- **Ekstensi VS Code yang Wajib Diinstal:**
  - `Prisma` (ID: `Prisma.prisma`)
  - `ESLint` (ID: `dbaeumer.vscode-eslint`)
  - `Prettier - Code formatter` (ID: `esbenp.prettier-vscode`)

---

## 2. Langkah-langkah Setup

Ikuti langkah-langkah ini secara berurutan untuk menyiapkan proyek Anda.

1.  **Clone Repositori**
    Buka terminal dan jalankan perintah berikut:

    ```bash
    git clone [https://github.com/zufarnatsir/synergy-backend.git](https://github.com/zufarnatsir/synergy-backend.git)
    cd synergy-backend
    ```

2.  **Gunakan Versi Node.js yang Tepat**

    > **Saran:** Menambahkan langkah ini untuk mencegah masalah dependensi akibat versi Node.js yang tidak sesuai.
    > Jalankan perintah ini di dalam direktori proyek untuk memastikan Anda menggunakan versi Node yang sesuai dengan proyek.

    ```bash
    nvm use
    # Jika versi yang dibutuhkan belum terinstal, nvm akan menyarankan untuk menjalankannya.
    ```

3.  **Instal Dependensi**
    Perintah ini akan menginstal semua paket yang dibutuhkan dari `package.json`.

    ```bash
    npm install
    ```

4.  **Siapkan File Environment Variables (.env)**
    File `.env` digunakan untuk menyimpan semua kredensial rahasia dan tidak akan di-commit ke Git.
    - Salin template `.env.example` menjadi file `.env` baru.
      ```bash
      # Gunakan salah satu perintah yang sesuai dengan sistem operasi Anda
      cp .env.example .env
      ```
    - Buka file `.env` yang baru dibuat.
    - Hubungi **Project Lead** (@zufarnatsir) untuk mendapatkan nilai `DATABASE_URL` yang valid dan isikan ke dalam file.

---

## 3. Menjalankan Aplikasi

- Untuk menjalankan server dalam mode development (dengan _hot-reload_), gunakan perintah:
  ```bash
  npm run dev
  ```
- Server akan berjalan di `http://localhost:3000`.
- Perhatikan output di terminal Anda. Seharusnya muncul pesan yang menandakan server berhasil berjalan, contohnya: `Server is running on port 3000`.

---

## 4. Verifikasi Instalasi

Jika seluruh proses setup berhasil, Anda seharusnya bisa:

1.  Melihat pesan `Server is running...` di terminal tanpa ada pesan eror.
2.  Membuka `http://localhost:3000` di browser dan melihat pesan selamat datang.
3.  Membuka `http://localhost:3000/api-docs` untuk melihat dokumentasi API Swagger yang interaktif.

> **Saran:** Menambahkan bagian "Penyelesaian Masalah" untuk membantu mengatasi masalah umum.

### **Penyelesaian Masalah Umum (Troubleshooting)**

- **Eror saat `npm install`:** Pastikan Anda menggunakan versi Node.js dan npm yang benar (cek dengan `node -v`). Coba hapus folder `node_modules` dan file `package-lock.json`, lalu jalankan `npm install` lagi.
- **Tidak bisa terhubung ke database:** Pastikan nilai `DATABASE_URL` di file `.env` sudah benar dan tidak ada kesalahan ketik.

---

## 5. Alur Kerja Git

Untuk menjaga konsistensi dan kualitas kode, ikuti alur kerja berikut:

1.  **Selalu mulai dari `develop`:** Sebelum membuat _branch_ baru, pastikan _branch_ `develop` lokal Anda sudah yang paling baru.
    ```bash
    git checkout develop
    git pull origin develop
    ```
2.  **Buat Branch Baru:** Buat _branch_ baru dari `develop` untuk setiap fitur atau perbaikan. Gunakan format penamaan yang deskriptif.

    ```bash
    # Untuk fitur baru
    git checkout -b feature/nama-fitur-anda

    # Untuk perbaikan bug
    git checkout -b fix/deskripsi-bug-singkat
    ```

3.  **Commit Secara Berkala:** Buat _commit_ dengan pesan yang jelas dan mengikuti standar yang disepakati tim.
4.  **Buat Pull Request (PR):** Setelah fitur selesai, dorong (_push_) _branch_ Anda ke repositori dan buat _Pull Request_ ke _branch_ `develop`.
5.  **Code Review:** Pastikan PR Anda telah di-review oleh setidaknya satu anggota tim lain sebelum di-_merge_.

---

## 6. Dokumentasi Tambahan

Untuk dokumentasi yang lebih luas seperti keputusan arsitektur, panduan API mendalam, atau catatan rapat, kita menggunakan **GitHub Wiki**.

- **Akses Wiki:** Klik tab "Wiki" di halaman utama repositori GitHub.
- **Kontribusi:** Jangan ragu untuk menambahkan atau memperbarui halaman Wiki jika Anda menemukan informasi yang perlu didokumentasikan.
