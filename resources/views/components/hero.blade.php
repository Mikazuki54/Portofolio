<section id="hero" class="hero-section">
  <div class="container hero-grid">
    <div class="hero-content">
      <div class="hero-status-bar">
        <span class="section-tag">
          <span class="pulse-dot"></span>
          PORTFOLIO // NETWORKING &amp; IOT
        </span>
        <span class="hero-ip-badge">STATUS: OPEN TO WORK</span>
      </div>

      <h1 class="hero-title">
        NICKY TIRTA <br><span class="highlight">PUTRA NUGROHO</span>
      </h1>

      <p class="hero-lead" style="font-size: 1.15rem; color: #cbd5e1; margin-bottom: 0.75rem;">
        <strong>{{ $profile['role'] ?? 'Mahasiswa Teknik Jaringan Komputer & Internet of Things (IoT)' }}</strong>
      </p>

      <p class="hero-lead" style="margin-bottom: 2rem;">
        Menghubungkan sensor mikrokontroler fisik dengan infrastruktur jaringan komputer, routing VLAN, dan protokol komunikasi cloud yang aman.
      </p>

      <div class="hero-ctas">
        <a href="{{ $profile['linkedin'] ?? 'https://www.linkedin.com/in/nicky-tirta-putra-nugroho-78454921b/' }}" target="_blank" rel="noopener noreferrer" class="btn btn-primary">
          <span>💼 BUKA LINKEDIN SAYA</span>
        </a>
        <a href="#skills" class="btn btn-secondary">
          <span>⚡ DAFTAR KEAHLIAN</span>
        </a>
        <a href="mailto:{{ $profile['email'] ?? 'nickytirta53@gmail.com' }}" class="btn btn-terminal">
          <span>✉️ EMAIL: nickytirta53@gmail.com</span>
        </a>
      </div>

      <div class="hero-specs" style="grid-template-columns: repeat(3, 1fr);">
        <div class="spec-item">
          <h4>NETWORKING</h4>
          <p>Routing, VLAN, OSPF, Wireshark</p>
        </div>
        <div class="spec-item">
          <h4>HARDWARE IOT</h4>
          <p>ESP32, LoRaWAN, Arduino, Modbus</p>
        </div>
        <div class="spec-item">
          <h4>CLOUD &amp; DATA</h4>
          <p>MQTT, Linux CLI, Python, C++</p>
        </div>
      </div>
    </div>

    <!-- 8-Bit Character HUD Card -->
    <div class="hero-visual">
      <div class="hero-visual-card" style="padding: 2rem; background: #13192f; border: 4px solid var(--pixel-cyan); box-shadow: 8px 8px 0px #000, 0 0 25px var(--pixel-cyan-glow);">
        <div style="display: flex; align-items: center; justify-content: space-between; border-bottom: 3px solid #233055; padding-bottom: 1rem; margin-bottom: 1.5rem;">
          <div style="font-family: var(--font-pixel); font-size: 0.8rem; color: var(--pixel-cyan);">
            [ PLAYER PROFILE CARD ]
          </div>
          <span class="status-pill"><span class="pulse-dot"></span> ACTIVE</span>
        </div>

        <div style="text-align: center; margin-bottom: 1.5rem;">
          <div style="width: 84px; height: 84px; margin: 0 auto 1rem; background: #0c1020; border: 3px solid var(--pixel-green); box-shadow: 4px 4px 0px #000; display: flex; align-items: center; justify-content: center; font-size: 2.5rem;">
            👨‍💻
          </div>
          <h3 style="font-size: 0.95rem; font-family: var(--font-pixel); color: #fff; margin-bottom: 0.35rem;">
            NICKY TIRTA P. N.
          </h3>
          <p style="font-family: var(--font-code); font-size: 0.85rem; color: var(--pixel-yellow);">
            @nicky-tirta-putra-nugroho
          </p>
        </div>

        <div style="display: flex; flex-direction: column; gap: 0.85rem; font-family: var(--font-code); font-size: 0.88rem;">
          <div style="display: flex; justify-content: space-between; border-bottom: 1px solid #1f2b4e; padding-bottom: 0.4rem;">
            <span style="color: var(--text-dim);">FOKUS KARIER:</span>
            <span style="color: var(--pixel-green); font-weight: 700;">Network &amp; IoT Engineering</span>
          </div>

          <div style="display: flex; justify-content: space-between; border-bottom: 1px solid #1f2b4e; padding-bottom: 0.4rem;">
            <span style="color: var(--text-dim);">KEMAMPUAN UTAMA:</span>
            <span style="color: var(--pixel-cyan);">Cisco, ESP32, MQTT, C++</span>
          </div>

          <div style="display: flex; justify-content: space-between; border-bottom: 1px solid #1f2b4e; padding-bottom: 0.4rem;">
            <span style="color: var(--text-dim);">EMAIL KONTAK:</span>
            <span style="color: #fff;">nickytirta53@gmail.com</span>
          </div>

          <div style="display: flex; justify-content: space-between; border-bottom: 1px solid #1f2b4e; padding-bottom: 0.4rem;">
            <span style="color: var(--text-dim);">LINKEDIN:</span>
            <a href="{{ $profile['linkedin'] ?? 'https://www.linkedin.com/in/nicky-tirta-putra-nugroho-78454921b/' }}" target="_blank" rel="noopener noreferrer" style="color: var(--pixel-yellow); text-decoration: underline;">
              Terverifikasi ↗
            </a>
          </div>

          <div style="display: flex; justify-content: space-between; padding-top: 0.2rem;">
            <span style="color: var(--text-dim);">STATUS:</span>
            <span style="color: var(--pixel-green); font-family: var(--font-pixel); font-size: 0.65rem;">AVAILABLE FOR HIRE</span>
          </div>
        </div>

        <div style="margin-top: 1.5rem; padding-top: 1rem; border-top: 2px solid #233055;">
          <a href="{{ $profile['linkedin'] ?? 'https://www.linkedin.com/in/nicky-tirta-putra-nugroho-78454921b/' }}" target="_blank" rel="noopener noreferrer" class="btn btn-primary" style="width: 100%; text-align: center;">
            <span>TERHUBUNG DI LINKEDIN</span>
          </a>
        </div>
      </div>
    </div>
  </div>
</section>
