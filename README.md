# 👾 Web Portofolio Personal - Nicky Tirta Putra Nugroho

Web personal bertema **8-Bit Retro Pixel Art** yang dirancang khusus untuk **Pengenalan Diri** dan **Daftar Keahlian (Skills)** dari **Nicky Tirta Putra Nugroho**, mahasiswa peminatan **Computer Networking & Internet of Things (IoT)**.

Dibangun dengan arsitektur **Laravel Framework (v13+)**, berpenampilan rapi, minimalis, dan terhubung langsung ke profil resmi [LinkedIn](https://www.linkedin.com/in/nicky-tirta-putra-nugroho-78454921b/).

---

## ⚡ Fitur Utama

1. **Pengenalan Diri Mendalam (*About Me*)**:
   - Menjelaskan latar belakang, passion, dan visi di bidang Computer Networking (Routing, Switching, VLAN, Security) dan Internet of Things (ESP32, LoRaWAN, Sensors, MQTT).
   - Menghubungkan secara langsung ke profil LinkedIn dan email pribadi.

2. **Daftar Keahlian Terstruktur (*Skills Matrix*)**:
   - **Computer Networking & Security**: OSPF, Inter-VLAN Routing, Subnetting IPv4/IPv6, Cisco IOS, GNS3, Wireshark, WireGuard VPN.
   - **Internet of Things (IoT) & Hardware**: ESP32, Arduino, LoRaWAN, MQTT (Mosquitto), Modbus RS485, Raspberry Pi Edge Gateway.
   - **Programming & System Tools**: C/C++, Python (Netmiko), Linux CLI, Git, InfluxDB & Grafana.
   - **Professional & Problem Solving**: Troubleshooting analitis, desain topologi, kolaborasi tim, *continuous learning*.

3. **Tema 8-Bit Retro Pixel Art**:
   - Google Fonts: `'Press Start 2P'`, `'Silkscreen'`, `'VT323'`.
   - Palet warna Cyber-Arcade: *Neon Cyan*, *Pixel Lime*, *Retro Gold*, *Chunky drop shadows*.

4. **Integrasi LinkedIn & Kontak Langsung**:
   - Tautan langsung ke [https://www.linkedin.com/in/nicky-tirta-putra-nugroho-78454921b/](https://www.linkedin.com/in/nicky-tirta-putra-nugroho-78454921b/)
   - Email langsung ke `nickytirta53@gmail.com`

---

## 🚀 Cara Menjalankan

Buka terminal di folder `Porto` dan jalankan:

```powershell
php artisan serve
```

Akses di browser melalui:
👉 **`http://127.0.0.1:8000`** *(atau `http://127.0.0.1:8080` jika menggunakan port 8080)*

---

## 📁 Struktur Direktori

```text
Porto/
├── app/Http/Controllers/
│   └── PortfolioController.php      # Data profil Nicky Tirta & matriks skill LinkedIn
├── resources/views/
│   ├── layouts/app.blade.php        # Layout Pixel Art (Fonts, Header, Footer)
│   ├── components/
│   │   ├── navbar.blade.php         # Navigasi & tombol langsung ke LinkedIn
│   │   ├── hero.blade.php           # Hero profile card & Player stats Nicky Tirta
│   │   ├── about.blade.php          # Pengenalan diri mendalam & pilar kompetensi
│   │   ├── skills.blade.php         # Matriks skill Networking, IoT, Programming
│   │   └── connect.blade.php        # Kartu kontak langsung & link ke profil LinkedIn
│   └── portfolio.blade.php          # View utama penggabung komponen
├── public/assets/css/               # Styling tema pixel modular
└── routes/web.php                   # Routing web Laravel
```
