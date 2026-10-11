<section id="certifications" class="section">
  <div class="container">
    <div class="section-header">
      <span class="section-tag">[ ACHIEVEMENTS // SERTIFIKASI ]</span>
      <h2 class="section-title">Sertifikasi &amp; <span class="highlight-yellow">Standarisasi Industri</span></h2>
      <p class="section-subtitle">
        Bukti kompetensi terverifikasi dalam arsitektur jaringan, mikrokontroler IoT, serta administrasi sistem operasi Linux.
      </p>
    </div>

    <div class="certs-grid" id="certs-container">
      @foreach($certs ?? [] as $cert)
        <div class="cert-card">
          <div class="cert-header">
            <div>
              <span class="cert-issuer">📜 {{ $cert['issuer'] }}</span>
              <h3 class="cert-title">{{ $cert['name'] }}</h3>
            </div>
            <span class="cert-status {{ $cert['status'] }}">{{ $cert['statusText'] }}</span>
          </div>
          <p class="cert-desc">{{ $cert['desc'] }}</p>
        </div>
      @endforeach
    </div>
  </div>
</section>
