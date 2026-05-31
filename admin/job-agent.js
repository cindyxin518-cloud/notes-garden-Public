const defaultSettings = {
  mode: "founder",
  keywords: [
    "AI Agent Founder",
    "AI Agent Engineer",
    "LLM Engineer",
    "AI Automation Specialist",
    "Growth Automation",
    "AI Product Manager",
    "No-code Automation"
  ],
  locations: ["Amsterdam", "Netherlands", "Remote Europe"],
  excludeWords: ["Dutch required", "fluent Dutch", "unpaid", "internship", "10+ years", "onsite only", "pure sales"],
  jobTypes: ["Full-time", "Contract", "Freelance"],
  workModes: ["Remote", "Hybrid", "Europe Remote"],
  searchInterval: "hourly",
  maxJobsPerRun: 20,
  dailyAnalysisLimit: 30,
  minimumMatchScore: 60,
  founderProfile: "Founder profile: building MiniGrowLab, AI workflows, websites, automation, growth experiments, content systems, and practical AI agent products. Preference: AI agent, automation, growth, product, and founder/operator roles. Avoid pure sales and very coding-heavy roles unless they strongly match AI agents.",
  apiEndpoint: ""
};

const sampleJobs = [
  {
    company: "Northstar AI",
    title: "AI Agent Builder",
    location: "Remote Europe",
    type: "Contract",
    url: "https://www.linkedin.com/jobs/search/?keywords=AI%20Agent%20Builder",
    description: "Build internal AI workflows, evaluate LLM tools, and automate operational processes for a small product team."
  },
  {
    company: "Signal Garden",
    title: "Growth Automation Lead",
    location: "Amsterdam, Netherlands",
    type: "Full-time",
    url: "https://www.linkedin.com/jobs/search/?keywords=Growth%20Automation%20Lead",
    description: "Design AI-assisted growth systems, landing pages, CRM automations, and content workflows for early-stage products."
  },
  {
    company: "FlowStack Labs",
    title: "AI Product Operator",
    location: "Hybrid Netherlands",
    type: "Freelance",
    url: "https://www.linkedin.com/jobs/search/?keywords=AI%20Product%20Operator",
    description: "Work with founders to turn messy AI ideas into tested workflows, prototypes, and measurable product experiments."
  }
];

const storageKeys = {
  settings: "founderJobAgentSettings",
  jobs: "founderJobAgentJobs"
};

const form = document.querySelector("#settingsForm");
const fields = {
  keywords: document.querySelector("#keywords"),
  locations: document.querySelector("#locations"),
  excludeWords: document.querySelector("#excludeWords"),
  jobTypes: document.querySelector("#jobTypes"),
  workModes: document.querySelector("#workModes"),
  searchInterval: document.querySelector("#searchInterval"),
  maxJobsPerRun: document.querySelector("#maxJobsPerRun"),
  dailyAnalysisLimit: document.querySelector("#dailyAnalysisLimit"),
  minimumMatchScore: document.querySelector("#minimumMatchScore"),
  founderProfile: document.querySelector("#founderProfile"),
  apiEndpoint: document.querySelector("#apiEndpoint")
};
const runStatus = document.querySelector("#runStatus");
const jobList = document.querySelector("#jobList");
const emptyState = document.querySelector("#emptyState");
const jobCount = document.querySelector("#jobCount");
const newJobCount = document.querySelector("#newJobCount");
const analyzedJobCount = document.querySelector("#analyzedJobCount");
const readyJobCount = document.querySelector("#readyJobCount");

let settings = loadSettings();
let jobs = loadJobs();

function loadSettings() {
  try {
    return { ...defaultSettings, ...JSON.parse(localStorage.getItem(storageKeys.settings) || "{}") };
  } catch {
    return { ...defaultSettings };
  }
}

function loadJobs() {
  try {
    return JSON.parse(localStorage.getItem(storageKeys.jobs) || "[]");
  } catch {
    return [];
  }
}

function saveSettings() {
  localStorage.setItem(storageKeys.settings, JSON.stringify(settings));
}

function saveJobs() {
  localStorage.setItem(storageKeys.jobs, JSON.stringify(jobs));
}

function listToText(items) {
  return items.join("\n");
}

function textToList(value) {
  return value
    .split("\n")
    .map((item) => item.trim())
    .filter(Boolean);
}

function selectedOptions(select) {
  return Array.from(select.selectedOptions).map((option) => option.value);
}

function setSelectedOptions(select, values) {
  Array.from(select.options).forEach((option) => {
    option.selected = values.includes(option.value);
  });
}

function renderSettings() {
  fields.keywords.value = listToText(settings.keywords);
  fields.locations.value = listToText(settings.locations);
  fields.excludeWords.value = listToText(settings.excludeWords);
  setSelectedOptions(fields.jobTypes, settings.jobTypes);
  setSelectedOptions(fields.workModes, settings.workModes);
  fields.searchInterval.value = settings.searchInterval;
  fields.maxJobsPerRun.value = settings.maxJobsPerRun;
  fields.dailyAnalysisLimit.value = settings.dailyAnalysisLimit;
  fields.minimumMatchScore.value = settings.minimumMatchScore;
  fields.founderProfile.value = settings.founderProfile;
  fields.apiEndpoint.value = settings.apiEndpoint;
}

function collectSettings() {
  settings = {
    ...settings,
    keywords: textToList(fields.keywords.value),
    locations: textToList(fields.locations.value),
    excludeWords: textToList(fields.excludeWords.value),
    jobTypes: selectedOptions(fields.jobTypes),
    workModes: selectedOptions(fields.workModes),
    searchInterval: fields.searchInterval.value,
    maxJobsPerRun: Number(fields.maxJobsPerRun.value || defaultSettings.maxJobsPerRun),
    dailyAnalysisLimit: Number(fields.dailyAnalysisLimit.value || defaultSettings.dailyAnalysisLimit),
    minimumMatchScore: Number(fields.minimumMatchScore.value || defaultSettings.minimumMatchScore),
    founderProfile: fields.founderProfile.value.trim(),
    apiEndpoint: fields.apiEndpoint.value.trim()
  };
  saveSettings();
}

function normalizeEndpoint() {
  return settings.apiEndpoint.replace(/\/$/, "");
}

async function callApi(path, options = {}) {
  const endpoint = normalizeEndpoint();
  if (!endpoint) return null;
  const response = await fetch(`${endpoint}${path}`, {
    headers: { "Content-Type": "application/json" },
    ...options
  });
  if (!response.ok) {
    throw new Error(`API ${response.status}`);
  }
  return response.json();
}

function makeJobId(job) {
  return `${job.company}-${job.title}-${job.location}`.toLowerCase().replace(/[^a-z0-9]+/g, "-");
}

function addJobs(nextJobs) {
  const existingIds = new Set(jobs.map((job) => job.id || makeJobId(job)));
  const freshJobs = nextJobs
    .map((job) => ({ ...job, id: job.id || makeJobId(job), status: job.status || "new", createdAt: job.createdAt || new Date().toISOString() }))
    .filter((job) => !existingIds.has(job.id));
  jobs = [...freshJobs, ...jobs].slice(0, 100);
  saveJobs();
  return freshJobs.length;
}

function localSearchJobs() {
  const max = Math.max(1, Math.min(settings.maxJobsPerRun, sampleJobs.length));
  const timestamp = Date.now();
  return sampleJobs.slice(0, max).map((job, index) => ({
    ...job,
    id: `${makeJobId(job)}-${timestamp}-${index}`,
    status: "new",
    source: "Founder Mode local search"
  }));
}

function scoreJob(job) {
  const text = `${job.title} ${job.description} ${job.location} ${job.type}`.toLowerCase();
  const keywordHits = settings.keywords.filter((keyword) => text.includes(keyword.toLowerCase().split(" ")[0])).length;
  const blocked = settings.excludeWords.some((word) => text.includes(word.toLowerCase()));
  const workModeBoost = settings.workModes.some((mode) => text.includes(mode.toLowerCase().split(" ")[0])) ? 12 : 0;
  const base = 58 + keywordHits * 7 + workModeBoost;
  return blocked ? Math.min(45, base) : Math.min(96, base);
}

function analyzeLocalJobs() {
  let analyzed = 0;
  jobs = jobs.map((job) => {
    if (job.status !== "new" || analyzed >= settings.dailyAnalysisLimit) return job;
    const score = scoreJob(job);
    analyzed += 1;
    return {
      ...job,
      score,
      status: score >= settings.minimumMatchScore ? "ready" : "review",
      summary: score >= settings.minimumMatchScore
        ? "Strong founder-mode fit: AI workflows, product operations, or growth automation are visible in this role."
        : "Saved for review, but it may not be worth application time unless the full JD looks better.",
      analyzedAt: new Date().toISOString()
    };
  });
  saveJobs();
  return analyzed;
}

function generateLocalApplication() {
  const target = jobs.find((job) => job.status === "ready") || jobs[0];
  if (!target) return null;
  target.status = "application";
  target.application = [
    `Positioning: founder/operator who can build practical AI workflows and growth systems for ${target.company}.`,
    "Resume angle: emphasize MiniGrowLab, automation experiments, website building, and AI-assisted product thinking.",
    "Message draft: I am building hands-on AI workflow products and would love to explore how my founder/operator background could support this role."
  ];
  saveJobs();
  return target;
}

async function searchJobs() {
  collectSettings();
  runStatus.textContent = "Searching founder-mode jobs...";
  try {
    const result = await callApi("/run", {
      method: "POST",
      body: JSON.stringify({ settings, task: "search" })
    });
    const found = addJobs(result?.jobs || localSearchJobs());
    runStatus.textContent = `Search complete. ${found} new jobs saved.`;
  } catch (error) {
    const found = addJobs(localSearchJobs());
    runStatus.textContent = `API unavailable, used local founder-mode demo search. ${found} jobs saved.`;
  }
  renderJobs();
}

async function analyzeJobs() {
  collectSettings();
  runStatus.textContent = "Analyzing new jobs...";
  try {
    const result = await callApi("/analyze", {
      method: "POST",
      body: JSON.stringify({ settings, jobs })
    });
    if (Array.isArray(result?.jobs)) {
      jobs = result.jobs;
      saveJobs();
      runStatus.textContent = "Analysis complete from API.";
    } else {
      throw new Error("Missing jobs");
    }
  } catch {
    const analyzed = analyzeLocalJobs();
    runStatus.textContent = `Local analysis complete. ${analyzed} jobs scored.`;
  }
  renderJobs();
}

async function generateApplication() {
  collectSettings();
  runStatus.textContent = "Generating application draft...";
  try {
    const result = await callApi("/generate-application", {
      method: "POST",
      body: JSON.stringify({ settings, jobs })
    });
    if (Array.isArray(result?.jobs)) {
      jobs = result.jobs;
      saveJobs();
      runStatus.textContent = "Application draft generated from API.";
    } else {
      throw new Error("Missing jobs");
    }
  } catch {
    const target = generateLocalApplication();
    runStatus.textContent = target ? `Application draft prepared for ${target.company}.` : "Add jobs before generating application material.";
  }
  renderJobs();
}

function statusLabel(status) {
  return {
    new: "New",
    review: "Review",
    ready: "Ready",
    application: "Application Draft",
    rejected: "Rejected",
    applied: "Applied"
  }[status] || "New";
}

function renderJobs() {
  const counts = {
    new: jobs.filter((job) => job.status === "new").length,
    analyzed: jobs.filter((job) => job.status && job.status !== "new").length,
    ready: jobs.filter((job) => ["ready", "application"].includes(job.status)).length
  };
  jobCount.textContent = `${jobs.length} ${jobs.length === 1 ? "job" : "jobs"}`;
  newJobCount.textContent = counts.new;
  analyzedJobCount.textContent = counts.analyzed;
  readyJobCount.textContent = counts.ready;
  emptyState.classList.toggle("is-visible", jobs.length === 0);
  jobList.innerHTML = jobs.map((job) => `
    <article class="job-card">
      <div class="job-head">
        <div class="job-title">
          <strong>${job.title}</strong>
          <span>${job.company}</span>
        </div>
        <div class="score">${job.score || "--"}</div>
      </div>
      <p class="job-meta">${job.location || "Location unknown"} · ${job.type || "Type unknown"} · <span class="status-pill">${statusLabel(job.status)}</span></p>
      <p class="job-note">${job.summary || job.description || "Saved for founder-mode review."}</p>
      ${job.application ? `<p class="job-note">${job.application.join(" ")}</p>` : ""}
      <div class="job-actions">
        <a href="${job.url}" target="_blank" rel="noreferrer">Open</a>
        <button type="button" data-action="ready" data-id="${job.id}">Ready</button>
        <button type="button" data-action="applied" data-id="${job.id}">Applied</button>
        <button type="button" data-action="rejected" data-id="${job.id}">Reject</button>
      </div>
    </article>
  `).join("");
}

form.addEventListener("submit", (event) => {
  event.preventDefault();
  collectSettings();
  runStatus.textContent = "Founder Mode settings saved.";
});

document.querySelector("#resetSettings").addEventListener("click", () => {
  settings = { ...defaultSettings };
  saveSettings();
  renderSettings();
  runStatus.textContent = "Founder Mode defaults restored.";
});

document.querySelector("#searchNow").addEventListener("click", searchJobs);
document.querySelector("#analyzeJobs").addEventListener("click", analyzeJobs);
document.querySelector("#generateApplication").addEventListener("click", generateApplication);

jobList.addEventListener("click", (event) => {
  const button = event.target.closest("button[data-action]");
  if (!button) return;
  jobs = jobs.map((job) => job.id === button.dataset.id ? { ...job, status: button.dataset.action } : job);
  saveJobs();
  renderJobs();
});

renderSettings();
renderJobs();
