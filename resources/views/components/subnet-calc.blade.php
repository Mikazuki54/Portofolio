<section id="subnet-calc" class="section">
  <div class="container">
    <div class="section-header">
      <span class="section-tag">[ TOOLKIT // IOT SUBNET &amp; GATEWAY ]</span>
      <h2 class="section-title">Kalkulator Alokasi <span class="highlight">Subnet &amp; Gateway IoT</span></h2>
      <p class="section-subtitle">
        Alat bantu praktis menghitung segmentasi Network ID, Broadcast, Cisco Wildcard, dan kapasitas alokasi host untuk klaster perangkat sensor IoT.
      </p>
    </div>

    <div class="calc-card">
      <div class="calc-form">
        <div class="calc-field">
          <label for="calc-ip">Alamat IP Gateway / Host (IPv4):</label>
          <input type="text" id="calc-ip" class="calc-input" value="10.50.0.1" placeholder="e.g. 10.50.0.1">
        </div>

        <div class="calc-field">
          <label for="calc-mask">Subnet Mask Prefix (CIDR):</label>
          <select id="calc-mask" class="calc-input">
            <!-- Dynamically populated by subnet-calc.js -->
          </select>
        </div>

        <div class="calc-field" style="display: flex; align-items: flex-end;">
          <button class="btn btn-primary" type="button" id="btn-recalc">
            <span>HITUNG BITWISE</span>
          </button>
        </div>
      </div>

      <div class="calc-results-grid" id="calc-results">
        <!-- Results populated by subnet-calc.js -->
      </div>
    </div>
  </div>
</section>
