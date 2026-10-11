/**
 * 8-BIT RETRO PIXEL NETWORK & IOT TOPOLOGY CANVAS
 * Visualizes dynamic telemetry packet flow: IoT Sensors -> Gateway -> Router -> MQTT Cloud Broker
 */

class NetworkTopologyVisualizer {
  constructor(canvasId) {
    this.canvas = document.getElementById(canvasId);
    if (!this.canvas) return;
    this.ctx = this.canvas.getContext('2d');
    this.packets = [];
    this.hoveredNode = null;
    this.lastPacketTime = 0;
    this.packetInterval = 750; // ms
    this.animationId = null;

    // Define 8-Bit Network & IoT Nodes
    this.nodes = [
      { id: 'sensor1', name: 'ESP32 Soil Node', type: 'sensor', ip: '10.50.0.11', color: '#00ff66', xRatio: 0.12, yRatio: 0.25, size: 26 },
      { id: 'sensor2', name: 'LoRa Buoy Telemetry', type: 'sensor', ip: '10.50.0.12', color: '#00ff66', xRatio: 0.12, yRatio: 0.72, size: 26 },
      { id: 'gateway', name: 'Edge-Pi Gateway', type: 'gateway', ip: '10.50.0.1', color: '#00f0ff', xRatio: 0.35, yRatio: 0.48, size: 30 },
      { id: 'switch', name: 'Cisco SW (VLAN 50)', type: 'switch', ip: '10.10.10.2', color: '#ffbe0b', xRatio: 0.58, yRatio: 0.32, size: 30 },
      { id: 'firewall', name: 'pfSense VPN FW', type: 'firewall', ip: '203.0.113.2', color: '#ff3366', xRatio: 0.58, yRatio: 0.75, size: 28 },
      { id: 'mqtt', name: 'Mosquitto Broker', type: 'broker', ip: '192.168.10.20', color: '#a855f7', xRatio: 0.84, yRatio: 0.25, size: 28 },
      { id: 'cloud', name: 'Cloud InfluxDB', type: 'cloud', ip: 'Cloud WAN', color: '#3a86ff', xRatio: 0.84, yRatio: 0.72, size: 30 }
    ];

    // Define Links
    this.links = [
      { from: 'sensor1', to: 'gateway', label: 'ESP-NOW / LoRa', color: '#00ff66' },
      { from: 'sensor2', to: 'gateway', label: 'LoRaWAN 915MHz', color: '#00ff66' },
      { from: 'gateway', to: 'switch', label: 'Ethernet Trunk', color: '#00f0ff' },
      { from: 'switch', to: 'mqtt', label: 'MQTT TCP:1883', color: '#ffbe0b' },
      { from: 'switch', to: 'firewall', label: 'VLAN 50 to DMZ', color: '#ff3366' },
      { from: 'firewall', to: 'cloud', label: 'WireGuard Tunnel', color: '#3a86ff' },
      { from: 'mqtt', to: 'cloud', label: 'InfluxDB Bridge', color: '#a855f7' }
    ];

    this.init();
  }

  init() {
    this.resize();
    window.addEventListener('resize', () => this.resize());
    
    this.canvas.addEventListener('mousemove', (e) => this.handleMouseMove(e));
    this.canvas.addEventListener('mouseleave', () => { this.hoveredNode = null; });
    this.canvas.addEventListener('click', () => this.burstTelemetry());

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
      const half = node.size / 2 + 4;
      if (Math.abs(node.x - mouseX) <= half && Math.abs(node.y - mouseY) <= half) {
        found = node;
        break;
      }
    }
    this.hoveredNode = found;
    this.canvas.style.cursor = found ? 'pointer' : 'default';
  }

  spawnPacket(fromNodeId, toNodeId, speed = 0.015, color = '#00f0ff') {
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
      size: 6
    });
  }

  burstTelemetry() {
    this.spawnPacket('sensor1', 'gateway', 0.025, '#00ff66');
    this.spawnPacket('sensor2', 'gateway', 0.025, '#00ff66');
    setTimeout(() => this.spawnPacket('gateway', 'switch', 0.025, '#00f0ff'), 180);
    setTimeout(() => {
      this.spawnPacket('switch', 'mqtt', 0.025, '#ffbe0b');
      this.spawnPacket('switch', 'firewall', 0.025, '#ff3366');
    }, 360);
    setTimeout(() => this.spawnPacket('firewall', 'cloud', 0.025, '#3a86ff'), 540);
  }

  update(timestamp) {
    if (timestamp - this.lastPacketTime > this.packetInterval) {
      const rnd = Math.random();
      if (rnd < 0.4) {
        this.spawnPacket('sensor1', 'gateway', 0.018, '#00ff66');
      } else if (rnd < 0.7) {
        this.spawnPacket('sensor2', 'gateway', 0.018, '#00ff66');
      } else {
        const link = this.links[Math.floor(Math.random() * this.links.length)];
        this.spawnPacket(link.from, link.to, 0.018, link.color);
      }
      this.lastPacketTime = timestamp;
      this.packetInterval = 550 + Math.random() * 600;
    }

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

    // Draw 8-Bit Pixel Cables (Stepped / Pixel lines)
    this.links.forEach(link => {
      const from = this.nodes.find(n => n.id === link.from);
      const to = this.nodes.find(n => n.id === link.to);
      if (!from || !to) return;

      this.ctx.strokeStyle = 'rgba(0, 240, 255, 0.2)';
      this.ctx.lineWidth = 2;
      this.ctx.setLineDash([4, 4]);
      this.ctx.beginPath();
      this.ctx.moveTo(Math.round(from.x), Math.round(from.y));
      this.ctx.lineTo(Math.round(to.x), Math.round(to.y));
      this.ctx.stroke();
      this.ctx.setLineDash([]);
    });

    // Draw In-Transit Pixel Square Packets
    this.packets.forEach(p => {
      const curX = Math.round(p.startX + (p.endX - p.startX) * p.progress);
      const curY = Math.round(p.startY + (p.endY - p.startY) * p.progress);

      this.ctx.fillStyle = p.color;
      this.ctx.fillRect(curX - p.size / 2, curY - p.size / 2, p.size, p.size);
      this.ctx.strokeStyle = '#000';
      this.ctx.lineWidth = 1;
      this.ctx.strokeRect(curX - p.size / 2, curY - p.size / 2, p.size, p.size);
    });

    // Draw 8-Bit Square Pixel Nodes
    this.nodes.forEach(node => {
      const isHovered = this.hoveredNode && this.hoveredNode.id === node.id;
      const size = isHovered ? node.size + 6 : node.size;
      const half = size / 2;
      const nx = Math.round(node.x - half);
      const ny = Math.round(node.y - half);

      // Black Outer Drop Shadow
      this.ctx.fillStyle = '#000000';
      this.ctx.fillRect(nx + 3, ny + 3, size, size);

      // Node Body
      this.ctx.fillStyle = '#0d1326';
      this.ctx.fillRect(nx, ny, size, size);

      // Bezel Border
      this.ctx.strokeStyle = isHovered ? '#ffffff' : node.color;
      this.ctx.lineWidth = 2;
      this.ctx.strokeRect(nx, ny, size, size);

      // Pixel Icon Symbol
      this.ctx.fillStyle = node.color;
      this.ctx.font = '8px "Press Start 2P", monospace';
      this.ctx.textAlign = 'center';
      this.ctx.textBaseline = 'middle';
      
      let sym = '●';
      if (node.type === 'sensor') sym = 'SEN';
      else if (node.type === 'gateway') sym = 'GW';
      else if (node.type === 'switch') sym = 'SW';
      else if (node.type === 'firewall') sym = 'FW';
      else if (node.type === 'broker') sym = 'MQ';
      else if (node.type === 'cloud') sym = 'CLD';

      this.ctx.fillText(sym, node.x, node.y);

      // Node Label Below
      this.ctx.fillStyle = isHovered ? '#00f0ff' : '#9aa8cc';
      this.ctx.font = '7px "Press Start 2P", monospace';
      this.ctx.fillText(node.name, node.x, node.y + half + 12);

      // IP / Protocol Telemetry
      this.ctx.fillStyle = '#62729c';
      this.ctx.font = '9px "VT323", monospace';
      this.ctx.fillText(node.ip, node.x, node.y + half + 23);
    });

    // Retro Pixel Tooltip on Hover
    if (this.hoveredNode) {
      const h = this.hoveredNode;
      const tipText = `[ ${h.name.toUpperCase()} // IP: ${h.ip} // STATUS: ONLINE ]`;
      
      this.ctx.font = '8px "Press Start 2P", monospace';
      const textWidth = this.ctx.measureText(tipText).width + 16;
      const bx = Math.min(Math.max(h.x - textWidth / 2, 8), this.width - textWidth - 8);
      const by = Math.max(h.y - 38, 8);

      this.ctx.fillStyle = '#000000';
      this.ctx.fillRect(bx + 2, by + 2, textWidth, 22);

      this.ctx.fillStyle = '#10162b';
      this.ctx.fillRect(bx, by, textWidth, 22);
      this.ctx.strokeStyle = '#00f0ff';
      this.ctx.lineWidth = 2;
      this.ctx.strokeRect(bx, by, textWidth, 22);

      this.ctx.fillStyle = '#00f0ff';
      this.ctx.textAlign = 'center';
      this.ctx.textBaseline = 'middle';
      this.ctx.fillText(tipText, bx + textWidth / 2, by + 11);
    }
  }

  animate(timestamp = 0) {
    this.update(timestamp);
    this.draw();
    this.animationId = requestAnimationFrame((t) => this.animate(t));
  }
}

window.NetworkTopologyVisualizer = NetworkTopologyVisualizer;
