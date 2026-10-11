<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class PortfolioController extends Controller
{
    /**
     * Display Nicky Tirta Putra Nugroho's focused portfolio.
     */
    public function index()
    {
        $profile = [
            'name' => 'Nicky Tirta Putra Nugroho',
            'role' => 'Mahasiswa Teknik Jaringan Komputer & Internet of Things (IoT)',
            'headline' => 'Networking & IoT Enthusiast | Connecting Physical Sensors to Secure Cloud Infrastructure',
            'email' => 'nickytirta53@gmail.com',
            'linkedin' => 'https://www.linkedin.com/in/nicky-tirta-putra-nugroho-78454921b/',
            'location' => 'Indonesia',
            'status' => 'OPEN FOR INTERNSHIP & OPPORTUNITIES',
            'bio' => 'Saya adalah seorang mahasiswa yang berfokus mendalami arsitektur Jaringan Komputer (Computer Networking) dan Internet of Things (IoT). Memiliki ketertarikan tinggi pada bagaimana data ditransmisikan secara efisien dan aman—mulai dari lapisan sensor mikrokontroler (ESP32, Arduino, LoRa), gateway edge, switching & routing VLAN, hingga integrasi protokol komunikasi ringan seperti MQTT dan REST API.',
        ];

        $skillCategories = [
            [
                'title' => 'Computer Networking & Security',
                'icon' => '🌐',
                'description' => 'Konfigurasi, troubleshooting, dan perancangan infrastruktur jaringan skala kecil hingga enterprise.',
                'skills' => [
                    ['name' => 'Routing & Switching (OSPF, Static, Inter-VLAN)', 'level' => 90],
                    ['name' => 'VLAN (802.1Q) & Network Segmentation', 'level' => 92],
                    ['name' => 'Subnetting IPv4 (VLSM / CIDR) & IPv6 Basics', 'level' => 95],
                    ['name' => 'Cisco Packet Tracer, GNS3 & Network Simulators', 'level' => 92],
                    ['name' => 'Network Security, Firewalls (ACL, NAT) & WireGuard VPN', 'level' => 86],
                    ['name' => 'Packet Inspection & Troubleshooting (Wireshark)', 'level' => 88],
                ],
                'tags' => ['Computer Networking', 'TCP/IP', 'Cisco IOS', 'MikroTik', 'VLAN', 'Subnetting', 'Wireshark', 'WireGuard']
            ],
            [
                'title' => 'Internet of Things (IoT) & Hardware',
                'icon' => '📟',
                'description' => 'Perancangan sistem tertanam, interfacing aneka sensor, dan pengiriman data jarak jauh.',
                'skills' => [
                    ['name' => 'ESP32 & ESP8266 Microcontrollers (Wi-Fi / BLE)', 'level' => 94],
                    ['name' => 'Arduino & Embedded Systems Programming', 'level' => 90],
                    ['name' => 'LoRa & LoRaWAN Long-Range Telemetry', 'level' => 85],
                    ['name' => 'MQTT Protocol (Mosquitto Broker Pub/Sub)', 'level' => 92],
                    ['name' => 'Sensor Interfacing (ADC, I2C, SPI, Modbus RS485)', 'level' => 88],
                    ['name' => 'Raspberry Pi as Linux IoT Edge Gateway', 'level' => 86],
                ],
                'tags' => ['IoT', 'ESP32', 'Arduino', 'Raspberry Pi', 'LoRa', 'MQTT', 'Modbus', 'Sensors']
            ],
            [
                'title' => 'Programming, Tools & System Ops',
                'icon' => '💻',
                'description' => 'Bahasa pemrograman pendukung otomasi perangkat dan manajemen lingkungan sistem.',
                'skills' => [
                    ['name' => 'C / C++ (Arduino IDE & PlatformIO)', 'level' => 90],
                    ['name' => 'Python (Netmiko, MQTT Client, Scripting)', 'level' => 86],
                    ['name' => 'Linux Command Line & System Administration', 'level' => 88],
                    ['name' => 'Git Version Control & GitHub Workflow', 'level' => 85],
                    ['name' => 'Time-Series Monitoring (InfluxDB & Grafana)', 'level' => 82],
                ],
                'tags' => ['C/C++', 'Python', 'Linux CLI', 'Git', 'Grafana', 'InfluxDB', 'PlatformIO']
            ],
            [
                'title' => 'Professional & Problem Solving Skills',
                'icon' => '🧠',
                'description' => 'Kemampuan analitis dan kolaborasi dalam menyelesaikan tantangan teknis.',
                'skills' => [
                    ['name' => 'Analytical Troubleshooting & Diagnostics', 'level' => 92],
                    ['name' => 'Logical Circuit & Network Topology Design', 'level' => 90],
                    ['name' => 'Team Collaboration & Technical Communication', 'level' => 88],
                    ['name' => 'Continuous Self-Learning & Adaptability', 'level' => 95],
                ],
                'tags' => ['Problem Solving', 'Troubleshooting', 'System Design', 'Communication', 'Fast Learner']
            ]
        ];

        return view('portfolio', compact('profile', 'skillCategories'));
    }
}
