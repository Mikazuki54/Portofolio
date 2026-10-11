<!DOCTYPE html>
<html lang="id">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>@yield('title', 'Nicky Tirta Putra Nugroho | Networking & IoT Student Portfolio')</title>
  <meta name="description" content="Web portofolio personal Nicky Tirta Putra Nugroho — Mahasiswa peminatan Computer Networking dan Internet of Things (IoT).">
  <meta name="keywords" content="Nicky Tirta Putra Nugroho, LinkedIn Nicky Tirta, Networking, IoT, ESP32, Cisco, VLAN, MQTT, Arduino, Python, Portofolio Mahasiswa">
  <meta name="author" content="Nicky Tirta Putra Nugroho">

  <!-- Google Fonts: Press Start 2P, Silkscreen, VT323, Inter & JetBrains Mono -->
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Press+Start+2P&family=Silkscreen:wght@400;700&family=VT323&family=Inter:wght@400;500;600;700&family=JetBrains+Mono:wght@400;500;700&display=swap" rel="stylesheet">

  <!-- Application Stylesheet -->
  <link rel="stylesheet" href="{{ asset('assets/css/style.css') }}">
</head>
<body>

  <!-- Top Navigation Bar -->
  @include('components.navbar')

  <main>
    @yield('content')
  </main>

  <!-- 8-Bit Retro Footer -->
  <footer class="footer">
    <div class="container footer-content">
      <div style="display: flex; align-items: center; gap: 0.75rem;">
        <span class="brand-icon">👾</span>
        <span style="font-family: var(--font-pixel); font-weight: 700; font-size: 0.75rem; color: #fff;">
          NICKY TIRTA PUTRA NUGROHO
        </span>
        <span style="font-size: 0.8rem; color: var(--text-dim);">— NETWORKING &amp; IOT SPECIALIST</span>
      </div>

      <div class="footer-telemetry">
        <a href="{{ $profile['linkedin'] ?? 'https://www.linkedin.com/in/nicky-tirta-putra-nugroho-78454921b/' }}" target="_blank" rel="noopener noreferrer" style="color: var(--pixel-cyan); text-decoration: underline;">
          🔗 linkedin.com/in/nicky-tirta-putra-nugroho
        </a>
      </div>

      <div>
        <span style="font-family: var(--font-pixel); font-size: 0.65rem; color: var(--text-dim);">
          © {{ date('Y') }} // RETRO PIXEL PORTFOLIO
        </span>
      </div>
    </div>
  </footer>

  <!-- Simple Vanilla Script for smooth interactions -->
  <script>
    document.addEventListener('DOMContentLoaded', () => {
      // Mobile menu toggle
      const toggle = document.querySelector('.mobile-menu-toggle');
      const navLinks = document.querySelector('.nav-links');
      if (toggle && navLinks) {
        toggle.addEventListener('click', () => {
          navLinks.classList.toggle('mobile-active');
        });
        document.querySelectorAll('.nav-link').forEach(link => {
          link.addEventListener('click', () => navLinks.classList.remove('mobile-active'));
        });
      }

      // Smooth scroll active highlight
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
    });
  </script>
</body>
</html>
