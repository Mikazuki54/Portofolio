/**
 * PROJECTS & LABS DATA (NETWORKING + IOT SPECIALIZATION)
 * 8-Bit Pixel Art Theme Portfolio
 */

const projectsData = [
  {
    id: "smart-farming-lora",
    title: "Smart Farming IoT & LoRaWAN Soil Telemetry Network",
    category: "iot",
    badge: "IoT & LoRaWAN",
    shortDesc: "Infrastruktur telemetri pertanian cerdas berbasis transmisi LoRaWAN jarak jauh (3.5 km), gateway Raspberry Pi, dan visualisasi time-series real-time.",
    tools: ["ESP32", "LoRa SX1276", "RS485 Modbus", "MQTT Mosquitto", "InfluxDB", "Grafana"],
    specs: {
      devices: "5x Node Sensor Lapangan (ESP32 + NPK), 1x LoRa Gateway (Raspberry Pi 4), Edge Server",
      protocols: "LoRa (915 MHz), Modbus RTU, MQTT TLS, InfluxDB Line Protocol",
      uptimeGoal: "Transmisi daya ultra-rendah (Deep Sleep), baterai bertahan >12 bulan"
    },
    highlights: [
      "Mengumpulkan data kelembapan tanah, pH, dan NPK secara berkala dan mentransmisikannya melintasi area perkebunan tanpa kuota seluler.",
      "Edge Gateway melakukan deduplikasi paket LoRa sebelum mempublikasikannya ke MQTT broker terenkripsi.",
      "Terintegrasi dengan dashboard monitoring mobile dan sistem aktuator penyiraman otomatis berbasis threshold kelembapan."
    ],
    configSnippet: `// ESP32 LoRa Packet Transmitter (Arduino C++)
#include <SPI.h>
#include <LoRa.h>

struct TelemetryPacket {
  uint16_t node_id = 0x01;
  float soil_moisture;
  float soil_ph;
  uint16_t battery_mv;
};

void sendTelemetry() {
  TelemetryPacket packet;
  packet.soil_moisture = readSoilMoisture();
  packet.soil_ph = readPhModbus();
  packet.battery_mv = analogReadMilliVolts(VBAT_PIN);

  LoRa.beginPacket();
  LoRa.write((uint8_t*)&packet, sizeof(packet));
  LoRa.endPacket();
  esp_deep_sleep_start();
}`
  },
  {
    id: "industrial-iot-edge-vpn",
    title: "Industrial IoT Edge Gateway with WireGuard VPN Tunnel",
    category: "security",
    badge: "IIoT & Security",
    shortDesc: "Arsitektur gateway industri untuk membaca telemetri PLC & power meter via Modbus RS485, diamankan dengan tunnel VPN WireGuard ke NOC pusat.",
    tools: ["Raspberry Pi", "MikroTik RouterOS", "WireGuard", "Modbus RTU", "Node-RED", "Docker"],
    specs: {
      devices: "Raspberry Pi Industrial Edge Compute, MikroTik hEX, Schneider Power Meters",
      protocols: "RS485 Modbus RTU over Serial, WireGuard VPN (ChaCha20-Poly1305), MQTT",
      uptimeGoal: "99.98% Uptime telemetry poll dengan failover seluler LTE"
    },
    highlights: [
      "Isolasi total mesin pabrik di VLAN tertutup; hanya gateway yang dapat berkomunikasi melalui tunnel VPN WireGuard.",
      "Mengonversi register hexadesimal Modbus menjadi payload JSON bersih yang dikirim setiap 5 detik.",
      "Telegram Bot otomatis mengirimkan peringatan jika tegangan fase melebihi batas toleransi keselamatan."
    ],
    configSnippet: `# WireGuard IIoT Gateway Configuration
[Interface]
Address = 10.200.0.5/24
PrivateKey = <CLIENT_PRIVATE_KEY>
ListenPort = 51820

[Peer]
PublicKey = <NOC_HUB_PUBLIC_KEY>
Endpoint = 203.0.113.10:51820
AllowedIPs = 10.200.0.0/24, 192.168.100.0/24
PersistentKeepalive = 25`
  },
  {
    id: "enterprise-iot-vlan-cisco",
    title: "Enterprise Campus Network with IoT Device VLAN Isolation",
    category: "routing",
    badge: "Routing & VLAN",
    shortDesc: "Segmentasi jaringan kampus memisahkan ratusan perangkat sensor IoT pintar dari jaringan komputer korporat menggunakan Cisco VLAN dan Access Lists (ACL).",
    tools: ["Cisco IOS", "GNS3", "802.1Q VLAN", "Inter-VLAN Routing", "pfSense", "DHCP Snooping"],
    specs: {
      devices: "Cisco Catalyst 3750 Core Switch, 3x Access Switches, pfSense Stateful Firewall",
      protocols: "VLAN 50 (IoT Fleet), VLAN 10 (Corp LAN), 802.1X, Private VLAN, DHCP Snooping",
      uptimeGoal: "Zero Lateral Movement dari perangkat IoT terinfeksi ke server korporat"
    },
    highlights: [
      "Penerapan Private VLAN (PVLAN) agar antar kamera CCTV dan sensor IoT tidak bisa saling membajak (peer-to-peer attack mitigation).",
      "Dynamic ARP Inspection dan DHCP Snooping aktif untuk mencegah serangan rogue DHCP server pada segmen IoT.",
      "ACL membatasi lalu lintas perangkat IoT hanya boleh mengirim data ke port MQTT 1883 dan NTP 123."
    ],
    configSnippet: `! Cisco Catalyst Core Switch Configuration
vlan 50
 name IOT_FLEET_SENSORS
!
interface Vlan50
 ip address 10.50.0.1 255.255.255.0
 ip access-group FILTER_IOT_IN in
!
ip access-list extended FILTER_IOT_IN
 permit tcp 10.50.0.0 0.0.0.255 host 10.10.10.10 eq 1883
 permit udp 10.50.0.0 0.0.0.255 any eq domain
 permit udp 10.50.0.0 0.0.0.255 any eq ntp
 deny   ip 10.50.0.0 0.0.0.255 10.0.0.0 0.255.255.255
 permit ip any any`
  },
  {
    id: "smart-aquaculture-espnow",
    title: "Smart Aquaculture Wireless Buoy Mesh with ESP-NOW & MQTT",
    category: "iot",
    badge: "IoT Mesh & Motors",
    shortDesc: "Pelampung telemetri kualitas air tambak (pH, Suhu, Turbiditas) tanpa kabel dengan transmisi mesh ESP-NOW ke stasiun pompa aerator otomatis.",
    tools: ["ESP32", "ESP-NOW", "MicroPython", "Relay Actuators", "OLED Display", "Solar LiFePO4"],
    specs: {
      devices: "3x Floating Nodes (ESP32 Water Sensors), 1x Central Gateway Controller, Solar Powered",
      protocols: "ESP-NOW Peer-to-Peer Protocol (2.4 GHz tanpa router), MQTT over Wi-Fi",
      uptimeGoal: "Respon kincir air aerator <500ms saat dissolved oxygen menurun"
    },
    highlights: [
      "Transmisi peer-to-peer ESP-NOW berkecepatan tinggi tanpa memerlukan akses internet lokal di kolam tambak.",
      "Gateway mengagregasi data kolam lalu menyalurkannya via tethering seluler ke server MQTT cloud.",
      "Sistem relay kendali otomatis memutar aerator saat parameter air terdeteksi di bawah standar."
    ],
    configSnippet: `# MicroPython ESP-NOW Sender on Sensor Buoy
import network, espnow, ustruct

wlan = network.WLAN(network.STA_IF)
wlan.active(True)
en = espnow.ESPNow()
en.active(True)

gateway_mac = b'\\x24\\x6f\\x28\\x7b\\x90\\x12'
en.add_peer(gateway_mac)

# Read sensors and send binary packed struct
data = ustruct.pack("ff", ph_value, temp_celsius)
en.send(gateway_mac, data)`
  },
  {
    id: "environment-telemetry-grafana",
    title: "Urban Air Quality & Weather Telemetry Station",
    category: "monitoring",
    badge: "Telemetry & NOC",
    shortDesc: "Stasiun pemantau kualitas udara perkotaan (PM2.5, PM10, CO2, Suhu, Tekanan udara) terhubung ke dashboard Grafana dan Telegram Alerting.",
    tools: ["PMS5003", "BME280", "ESP32", "InfluxDB", "Grafana", "Telegram Bot API"],
    specs: {
      devices: "Outdoor Weather Station Node, Cloud VPS Ubuntu 24.04, InfluxDB Time-Series",
      protocols: "HTTP REST API, JSON Telemetry, TLS 1.3, Telegram Webhook",
      uptimeGoal: "Pengambilan sampel 10 detik konsisten tanpa packet drop"
    },
    highlights: [
      "Mengukur kepadatan partikel debu halus PM2.5 menggunakan sensor laser hamburan partikel PMS5003.",
      "Visualisasi multi-layer di Grafana memetakan indeks ISPU dan korelasi suhu kelembapan.",
      "Alert bot instan mengirim peringatan jika polusi udara melebihi ambang batas tidak sehat."
    ],
    configSnippet: `# InfluxDB Line Protocol Payload Example:
air_quality,location=station_campus_01,sensor=pms5003 pm25=34.2,pm10=58.1,temp=28.4,humidity=65.2,pressure=1012.3 1728691200000000000`
  },
  {
    id: "netmiko-iot-automation",
    title: "Automated Network Provisioning for IoT Infrastructure",
    category: "automation",
    badge: "NetDevOps",
    shortDesc: "Otomatisasi konfigurasi massal port switch, alokasi static DHCP reservation, dan audit keamanan perangkat IoT menggunakan Python Netmiko & Ansible.",
    tools: ["Python 3", "Netmiko", "Ansible", "Git", "Scapy", "Linux Syslog"],
    specs: {
      devices: "15x Network Switch & Routers, 100+ IoT Endpoints, Linux Control Node",
      protocols: "SSHv2, RESTCONF, SNMPv3, GitOps Version Control",
      uptimeGoal: "Provisioning waktu konfigurasi port dipersingkat dari 40 menit menjadi 30 detik"
    },
    highlights: [
      "Skrip Python otomatis memetakan alamat MAC dari perangkat IoT baru dan menempatkannya ke VLAN yang sesuai.",
      "Audit harian memvalidasi apakah ada port IoT yang melakukan sambungan mencurigakan ke luar negeri.",
      "Backup otomatis konfigurasi berjalan setiap malam dan tersimpan rapi di repositori Git."
    ],
    configSnippet: `import netmiko

def configure_iot_port(switch_ip, port, vlan=50):
    device = {'device_type': 'cisco_ios', 'host': switch_ip, 'username': 'admin', 'password': 'secret'}
    commands = [
        f'interface {port}',
        'description IoT_SENSOR_ENDPOINT',
        f'switchport access vlan {vlan}',
        'switchport mode access',
        'switchport port-security',
        'switchport port-security maximum 1',
        'switchport port-security violation restrict',
        'spanning-tree portfast'
    ]
    with netmiko.ConnectHandler(**device) as conn:
        output = conn.send_config_set(commands)
        print(f"Port {port} configured on {switch_ip}")`
  }
];

const certsData = [
  {
    issuer: "Cisco Systems",
    name: "Cisco Certified Network Associate (CCNA 200-301)",
    status: "in-progress",
    statusText: "TARGET: Q4 2026",
    desc: "Mencakup Fundamental Jaringan, Network Access, Konektivitas IP, Keamanan Jaringan, serta Otomatisasi & Programmability."
  },
  {
    issuer: "MikroTik Academy",
    name: "MikroTik Certified Network Associate (MTCNA)",
    status: "completed",
    statusText: "QUEST COMPLETED",
    desc: "Konfigurasi RouterOS: Firewall filter & NAT, Bandwidth management (Simple Queue), Wireless bridge, dan VPN WireGuard/IPsec."
  },
  {
    issuer: "BNSP / Lembaga Sertifikasi Profesi",
    name: "IoT Developer & Embedded Systems Specialist",
    status: "completed",
    statusText: "VERIFIED // PASS",
    desc: "Kompetensi perancangan arsitektur IoT: Sensor interfacing (ADC, I2C, SPI), Protokol komunikasi MQTT/LoRa, dan Pemrograman mikrokontroler C/C++."
  },
  {
    issuer: "Linux Foundation / CompTIA",
    name: "Linux System & Network Administration",
    status: "completed",
    statusText: "ACHIEVEMENT UNLOCKED",
    desc: "Penguasaan server Linux: Networking CLI (ip, ss, iptables), systemd service daemon, Mosquitto MQTT broker, dan InfluxDB time-series database."
  }
];

const skillsCategories = [
  {
    title: "IoT Hardware & Microcontrollers",
    icon: `📟`,
    items: [
      { name: "ESP32 (FreeRTOS & Wi-Fi/BLE)", level: 92 },
      { name: "LoRa SX1276 / LoRaWAN Nodes", level: 88 },
      { name: "Arduino, STM32 & Microchip MCU", level: 85 },
      { name: "Raspberry Pi (Linux Edge Gateway)", level: 90 },
      { name: "Modbus RS485 & Industrial Sensors", level: 84 }
    ],
    tags: ["ESP32", "LoRa", "RaspberryPi", "I2C/SPI", "Modbus-RTU", "FreeRTOS"]
  },
  {
    title: "Networking & Enterprise Infrastructure",
    icon: `🌐`,
    items: [
      { name: "VLAN 802.1Q & IoT Segmentation", level: 94 },
      { name: "OSPFv2/v3, BGP Peering & Static Routing", level: 88 },
      { name: "pfSense & Cisco Firewalls (ACL/NAT)", level: 90 },
      { name: "WireGuard & IPsec Secure VPN", level: 92 },
      { name: "Wireshark Packet Analysis & NetFlow", level: 86 }
    ],
    tags: ["Cisco-IOS", "MikroTik", "pfSense", "Subnetting", "WireGuard", "Wireshark"]
  },
  {
    title: "IoT Protocols & Cloud Messaging",
    icon: `📡`,
    items: [
      { name: "MQTT (Mosquitto TLS & QoS)", level: 95 },
      { name: "HTTP REST API & WebSockets", level: 90 },
      { name: "ESP-NOW Low-Latency Mesh", level: 88 },
      { name: "InfluxDB & Grafana Telemetry", level: 86 },
      { name: "Node-RED & Edge Flow Automation", level: 84 }
    ],
    tags: ["MQTT", "WebSockets", "ESP-NOW", "InfluxDB", "Grafana", "Node-RED"]
  },
  {
    title: "Firmware, Code & Automation",
    icon: `💻`,
    items: [
      { name: "C / C++ (Arduino Framework & PlatformIO)", level: 90 },
      { name: "Python (Netmiko, Scapy, MQTT Clients)", level: 88 },
      { name: "MicroPython for Embedded Systems", level: 85 },
      { name: "Linux Bash Shell & Docker Containers", level: 86 },
      { name: "Git Version Control for NetDevOps", level: 84 }
    ],
    tags: ["C++", "Python", "MicroPython", "Docker", "Git", "Netmiko"]
  }
];

// Attach to window object for global accessibility
window.projectsData = projectsData;
window.certsData = certsData;
window.skillsCategories = skillsCategories;
