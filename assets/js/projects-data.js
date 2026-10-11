/**
 * PROJECTS & LABS DATA
 * Network Engineering Portfolio
 */

const projectsData = [
  {
    id: "ospf-bgp-campus",
    title: "Multi-Area OSPF & BGP Enterprise Campus Network",
    category: "routing",
    badge: "Enterprise Routing",
    shortDesc: "Perancangan arsitektur jaringan kampus berskala besar dengan redundansi link, dual-ISP BGP peering, dan segmentasi area OSPF.",
    tools: ["Cisco IOS", "GNS3", "OSPFv2/v3", "eBGP/iBGP", "HSRP", "Wireshark"],
    specs: {
      devices: "4x Cisco 7200 Routers, 4x Cisco 3750 Multilayer Switches, 2x Edge Firewalls",
      protocols: "BGP (AS 64512), OSPF Multi-Area (Area 0, Area 10, Area 20), HSRP VIP",
      uptimeGoal: "99.99% via High Availability HSRP & Dynamic Path Failover"
    },
    highlights: [
      "Mengurangi waktu konvergensi jaringan menjadi <2 detik saat terjadi link failure menggunakan BFD (Bidirectional Forwarding Detection).",
      "Implementasi route summarization dan stub areas untuk menghemat memory routing table pada edge routers.",
      "Dual-homed BGP peering ke dua ISP berbeda dengan AS-Path Prepending untuk load balancing trafik outbound."
    ],
    configSnippet: `router ospf 1
 router-id 10.255.255.1
 auto-cost reference-bandwidth 10000
 network 10.10.0.0 0.0.255.255 area 0
 network 10.20.0.0 0.0.255.255 area 10
!
router bgp 64512
 neighbor 203.0.113.1 remote-as 65001
 neighbor 203.0.113.1 route-map ISP1_POLICY out
 neighbor 198.51.100.1 remote-as 65002`
  },
  {
    id: "pfsense-zerotrust",
    title: "Zero-Trust Security & VLAN DMZ Perimeter with pfSense",
    category: "security",
    badge: "Network Security",
    shortDesc: "Implementasi perimeter firewall berlapis dengan pfSense, isolasi server di DMZ, captive portal, serta inspeksi paket IDS/IPS via Snort.",
    tools: ["pfSense", "Snort IDS/IPS", "VLAN 802.1Q", "OpenVPN", "RADIUS", "Suricata"],
    specs: {
      devices: "pfSense Appliance (Virtualized), Managed Layer 2/3 Switch, FreeRADIUS",
      protocols: "802.1Q VLANs (MGMT, CORP, DMZ, GUEST), 802.1X Auth, TLS 1.3 VPN",
      uptimeGoal: "Zero-Trust Segment Isolation & Real-time Threat Mitigation"
    },
    highlights: [
      "Mengisolasi server publik ke DMZ dengan strict stateful firewall inspection untuk mencegah lateral movement.",
      "Integrasi Snort IDS/IPS dengan ruleset Emerging Threats, mendeteksi & memblokir brute-force serta port scan.",
      "Implementasi 802.1X port authentication pada Access layer terhubung dengan FreeRADIUS server."
    ],
    configSnippet: `# pfSense Rules Matrix:
# Pass CORP to DMZ on TCP/443 only
# Block DMZ to Internal LAN (Zero Trust rule)
# Snort Alert Rule:
alert tcp $EXTERNAL_NET any -> $HOME_NET 22 (msg:"ET SCAN Potential SSH Brute-force"; flags:S; threshold:type both, track by_src, count 5, seconds 60; sid:2001219; rev:1;)`
  },
  {
    id: "python-netmiko-ansible",
    title: "Automated Network Provisioning & Backup Engine",
    category: "automation",
    badge: "Network Automation",
    shortDesc: "Platform otomatisasi berbasis Python Netmiko dan Ansible untuk konfigurasi massal, audit compliance, dan automatic backup config 25+ router.",
    tools: ["Python 3", "Netmiko", "Ansible", "Git", "NAPALM", "Jinja2 Templates"],
    specs: {
      devices: "25x Cisco & MikroTik Multi-Vendor Nodes, Linux Automation Server",
      protocols: "SSHv2, NETCONF, RESTCONF, SFTP Backup Server",
      uptimeGoal: "Config deployment time reduced from 2 hours to 45 seconds"
    },
    highlights: [
      "Menghilangkan human error pada saat pushing standard VLAN, banner, NTP, dan syslog config.",
      "Automated diff checking: mencatat setiap perubahan konfigurasi ke repositori Git secara harian.",
      "Skrip health-check interaktif yang memvalidasi status BGP neighbor dan interface CRC errors secara berkala."
    ],
    configSnippet: `import netmiko
from jinja2 import Environment, FileSystemLoader

devices = [{'device_type': 'cisco_ios', 'host': f'10.10.1.{i}', 'username': 'admin', 'password': 'secret'} for i in range(1, 26)]

for dev in devices:
    with netmiko.ConnectHandler(**dev) as conn:
        output = conn.send_command('show ip interface brief | exclude unassigned')
        backup = conn.send_command('show running-config')
        with open(f"backups/{dev['host']}.cfg", 'w') as f:
            f.write(backup)
        print(f"[SUCCESS] Backed up {dev['host']}")`
  },
  {
    id: "mikrotik-wireguard-ipsec",
    title: "Multi-Site SD-WAN & WireGuard VPN Tunnel Overlay",
    category: "routing",
    badge: "SD-WAN & VPN",
    shortDesc: "Infrastruktur interkoneksi Kantor Pusat (HQ) dan 2 Kantor Cabang menggunakan MikroTik RouterOS dengan dual tunnel failover dan OSPF.",
    tools: ["MikroTik RouterOS v7", "WireGuard", "IPsec IKEv2", "OSPF", "EoIP", "BGP"],
    specs: {
      devices: "3x MikroTik Cloud Router Switch (CRS) & Virtual RouterOS v7 instances",
      protocols: "WireGuard Tunnel, IPsec with AES-GCM-256, OSPF over GRE",
      uptimeGoal: "Seamless failover <300ms antar tunnel VPN alternatif"
    },
    highlights: [
      "Enkripsi kuat antar kantor cabang dengan throughput optimal berkat protokol WireGuard.",
      "Dynamic routing OSPF dijalankan di atas tunnel virtual untuk update tabel rute otomatis saat salah satu link down.",
      "Implementasi Simple Queue & PCQ (Per Connection Queueing) untuk menjamin bandwidth VoIP dan video conference."
    ],
    configSnippet: `/interface wireguard add listen-port=13231 mtu=1420 name=wg-hq-to-branch1 private-key="..."
/interface wireguard peers add allowed-address=10.254.1.2/32 endpoint-address=203.0.113.5 endpoint-port=13231 interface=wg-hq-to-branch1 public-key="..."
/ip address add address=10.254.1.1/30 interface=wg-hq-to-branch1 network=10.254.1.0
/routing ospf interface-template add area=backbone networks=10.254.1.0/30 type=ptp`
  },
  {
    id: "telemetry-zabbix-wireshark",
    title: "NOC Telemetry & Packet Analysis with Zabbix & Grafana",
    category: "monitoring",
    badge: "Monitoring & NOC",
    shortDesc: "Sistem monitoring infrastruktur jaringan terpusat dengan protokol SNMPv3, alerting Telegram Bot real-time, dan deep packet inspection Wireshark.",
    tools: ["Zabbix 6.4", "Grafana", "SNMPv3", "Wireshark", "Telegram Bot API", "Syslog"],
    specs: {
      devices: "Zabbix Server on Debian 12, Grafana Dashboard, 15 Network Nodes",
      protocols: "SNMPv3 (authPriv SHA/AES), Syslog RFC 5424, ICMP Ping Poller",
      uptimeGoal: "Proactive alert trigger under 10 seconds of anomalous link drops"
    },
    highlights: [
      "Dashboard visual interaktif di Grafana menampilkan utilisasi bandwidth per-interface, packet drop, dan CPU/RAM router.",
      "Telegram bot instant alert saat link interface switch mengalami flapping atau latency >100ms.",
      "Penyelidikan forensic paket TCP retransmission dan DNS leak menggunakan Wireshark packet capture."
    ],
    configSnippet: `# SNMPv3 Configuration on Cisco IOS:
snmp-server group NOC_ADMIN v3 priv
snmp-server user nocmon NOC_ADMIN v3 auth sha StrongAuthPass priv aes 128 StrongPrivPass
snmp-server host 10.10.99.100 version 3 priv nocmon
snmp-server enable traps`
  },
  {
    id: "cloud-hybrid-aws",
    title: "AWS VPC Hybrid Cloud Networking with Transit Gateway",
    category: "security",
    badge: "Cloud Networking",
    shortDesc: "Perancangan arsitektur hybrid cloud menghubungkan on-premises datacenter ke AWS multi-VPC menggunakan AWS Site-to-Site VPN dan Transit Gateway.",
    tools: ["AWS VPC", "AWS Transit Gateway", "IPSec VPN", "Route 53 Resolver", "BGP"],
    specs: {
      devices: "AWS Transit Gateway, 3x VPCs (Prod, Dev, Shared Services), Customer Gateway",
      protocols: "BGP over IPSec, AWS Direct Connect simulation, CIDR Non-overlapping",
      uptimeGoal: "Centralized routing without complex VPC peering mesh"
    },
    highlights: [
      "Pemisahan blast-radius dengan route tables berbeda pada Transit Gateway untuk isolasi VPC Prod dan Dev.",
      "Centralized egress inspection VPC dengan firewall appliance untuk semua outbound traffic ke internet.",
      "Integrasi DNS hybrid menggunakan Route 53 Outbound Endpoints untuk resolve private on-prem domains."
    ],
    configSnippet: `# Terraform / HCL snippet:
resource "aws_ec2_transit_gateway" "central_tgw" {
  description = "Central Campus-to-Cloud TGW"
  amazon_side_asn = 64515
  auto_accept_shared_attachments = "enable"
}
resource "aws_vpn_connection" "hq_hybrid_vpn" {
  transit_gateway_id = aws_ec2_transit_gateway.central_tgw.id
  customer_gateway_id = aws_customer_gateway.hq_cgw.id
  type = "ipsec.1"
}`
  }
];

const certsData = [
  {
    issuer: "Cisco Systems",
    name: "Cisco Certified Network Associate (CCNA 200-301)",
    status: "in-progress",
    statusText: "Target: Q4 2026",
    desc: "Mencakup Network Fundamentals, Network Access, IP Connectivity, IP Services, Security Fundamentals, dan Automation & Programmability."
  },
  {
    issuer: "MikroTik Academy",
    name: "MikroTik Certified Network Associate (MTCNA)",
    status: "completed",
    statusText: "Verified / Certified",
    desc: "Kompetensi konfigurasi RouterOS: Firewall filter & NAT, Bandwidth management (Simple Queue), Wireless AP, dan PPP/VPN tunnels."
  },
  {
    issuer: "CompTIA",
    name: "CompTIA Network+ (N10-008)",
    status: "completed",
    statusText: "Verified / Certified",
    desc: "Pemahaman mendalam mengenai arsitektur jaringan, troubleshooting hardware, kabel fisik (Cat6/Fiber), dan protokol standar industri."
  },
  {
    issuer: "Linux Foundation / Red Hat",
    name: "Linux System & Network Administration",
    status: "completed",
    statusText: "Certified",
    desc: "Penguasaan administrasi Linux CLI: systemd, networking utilities (ip, ss, iptables), SSH hardening, DNS/DHCP server setup."
  }
];

const skillsCategories = [
  {
    title: "Routing & Switching",
    icon: `<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M4 11a9 9 0 0 1 9 9"/><path d="M4 4a16 16 0 0 1 16 16"/><circle cx="5" cy="19" r="1"/></svg>`,
    items: [
      { name: "OSPFv2 / OSPFv3 & EIGRP", level: 90 },
      { name: "BGP (eBGP & iBGP Peering)", level: 82 },
      { name: "VLANs, 802.1Q Trunking, VTP", level: 95 },
      { name: "STP / RSTP & EtherChannel (LACP)", level: 88 },
      { name: "FHRP (HSRP / VRRP)", level: 85 }
    ],
    tags: ["TCP/IP", "IPv4/IPv6", "Subnetting VLSM", "Inter-VLAN", "Static Routes"]
  },
  {
    title: "Network Security & Firewalls",
    icon: `<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>`,
    items: [
      { name: "Stateful Firewalls (pfSense / ASA)", level: 88 },
      { name: "VPN (IPsec, WireGuard, OpenVPN)", level: 90 },
      { name: "Access Control Lists (Standard/Extended ACL)", level: 92 },
      { name: "IDS/IPS (Snort, Suricata)", level: 80 },
      { name: "Network Hardening & Port Security", level: 86 }
    ],
    tags: ["DMZ", "NAT / PAT", "RADIUS/TACACS+", "802.1X", "Threat Analysis"]
  },
  {
    title: "Network Automation & DevOps",
    icon: `<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="16 18 22 12 16 6"/><polyline points="8 6 2 12 8 18"/></svg>`,
    items: [
      { name: "Python Scripting (Netmiko, Paramiko)", level: 85 },
      { name: "Ansible Playbooks for Network Config", level: 80 },
      { name: "RESTCONF & NETCONF / YANG Models", level: 75 },
      { name: "Bash & Linux Shell Automation", level: 88 },
      { name: "Git Version Control for NetOps", level: 84 }
    ],
    tags: ["JSON/YAML", "Jinja2 Templates", "Scapy", "API Integration", "CI/CD NetOps"]
  },
  {
    title: "Tools, Simulators & NOC Ops",
    icon: `<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="2" y="3" width="20" height="14" rx="2" ry="2"/><line x1="8" y1="21" x2="16" y2="21"/><line x1="12" y1="17" x2="12" y2="21"/></svg>`,
    items: [
      { name: "Cisco Packet Tracer / GNS3 / EVE-NG", level: 94 },
      { name: "Wireshark Packet Analysis", level: 90 },
      { name: "MikroTik RouterOS (Winbox/CLI)", level: 92 },
      { name: "Zabbix & Grafana SNMP Monitoring", level: 84 },
      { name: "Nmap & Network Vulnerability Scan", level: 86 }
    ],
    tags: ["PRTG", "Cisco Catalyst", "Ubiquiti UniFi", "Debian/Ubuntu Server", "Iperf3"]
  }
];

// Attach to window object for global accessibility
window.projectsData = projectsData;
window.certsData = certsData;
window.skillsCategories = skillsCategories;
