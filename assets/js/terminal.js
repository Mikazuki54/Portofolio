/**
 * INTERACTIVE NETWORK ENGINEER TERMINAL CLI
 * Emulates Cisco IOS / Linux NetOps Command Line Interface
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
    
    // Key listener
    this.input.addEventListener('keydown', (e) => this.handleKeyDown(e));

    // Focus input when clicking anywhere on terminal
    if (this.container) {
      this.container.addEventListener('click', () => this.input.focus());
    }

    // Connect quick action chips
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
    this.addLine("Antigravity NetOS v4.19 (cisco-x86_64) - NOC Console Active", "info");
    this.addLine("Type <span style='color:var(--cyan-primary)'>help</span> to view available network diagnostic commands.", "output");
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
    // Print user's command
    this.addLine(`admin@core-rtr01# ${this.escapeHtml(rawCmd)}`, 'prompt-echo');

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

      case 'ping':
        this.runPing(args[0] || '8.8.8.8');
        break;

      case 'traceroute':
      case 'tracert':
        this.runTraceroute(args[0] || '1.1.1.1');
        break;

      case 'show':
        this.handleShow(args);
        break;

      case 'whoami':
        this.addLine("User: <strong style='color:#fff'>Network Engineer Student</strong>", "info");
        this.addLine("Role: Infrastructure & Cisco/MikroTik Enthusiast | Future NOC / NetDevOps Engineer", "output");
        this.addLine("Location: Indonesia (WIB/UTC+7)", "output");
        this.addLine("Status: Ready for Internship & Junior Network Engineer Roles", "success");
        break;

      case 'skills':
        this.addLine("=== TECHNICAL CAPABILITIES ===", "info");
        this.addLine("[Routing/Switching]: OSPF, BGP, VLAN (802.1Q), STP, HSRP, LACP", "output");
        this.addLine("[Security]: pfSense, Cisco ASA, Snort IDS, IPsec, WireGuard VPN, ACLs", "output");
        this.addLine("[Automation]: Python (Netmiko, Scapy), Ansible, Bash Scripting, RESTCONF", "output");
        this.addLine("[Tools/Hardware]: GNS3, EVE-NG, Packet Tracer, Wireshark, Zabbix, MikroTik", "output");
        break;

      case 'projects':
        this.addLine("=== FEATURED LABS & PROJECTS ===", "info");
        this.addLine("1. Multi-Area OSPF & BGP Enterprise Campus Network (GNS3)", "output");
        this.addLine("2. Zero-Trust Security & VLAN DMZ Perimeter with pfSense", "output");
        this.addLine("3. Automated Network Provisioning & Backup Engine (Python + Ansible)", "output");
        this.addLine("4. Multi-Site SD-WAN & WireGuard VPN Tunnel (MikroTik RouterOS)", "output");
        this.addLine("Scroll down to the 'Network Labs' section to inspect topologies and configs!", "warning");
        break;

      case 'contact':
        this.addLine("=== CONTACT TELEMETRY ===", "info");
        this.addLine("Email    : network.engineer@student.ac.id", "output");
        this.addLine("LinkedIn : linkedin.com/in/network-engineer-student", "output");
        this.addLine("GitHub   : github.com/network-eng-labs", "output");
        this.addLine("Telegram : @net_engineer", "output");
        break;

      case 'cat':
        if (args[0] && (args[0].toLowerCase().includes('resume') || args[0].toLowerCase().includes('cv'))) {
          this.addLine("--- RESUME SUMMARY ---", "info");
          this.addLine("Nama     : Calon Network Engineer", "output");
          this.addLine("Jurusan  : Teknik Informatika / Sistem Komputer / Jaringan", "output");
          this.addLine("IPK      : 3.85 / 4.00", "output");
          this.addLine("Fokus    : Enterprise Routing & Switching, Network Security & Automation", "output");
          this.addLine("Sertifikasi: CCNA (In Prep), MTCNA, CompTIA Network+", "success");
        } else {
          this.addLine(`cat: ${args[0] || 'file'}: File not found. Try 'cat resume.txt'`, "error");
        }
        break;

      default:
        this.addLine(`% Invalid command: "${cmd}". Type 'help' for available command list.`, "error");
        break;
    }
  }

  showHelp() {
    this.addLine("Available Diagnostic Commands:", "info");
    this.addLine("  <span style='color:var(--cyan-primary)'>ping &lt;host&gt;</span>          - Send ICMP Echo Request packets", "output");
    this.addLine("  <span style='color:var(--cyan-primary)'>traceroute &lt;host&gt;</span>    - Trace packet hop path to destination", "output");
    this.addLine("  <span style='color:var(--cyan-primary)'>show ip route</span>        - Display routing table (OSPF, BGP, Connected)", "output");
    this.addLine("  <span style='color:var(--cyan-primary)'>show ip int brief</span>   - Summary of network interface statuses", "output");
    this.addLine("  <span style='color:var(--cyan-primary)'>skills</span>               - Technical networking skillset breakdown", "output");
    this.addLine("  <span style='color:var(--cyan-primary)'>projects</span>             - List enterprise labs & infrastructure projects", "output");
    this.addLine("  <span style='color:var(--cyan-primary)'>whoami</span>               - Engineer profile & NOC credentials", "output");
    this.addLine("  <span style='color:var(--cyan-primary)'>cat resume.txt</span>       - Read student resume summary", "output");
    this.addLine("  <span style='color:var(--cyan-primary)'>contact</span>              - Get communication channels", "output");
    this.addLine("  <span style='color:var(--cyan-primary)'>clear</span>                - Clear terminal console", "output");
  }

  handleShow(args) {
    const sub = (args.join(' ')).toLowerCase();
    if (sub.includes('ip route') || sub.includes('route')) {
      this.addLine("Codes: C - connected, S - static, R - RIP, M - mobile, B - BGP", "output");
      this.addLine("       D - EIGRP, O - OSPF, IA - OSPF inter area, * - candidate default", "output");
      this.addLine("Gateway of last resort is 203.0.113.1 to network 0.0.0.0", "info");
      this.addLine("B*   0.0.0.0/0 [20/0] via 203.0.113.1, 04:12:08, GigabitEthernet0/0", "output");
      this.addLine("C    10.10.10.0/24 is directly connected, GigabitEthernet0/1", "output");
      this.addLine("C    10.10.20.0/24 is directly connected, GigabitEthernet0/2", "output");
      this.addLine("O IA 10.20.0.0/16 [110/11] via 10.10.10.2, 02:44:19, GigabitEthernet0/1", "output");
      this.addLine("O    10.255.0.0/32 [110/2] via 10.10.10.1, Loopback0", "output");
      this.addLine("B    198.51.100.0/24 [20/0] via 203.0.113.1, 01:10:33", "output");
    } else if (sub.includes('ip int brief') || sub.includes('int brief')) {
      this.addLine("Interface                  IP-Address      OK? Method Status                Protocol", "info");
      this.addLine("GigabitEthernet0/0         203.0.113.2     YES NVRAM  up                    up", "success");
      this.addLine("GigabitEthernet0/1         10.10.10.1      YES NVRAM  up                    up", "success");
      this.addLine("GigabitEthernet0/2         10.10.20.1      YES NVRAM  up                    up", "success");
      this.addLine("GigabitEthernet0/3         unassigned      YES unset  administratively down down", "output");
      this.addLine("Loopback0                  10.255.0.1      YES manual up                    up", "success");
    } else {
      this.addLine(`% Incomplete command: 'show ${args.join(' ')}'. Try 'show ip route' or 'show ip int brief'.`, "warning");
    }
  }

  runPing(target) {
    this.addLine(`PING ${target} (${target}): 56 data bytes`, "info");
    let seq = 0;
    const interval = setInterval(() => {
      seq++;
      const timeMs = (10 + Math.random() * 8).toFixed(1);
      this.addLine(`64 bytes from ${target}: icmp_seq=${seq} ttl=64 time=${timeMs} ms`, "output");
      if (seq >= 4) {
        clearInterval(interval);
        this.addLine(`--- ${target} ping statistics ---`, "info");
        this.addLine("4 packets transmitted, 4 packets received, 0.0% packet loss", "success");
        this.addLine("round-trip min/avg/max = 10.2/14.5/18.1 ms", "output");
      }
    }, 280);
  }

  runTraceroute(target) {
    this.addLine(`traceroute to ${target} (${target}), 30 hops max, 60 byte packets`, "info");
    const hops = [
      ` 1  gateway.local (10.10.10.1)  1.121 ms  0.942 ms  0.880 ms`,
      ` 2  core-rtr01.isp.net (203.0.113.1)  4.321 ms  3.899 ms  4.102 ms`,
      ` 3  as13335.edge.id (103.22.200.1)  12.450 ms  11.890 ms  12.110 ms`,
      ` 4  ${target} (${target})  14.221 ms  13.980 ms  14.050 ms`
    ];
    let hopIndex = 0;
    const interval = setInterval(() => {
      if (hopIndex < hops.length) {
        this.addLine(hops[hopIndex], "output");
        hopIndex++;
      } else {
        clearInterval(interval);
        this.addLine("Trace complete.", "success");
      }
    }, 320);
  }

  escapeHtml(str) {
    return str.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
  }
}

window.NetworkTerminal = NetworkTerminal;
