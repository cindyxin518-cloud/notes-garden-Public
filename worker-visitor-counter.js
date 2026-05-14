const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type"
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

async function readJsonKey(env, key, fallback) {
  const value = await env.VISITORS.get(key);
  if (!value) return fallback;
  try {
    return JSON.parse(value);
  } catch {
    return fallback;
  }
}

async function handleVisit(request, env) {
  const body = await readJson(request);
  const visitorId = String(body.visitorId || "").trim();
  const currentTotal = await env.VISITORS.get("totalVisits");
  const visitorNumber = Number(currentTotal || 0) + 1;
  await env.VISITORS.put("totalVisits", String(visitorNumber));

  if (visitorId) {
    const uniqueKey = `uniqueVisitor:${visitorId}`;
    const hasVisited = await env.VISITORS.get(uniqueKey);
    if (!hasVisited) {
      const currentUnique = await env.VISITORS.get("uniqueVisitors");
      const uniqueVisitors = Number(currentUnique || 0) + 1;
      await env.VISITORS.put(uniqueKey, "1");
      await env.VISITORS.put("uniqueVisitors", String(uniqueVisitors));
    }
  }

  return json({
    visitorNumber,
    totalVisits: visitorNumber
  });
}

async function getPublicState(request, env) {
  const url = new URL(request.url);
  const visitorId = String(url.searchParams.get("visitorId") || "").trim();
  const reactionCounts = await readJsonKey(env, "reactionCounts", {});
  const visitorNotes = await readJsonKey(env, "visitorNotes", []);
  const comments = await readJsonKey(env, "comments", {});
  const myReactions = {};

  if (visitorId) {
    const likedIds = await readJsonKey(env, `likesByVisitor:${visitorId}`, []);
    likedIds.forEach((quoteId) => {
      myReactions[quoteId] = { like: true };
    });
  }

  return json({ reactionCounts, visitorNotes, comments, myReactions });
}

async function toggleReaction(request, env) {
  const body = await readJson(request);
  const visitorId = String(body.visitorId || "").trim();
  const quoteId = String(body.quoteId || "").trim();
  const liked = Boolean(body.liked);

  if (!visitorId || !quoteId) {
    return json({ error: "Missing visitorId or quoteId" }, { status: 400 });
  }

  const likeKey = `like:${quoteId}:${visitorId}`;
  const counts = await readJsonKey(env, "reactionCounts", {});
  counts[quoteId] = counts[quoteId] || {};
  const hasLiked = Boolean(await env.VISITORS.get(likeKey));

  if (liked && !hasLiked) {
    await env.VISITORS.put(likeKey, "1");
    counts[quoteId].like = Number(counts[quoteId].like || 0) + 1;
  }

  if (!liked && hasLiked) {
    await env.VISITORS.delete(likeKey);
    counts[quoteId].like = Math.max(0, Number(counts[quoteId].like || 0) - 1);
  }

  const likedIds = await readJsonKey(env, `likesByVisitor:${visitorId}`, []);
  const nextLikedIds = liked
    ? Array.from(new Set([...likedIds, quoteId]))
    : likedIds.filter((id) => id !== quoteId);

  await env.VISITORS.put("reactionCounts", JSON.stringify(counts));
  await env.VISITORS.put(`likesByVisitor:${visitorId}`, JSON.stringify(nextLikedIds));

  return json({
    quoteId,
    liked,
    count: Number(counts[quoteId].like || 0),
    reactionCounts: counts
  });
}

async function addComment(request, env) {
  const body = await readJson(request);
  const quoteId = String(body.quoteId || "").trim();
  const text = String(body.text || "").trim().slice(0, 600);

  if (!quoteId || !text) {
    return json({ error: "Missing quoteId or text" }, { status: 400 });
  }

  const comments = await readJsonKey(env, "comments", {});
  comments[quoteId] = [
    ...(comments[quoteId] || []),
    { text, createdAt: new Date().toISOString() }
  ].slice(-20);

  await env.VISITORS.put("comments", JSON.stringify(comments));
  return json({ comments });
}

async function addVisitorNote(request, env) {
  const body = await readJson(request);
  const note = body.note || {};
  const text = String(note.zh || "").trim().slice(0, 1200);

  if (!text) {
    return json({ error: "Missing note text" }, { status: 400 });
  }

  const visitorNotes = await readJsonKey(env, "visitorNotes", []);
  const cleanNote = {
    id: String(note.id || `visitor-${Date.now()}`),
    zh: text,
    en: String(note.en || "").trim().slice(0, 1200),
    nl: String(note.nl || "").trim().slice(0, 1200),
    category: String(note.category || "Others"),
    source: String(note.source || "Visitor submission").trim().slice(0, 120),
    createdAt: new Date().toISOString()
  };

  const nextNotes = [...visitorNotes, cleanNote].slice(-200);
  await env.VISITORS.put("visitorNotes", JSON.stringify(nextNotes));
  return json({ visitorNotes: nextNotes });
}

export default {
  async fetch(request, env) {
    if (request.method === "OPTIONS") {
      return new Response(null, { headers: corsHeaders });
    }

    const url = new URL(request.url);

    if (request.method === "GET" && url.pathname === "/state") {
      return getPublicState(request, env);
    }

    if (request.method === "POST" && url.pathname === "/reaction") {
      return toggleReaction(request, env);
    }

    if (request.method === "POST" && url.pathname === "/comment") {
      return addComment(request, env);
    }

    if (request.method === "POST" && url.pathname === "/note") {
      return addVisitorNote(request, env);
    }

    if (request.method === "POST" && url.pathname === "/") {
      return handleVisit(request, env);
    }

    return json({ ok: true, message: "Notes Garden counter is running." });
  }
};
