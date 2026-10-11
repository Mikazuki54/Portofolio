<section id="contact" class="section">
  <div class="container">
    <div class="section-header">
      <span class="section-tag">[ MULTIPLAYER LINK // KONTAK ]</span>
      <h2 class="section-title">Hubungi Untuk <span class="highlight">Kolaborasi &amp; Magang</span></h2>
      <p class="section-subtitle">
        Terbuka untuk kesempatan Magang (Internship), Junior Network Engineer, IoT Developer, atau kolaborasi proyek smart agriculture &amp; embedded network.
      </p>
    </div>

    <div class="contact-grid">
      <div class="contact-info-card">
        <div>
          <h3 style="font-size: 0.95rem; margin-bottom: 0.75rem; color: #fff;">SALURAN KONEKTIVITAS</h3>
          <p style="font-size: 0.95rem;">Mari berdiskusi mengenai proyek sensor, integrasi protokol MQTT, atau peluang karir.</p>
        </div>

        <div class="contact-direct-list">
          <div class="contact-item">
            <div class="contact-icon">✉️</div>
            <div class="contact-detail">
              <h5>ALAMAT EMAIL</h5>
              <a href="mailto:{{ $profile['email'] ?? 'network.iot@student.ac.id' }}">{{ $profile['email'] ?? 'network.iot@student.ac.id' }}</a>
            </div>
          </div>

          <div class="contact-item">
            <div class="contact-icon">💼</div>
            <div class="contact-detail">
              <h5>LINKEDIN PROFILE</h5>
              <a href="{{ $profile['linkedin'] ?? 'https://linkedin.com' }}" target="_blank" rel="noopener">linkedin.com/in/network-iot-engineer</a>
            </div>
          </div>

          <div class="contact-item">
            <div class="contact-icon">🐙</div>
            <div class="contact-detail">
              <h5>GITHUB REPOSITORY</h5>
              <a href="{{ $profile['github'] ?? 'https://github.com' }}" target="_blank" rel="noopener">github.com/network-iot-labs</a>
            </div>
          </div>

          <div class="contact-item">
            <div class="contact-icon">📍</div>
            <div class="contact-detail">
              <h5>LOKASI BASE</h5>
              <p>{{ $profile['location'] ?? 'Indonesia (WIB / UTC+7)' }}</p>
            </div>
          </div>
        </div>

        <div style="margin-top: auto; padding-top: 1rem; border-top: 2px solid #233055;">
          <a href="#hero" class="btn btn-secondary" style="width: 100%;">
            <span>📜 UNDUH RESUME // CV (PDF)</span>
          </a>
        </div>
      </div>

      <form class="contact-form" id="contact-form" action="{{ route('portfolio.contact') }}" method="POST">
        @csrf
        <h3 style="font-size: 0.9rem; margin-bottom: 0.5rem; color: var(--pixel-cyan);">KIRIM TRANSMISI PESAN</h3>
        
        <div class="form-group">
          <label class="form-label" for="form-name">NAMA LENGKAP / INSTANSI</label>
          <input type="text" id="form-name" name="name" class="form-control" placeholder="Contoh: Budi Santoso / PT Solusi IoT" required>
        </div>

        <div class="form-group">
          <label class="form-label" for="form-email">EMAIL RESPON</label>
          <input type="email" id="form-email" name="email" class="form-control" placeholder="nama@perusahaan.co.id" required>
        </div>

        <div class="form-group">
          <label class="form-label" for="form-subject">TOPIK DISKUSI</label>
          <input type="text" id="form-subject" name="subject" class="form-control" placeholder="Peluang Internship / Kolaborasi IoT / Network Lab" required>
        </div>

        <div class="form-group">
          <label class="form-label" for="form-message">DETAIL PESAN</label>
          <textarea id="form-message" name="message" class="form-control" placeholder="Tuliskan pesan transmisi Anda di sini..." required></textarea>
        </div>

        <button type="submit" class="btn btn-primary" style="margin-top: 0.5rem;">
          <span>🚀 TRANSMISIKAN PESAN</span>
        </button>
      </form>
    </div>
  </div>
</section>
