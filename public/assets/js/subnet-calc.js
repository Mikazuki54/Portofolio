/**
 * INTERACTIVE IPV4 CIDR SUBNET CALCULATOR
 * Real-time bitwise calculation of Network, Broadcast, Netmask, Wildcard, Usable Hosts
 */

class SubnetCalculator {
  constructor(ipInputId, maskSelectId, resultsContainerId) {
    this.ipInput = document.getElementById(ipInputId);
    this.maskSelect = document.getElementById(maskSelectId);
    this.resultsContainer = document.getElementById(resultsContainerId);

    if (!this.ipInput || !this.maskSelect || !this.resultsContainer) return;

    this.init();
  }

  init() {
    this.populateMaskOptions();
    
    // Live update on input or select
    this.ipInput.addEventListener('input', () => this.calculate());
    this.maskSelect.addEventListener('change', () => this.calculate());

    // Initial calculation
    this.calculate();
  }

  populateMaskOptions() {
    this.maskSelect.innerHTML = '';
    for (let prefix = 32; prefix >= 8; prefix--) {
      const maskStr = this.prefixToDottedDecimal(prefix);
      const option = document.createElement('option');
      option.value = prefix;
      option.textContent = `/${prefix} — ${maskStr}`;
      if (prefix === 24) option.selected = true;
      this.maskSelect.appendChild(option);
    }
  }

  prefixToDottedDecimal(prefix) {
    const maskInt = prefix === 0 ? 0 : (~0 << (32 - prefix)) >>> 0;
    return [
      (maskInt >>> 24) & 255,
      (maskInt >>> 16) & 255,
      (maskInt >>> 8) & 255,
      maskInt & 255
    ].join('.');
  }

  ipToInt(ipStr) {
    const octets = ipStr.split('.').map(Number);
    if (octets.length !== 4 || octets.some(o => isNaN(o) || o < 0 || o > 255)) {
      return null;
    }
    return ((octets[0] << 24) | (octets[1] << 16) | (octets[2] << 8) | octets[3]) >>> 0;
  }

  intToIp(intVal) {
    return [
      (intVal >>> 24) & 255,
      (intVal >>> 16) & 255,
      (intVal >>> 8) & 255,
      intVal & 255
    ].join('.');
  }

  intToBinaryStr(intVal) {
    const octets = [
      (intVal >>> 24) & 255,
      (intVal >>> 16) & 255,
      (intVal >>> 8) & 255,
      intVal & 255
    ];
    return octets.map(o => o.toString(2).padStart(8, '0')).join('.');
  }

  getIpClass(firstOctet) {
    if (firstOctet >= 1 && firstOctet <= 126) return 'Class A';
    if (firstOctet === 127) return 'Loopback (127/8)';
    if (firstOctet >= 128 && firstOctet <= 191) return 'Class B';
    if (firstOctet >= 192 && firstOctet <= 223) return 'Class C';
    if (firstOctet >= 224 && firstOctet <= 239) return 'Class D (Multicast)';
    return 'Class E (Experimental)';
  }

  isPrivateIp(first, second) {
    if (first === 10) return 'RFC 1918 Private';
    if (first === 172 && second >= 16 && second <= 31) return 'RFC 1918 Private';
    if (first === 192 && second === 168) return 'RFC 1918 Private';
    if (first === 127) return 'Loopback';
    if (first === 169 && second === 254) return 'APIPA (Link-Local)';
    return 'Public Internet Routable';
  }

  calculate() {
    const ipStr = this.ipInput.value.trim();
    const prefix = parseInt(this.maskSelect.value, 10);
    const ipInt = this.ipToInt(ipStr);

    if (ipInt === null) {
      this.displayError("Format IPv4 tidak valid. Contoh: 192.168.10.50");
      return;
    }

    const maskInt = prefix === 0 ? 0 : (~0 << (32 - prefix)) >>> 0;
    const wildcardInt = (~maskInt) >>> 0;
    const networkInt = (ipInt & maskInt) >>> 0;
    const broadcastInt = (networkInt | wildcardInt) >>> 0;

    const netmaskStr = this.intToIp(maskInt);
    const wildcardStr = this.intToIp(wildcardInt);
    const networkStr = this.intToIp(networkInt);
    const broadcastStr = this.intToIp(broadcastInt);

    let firstUsableStr, lastUsableStr, usableHosts;

    if (prefix === 31) {
      // RFC 3021 Point-to-Point
      firstUsableStr = networkStr;
      lastUsableStr = broadcastStr;
      usableHosts = "2 (RFC 3021 Point-to-Point)";
    } else if (prefix === 32) {
      firstUsableStr = networkStr;
      lastUsableStr = networkStr;
      usableHosts = "1 (Host route)";
    } else {
      firstUsableStr = this.intToIp(networkInt + 1);
      lastUsableStr = this.intToIp(broadcastInt - 1);
      usableHosts = (Math.pow(2, 32 - prefix) - 2).toLocaleString('id-ID');
    }

    const octets = ipStr.split('.').map(Number);
    const ipClass = this.getIpClass(octets[0]);
    const ipType = this.isPrivateIp(octets[0], octets[1]);

    const binaryIp = this.intToBinaryStr(ipInt);
    const binaryMask = this.intToBinaryStr(maskInt);

    this.renderResults({
      network: `${networkStr} /${prefix}`,
      broadcast: broadcastStr,
      netmask: netmaskStr,
      wildcard: wildcardStr,
      usableRange: prefix >= 31 ? `${firstUsableStr} - ${lastUsableStr}` : `${firstUsableStr} - ${lastUsableStr}`,
      usableHosts: usableHosts,
      ipClass: `${ipClass} (${ipType})`,
      binaryIp: binaryIp,
      binaryMask: binaryMask
    });
  }

  displayError(msg) {
    this.resultsContainer.innerHTML = `
      <div style="grid-column: 1 / -1; padding: 1rem; color: var(--red-alert); font-family: var(--font-mono); font-size: 0.9rem;">
        ⚠ ${msg}
      </div>
    `;
  }

  renderResults(res) {
    this.resultsContainer.innerHTML = `
      <div class="calc-res-item">
        <span class="res-label">Network ID</span>
        <span class="res-value" style="color: var(--cyan-primary);">${res.network}</span>
      </div>
      <div class="calc-res-item">
        <span class="res-label">Broadcast Address</span>
        <span class="res-value" style="color: var(--blue-primary);">${res.broadcast}</span>
      </div>
      <div class="calc-res-item">
        <span class="res-label">Subnet Mask</span>
        <span class="res-value">${res.netmask}</span>
      </div>
      <div class="calc-res-item">
        <span class="res-label">Cisco Wildcard Mask</span>
        <span class="res-value" style="color: var(--amber-warning);">${res.wildcard}</span>
      </div>
      <div class="calc-res-item">
        <span class="res-label">Usable Host IP Range</span>
        <span class="res-value" style="color: var(--green-online); font-size: 0.95rem;">${res.usableRange}</span>
      </div>
      <div class="calc-res-item">
        <span class="res-label">Total Usable Hosts</span>
        <span class="res-value">${res.usableHosts}</span>
      </div>
      <div class="calc-res-item">
        <span class="res-label">Address Scope</span>
        <span class="res-value" style="font-size: 0.9rem; color: #cbd5e1;">${res.ipClass}</span>
      </div>
      <div class="calc-res-item res-binary">
        <span class="res-label">Binary Telemetry (IP / Mask)</span>
        <div class="binary-text">IP  : ${res.binaryIp}</div>
        <div class="binary-text">MASK: ${res.binaryMask}</div>
      </div>
    `;
  }
}

window.SubnetCalculator = SubnetCalculator;
