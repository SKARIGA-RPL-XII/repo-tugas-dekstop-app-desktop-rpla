# SKARPOS — Desktop Point of Sale (POS)

![SKARPOS Banner](./UI/Logo/Full-Logo-Without-BG.png)

**SKARPOS (Smart Kasir Point of Sale)** adalah aplikasi **Desktop POS berbasis Electron.js**  
yang dikembangkan oleh **Tim RPL SMK PGRI 3 Malang**.

Aplikasi ini dibuat untuk membantu proses transaksi penjualan dengan **UI interaktif**,  
**clean code**, serta **arsitektur modern** dan **role-based system**.

---

## Deskripsi Singkat

- Desktop Application (Electron.js)
- 2 Role utama: **Admin & Cashier**
- Cepat, ringan, dan terstruktur
- UI modern menggunakan **Tailwind CSS**
- Aman dengan **JWT Authentication**
- Database & Storage menggunakan **Supabase**

---

## Teknologi yang Digunakan

![Tech Stack](https://skillicons.dev/icons?i=ts,js,electron,nodejs,express,supabase,tailwind,vite)

- TypeScript & JavaScript  
- Electron.js  
- Vite  
- Express.js  
- Supabase  
- JWT Authentication  
- Tailwind CSS  

---

## 👥 Role Aplikasi

| Role | Akses |
|------|------|
| **Admin** | Kelola produk, kategori, user, laporan |
| **Cashier** | Transaksi penjualan |

---

## 📁 Struktur Project (ROOT)

```bash
repo-tugas-dekstop-app-desktop-rpla/
│
├── 📂 Documents
│   └── 📂 flowchart
│       └── Flowchart alur aplikasi
│
├── 📂 UI
│   ├── 📂 Admin Role      # Design UI Admin
│   ├── 📂 Kasir Role     # Design UI Cashier
│   ├── 📂 Komponen       # Reusable UI Components
│   ├── 📂 Login          # Design Login Page
│   └── 📂 Logo           # Logo & Asset
│
└── 📂 applications
    ├── 📂 src
    │   ├── backend        # Express.js API
    │   └── frontend       # Vite + TS UI
    │
    ├── 📂 dist
    ├── 📂 node_modules
    ├── .env
    ├── .env.example
    ├── package.json
    └── vite.config.ts
```

## 📁 Struktur Folder ```applications/src```
```bash
src/
├── 📂 assets             # Aset gambar dan statis
├── 📂 columns            # Konfigurasi kolom tabel (DataTables)
├── 📂 components         # Reusable UI Components
├── 📂 configs            # Konfigurasi API dan Global
├── 📂 context            # React Context API (Global State)
├── 📂 electron           # Konfigurasi Main Process Electron
├── 📂 hooks              # Custom React Hooks
├── 📂 pages              # Halaman Utama (Admin & Cashier)
├── 📂 routes             # Pengaturan Routing Aplikasi
├── 📂 server             # Logic Server-side/API
├── 📂 services           # Integrasi API & Supabase
├── 📂 types              # TypeScript Interfaces & Types
├── 📂 utils              # Helper functions
├── 📄 App.tsx            # Root Component
└── 📄 main.tsx           # Entry Point Frontend
```

## Cara Instalasi & Menjalankan Project
### 1️⃣ Clone Repository
```bash
git clone https://github.com/SKARIGA-RPL-XII/repo-tugas-dekstop-app-desktop-rpla.git
```

### 2️⃣ Masuk ke Folder Aplikasi
```bash
cd applications
```

### 3️⃣ Install Dependency
```bash
npm install
```

npm install

### 4️⃣ Konfigurasi Environment
```bash
cp .env.example .env
```
#### Isi variabel Supabase & JWT di file ```.env.```
### 5️⃣ Jalankan Aplikasi
```bash
npm run dev
```

## 📌 Catatan
Project ini merupakan hasil pembelajaran siswa dan **bukan sistem resmi milik SMKS PGRI 3 Malang**.
