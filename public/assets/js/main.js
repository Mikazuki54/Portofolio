/**
 * MAIN APPLICATION SCRIPT
 * Network Engineering Portfolio
 */

document.addEventListener('DOMContentLoaded', () => {
  // 1. Initialize Interactive Network Visualizer
  if (window.NetworkTopologyVisualizer) {
    new window.NetworkTopologyVisualizer('network-canvas');
  }

  // 2. Initialize Terminal CLI
  if (window.NetworkTerminal) {
    new window.NetworkTerminal('terminal-window', 'terminal-input', 'terminal-output');
  }

  // 3. Initialize Subnet Calculator
  if (window.SubnetCalculator) {
    new window.SubnetCalculator('calc-ip', 'calc-mask', 'calc-results');
  }

  // 4. Render Skills Section
  renderSkills();

  // 5. Render Projects & Filter Tabs
  renderProjects('all');
  initProjectFilters();

  // 6. Render Certifications
  renderCertifications();

  // 7. Initialize Modal System
  initModal();

  // 8. Navigation & Mobile Menu
  initNavigation();

  // 9. Live Latency Telemetry Simulation
  initTelemetryTicker();

  // 10. Contact Form Handler
  initContactForm();
});

/* ==========================================================================
   RENDER FUNCTIONS
   ========================================================================== */

function renderSkills() {
  const container = document.getElementById('skills-container');
  const data = window.skillsCategories || (typeof skillsCategories !== 'undefined' ? skillsCategories : null);
  if (!container || !data) return;

  container.innerHTML = data.map(cat => `
    <div class="skill-category-card">
      <div class="skill-cat-header">
        <div class="cat-icon">${cat.icon}</div>
        <h3 class="cat-title">${cat.title}</h3>
      </div>
      <div class="skill-items-list">
        ${cat.items.map(skill => `
          <div class="skill-item">
            <div class="skill-info">
              <span class="skill-name">${skill.name}</span>
              <span class="skill-percent">${skill.level}%</span>
            </div>
            <div class="skill-bar-bg">
              <div class="skill-bar-fill" style="width: ${skill.level}%"></div>
            </div>
          </div>
        `).join('')}
      </div>
      <div class="skill-tags-group">
        ${cat.tags.map(tag => `<span class="skill-tag">#${tag}</span>`).join('')}
      </div>
    </div>
  `).join('');
}

function renderProjects(filterCategory = 'all') {
  const container = document.getElementById('projects-container');
  const data = window.projectsData || (typeof projectsData !== 'undefined' ? projectsData : null);
  if (!container || !data) return;

  const filtered = filterCategory === 'all' 
    ? data 
    : data.filter(p => p.category === filterCategory);

  container.innerHTML = filtered.map(p => {
    // Generate a sleek SVG topology diagram illustration per category
    const previewSvg = generateProjectDiagramSvg(p.category);

    return `
      <div class="project-card" data-id="${p.id}">
        <div class="project-preview">
          ${previewSvg}
          <span class="project-category-badge">${p.badge}</span>
        </div>
        <div class="project-body">
          <h3 class="project-title">${p.title}</h3>
          <p class="project-desc">${p.shortDesc}</p>
          <div class="project-tech-tags">
            ${p.tools.map(t => `<span class="tech-tag">${t}</span>`).join('')}
          </div>
          <div class="project-footer">
            <button class="btn-link-action open-project-modal" data-id="${p.id}">
              <span>Periksa Lab & Konfigurasi</span>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
            </button>
          </div>
        </div>
      </div>
    `;
  }).join('');

  // Attach modal listeners
  document.querySelectorAll('.open-project-modal').forEach(btn => {
    btn.addEventListener('click', () => {
      const id = btn.getAttribute('data-id');
      openProjectDetails(id);
    });
  });
}

function generateProjectDiagramSvg(category) {
  if (category === 'iot') {
    return `
      <svg class="project-preview-svg" viewBox="0 0 350 190" xmlns="http://www.w3.org/2000/svg">
        <rect x="25" y="70" width="70" height="45" fill="#0d1426" stroke="#00ff66" stroke-width="2"/>
        <text x="60" y="93" fill="#00ff66" font-size="8" font-family="'Press Start 2P', monospace" text-anchor="middle">ESP32</text>
        <text x="60" y="105" fill="#a4b2d6" font-size="7" font-family="'VT323', monospace" text-anchor="middle">NPK SENSOR</text>

        <line x1="95" y1="92" x2="160" y2="92" stroke="#00f0ff" stroke-width="3" stroke-dasharray="5,5" />
        <text x="127" y="85" fill="#00f0ff" font-size="7" font-family="'Press Start 2P', monospace" text-anchor="middle">LoRa</text>

        <rect x="160" y="70" width="70" height="45" fill="#0d1426" stroke="#00f0ff" stroke-width="2"/>
        <text x="195" y="93" fill="#00f0ff" font-size="8" font-family="'Press Start 2P', monospace" text-anchor="middle">R-Pi</text>
        <text x="195" y="105" fill="#a4b2d6" font-size="7" font-family="'VT323', monospace" text-anchor="middle">GATEWAY</text>

        <line x1="230" y1="92" x2="275" y2="92" stroke="#ffbe0b" stroke-width="3" />
        <text x="252" y="85" fill="#ffbe0b" font-size="7" font-family="'Press Start 2P', monospace" text-anchor="middle">MQTT</text>

        <rect x="275" y="65" width="60" height="55" fill="#0d1426" stroke="#a855f7" stroke-width="2"/>
        <text x="305" y="92" fill="#a855f7" font-size="8" font-family="'Press Start 2P', monospace" text-anchor="middle">CLOUD</text>
        <text x="305" y="106" fill="#a4b2d6" font-size="7" font-family="'VT323', monospace" text-anchor="middle">INFLUXDB</text>
      </svg>
    `;
  } else if (category === 'routing') {
    return `
      <svg class="project-preview-svg" viewBox="0 0 350 190" xmlns="http://www.w3.org/2000/svg">
        <line x1="60" y1="95" x2="175" y2="50" stroke="#00f2fe" stroke-width="2" stroke-dasharray="4,4" />
        <line x1="60" y1="95" x2="175" y2="140" stroke="#00f2fe" stroke-width="2" stroke-dasharray="4,4" />
        <line x1="175" y1="50" x2="290" y2="95" stroke="#3b82f6" stroke-width="2" />
        <line x1="175" y1="140" x2="290" y2="95" stroke="#3b82f6" stroke-width="2" />
        <line x1="175" y1="50" x2="175" y2="140" stroke="#10b981" stroke-width="2" />
        
        <circle cx="60" cy="95" r="16" fill="#0f172a" stroke="#00f2fe" stroke-width="2"/>
        <text x="60" y="99" fill="#00f2fe" font-size="9" font-family="monospace" text-anchor="middle">ISP-R1</text>
        
        <circle cx="175" cy="50" r="18" fill="#0f172a" stroke="#3b82f6" stroke-width="2"/>
        <text x="175" y="54" fill="#3b82f6" font-size="9" font-family="monospace" text-anchor="middle">CORE-A</text>
        
        <circle cx="175" cy="140" r="18" fill="#0f172a" stroke="#3b82f6" stroke-width="2"/>
        <text x="175" y="144" fill="#3b82f6" font-size="9" font-family="monospace" text-anchor="middle">CORE-B</text>
        
        <circle cx="290" cy="95" r="16" fill="#0f172a" stroke="#10b981" stroke-width="2"/>
        <text x="290" y="99" fill="#10b981" font-size="9" font-family="monospace" text-anchor="middle">DIST-SW</text>
      </svg>
    `;
  } else if (category === 'security') {
    return `
      <svg class="project-preview-svg" viewBox="0 0 350 190" xmlns="http://www.w3.org/2000/svg">
        <rect x="30" y="75" width="60" height="40" rx="6" fill="#0f172a" stroke="#38bdf8" stroke-width="1.5"/>
        <text x="60" y="99" fill="#38bdf8" font-size="9" font-family="monospace" text-anchor="middle">WAN / Untrusted</text>
        
        <line x1="90" y1="95" x2="145" y2="95" stroke="#ef4444" stroke-width="2" />
        
        <polygon points="175,60 205,95 175,130 145,95" fill="#1e1b4b" stroke="#ef4444" stroke-width="2"/>
        <text x="175" y="99" fill="#f87171" font-size="9" font-family="monospace" text-anchor="middle">FIREWALL</text>
        
        <line x1="205" y1="80" x2="260" y2="55" stroke="#f59e0b" stroke-width="2" stroke-dasharray="3,3" />
        <line x1="205" y1="110" x2="260" y2="135" stroke="#10b981" stroke-width="2" />
        
        <rect x="260" y="35" width="65" height="35" rx="4" fill="#0f172a" stroke="#f59e0b" stroke-width="1.5"/>
        <text x="292" y="56" fill="#f59e0b" font-size="8" font-family="monospace" text-anchor="middle">DMZ Web/DNS</text>
        
        <rect x="260" y="115" width="65" height="35" rx="4" fill="#0f172a" stroke="#10b981" stroke-width="1.5"/>
        <text x="292" y="136" fill="#10b981" font-size="8" font-family="monospace" text-anchor="middle">Secure LAN</text>
      </svg>
    `;
  } else if (category === 'automation') {
    return `
      <svg class="project-preview-svg" viewBox="0 0 350 190" xmlns="http://www.w3.org/2000/svg">
        <circle cx="70" cy="95" r="22" fill="#0f172a" stroke="#8b5cf6" stroke-width="2"/>
        <text x="70" y="99" fill="#c084fc" font-size="9" font-family="monospace" text-anchor="middle">Python/Ansible</text>
        
        <path d="M 92 95 Q 150 45 220 45" stroke="#8b5cf6" stroke-width="2" fill="none" stroke-dasharray="4,4"/>
        <path d="M 92 95 L 220 95" stroke="#8b5cf6" stroke-width="2" fill="none" stroke-dasharray="4,4"/>
        <path d="M 92 95 Q 150 145 220 145" stroke="#8b5cf6" stroke-width="2" fill="none" stroke-dasharray="4,4"/>
        
        <rect x="220" y="30" width="75" height="30" rx="4" fill="#0f172a" stroke="#00f2fe" stroke-width="1.5"/>
        <text x="257" y="49" fill="#00f2fe" font-size="8" font-family="monospace" text-anchor="middle">Router-01 (SSH)</text>
        
        <rect x="220" y="80" width="75" height="30" rx="4" fill="#0f172a" stroke="#00f2fe" stroke-width="1.5"/>
        <text x="257" y="99" fill="#00f2fe" font-size="8" font-family="monospace" text-anchor="middle">Router-02 (SSH)</text>
        
        <rect x="220" y="130" width="75" height="30" rx="4" fill="#0f172a" stroke="#00f2fe" stroke-width="1.5"/>
        <text x="257" y="149" fill="#00f2fe" font-size="8" font-family="monospace" text-anchor="middle">Router-25 (SSH)</text>
      </svg>
    `;
  } else {
    // Monitoring / Default
    return `
      <svg class="project-preview-svg" viewBox="0 0 350 190" xmlns="http://www.w3.org/2000/svg">
        <path d="M 20 120 L 70 120 L 95 60 L 115 150 L 135 90 L 155 120 L 210 120 L 235 40 L 255 140 L 275 100 L 330 100" stroke="#10b981" stroke-width="2" fill="none" />
        <circle cx="95" cy="60" r="4" fill="#10b981"/>
        <circle cx="235" cy="40" r="4" fill="#00f2fe"/>
        <text x="175" y="170" fill="#94a3b8" font-size="9" font-family="monospace" text-anchor="middle">SNMPv3 Telemetry Polling (Every 10s)</text>
      </svg>
    `;
  }
}

function initProjectFilters() {
  const filterBtns = document.querySelectorAll('.filter-btn');
  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      const cat = btn.getAttribute('data-filter');
      renderProjects(cat);
    });
  });
}

function renderCertifications() {
  const container = document.getElementById('certs-container');
  const data = window.certsData || (typeof certsData !== 'undefined' ? certsData : null);
  if (!container || !data) return;

  container.innerHTML = data.map(c => `
    <div class="cert-card">
      <div class="cert-header">
        <div>
          <span class="cert-issuer">${c.issuer}</span>
          <h3 class="cert-title">${c.name}</h3>
        </div>
        <span class="cert-status ${c.status}">${c.statusText}</span>
      </div>
      <p class="cert-desc">${c.desc}</p>
    </div>
  `).join('');
}

/* ==========================================================================
   MODAL INSPECTOR
   ========================================================================== */

function initModal() {
  const backdrop = document.getElementById('project-modal');
  const closeBtn = document.getElementById('modal-close-btn');

  if (!backdrop) return;

  const closeModal = () => backdrop.classList.remove('active');

  if (closeBtn) closeBtn.addEventListener('click', closeModal);
  backdrop.addEventListener('click', (e) => {
    if (e.target === backdrop) closeModal();
  });

  window.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && backdrop.classList.contains('active')) {
      closeModal();
    }
  });
}

function openProjectDetails(projectId) {
  const data = window.projectsData || (typeof projectsData !== 'undefined' ? projectsData : []);
  const project = data.find(p => p.id === projectId);
  if (!project) return;

  const modal = document.getElementById('project-modal');
  const titleElem = document.getElementById('modal-project-title');
  const bodyElem = document.getElementById('modal-project-body');

  if (!modal || !titleElem || !bodyElem) return;

  titleElem.textContent = project.title;

  bodyElem.innerHTML = `
    <div style="display: flex; flex-direction: column; gap: 1.5rem;">
      <div style="background: rgba(0, 242, 254, 0.05); border: 1px solid var(--border-accent); border-radius: var(--radius-md); padding: 1.25rem;">
        <h4 style="font-size: 0.95rem; color: var(--cyan-primary); margin-bottom: 0.5rem; font-family: var(--font-mono);">Ringkasan Arsitektur</h4>
        <p style="font-size: 0.95rem; line-height: 1.6; color: var(--text-main);">${project.shortDesc}</p>
      </div>

      <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 1rem;">
        <div style="background: rgba(255, 255, 255, 0.02); border: 1px solid var(--border-subtle); padding: 1rem; border-radius: var(--radius-sm);">
          <div style="font-size: 0.75rem; color: var(--text-dim); font-family: var(--font-mono);">PERANGKAT & TOPOLOGI</div>
          <div style="font-size: 0.85rem; color: #fff; font-weight: 600; margin-top: 0.35rem;">${project.specs.devices}</div>
        </div>
        <div style="background: rgba(255, 255, 255, 0.02); border: 1px solid var(--border-subtle); padding: 1rem; border-radius: var(--radius-sm);">
          <div style="font-size: 0.75rem; color: var(--text-dim); font-family: var(--font-mono);">PROTOKOL UTAMA</div>
          <div style="font-size: 0.85rem; color: var(--cyan-primary); font-family: var(--font-mono); margin-top: 0.35rem;">${project.specs.protocols}</div>
        </div>
        <div style="background: rgba(255, 255, 255, 0.02); border: 1px solid var(--border-subtle); padding: 1rem; border-radius: var(--radius-sm);">
          <div style="font-size: 0.75rem; color: var(--text-dim); font-family: var(--font-mono);">METRIK KEBERHASILAN</div>
          <div style="font-size: 0.85rem; color: var(--green-online); margin-top: 0.35rem;">${project.specs.uptimeGoal}</div>
        </div>
      </div>

      <div>
        <h4 style="font-size: 1rem; margin-bottom: 0.75rem;">Key Engineering Highlights:</h4>
        <ul style="display: flex; flex-direction: column; gap: 0.5rem;">
          ${project.highlights.map(h => `
            <li style="display: flex; gap: 0.6rem; font-size: 0.9rem; color: var(--text-muted);">
              <span style="color: var(--cyan-primary);">✔</span>
              <span>${h}</span>
            </li>
          `).join('')}
        </ul>
      </div>

      <div>
        <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 0.5rem;">
          <h4 style="font-size: 0.9rem; font-family: var(--font-mono); color: var(--cyan-primary);">Contoh Konfigurasi / Script Terverifikasi:</h4>
          <span style="font-size: 0.75rem; color: var(--text-dim); font-family: var(--font-mono);">Verified Lab Syntax</span>
        </div>
        <pre style="background: #060910; border: 1px solid var(--border-subtle); border-radius: var(--radius-md); padding: 1rem; font-family: var(--font-mono); font-size: 0.8rem; color: #a7f3d0; overflow-x: auto; line-height: 1.5;"><code>${escapeHtml(project.configSnippet)}</code></pre>
      </div>
    </div>
  `;

  modal.classList.add('active');
}

/* ==========================================================================
   NAVIGATION & TELEMETRY
   ========================================================================== */

function initNavigation() {
  const toggleBtn = document.querySelector('.mobile-menu-toggle');
  const navLinks = document.querySelector('.nav-links');

  if (toggleBtn && navLinks) {
    toggleBtn.addEventListener('click', () => {
      navLinks.classList.toggle('mobile-active');
    });

    document.querySelectorAll('.nav-link').forEach(link => {
      link.addEventListener('click', () => {
        navLinks.classList.remove('mobile-active');
      });
    });
  }

  // Active section indicator on scroll
  const sections = document.querySelectorAll('section[id]');
  window.addEventListener('scroll', () => {
    const scrollY = window.pageYOffset;
    sections.forEach(current => {
      const sectionHeight = current.offsetHeight;
      const sectionTop = current.offsetTop - 120;
      const sectionId = current.getAttribute('id');
      const navItem = document.querySelector(`.nav-link[href*="${sectionId}"]`);

      if (navItem) {
        if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
          navItem.classList.add('active');
        } else {
          navItem.classList.remove('active');
        }
      }
    });
  });
}

function initTelemetryTicker() {
  const latencyBadge = document.getElementById('live-latency-ticker');
  if (!latencyBadge) return;

  setInterval(() => {
    const randomLatency = Math.floor(10 + Math.random() * 8);
    latencyBadge.textContent = `${randomLatency}ms`;
  }, 2500);
}

function initContactForm() {
  const form = document.getElementById('contact-form');
  if (!form) return;

  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    const name = document.getElementById('form-name').value;
    const email = document.getElementById('form-email').value;
    const subject = document.getElementById('form-subject').value;
    const message = document.getElementById('form-message').value;
    const csrfToken = document.querySelector('meta[name="csrf-token"]')?.getAttribute('content');

    const submitBtn = form.querySelector('button[type="submit"]');
    if (submitBtn) {
      submitBtn.disabled = true;
      submitBtn.innerHTML = '<span>Mentransmisikan...</span>';
    }

    try {
      const response = await fetch(form.action || '/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'X-CSRF-TOKEN': csrfToken || '',
          'Accept': 'application/json'
        },
        body: JSON.stringify({ name, email, subject, message })
      });

      if (response.ok) {
        const data = await response.json();
        showToast(data.message || `Pesan dari ${name} berhasil dikirim ke antrean NOC!`, 'success');
        form.reset();
      } else {
        showToast(`Pesan berhasil dicatat secara lokal (Simulasi NOC).`, 'info');
        form.reset();
      }
    } catch (err) {
      showToast(`Pesan dari ${name} (${email}) berhasil dicatat.`, 'success');
      form.reset();
    } finally {
      if (submitBtn) {
        submitBtn.disabled = false;
        submitBtn.innerHTML = `
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="22" y1="2" x2="11" y2="13"/><polygon points="22 2 15 22 11 13 2 9 22 2"/></svg>
          <span>Transmisikan Pesan</span>
        `;
      }
    }
  });
}

function showToast(message, type = 'info') {
  let container = document.querySelector('.toast-container');
  if (!container) {
    container = document.createElement('div');
    container.className = 'toast-container';
    document.body.appendChild(container);
  }

  const toast = document.createElement('div');
  toast.className = `toast toast-${type}`;
  toast.innerHTML = `
    <span style="color: var(--cyan-primary);">⚡</span>
    <span>${message}</span>
  `;

  container.appendChild(toast);

  setTimeout(() => {
    toast.style.opacity = '0';
    toast.style.transform = 'translateX(100%)';
    toast.style.transition = 'all 0.3s ease';
    setTimeout(() => toast.remove(), 300);
  }, 4000);
}

function escapeHtml(str) {
  return str.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
}
