<section id="connect" class="section">
  <div class="container">
    <div class="section-header">
      <span class="section-tag">[ LINK START // HUBUNGI SAYA ]</span>
      <h2 class="section-title">Terhubung &amp; <span class="highlight">Kolaborasi</span></h2>
      <p class="section-subtitle">
        Mari terhubung di LinkedIn atau hubungi langsung melalui email untuk peluang magang, proyek, atau diskusi seputar Networking &amp; IoT.
      </p>
    </div>

    <div style="max-width: 860px; margin: 0 auto; display: grid; grid-template-columns: repeat(auto-fit, minmax(280px, 1fr)); gap: 1.5rem;">
      <!-- LinkedIn Main Card -->
      <div class="glass-panel" style="border: 3px solid var(--pixel-cyan); box-shadow: 6px 6px 0px #000, 0 0 20px var(--pixel-cyan-glow); display: flex; flex-direction: column; justify-content: space-between; gap: 1.5rem;">
        <div>
          <div style="display: flex; align-items: center; justify-content: space-between; margin-bottom: 1rem;">
            <span style="font-size: 2rem;">💼</span>
            <span class="status-pill"><span class="pulse-dot"></span> VERIFIED</span>
          </div>
          <h3 style="font-size: 0.95rem; font-family: var(--font-pixel); color: #fff; margin-bottom: 0.5rem;">
            PROFIL LINKEDIN
          </h3>
          <p style="font-size: 0.9rem; color: var(--text-muted); line-height: 1.6;">
            Temukan informasi selengkapnya tentang perjalanan akademik, keahlian, dan koneksi profesional saya di LinkedIn.
          </p>
        </div>

        <a href="{{ $profile['linkedin'] ?? 'https://www.linkedin.com/in/nicky-tirta-putra-nugroho-78454921b/' }}" target="_blank" rel="noopener noreferrer" class="btn btn-primary" style="width: 100%; text-align: center;">
          <span>BUKA PROFIL LINKEDIN ↗</span>
        </a>
      </div>

      <!-- Direct Email Card -->
      <div class="glass-panel" style="border: 3px solid var(--pixel-green); box-shadow: 6px 6px 0px #000, 0 0 20px var(--pixel-green-glow); display: flex; flex-direction: column; justify-content: space-between; gap: 1.5rem;">
        <div>
          <div style="display: flex; align-items: center; justify-content: space-between; margin-bottom: 1rem;">
            <span style="font-size: 2rem;">✉️</span>
            <span class="status-pill" style="border-color: var(--pixel-green); color: var(--pixel-green);"><span class="pulse-dot"></span> EMAIL</span>
          </div>
          <h3 style="font-size: 0.95rem; font-family: var(--font-pixel); color: #fff; margin-bottom: 0.5rem;">
            EMAIL LANGSUNG
          </h3>
          <p style="font-size: 0.9rem; color: var(--text-muted); line-height: 1.6;">
            Punya tawaran proyek atau informasi lowongan magang? Kirimkan pesan langsung ke kotak masuk saya:
          </p>
          <div style="font-family: var(--font-code); font-size: 0.95rem; color: var(--pixel-yellow); background: #090c18; padding: 0.6rem 0.85rem; border: 1px solid #28365f; margin-top: 0.75rem;">
            nickytirta53@gmail.com
          </div>
        </div>

        <a href="mailto:{{ $profile['email'] ?? 'nickytirta53@gmail.com' }}" class="btn btn-iot" style="width: 100%; text-align: center;">
          <span>KIRIM PESAN EMAIL ↗</span>
        </a>
      </div>
    </div>
  </div>
</section>
