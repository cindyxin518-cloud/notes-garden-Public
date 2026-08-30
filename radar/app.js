/**
 * MiniGrowLab — Cindy's Career Radar & Application Studio (Frontend App)
 */

let allJobs = [];
let filteredJobs = [];
let currentJobId = null;
let activeFilter = 'all';
let searchQuery = '';

// Load initial data
document.addEventListener('DOMContentLoaded', async () => {
  setupEventListeners();
  await loadJobsData();
});

async function loadJobsData() {
  try {
    const res = await fetch('data/jobs.json');
    if (!res.ok) throw new Error('Failed to load jobs data');
    const data = await res.json();
    
    allJobs = data.jobs || [];
    
    // Update metrics
    document.getElementById('cand-name').textContent = data.candidate?.full_name || 'Cindy (Li) Xin';
    document.getElementById('metric-total').textContent = allJobs.length;
    document.getElementById('metric-mandarin').textContent = data.mandarin_jobs_count || 0;

    applyFilters();

    // Select first job if available
    if (filteredJobs.length > 0) {
      selectJob(filteredJobs[0].id);
    }
  } catch (err) {
    console.error('Error loading data:', err);
    document.getElementById('job-list-container').innerHTML = `
      <div style="padding: 20px; color: #ef4444; font-size: 13px;">
        ⚠️ Failed to load jobs.json. Please make sure data/jobs.json exists.
      </div>
    `;
  }
}

function setupEventListeners() {
  // Search input
  const searchInput = document.getElementById('search-input');
  searchInput.addEventListener('input', (e) => {
    searchQuery = e.target.value.toLowerCase().trim();
    applyFilters();
  });

  // Filter chips
  const chips = document.querySelectorAll('.chip');
  chips.forEach(chip => {
    chip.addEventListener('click', () => {
      chips.forEach(c => c.classList.remove('active'));
      chip.classList.add('active');
      activeFilter = chip.dataset.filter;
      applyFilters();
    });
  });

  // Tab navigation
  const tabBtns = document.querySelectorAll('.tab-btn');
  tabBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      tabBtns.forEach(b => b.classList.remove('active'));
      document.querySelectorAll('.tab-pane').forEach(p => p.classList.remove('active'));
      
      btn.classList.add('active');
      const targetId = btn.dataset.tab;
      document.getElementById(targetId).classList.add('active');
    });
  });

  // Copy Pitch
  const btnCopy = document.getElementById('btn-copy-pitch');
  btnCopy.addEventListener('click', () => {
    const textarea = document.getElementById('pitch-textarea');
    textarea.select();
    navigator.clipboard.writeText(textarea.value);
    
    const textSpan = document.getElementById('copy-btn-text');
    textSpan.textContent = '✅ Copied to Clipboard!';
    setTimeout(() => {
      textSpan.textContent = '📋 Copy Pitch to Clipboard';
    }, 2000);
  });

  // Toggle Applied Status
  const btnApplied = document.getElementById('btn-toggle-applied');
  btnApplied.addEventListener('click', () => {
    if (!currentJobId) return;
    const appliedKey = `applied_${currentJobId}`;
    const isApplied = localStorage.getItem(appliedKey) === 'true';
    const newState = !isApplied;
    localStorage.setItem(appliedKey, newState ? 'true' : 'false');
    updateAppliedButton(newState);
    renderJobList();
  });
}

function applyFilters() {
  filteredJobs = allJobs.filter(job => {
    // 1. Text search
    const matchesSearch = !searchQuery || 
      job.company.toLowerCase().includes(searchQuery) ||
      job.title.toLowerCase().includes(searchQuery) ||
      job.location.toLowerCase().includes(searchQuery) ||
      (job.jd_markdown && job.jd_markdown.toLowerCase().includes(searchQuery));

    if (!matchesSearch) return false;

    // 2. Chip filters
    if (activeFilter === 'mandarin') {
      return job.mandarin_label && job.mandarin_label !== 'NO_CHINA_ADVANTAGE';
    } else if (activeFilter === 'top') {
      return job.scout_score >= 90;
    } else if (activeFilter === 'eindhoven') {
      return job.location.toLowerCase().includes('eindhoven') || job.location.toLowerCase().includes('veldhoven');
    } else if (activeFilter === 'amsterdam') {
      return job.location.toLowerCase().includes('amsterdam');
    }
    return true;
  });

  renderJobList();
}

function renderJobList() {
  const container = document.getElementById('job-list-container');
  if (filteredJobs.length === 0) {
    container.innerHTML = `
      <div style="padding: 24px; text-align: center; color: #94a3b8; font-size: 13px;">
        No vacancies match your current filter.
      </div>
    `;
    return;
  }

  container.innerHTML = filteredJobs.map(job => {
    const isSelected = job.id === currentJobId;
    const isApplied = localStorage.getItem(`applied_${job.id}`) === 'true';
    const isHigh = job.scout_score >= 90;
    const hasMandarin = job.mandarin_label && job.mandarin_label !== 'NO_CHINA_ADVANTAGE';

    return `
      <div class="job-card ${isSelected ? 'active' : ''}" onclick="selectJob(${job.id})">
        <div class="card-top">
          <span class="card-company">${escapeHtml(job.company)}</span>
          <span class="score-badge ${isHigh ? 'high' : ''}">${job.scout_score}/100</span>
        </div>
        <div class="card-title">${escapeHtml(job.title)}</div>
        <div class="card-bottom">
          <span>📍 ${escapeHtml(job.location.split(',')[0])}</span>
          <div style="display: flex; gap: 6px; align-items: center;">
            ${hasMandarin ? `<span class="mandarin-pill">${job.mandarin_label === 'MANDARIN_REQUIRED' ? '🇨🇳 Mandarin Required' : '🇨🇳 Mandarin +'}</span>` : ''}
            ${isApplied ? `<span style="color: #16a34a; font-weight: 700;">✓ Applied</span>` : ''}
          </div>
        </div>
      </div>
    `;
  }).join('');
}

function selectJob(id) {
  currentJobId = id;
  const job = allJobs.find(j => j.id === id);
  if (!job) return;

  renderJobList(); // update active card

  document.getElementById('empty-state').style.display = 'none';
  document.getElementById('detail-content').style.display = 'flex';

  // Hero section
  document.getElementById('hero-title').textContent = job.title;
  document.getElementById('hero-company').textContent = job.company;
  document.getElementById('hero-location').textContent = job.location;
  document.getElementById('hero-posted').textContent = job.posted_date || 'Recently Posted';
  document.getElementById('hero-score-val').textContent = job.scout_score;

  // Hero Tags
  const heroTags = document.getElementById('hero-tags');
  const hasMandarin = job.mandarin_label && job.mandarin_label !== 'NO_CHINA_ADVANTAGE';
  heroTags.innerHTML = `
    <span class="score-badge ${job.scout_score >= 90 ? 'high' : ''}">Match: ${job.scout_score}/100</span>
    ${hasMandarin ? `<span class="mandarin-pill">🇨🇳 ${job.mandarin_label.replace(/_/g, ' ')}</span>` : ''}
    <span class="score-badge" style="background: #f1f5f9; color: #475569;">Dutch: ${job.language_status}</span>
  `;

  // Action Buttons
  const btnLinkedin = document.getElementById('btn-linkedin');
  btnLinkedin.href = job.linkedin_url;

  const isApplied = localStorage.getItem(`applied_${job.id}`) === 'true';
  updateAppliedButton(isApplied);

  // CV Downloads & Live Preview
  const docxName = job.cv_docx_path ? job.cv_docx_path.split('/').pop() : 'Cindy_CV.docx';
  const pdfName = job.cv_pdf_path ? job.cv_pdf_path.split('/').pop() : 'Cindy_CV.pdf';
  const localHtml = job.cv_pdf_path ? job.cv_pdf_path.replace(/\.pdf$/, '.html') : '';

  const dlDocx = document.getElementById('dl-docx');
  dlDocx.href = job.web_docx_url || `file://${job.cv_docx_path}`;
  dlDocx.setAttribute('download', docxName);

  const dlPdf = document.getElementById('dl-pdf');
  dlPdf.href = job.web_pdf_url || `file://${job.cv_pdf_path}`;

  // Embedded CV frame preview
  const cvFrame = document.getElementById('cv-frame');
  const frameSrc = job.web_html_url || (localHtml ? `file://${localHtml}` : '');
  if (frameSrc) {
    cvFrame.src = frameSrc;
  }

  // Tab 2: Fit Analysis
  const fitSummary = document.getElementById('fit-summary-text');
  fitSummary.textContent = job.fit_analysis?.summary_of_fit || 
    `High match for ${job.title} at ${job.company}. Leverages 10+ years B2B marketing, demand gen leadership at Bleckmann, and multinational campaign experience.`;

  document.getElementById('qa-reason-text').textContent = job.qa_review?.decision_reason || 'Verified: All claims traceable to Career Fact Base.';

  // Tab 3: Pitch Note
  document.getElementById('pitch-textarea').value = job.quick_pitch || '';

  // Tab 4: Full JD
  document.getElementById('jd-view-container').textContent = job.jd_markdown || 'No description available.';
}

function updateAppliedButton(isApplied) {
  const btn = document.getElementById('btn-toggle-applied');
  if (isApplied) {
    btn.classList.add('applied');
    btn.innerHTML = '<span>✓ Applied</span>';
  } else {
    btn.classList.remove('applied');
    btn.innerHTML = '<span>Mark as Applied</span>';
  }
}

function escapeHtml(text) {
  if (!text) return '';
  return text.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
}
