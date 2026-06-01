const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
  "Access-Control-Allow-Headers": "Authorization, Content-Type, X-Admin-Key"
};

const defaultSettings = {
  mode: "founder",
  keywords: ["AI Agent Founder", "AI Agent Engineer", "LLM Engineer", "AI Automation Specialist", "Growth Automation"],
  locations: ["Amsterdam", "Netherlands", "Remote Europe"],
  excludeWords: ["Dutch required", "fluent Dutch", "unpaid", "internship", "10+ years", "onsite only"],
  jobTypes: ["Full-time", "Contract", "Freelance"],
  workModes: ["Remote", "Hybrid", "Europe Remote"],
  searchInterval: "hourly",
  maxJobsPerRun: 20,
  dailyAnalysisLimit: 30,
  minimumMatchScore: 60
};

function json(data, init = {}) {
  return Response.json(data, {
    ...init,
    headers: {
      ...corsHeaders,
      ...(init.headers || {})
    }
  });
}

async function readJson(request) {
  try {
    return await request.json();
  } catch {
    return {};
  }
}

function base64UrlEncode(value) {
  const bytes = typeof value === "string" ? new TextEncoder().encode(value) : value;
  let binary = "";
  bytes.forEach((byte) => {
    binary += String.fromCharCode(byte);
  });
  return btoa(binary).replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/g, "");
}

function base64UrlDecode(value) {
  const padded = `${value}${"=".repeat((4 - value.length % 4) % 4)}`;
  const binary = atob(padded.replace(/-/g, "+").replace(/_/g, "/"));
  return Uint8Array.from(binary, (char) => char.charCodeAt(0));
}

async function sha256Hex(value) {
  const hash = await crypto.subtle.digest("SHA-256", new TextEncoder().encode(value));
  return Array.from(new Uint8Array(hash))
    .map((byte) => byte.toString(16).padStart(2, "0"))
    .join("");
}

async function hmacSha256(value, secret) {
  const key = await crypto.subtle.importKey(
    "raw",
    new TextEncoder().encode(secret),
    { name: "HMAC", hash: "SHA-256" },
    false,
    ["sign"]
  );
  const signature = await crypto.subtle.sign("HMAC", key, new TextEncoder().encode(value));
  return base64UrlEncode(new Uint8Array(signature));
}

function timingSafeEqual(left, right) {
  if (!left || !right || left.length !== right.length) return false;
  let result = 0;
  for (let index = 0; index < left.length; index += 1) {
    result |= left.charCodeAt(index) ^ right.charCodeAt(index);
  }
  return result === 0;
}

async function createSessionToken(env) {
  const sessionSecret = env.ADMIN_SESSION_SECRET;
  if (!sessionSecret) {
    throw new Error("Missing ADMIN_SESSION_SECRET");
  }
  const expiresAt = Date.now() + 1000 * 60 * 60 * 12;
  const nonce = crypto.randomUUID();
  const payload = base64UrlEncode(JSON.stringify({ expiresAt, nonce }));
  const signature = await hmacSha256(payload, sessionSecret);
  return `${payload}.${signature}`;
}

async function verifySessionToken(token, env) {
  const sessionSecret = env.ADMIN_SESSION_SECRET;
  if (!sessionSecret || !token || !token.includes(".")) return false;
  const [payload, signature] = token.split(".");
  const expected = await hmacSha256(payload, sessionSecret);
  if (!timingSafeEqual(signature, expected)) return false;
  try {
    const decoded = new TextDecoder().decode(base64UrlDecode(payload));
    const data = JSON.parse(decoded);
    return Number(data.expiresAt || 0) > Date.now();
  } catch {
    return false;
  }
}

async function assertAdmin(request, env) {
  if (env.ADMIN_KEY && request.headers.get("X-Admin-Key") === env.ADMIN_KEY) return true;
  const auth = request.headers.get("Authorization") || "";
  const token = auth.startsWith("Bearer ") ? auth.slice(7) : "";
  return verifySessionToken(token, env);
}

async function login(request, env) {
  if (!env.ADMIN_PASSWORD_HASH) {
    return json({ error: "ADMIN_PASSWORD_HASH is not configured." }, { status: 503 });
  }
  const body = await readJson(request);
  const password = String(body.password || "");
  const passwordHash = await sha256Hex(password);
  if (!timingSafeEqual(passwordHash, env.ADMIN_PASSWORD_HASH)) {
    return json({ error: "Incorrect password." }, { status: 401 });
  }
  const token = await createSessionToken(env);
  return json({ ok: true, token, expiresIn: 60 * 60 * 12 });
}

async function session(request, env) {
  const isValid = await assertAdmin(request, env);
  return isValid ? json({ ok: true }) : json({ error: "Unauthorized" }, { status: 401 });
}

async function readStore(env, key, fallback) {
  const value = await env.JOB_AGENT.get(key);
  if (!value) return fallback;
  try {
    return JSON.parse(value);
  } catch {
    return fallback;
  }
}

async function writeStore(env, key, value) {
  await env.JOB_AGENT.put(key, JSON.stringify(value));
}

function makeJobId(job) {
  if (job.sourceId) return `${job.source}-${job.sourceId}`.toLowerCase().replace(/[^a-z0-9]+/g, "-");
  if (job.url) return `${job.source || "job"}-${job.url}`.toLowerCase().replace(/[^a-z0-9]+/g, "-");
  return `${job.company}-${job.title}-${job.location}`.toLowerCase().replace(/[^a-z0-9]+/g, "-");
}

function stripHtml(value = "") {
  return String(value)
    .replace(/<script[\s\S]*?<\/script>/gi, " ")
    .replace(/<style[\s\S]*?<\/style>/gi, " ")
    .replace(/<[^>]+>/g, " ")
    .replace(/&nbsp;/g, " ")
    .replace(/&amp;/g, "&")
    .replace(/&quot;/g, "\"")
    .replace(/&#39;/g, "'")
    .replace(/\s+/g, " ")
    .trim();
}

function normalizeText(value = "") {
  return stripHtml(value).toLowerCase();
}

function uniqueList(items = []) {
  return Array.from(new Set(items.map((item) => String(item || "").trim()).filter(Boolean)));
}

function textMatchesAny(text, items = []) {
  const normalized = normalizeText(text);
  return items.some((item) => normalized.includes(normalizeText(item)));
}

function keywordMatches(job, settings) {
  const keywords = uniqueList(settings.keywords);
  if (!keywords.length) return true;
  const titleText = [
    job.title,
    job.company,
    ...(job.tags || [])
  ].join(" ");
  const bodyText = [
    titleText,
    job.location,
    job.type,
    job.description
  ].join(" ");
  return keywords.some((keyword) => {
    const parts = normalizeText(keyword).split(/\s+/).filter((part) => part.length > 2);
    if (!parts.length) return false;
    const normalizedKeyword = normalizeText(keyword);
    const title = normalizeText(titleText);
    const body = normalizeText(bodyText);
    if (body.includes(normalizedKeyword)) return true;
    if (parts.length === 1) return new RegExp(`\\b${parts[0]}\\b`).test(body);
    if (parts.every((part) => new RegExp(`\\b${part}\\b`).test(title))) return true;
    if (normalizedKeyword.includes("agent") && /\b(ai|llm|agentic)\s+agents?\b|\bagentic\b|\bllm\s+agents?\b/.test(body)) return true;
    if (normalizedKeyword.includes("automation") && /\b(ai|growth|workflow|business)\s+automation\b/.test(body)) return true;
    return false;
  });
}

function locationMatches(job, settings) {
  const locations = uniqueList(settings.locations);
  if (!locations.length) return true;
  const location = normalizeText(`${job.location || ""} ${job.description || ""}`);
  return locations.some((item) => {
    const target = normalizeText(item);
    if ((target.includes("remote") && target.includes("europe")) || (target.includes("europe") && target.includes("remote"))) {
      return location.includes("remote") && /europe|emea|eu\b|worldwide|global|anywhere/.test(location);
    }
    if (target === "remote" && location.includes("remote")) return true;
    if (target.includes("europe")) return /europe|emea|eu\b|worldwide|global|anywhere/.test(location);
    if (target.includes("netherlands") && /netherlands|nederland|amsterdam|rotterdam|utrecht/.test(location)) return true;
    return location.includes(target);
  });
}

function isExcluded(job, settings) {
  const searchable = [
    job.title,
    job.company,
    job.location,
    job.type,
    job.description,
    ...(job.tags || [])
  ].join(" ");
  return textMatchesAny(searchable, settings.excludeWords);
}

function typeMatches(job, settings) {
  const types = uniqueList(settings.jobTypes);
  if (!types.length) return true;
  const text = normalizeText(`${job.type || ""} ${job.description || ""}`);
  return types.some((type) => {
    const normalized = normalizeText(type).replace("-", "_");
    if (normalized.includes("full") && /full.?time|full_time|permanent/.test(text)) return true;
    if (normalized.includes("contract") && /contract|temporary/.test(text)) return true;
    if (normalized.includes("freelance") && /freelance|contractor/.test(text)) return true;
    if (normalized.includes("part") && /part.?time|part_time/.test(text)) return true;
    return text.includes(normalizeText(type));
  });
}

function workModeMatches(job, settings) {
  const modes = uniqueList(settings.workModes);
  if (!modes.length) return true;
  const text = normalizeText(`${job.location || ""} ${job.description || ""}`);
  return modes.some((mode) => {
    const normalized = normalizeText(mode);
    if (normalized.includes("remote")) return text.includes("remote");
    if (normalized.includes("hybrid")) return text.includes("hybrid");
    if (normalized.includes("onsite")) return /onsite|on-site|office/.test(text);
    return text.includes(normalized);
  });
}

function matchesSettings(job, settings) {
  return keywordMatches(job, settings)
    && locationMatches(job, settings)
    && typeMatches(job, settings)
    && workModeMatches(job, settings)
    && !isExcluded(job, settings);
}

function normalizeJob(job) {
  return {
    ...job,
    description: stripHtml(job.description || "").slice(0, 1400),
    tags: uniqueList(job.tags || []).slice(0, 12)
  };
}

async function fetchJson(url) {
  const response = await fetch(url, {
    headers: {
      Accept: "application/json"
    }
  });
  if (!response.ok) throw new Error(`Fetch failed: ${response.status}`);
  return response.json();
}

async function searchRemotive(settings) {
  const keywords = uniqueList(settings.keywords).slice(0, 5);
  const queries = keywords.length ? keywords : ["AI"];
  const batches = await Promise.allSettled(queries.map(async (keyword) => {
    const data = await fetchJson(`https://remotive.com/api/remote-jobs?search=${encodeURIComponent(keyword)}`);
    return (data.jobs || []).map((job) => normalizeJob({
      source: "Remotive",
      sourceId: String(job.id),
      company: job.company_name || "Unknown company",
      title: job.title || "Untitled role",
      location: job.candidate_required_location || "Remote",
      type: String(job.job_type || "").replace(/_/g, "-") || "Remote",
      url: job.url,
      description: job.description,
      tags: job.tags || [],
      salary: job.salary || "",
      publishedAt: job.publication_date || ""
    }));
  }));
  return batches.flatMap((batch) => batch.status === "fulfilled" ? batch.value : []);
}

async function searchArbeitnow(settings) {
  const data = await fetchJson("https://www.arbeitnow.com/api/job-board-api");
  return (data.data || []).map((job) => normalizeJob({
    source: "Arbeitnow",
    sourceId: job.slug || job.url,
    company: job.company_name || "Unknown company",
    title: job.title || "Untitled role",
    location: job.location || (job.remote ? "Remote" : "Location unknown"),
    type: (job.job_types || []).join(", ") || (job.remote ? "Remote" : "Job"),
    url: job.url,
    description: job.description,
    tags: job.tags || [],
    publishedAt: job.created_at ? new Date(Number(job.created_at) * 1000).toISOString() : ""
  }));
}

async function searchRealJobs(settings) {
  const batches = await Promise.allSettled([
    searchRemotive(settings),
    searchArbeitnow(settings)
  ]);
  const jobs = batches.flatMap((batch) => batch.status === "fulfilled" ? batch.value : []);
  const seen = new Set();
  const strictMatches = jobs.filter((job) => job.url && matchesSettings(job, settings));
  const candidateJobs = strictMatches.length
    ? strictMatches
    : jobs
      .filter((job) => job.url && keywordMatches(job, settings) && typeMatches(job, settings) && workModeMatches(job, settings) && !isExcluded(job, settings))
      .map((job) => ({ ...job, locationRisk: "Outside selected location" }));
  const seenSignatures = new Set();
  return candidateJobs
    .filter((job) => {
      const title = normalizeText(job.title).replace(/\([^)]*\)/g, "").trim();
      const signature = `${normalizeText(job.company)}-${title}`;
      if (seenSignatures.has(signature)) return false;
      seenSignatures.add(signature);
      return true;
    })
    .filter((job) => {
      const id = makeJobId(job);
      if (seen.has(id)) return false;
      seen.add(id);
      return true;
    })
    .slice(0, Math.max(1, Number(settings.maxJobsPerRun || defaultSettings.maxJobsPerRun)));
}

function localSearch(settings) {
  const keyword = settings.keywords?.[0] || "AI Agent";
  const location = settings.locations?.[0] || "Remote Europe";
  return [
    {
      company: "Founder Mode Source",
      title: `${keyword} Opportunity`,
      location,
      type: settings.jobTypes?.[0] || "Contract",
      url: `https://www.linkedin.com/jobs/search/?keywords=${encodeURIComponent(keyword)}&location=${encodeURIComponent(location)}`,
      description: "Placeholder result. Connect a search provider or server-side crawler to replace this with real job data.",
      source: "worker-placeholder"
    }
  ];
}

function scoreJob(job, settings) {
  const text = `${job.title} ${job.description} ${job.location} ${job.type}`.toLowerCase();
  const blocked = (settings.excludeWords || []).some((word) => text.includes(String(word).toLowerCase()));
  const keywordHits = (settings.keywords || []).filter((keyword) => text.includes(String(keyword).toLowerCase().split(" ")[0])).length;
  const score = 58 + keywordHits * 8;
  return blocked ? Math.min(45, score) : Math.min(96, score);
}

async function runSearch(request, env) {
  const body = await readJson(request);
  const settings = { ...defaultSettings, ...(body.settings || await readStore(env, "settings", {})) };
  const currentJobs = await readStore(env, "jobs", []);
  let source = "public-job-apis";
  let foundJobs = await searchRealJobs(settings);
  if (!foundJobs.length) {
    source = "fallback";
    foundJobs = localSearch(settings);
  }
  foundJobs = foundJobs.map((job) => ({
    ...job,
    id: job.id || makeJobId(job),
    status: "new",
    createdAt: new Date().toISOString()
  }));
  const currentIds = new Set(currentJobs.map((job) => job.id));
  const freshJobs = foundJobs.filter((job) => !currentIds.has(job.id));
  const nextJobs = [...freshJobs, ...currentJobs].slice(0, 500);
  await writeStore(env, "settings", settings);
  await writeStore(env, "jobs", nextJobs);
  await writeStore(env, "lastRun", { at: new Date().toISOString(), added: freshJobs.length, found: foundJobs.length, source });
  return json({ ok: true, added: freshJobs.length, found: foundJobs.length, source, jobs: freshJobs, allJobs: nextJobs, total: nextJobs.length });
}

async function analyzeJobs(request, env) {
  const body = await readJson(request);
  const settings = { ...defaultSettings, ...(body.settings || await readStore(env, "settings", {})) };
  const jobs = Array.isArray(body.jobs) ? body.jobs : await readStore(env, "jobs", []);
  let analyzed = 0;
  const nextJobs = jobs.map((job) => {
    if (job.status !== "new" || analyzed >= settings.dailyAnalysisLimit) return job;
    const score = scoreJob(job, settings);
    analyzed += 1;
    return {
      ...job,
      score,
      status: score >= settings.minimumMatchScore ? "ready" : "review",
      summary: score >= settings.minimumMatchScore
        ? "Founder-mode fit found. Review the full role before preparing an application."
        : "Below the current match threshold. Keep only if the full JD is stronger.",
      analyzedAt: new Date().toISOString()
    };
  });
  await writeStore(env, "jobs", nextJobs);
  return json({ ok: true, analyzed, jobs: nextJobs });
}

async function generateApplication(request, env) {
  const body = await readJson(request);
  const jobs = Array.isArray(body.jobs) ? body.jobs : await readStore(env, "jobs", []);
  const targetIndex = jobs.findIndex((job) => job.status === "ready");
  if (targetIndex === -1) {
    return json({ ok: false, message: "No ready job found.", jobs });
  }
  const nextJobs = [...jobs];
  const target = nextJobs[targetIndex];
  nextJobs[targetIndex] = {
    ...target,
    status: "application",
    application: [
      `Positioning: founder/operator who can build practical AI workflows for ${target.company}.`,
      "Resume angle: MiniGrowLab, automation systems, website building, AI-assisted workflow design.",
      "Cover note angle: practical builder, fast experiments, clear product sense."
    ]
  };
  await writeStore(env, "jobs", nextJobs);
  return json({ ok: true, jobs: nextJobs });
}

export default {
  async fetch(request, env) {
    if (request.method === "OPTIONS") {
      return new Response(null, { headers: corsHeaders });
    }

    const url = new URL(request.url);

    if (request.method === "POST" && url.pathname === "/auth") {
      return login(request, env);
    }

    if (request.method === "GET" && url.pathname === "/session") {
      return session(request, env);
    }

    if (!await assertAdmin(request, env)) {
      return json({ error: "Unauthorized" }, { status: 401 });
    }

    if (request.method === "GET" && url.pathname === "/settings") {
      return json({ settings: await readStore(env, "settings", defaultSettings) });
    }

    if (request.method === "GET" && url.pathname === "/jobs") {
      return json({
        jobs: await readStore(env, "jobs", []),
        lastRun: await readStore(env, "lastRun", null)
      });
    }

    if (request.method === "POST" && url.pathname === "/settings") {
      const body = await readJson(request);
      const settings = { ...defaultSettings, ...(body.settings || {}) };
      await writeStore(env, "settings", settings);
      return json({ ok: true, settings });
    }

    if (request.method === "POST" && url.pathname === "/run") {
      return runSearch(request, env);
    }

    if (request.method === "POST" && url.pathname === "/analyze") {
      return analyzeJobs(request, env);
    }

    if (request.method === "POST" && url.pathname === "/generate-application") {
      return generateApplication(request, env);
    }

    return json({ ok: true, message: "Founder Job Agent worker is running." });
  },

  async scheduled(event, env, ctx) {
    const request = new Request("https://job-agent.local/run", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: "{}"
    });
    ctx.waitUntil(runSearch(request, env));
  }
};
