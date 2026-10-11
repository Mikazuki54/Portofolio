<section id="skills" class="section">
  <div class="container">
    <div class="section-header">
      <span class="section-tag">[ SKILL TREE // DAFTAR KEAHLIAN ]</span>
      <h2 class="section-title">Keahlian &amp; <span class="highlight">Kompetensi Teknis</span></h2>
      <p class="section-subtitle">
        Kumpulan keahlian dalam bidang Computer Networking, Internet of Things (IoT), dan pemrograman pendukung.
      </p>
    </div>

    <div class="skills-categories">
      @foreach($skillCategories ?? [] as $category)
        <div class="skill-category-card">
          <div class="skill-cat-header">
            <div class="cat-icon">{{ $category['icon'] }}</div>
            <div>
              <h3 class="cat-title">{{ $category['title'] }}</h3>
              <p style="font-size: 0.8rem; color: var(--text-dim); margin-top: 0.2rem;">
                {{ $category['description'] }}
              </p>
            </div>
          </div>

          <div class="skill-items-list">
            @foreach($category['skills'] as $skill)
              <div class="skill-item">
                <div class="skill-info">
                  <span class="skill-name">{{ $skill['name'] }}</span>
                  <span class="skill-percent">{{ $skill['level'] }}%</span>
                </div>
                <div class="skill-bar-bg">
                  <div class="skill-bar-fill" style="width: {{ $skill['level'] }}%;"></div>
                </div>
              </div>
            @endforeach
          </div>

          <div class="skill-tags-group">
            @foreach($category['tags'] as $tag)
              <span class="skill-tag">#{{ $tag }}</span>
            @endforeach
          </div>
        </div>
      @endforeach
    </div>
  </div>
</section>
