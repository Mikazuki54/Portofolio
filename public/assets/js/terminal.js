/**
 * 8-BIT RETRO TERMINAL CLI (NETWORKING + IOT SPECIALIZATION)
 * Emulates Cisco IOS + Linux Embedded Edge Terminal
 */

class NetworkTerminal {
  constructor(containerId, inputId, outputId) {
    this.container = document.getElementById(containerId);
    this.input = document.getElementById(inputId);
    this.output = document.getElementById(outputId);
    this.commandHistory = [];
    this.historyIndex = -1;

    if (!this.input || !this.output) return;

    this.init();
  }

  init() {
    this.printWelcome();
    
    this.input.addEventListener('keydown', (e) => this.handleKeyDown(e));

    if (this.container) {
      this.container.addEventListener('click', () => this.input.focus());
    }

    const chipBtns = document.querySelectorAll('.chip-btn');
    chipBtns.forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.stopPropagation();
        const cmd = btn.getAttribute('data-cmd');
        if (cmd) {
          this.executeCommand(cmd);
          this.input.focus();
        }
      });
    });
  }

  printWelcome() {
    this.addLine("╔════════════════════════════════════════════════════════════════════╗", "info");
    this.addLine("║   NET://IOT ARCADE OS v8.0 - RETRO NETWORK & IOT WORKSTATION       ║", "info");
    this.addLine("╚════════════════════════════════════════════════════════════════════╝", "info");
    this.addLine("Type <span style='color:var(--pixel-cyan)'>help</span> to view all network & IoT commands.", "output");
    this.addLine("Try <span style='color:var(--pixel-green)'>scan-iot</span> or <span style='color:var(--pixel-yellow)'>mqtt-sub</span> for live telemetry testing!", "warning");
    this.addLine("----------------------------------------------------------------------", "output");
  }

  addLine(content, type = 'output') {
    const line = document.createElement('div');
    line.className = `terminal-line ${type}`;
    line.innerHTML = content;
    this.output.appendChild(line);
    this.scrollToBottom();
  }

  scrollToBottom() {
    this.output.scrollTop = this.output.scrollHeight;
  }

  handleKeyDown(e) {
    if (e.key === 'Enter') {
      const cmd = this.input.value.trim();
      if (cmd) {
        this.commandHistory.push(cmd);
        this.historyIndex = this.commandHistory.length;
        this.executeCommand(cmd);
        this.input.value = '';
      }
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      if (this.historyIndex > 0) {
        this.historyIndex--;
        this.input.value = this.commandHistory[this.historyIndex] || '';
      }
    } else if (e.key === 'ArrowDown') {
      e.preventDefault();
      if (this.historyIndex < this.commandHistory.length - 1) {
        this.historyIndex++;
        this.input.value = this.commandHistory[this.historyIndex] || '';
      } else {
        this.historyIndex = this.commandHistory.length;
        this.input.value = '';
      }
    }
  }

  executeCommand(rawCmd) {
    this.addLine(`pi@iot-edge-gw:~# ${this.escapeHtml(rawCmd)}`, 'prompt-echo');

    const parts = rawCmd.trim().split(/\s+/);
    const cmd = parts[0].toLowerCase();
    const args = parts.slice(1);

    switch (cmd) {
      case 'help':
        this.showHelp();
        break;

      case 'clear':
      case 'cls':
        this.output.innerHTML = '';
        break;

      case 'scan-iot':
        this.runScanIot();
        break;

      case 'mqtt-sub':
        this.runMqttSub(args[0] || 'telemetry/sensors/#');
        break;

      case 'ping':
        this.runPing(args[0] || '10.50.0.1');
        break;

      case 'show':
        this.handleShow(args);
        break;

      case 'whoami':
        this.addLine("PLAYER: <strong style='color:#fff'>Network & IoT Engineering Student</strong>", "info");
        this.addLine("CLASS : Level 21 Infrastructure & Embedded Specialist", "success");
        this.addLine("FOCUS : Sensor-to-Cloud Pipelines, Cisco/MikroTik Routing, LoRaWAN, Secure MQTT", "output");
        this.addLine("STATUS: Ready for IoT Engineer / Network Engineer Internship & Fulltime Roles", "warning");
        break;

      case 'skills':
        this.addLine("=== [SKILL TREE MATRIX] ===", "info");
        this.addLine("[IoT Hardware]  : ESP32 (FreeRTOS), LoRa SX1276, Raspberry Pi 4, Arduino, STM32", "output");
        this.addLine("[Networking]    : VLAN 802.1Q, OSPF, BGP, WireGuard VPN, pfSense, Wireshark", "output");
        this.addLine("[IoT Protocols] : MQTT (Mosquitto TLS), HTTP REST, ESP-NOW, Modbus RS485, WebSockets", "output");
        this.addLine("[Code & NetOps] : C/C++ (Arduino/ESP-IDF), Python (Netmiko), MicroPython, InfluxDB", "output");
        break;

      case 'projects':
        this.addLine("=== [COMPLETED QUESTS & LABS] ===", "info");
        this.addLine("1. Smart Farming IoT & LoRaWAN Soil Telemetry Network", "output");
        this.addLine("2. Industrial IoT Edge Gateway with WireGuard VPN Tunnel", "output");
        this.addLine("3. Enterprise Campus Network with IoT Device VLAN Isolation (Cisco)", "output");
        this.addLine("4. Smart Aquaculture Wireless Buoy Mesh with ESP-NOW & MQTT", "output");
        this.addLine("5. Urban Air Quality & Weather Telemetry Station (Grafana)", "output");
        this.addLine("Scroll to the 'Proyek & Lab' section to inspect topology diagrams & source code!", "warning");
        break;

      case 'cat':
        if (args[0] && (args[0].toLowerCase().includes('bio') || args[0].toLowerCase().includes('resume') || args[0].toLowerCase().includes('cv'))) {
          this.addLine("=== [PLAYER BIO & MISSION STATEMENT] ===", "info");
          this.addLine("Peminatan: Teknik Jaringan Komputer & Internet of Things (IoT)", "output");
          this.addLine("Misi     : Menjembatani perangkat fisik (sensor/mikrokontroler) dengan infrastruktur cloud yang aman, andal, dan berlatensi rendah.", "output");
          this.addLine("Nilai    : Pemahaman menyeluruh dari layer fisik kabel & frekuensi radio hingga protokol routing dan cloud database.", "success");
        } else {
          this.addLine(`cat: ${args[0] || 'file'}: File not found. Try 'cat bio.txt'`, "error");
        }
        break;

      default:
        this.addLine(`% Command not found: "${cmd}". Type 'help' for command list.`, "error");
        break;
    }
  }

  showHelp() {
    this.addLine("Arcade Command Reference:", "info");
    this.addLine("  <span style='color:var(--pixel-green)'>scan-iot</span>          - Scan and discover active wireless & Modbus IoT nodes", "output");
    this.addLine("  <span style='color:var(--pixel-yellow)'>mqtt-sub</span>          - Live MQTT packet subscribe stream", "output");
    this.addLine("  <span style='color:var(--pixel-cyan)'>ping &lt;ip&gt;</span>          - Send ICMP echo packets to gateway/sensor", "output");
    this.addLine("  <span style='color:var(--pixel-cyan)'>show ip route</span>      - View routing table and VLAN gateway hops", "output");
    this.addLine("  <span style='color:var(--pixel-cyan)'>skills</span>             - Inspect technical skill matrix", "output");
    this.addLine("  <span style='color:var(--pixel-cyan)'>projects</span>           - List enterprise networking & IoT lab projects", "output");
    this.addLine("  <span style='color:var(--pixel-cyan)'>whoami</span>             - Character stats & background", "output");
    this.addLine("  <span style='color:var(--pixel-cyan)'>cat bio.txt</span>        - Read student introduction statement", "output");
    this.addLine("  <span style='color:var(--pixel-cyan)'>clear</span>              - Clear the arcade console", "output");
  }

  runScanIot() {
    this.addLine("Scanning LoRa 915MHz, ESP-NOW 2.4GHz, and RS485 Modbus buses...", "info");
    const discovered = [
      { id: "NODE_01", type: "ESP32 Soil NPK", bus: "LoRa 915MHz", rssi: "-68 dBm", status: "HEALTHY", vbat: "4.12V" },
      { id: "NODE_02", type: "Aquaculture Buoy", bus: "ESP-NOW", rssi: "-54 dBm", status: "HEALTHY", vbat: "3.98V" },
      { id: "NODE_03", type: "Modbus Energy PLC", bus: "RS485 Serial", rssi: "WIRED", status: "ONLINE", vbat: "220VAC" }
    ];

    let i = 0;
    const interval = setInterval(() => {
      if (i < discovered.length) {
        const d = discovered[i];
        this.addLine(`[FOUND] ${d.id} | ${d.type} | Bus: ${d.bus} | RSSI: ${d.rssi} | Bat: ${d.vbat} | ${d.status}`, "success");
        i++;
      } else {
        clearInterval(interval);
        this.addLine("Scan completed: 3 IoT nodes active and streaming telemetry.", "info");
      }
    }, 280);
  }

  runMqttSub(topic) {
    this.addLine(`Subscribing to broker mosquitto.local:1883 on topic [${topic}]...`, "info");
    const samples = [
      `[MQTT] telemetry/farm/soil -> {"node_id":1,"moisture":52.4,"ph":6.8,"temp":28.5}`,
      `[MQTT] telemetry/aqua/pond1 -> {"node_id":2,"do_ppm":6.4,"turbidity_ntu":12.1}`,
      `[MQTT] telemetry/power/meter1 -> {"voltage":224.2,"current_amp":3.14,"power_watt":704.0}`
    ];
    let i = 0;
    const interval = setInterval(() => {
      if (i < samples.length) {
        this.addLine(samples[i], "warning");
        i++;
      } else {
        clearInterval(interval);
        this.addLine("Stream pause: All sensor topics synchronized with InfluxDB.", "success");
      }
    }, 350);
  }

  runPing(target) {
    this.addLine(`PING ${target} 56(84) bytes of data.`, "info");
    let seq = 0;
    const interval = setInterval(() => {
      seq++;
      const timeMs = (2 + Math.random() * 6).toFixed(1);
      this.addLine(`64 bytes from ${target}: icmp_seq=${seq} ttl=64 time=${timeMs} ms`, "output");
      if (seq >= 4) {
        clearInterval(interval);
        this.addLine(`--- ${target} ping statistics ---`, "info");
        this.addLine("4 packets transmitted, 4 received, 0% packet loss", "success");
      }
    }, 220);
  }

  handleShow(args) {
    const sub = (args.join(' ')).toLowerCase();
    if (sub.includes('route')) {
      this.addLine("Gateway of last resort is 10.50.0.1 to network 0.0.0.0", "info");
      this.addLine("C    10.50.0.0/24 is directly connected, eth0 (IoT Gateway Subnet)", "output");
      this.addLine("O IA 10.10.0.0/16 [110/10] via 10.50.0.1 (Corporate Enterprise LAN)", "output");
      this.addLine("S    10.200.0.0/24 via wg0 [WireGuard VPN NOC Encrypted Tunnel]", "success");
    } else {
      this.addLine(`% Unknown show command. Try 'show ip route'.`, "warning");
    }
  }

  escapeHtml(str) {
    return str.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
  }
}

window.NetworkTerminal = NetworkTerminal;
