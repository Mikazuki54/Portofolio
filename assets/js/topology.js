/**
 * INTERACTIVE NETWORK TOPOLOGY CANVAS
 * Visualizes dynamic packet flow, nodes (Routers, Switches, Firewalls, Cloud)
 */

class NetworkTopologyVisualizer {
  constructor(canvasId) {
    this.canvas = document.getElementById(canvasId);
    if (!this.canvas) return;
    this.ctx = this.canvas.getContext('2d');
    this.packets = [];
    this.hoveredNode = null;
    this.lastPacketTime = 0;
    this.packetInterval = 900; // ms
    this.animationId = null;

    // Define Network Nodes
    this.nodes = [
      { id: 'cloud', name: 'ISP / Cloud', type: 'cloud', ip: '203.0.113.1', color: '#38bdf8', xRatio: 0.15, yRatio: 0.35, radius: 22 },
      { id: 'fw', name: 'Edge-FW01 (pfSense)', type: 'firewall', ip: '203.0.113.2', color: '#ef4444', xRatio: 0.35, yRatio: 0.35, radius: 20 },
      { id: 'r1', name: 'Core-RTR01 (OSPF/BGP)', type: 'router', ip: '10.255.0.1', color: '#00f2fe', xRatio: 0.55, yRatio: 0.35, radius: 24 },
      { id: 'sw1', name: 'Dist-SW01 (802.1Q)', type: 'switch', ip: '10.10.10.2', color: '#10b981', xRatio: 0.78, yRatio: 0.22, radius: 18 },
      { id: 'sw2', name: 'Dist-SW02 (HSRP)', type: 'switch', ip: '10.10.20.2', color: '#10b981', xRatio: 0.78, yRatio: 0.55, radius: 18 },
      { id: 'dmz', name: 'DMZ Web Server', type: 'server', ip: '192.168.100.10', color: '#f59e0b', xRatio: 0.45, yRatio: 0.75, radius: 17 },
      { id: 'clients', name: 'Host LAN /24', type: 'client', ip: '10.10.10.100', color: '#a855f7', xRatio: 0.92, yRatio: 0.38, radius: 16 }
    ];

    // Define Network Links (Cable connections)
    this.links = [
      { from: 'cloud', to: 'fw', label: 'BGP / 1Gbps', active: true },
      { from: 'fw', to: 'r1', label: 'Trunk / 10Gbps', active: true },
      { from: 'r1', to: 'sw1', label: 'OSPF Area 0', active: true },
      { from: 'r1', to: 'sw2', label: 'HSRP Standby', active: true },
      { from: 'sw1', to: 'sw2', label: 'EtherChannel LACP', active: true },
      { from: 'r1', to: 'dmz', label: 'VLAN 100 DMZ', active: true },
      { from: 'sw1', to: 'clients', label: 'Access VLAN 10', active: true },
      { from: 'sw2', to: 'clients', label: 'Redundant Link', active: true }
    ];

    this.init();
  }

  init() {
    this.resize();
    window.addEventListener('resize', () => this.resize());
    
    // Mouse hover detection
    this.canvas.addEventListener('mousemove', (e) => this.handleMouseMove(e));
    this.canvas.addEventListener('mouseleave', () => { this.hoveredNode = null; });
    
    // Click triggers manual ICMP ping burst
    this.canvas.addEventListener('click', () => this.burstPing());

    this.animate();
  }

  resize() {
    const rect = this.canvas.getBoundingClientRect();
    const dpr = window.devicePixelRatio || 1;
    this.width = rect.width;
    this.height = rect.height;
    this.canvas.width = this.width * dpr;
    this.canvas.height = this.height * dpr;
    this.ctx.scale(dpr, dpr);

    // Update actual node coordinates based on container size
    this.nodes.forEach(node => {
      node.x = this.width * node.xRatio;
      node.y = this.height * node.yRatio;
    });
  }

  handleMouseMove(e) {
    const rect = this.canvas.getBoundingClientRect();
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;

    let found = null;
    for (const node of this.nodes) {
      const dist = Math.hypot(node.x - mouseX, node.y - mouseY);
      if (dist <= node.radius + 6) {
        found = node;
        break;
      }
    }
    this.hoveredNode = found;
    this.canvas.style.cursor = found ? 'pointer' : 'default';
  }

  spawnPacket(fromNodeId, toNodeId, speed = 0.012, color = '#00f2fe') {
    const fromNode = this.nodes.find(n => n.id === fromNodeId);
    const toNode = this.nodes.find(n => n.id === toNodeId);
    if (!fromNode || !toNode) return;

    this.packets.push({
      startX: fromNode.x,
      startY: fromNode.y,
      endX: toNode.x,
      endY: toNode.y,
      progress: 0,
      speed: speed + Math.random() * 0.005,
      color: color,
      size: 3.5
    });
  }

  burstPing() {
    // Generate burst from cloud to clients
    this.spawnPacket('cloud', 'fw', 0.02, '#10b981');
    setTimeout(() => this.spawnPacket('fw', 'r1', 0.02, '#10b981'), 150);
    setTimeout(() => this.spawnPacket('r1', 'sw1', 0.02, '#10b981'), 300);
    setTimeout(() => this.spawnPacket('sw1', 'clients', 0.02, '#10b981'), 450);
  }

  update(timestamp) {
    // Periodically spawn random packets
    if (timestamp - this.lastPacketTime > this.packetInterval) {
      const randomLink = this.links[Math.floor(Math.random() * this.links.length)];
      const isReverse = Math.random() > 0.5;
      const from = isReverse ? randomLink.to : randomLink.from;
      const to = isReverse ? randomLink.from : randomLink.to;
      this.spawnPacket(from, to);
      this.lastPacketTime = timestamp;
      this.packetInterval = 500 + Math.random() * 800;
    }

    // Update packets
    for (let i = this.packets.length - 1; i >= 0; i--) {
      const p = this.packets[i];
      p.progress += p.speed;
      if (p.progress >= 1) {
        this.packets.splice(i, 1);
      }
    }
  }

  draw() {
    this.ctx.clearRect(0, 0, this.width, this.height);

    // Draw Links (Lines)
    this.links.forEach(link => {
      const fromNode = this.nodes.find(n => n.id === link.from);
      const toNode = this.nodes.find(n => n.id === link.to);
      if (!fromNode || !toNode) return;

      this.ctx.beginPath();
      this.ctx.moveTo(fromNode.x, fromNode.y);
      this.ctx.lineTo(toNode.x, toNode.y);
      this.ctx.strokeStyle = 'rgba(0, 242, 254, 0.15)';
      this.ctx.lineWidth = 1.5;
      this.ctx.setLineDash([4, 4]);
      this.ctx.stroke();
      this.ctx.setLineDash([]);
    });

    // Draw In-Transit Packets
    this.packets.forEach(p => {
      const curX = p.startX + (p.endX - p.startX) * p.progress;
      const curY = p.startY + (p.endY - p.startY) * p.progress;

      // Glow tail
      this.ctx.shadowBlur = 10;
      this.ctx.shadowColor = p.color;
      this.ctx.beginPath();
      this.ctx.arc(curX, curY, p.size, 0, Math.PI * 2);
      this.ctx.fillStyle = p.color;
      this.ctx.fill();
      this.ctx.shadowBlur = 0;
    });

    // Draw Nodes
    this.nodes.forEach(node => {
      const isHovered = this.hoveredNode && this.hoveredNode.id === node.id;
      const radius = isHovered ? node.radius + 4 : node.radius;

      // Outer glow circle
      this.ctx.beginPath();
      this.ctx.arc(node.x, node.y, radius + 5, 0, Math.PI * 2);
      this.ctx.fillStyle = isHovered ? 'rgba(0, 242, 254, 0.25)' : 'rgba(255, 255, 255, 0.03)';
      this.ctx.fill();

      // Node Body
      this.ctx.beginPath();
      this.ctx.arc(node.x, node.y, radius, 0, Math.PI * 2);
      this.ctx.fillStyle = '#0f172a';
      this.ctx.strokeStyle = node.color;
      this.ctx.lineWidth = isHovered ? 2.5 : 1.8;
      this.ctx.fill();
      this.ctx.stroke();

      // Icon Center Symbol
      this.ctx.fillStyle = node.color;
      this.ctx.font = '10px JetBrains Mono, monospace';
      this.ctx.textAlign = 'center';
      this.ctx.textBaseline = 'middle';
      
      let symbol = '●';
      if (node.type === 'router') symbol = 'RTR';
      else if (node.type === 'switch') symbol = 'SW';
      else if (node.type === 'firewall') symbol = 'FW';
      else if (node.type === 'cloud') symbol = 'WAN';
      else if (node.type === 'server') symbol = 'SRV';
      else if (node.type === 'client') symbol = 'LAN';
      
      this.ctx.fillText(symbol, node.x, node.y);

      // Label Below
      this.ctx.fillStyle = isHovered ? '#00f2fe' : '#94a3b8';
      this.ctx.font = '10px Inter, sans-serif';
      this.ctx.fillText(node.name, node.x, node.y + radius + 14);

      // IP Address
      this.ctx.fillStyle = '#64748b';
      this.ctx.font = '9px JetBrains Mono, monospace';
      this.ctx.fillText(node.ip, node.x, node.y + radius + 25);
    });

    // Tooltip if hovered
    if (this.hoveredNode) {
      const h = this.hoveredNode;
      const text = `${h.name} | IP: ${h.ip} | State: UP`;
      this.ctx.fillStyle = 'rgba(7, 10, 16, 0.9)';
      this.ctx.strokeStyle = 'rgba(0, 242, 254, 0.5)';
      this.ctx.lineWidth = 1;
      
      const width = this.ctx.measureText(text).width + 20;
      const boxX = Math.min(Math.max(h.x - width / 2, 10), this.width - width - 10);
      const boxY = Math.max(h.y - 42, 10);

      this.ctx.beginPath();
      this.ctx.roundRect(boxX, boxY, width, 24, 4);
      this.ctx.fill();
      this.ctx.stroke();

      this.ctx.fillStyle = '#00f2fe';
      this.ctx.font = '10px JetBrains Mono, monospace';
      this.ctx.textAlign = 'center';
      this.ctx.textBaseline = 'middle';
      this.ctx.fillText(text, boxX + width / 2, boxY + 12);
    }
  }

  animate(timestamp = 0) {
    this.update(timestamp);
    this.draw();
    this.animationId = requestAnimationFrame((t) => this.animate(t));
  }
}

window.NetworkTopologyVisualizer = NetworkTopologyVisualizer;
