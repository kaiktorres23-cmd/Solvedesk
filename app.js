const THEME_KEY = "solvedesk-pro-theme";
const SUPABASE_URL = "https://ktovpehotipiwovkfkal.supabase.co";
const SUPABASE_ANON_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imt0b3ZwZWhvdGlwaXdvdmtma2FsIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODE2MjYwNTcsImV4cCI6MjA5NzIwMjA1N30.8u7yQxv_pfzv5h9JxORk-PS9gRo7p2_gCSYBiLSLxKk";
const SUPABASE_WORKSPACE_TABLE = "solvedesk_workspace";
const SUPABASE_PROFILE_TABLE = "solvedesk_profiles";
const supabaseClient = window.supabase
  ? window.supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY)
  : null;
const SUPABASE_HEALTH_URL = `${SUPABASE_URL}/auth/v1/health`;

console.info("[Supabase Config]", {
  url: SUPABASE_URL,
  host: new URL(SUPABASE_URL).hostname,
  authSignupUrl: `${SUPABASE_URL}/auth/v1/signup`,
  hasUnderscore: SUPABASE_URL.includes("_"),
  hasSupabaseDomain: SUPABASE_URL.endsWith(".supabase.co")
});

const $ = (selector, root = document) => root.querySelector(selector);
const $$ = (selector, root = document) => [...root.querySelectorAll(selector)];

const ICONS = {
  dashboard: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor"><path d="M4 13h6V4H4v9Zm10 7h6V4h-6v16ZM4 20h6v-3H4v3Z"/></svg>',
  ticket: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor"><path d="M4 7a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v3a2 2 0 0 0 0 4v3a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2v-3a2 2 0 0 0 0-4V7Z"/><path d="M9 8h6M9 12h6M9 16h4"/></svg>',
  book: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor"><path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"/><path d="M6.5 3H20v18H6.5A2.5 2.5 0 0 1 4 18.5v-13A2.5 2.5 0 0 1 6.5 3Z"/></svg>',
  monitor: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor"><rect x="3" y="4" width="18" height="12" rx="2"/><path d="M8 20h8M12 16v4"/></svg>',
  spark: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor"><path d="m12 3 1.8 5.2L19 10l-5.2 1.8L12 17l-1.8-5.2L5 10l5.2-1.8L12 3Z"/><path d="m19 15 .8 2.2L22 18l-2.2.8L19 21l-.8-2.2L16 18l2.2-.8L19 15Z"/></svg>',
  chart: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor"><path d="M4 19V5"/><path d="M4 19h16"/><path d="M8 16v-5M12 16V8M16 16v-7"/></svg>',
  users: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor"><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M22 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75"/></svg>',
  settings: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor"><path d="M12 15.5A3.5 3.5 0 1 0 12 8a3.5 3.5 0 0 0 0 7.5Z"/><path d="M19.4 15a1.7 1.7 0 0 0 .34 1.88l.06.06a2 2 0 1 1-2.83 2.83l-.06-.06A1.7 1.7 0 0 0 15 19.4a1.7 1.7 0 0 0-1 .6V20a2 2 0 1 1-4 0v-.1a1.7 1.7 0 0 0-1-.6 1.7 1.7 0 0 0-1.88.34l-.06.06a2 2 0 1 1-2.83-2.83l.06-.06A1.7 1.7 0 0 0 4.6 15a1.7 1.7 0 0 0-.6-1H4a2 2 0 1 1 0-4h.1a1.7 1.7 0 0 0 .6-1 1.7 1.7 0 0 0-.34-1.88l-.06-.06a2 2 0 1 1 2.83-2.83l.06.06A1.7 1.7 0 0 0 9 4.6a1.7 1.7 0 0 0 1-.6V4a2 2 0 1 1 4 0v.1a1.7 1.7 0 0 0 1 .6 1.7 1.7 0 0 0 1.88-.34l.06-.06a2 2 0 1 1 2.83 2.83l-.06.06A1.7 1.7 0 0 0 19.4 9c.2.35.4.7.6 1h.1a2 2 0 1 1 0 4H20a1.7 1.7 0 0 0-.6 1Z"/></svg>',
  search: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor"><circle cx="11" cy="11" r="7"/><path d="m20 20-3.5-3.5"/></svg>',
  plus: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor"><path d="M12 5v14M5 12h14"/></svg>',
  excel: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor"><path d="M14 3h5a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2h-5"/><path d="M3 6.5 14 4v16L3 17.5v-11Z"/><path d="m6.5 9 4 6M10.5 9l-4 6"/></svg>',
  copy: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor"><rect x="8" y="8" width="12" height="12" rx="2"/><path d="M4 16V6a2 2 0 0 1 2-2h10"/></svg>',
  eye: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor"><path d="M2 12s3.5-7 10-7 10 7 10 7-3.5 7-10 7S2 12 2 12Z"/><circle cx="12" cy="12" r="3"/></svg>',
  alert: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor"><path d="M10.3 4.2 2.7 18a2 2 0 0 0 1.7 3h15.2a2 2 0 0 0 1.7-3L13.7 4.2a2 2 0 0 0-3.4 0Z"/><path d="M12 9v4M12 17h.01"/></svg>'
};

const state = {
  route: "dashboard",
  problems: [],
  assets: [],
  inventorySectors: [],
  inventoryMovements: [],
  assetMaintenances: [],
  categories: [],
  sectors: [],
  roles: [],
  users: [],
  checklists: {},
  activeRole: "manager",
  globalQuery: "",
  filters: {
    problems: { query: "", category: "Todos", status: "Todos", urgency: "Todos", sector: "Todos", approved: "Todos" },
    inventory: { query: "", type: "Todos", sector: "Todos", status: "Todos", owner: "Todos" },
    knowledge: { query: "", category: "Todos", urgency: "Todos" }
  },
  exportScope: "all",
  inventoryView: "map",
  selectedInventorySector: "",
  editingAssetId: "",
  pendingDeleteProblemId: "",
  pendingDeleteProfileName: "",
  pendingDeleteAssetId: "",
  authUser: null,
  workspaceLoaded: false,
  remoteChannel: null
};

let appStarted = false;
let saveTimer;

function clone(value) {
  return JSON.parse(JSON.stringify(value));
}

function statePayload() {
  return {
    problems: state.problems,
    assets: state.assets,
    inventorySectors: state.inventorySectors,
    inventoryMovements: state.inventoryMovements,
    assetMaintenances: state.assetMaintenances,
    categories: state.categories,
    sectors: state.sectors,
    roles: state.roles,
    users: state.users,
    checklists: state.checklists,
    activeRole: state.activeRole
  };
}

function ensureArray(value) {
  return Array.isArray(value) ? value : [];
}

function sectorSlug(name) {
  return normalize(name).replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "") || `setor-${Date.now()}`;
}

function normalizeAsset(asset = {}) {
  const storage = asset.storage || asset.location || asset.sector || "Sem localização";
  const lastMaintenance = asset.lastMaintenance
    || ensureArray(asset.maintenance)[0]?.[0]
    || asset.lastCheck
    || "";
  return {
    ...asset,
    code: asset.code || asset.patrimony || asset.patrimonio || "",
    patrimony: asset.patrimony || asset.code || asset.patrimonio || "",
    location: asset.location || storage,
    deskRoom: asset.deskRoom || asset.room || asset.storage || "",
    responsible: asset.responsible || asset.user || "",
    user: asset.user || asset.responsible || "",
    physicalState: asset.physicalState || asset.condition || "Bom",
    condition: asset.condition || asset.physicalState || "Bom",
    registeredAt: asset.registeredAt || asset.createdAt || asset.acquiredAt || new Date().toISOString().slice(0, 10),
    lastMaintenance,
    maintenance: ensureArray(asset.maintenance),
    linkedProblems: ensureArray(asset.linkedProblems),
    tickets: ensureArray(asset.tickets),
    movementHistory: ensureArray(asset.movementHistory),
    quantity: Number(asset.quantity || 1),
    available: Number(asset.available || 0),
    inUse: Number(asset.inUse || 0),
    defective: Number(asset.defective || 0),
    minStock: Number(asset.minStock || 0)
  };
}

function deriveInventorySectors(names, existing = []) {
  const byName = new Map(existing.map((sector) => [normalize(sector.name), sector]));
  return unique(names.filter(Boolean)).map((name) => {
    const current = byName.get(normalize(name)) || {};
    return {
      id: current.id || `SEC-${sectorSlug(name)}`,
      name,
      description: current.description || `Setor ${name} monitorado no inventário de TI.`,
      owner: current.owner || current.responsible || role()?.name || "Gestor de TI",
      location: current.location || current.physicalLocation || name,
      createdAt: current.createdAt || new Date().toISOString().slice(0, 10)
    };
  });
}

function inventorySectorStats(sectorName) {
  const assets = state.assets.filter((asset) => asset.sector === sectorName);
  const openProblems = state.problems.filter((problem) => problem.sector === sectorName && !["Resolvido", "Validado", "Arquivado"].includes(problem.status));
  const maintenance = assets.filter((asset) => ["Em manutenção", "Com defeito", "Aguardando peça"].includes(asset.status));
  const lowStock = assets.filter((asset) => Number(asset.available || 0) < Number(asset.minStock || 0));
  return {
    assets,
    resources: assets.reduce((sum, asset) => sum + Number(asset.quantity || 1), 0),
    openProblems,
    maintenance,
    lowStock
  };
}

function addMovement(assetId, type, text, meta = {}) {
  const asset = state.assets.find((item) => item.id === assetId);
  const entry = {
    id: `MOV-${Date.now()}-${Math.floor(Math.random() * 1000)}`,
    assetId,
    type,
    text,
    actor: role().name,
    createdAt: new Date().toISOString(),
    ...meta
  };
  state.inventoryMovements.unshift(entry);
  if (asset) {
    asset.movementHistory = ensureArray(asset.movementHistory);
    asset.movementHistory.unshift(entry);
  }
  return entry;
}

function deriveAssetMaintenances(assets) {
  return assets.flatMap((asset) => ensureArray(asset.maintenance).map(([date, text, status], index) => ({
    id: `MNT-${asset.id}-${index}`,
    assetId: asset.id,
    assetName: asset.name,
    problem: text || "Manutenção registrada",
    technician: "Equipe de TI",
    entryDate: date || asset.lastMaintenance || asset.lastCheck || asset.registeredAt,
    exitDate: status === "Concluída" || status === "Resolvido" ? date : "",
    status: status || "Registrada",
    solution: status || "",
    cost: 0
  })));
}

function deriveInventoryMovements(assets, maintenances) {
  const movements = [];
  assets.forEach((asset) => {
    movements.push({
      id: `MOV-${asset.id}-created`,
      assetId: asset.id,
      type: "Criação",
      text: `${asset.name} cadastrado no setor ${asset.sector}.`,
      actor: "Sistema",
      createdAt: asset.registeredAt || asset.acquiredAt || new Date().toISOString()
    });
    if (asset.loan) {
      movements.push({
        id: `MOV-${asset.id}-loan`,
        assetId: asset.id,
        type: "Empréstimo",
        text: `${asset.name} emprestado para ${asset.loan.person || asset.user || "responsável"}.`,
        actor: "Sistema",
        createdAt: asset.loan.start || asset.registeredAt || new Date().toISOString()
      });
    }
  });
  maintenances.forEach((item) => movements.push({
    id: `MOV-${item.id}`,
    assetId: item.assetId,
    type: "Manutenção",
    text: `${item.assetName}: ${item.problem}`,
    actor: item.technician || "Equipe de TI",
    createdAt: item.entryDate || new Date().toISOString(),
    maintenanceId: item.id
  }));
  return movements.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
}

function applyWorkspaceData(data) {
  const seed = clone(window.SolveDeskSeed);
  const payload = data || {};
  state.problems = Array.isArray(payload.problems) ? payload.problems : seed.problems;
  state.categories = Array.isArray(payload.categories) ? payload.categories : seed.categories;
  state.sectors = Array.isArray(payload.sectors) ? payload.sectors : seed.sectors;
  state.roles = Array.isArray(payload.roles) ? payload.roles : seed.roles;
  state.assets = (Array.isArray(payload.assets) ? payload.assets : seed.assets).map(normalizeAsset);
  const sectorNames = unique([
    ...state.sectors,
    ...state.assets.map((asset) => asset.sector),
    "Estoque TI"
  ]);
  state.inventorySectors = deriveInventorySectors(sectorNames, Array.isArray(payload.inventorySectors) ? payload.inventorySectors : seed.inventorySectors);
  state.assetMaintenances = Array.isArray(payload.assetMaintenances) ? payload.assetMaintenances : (seed.assetMaintenances || deriveAssetMaintenances(state.assets));
  state.inventoryMovements = Array.isArray(payload.inventoryMovements) ? payload.inventoryMovements : (seed.inventoryMovements || deriveInventoryMovements(state.assets, state.assetMaintenances));
  state.users = Array.isArray(payload.users) ? payload.users : seed.users;
  state.checklists = payload.checklists && typeof payload.checklists === "object" ? payload.checklists : seed.checklists;
  state.activeRole = payload.activeRole || "manager";
  state.inventoryView = payload.inventoryView || "map";
  state.selectedInventorySector = payload.selectedInventorySector || "";
}

async function loadState() {
  if (!supabaseClient || !state.authUser) throw new Error("Supabase não inicializado.");
  const { data, error } = await supabaseClient
    .from(SUPABASE_WORKSPACE_TABLE)
    .select("data")
    .eq("user_id", state.authUser.id)
    .maybeSingle();

  if (error) throw error;

  if (data?.data) {
    applyWorkspaceData(data.data);
  } else {
    applyWorkspaceData(clone(window.SolveDeskSeed));
    await persistStateNow();
  }
  state.workspaceLoaded = true;
}

async function persistProfile() {
  if (!supabaseClient || !state.authUser) return;
  await supabaseClient
    .from(SUPABASE_PROFILE_TABLE)
    .upsert({
      user_id: state.authUser.id,
      email: state.authUser.email,
      updated_at: new Date().toISOString()
    }, { onConflict: "user_id" });
}

async function persistStateNow() {
  if (!supabaseClient || !state.authUser) return;
  const { error } = await supabaseClient
    .from(SUPABASE_WORKSPACE_TABLE)
    .upsert({
      user_id: state.authUser.id,
      data: statePayload(),
      updated_at: new Date().toISOString()
    }, { onConflict: "user_id" });
  if (error) throw error;
}

function saveState() {
  if (!supabaseClient || !state.authUser) return;
  window.clearTimeout(saveTimer);
  saveTimer = window.setTimeout(() => {
    persistStateNow().catch((error) => toast("Falha ao sincronizar", error.message || "Confira o Supabase."));
  }, 350);
}

function escapeHtml(value) {
  return String(value ?? "")
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

function normalize(value) {
  return String(value ?? "")
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase();
}

function listFromText(value) {
  return String(value ?? "")
    .split(/\n|,/)
    .map((item) => item.trim())
    .filter(Boolean);
}

function formatDate(value) {
  if (!value) return "Sem data";
  const raw = String(value);
  const brMatch = raw.match(/^(\d{2})\/(\d{2})\/(\d{4})$/);
  const date = brMatch
    ? new Date(`${brMatch[3]}-${brMatch[2]}-${brMatch[1]}T00:00:00`)
    : new Date(raw.includes("T") ? raw : `${raw}T00:00:00`);
  if (Number.isNaN(date.getTime())) return raw;
  return new Intl.DateTimeFormat("pt-BR", { day: "2-digit", month: "2-digit", year: "numeric" }).format(date);
}

function unique(values) {
  return [...new Set(values.filter(Boolean))].sort((a, b) => a.localeCompare(b, "pt-BR"));
}

function setLoginError(message, active = true) {
  const error = $("#loginError");
  if (!error) return;
  error.textContent = message;
  error.classList.toggle("active", active && Boolean(message));
}

function supabaseErrorMessage(error, fallback = "Erro desconhecido do Supabase.") {
  if (!error) return fallback;
  const parts = [
    error.message,
    error.error_description,
    error.details,
    error.hint,
    error.code ? `Código: ${error.code}` : ""
  ].filter(Boolean);
  return parts.join(" | ") || fallback;
}

function reportAuthError(error, context = "Erro de autenticação") {
  console.error(`[Supabase Auth] ${context}`, error);
  const message = supabaseErrorMessage(error, context);
  if (message === "Failed to fetch" || message.includes("Failed to fetch")) {
    setLoginError(`Falha de rede ao acessar ${SUPABASE_URL}. Confira se o projeto Supabase existe e se o DNS resolve este domínio.`);
    return;
  }
  setLoginError(message);
}

async function assertSupabaseReachable() {
  try {
    const response = await fetch(SUPABASE_HEALTH_URL, { cache: "no-store" });
    console.info("[Supabase Network] health check", {
      url: SUPABASE_HEALTH_URL,
      ok: response.ok,
      status: response.status
    });
  } catch (error) {
    console.error("[Supabase Network] Falha ao acessar Supabase", {
      url: SUPABASE_HEALTH_URL,
      configuredUrl: SUPABASE_URL,
      expectedHost: "ktovpehotipiwovkfkal.supabase.co",
      error
    });
    throw error;
  }
}

function unlockApp() {
  document.body.classList.remove("auth-locked");
  document.body.classList.add("auth-ready");
  $(".app-frame")?.removeAttribute("aria-hidden");
  $("#loginScreen")?.setAttribute("aria-hidden", "true");
}

function showLogin() {
  document.body.classList.add("auth-locked");
  document.body.classList.remove("auth-ready");
  $(".app-frame")?.setAttribute("aria-hidden", "true");
  $("#loginScreen")?.removeAttribute("aria-hidden");
  setLoginError(supabaseClient ? "" : "Supabase não carregou. Verifique a conexão com a internet.", !supabaseClient);
  window.setTimeout(() => $("#loginEmail")?.focus(), 100);
}

async function handleLogin(event) {
  event.preventDefault();
  if (!supabaseClient) throw new Error("Supabase não inicializado.");
  const form = event.currentTarget;
  const data = new FormData(form);
  const email = String(data.get("email") || "").trim();
  const password = String(data.get("password") || "");
  const mode = form.dataset.mode || "signin";
  const button = $("#authSubmitBtn");
  button.disabled = true;
  button.textContent = mode === "signup" ? "Criando acesso..." : "Entrando...";

  try {
    await assertSupabaseReachable();
    const response = mode === "signup"
      ? await supabaseClient.auth.signUp({ email, password })
      : await supabaseClient.auth.signInWithPassword({ email, password });
    console.info(`[Supabase Auth] ${mode === "signup" ? "signUp" : "signInWithPassword"} response`, response);
    if (response.error) throw response.error;

    let authData = response.data;
    if (mode === "signup" && !authData.session) {
      const loginAfterSignup = await supabaseClient.auth.signInWithPassword({ email, password });
      console.info("[Supabase Auth] signInWithPassword after signUp response", loginAfterSignup);
      if (loginAfterSignup.error) throw loginAfterSignup.error;
      authData = loginAfterSignup.data;
    }

    if (!authData?.user) throw new Error("Supabase não retornou usuário autenticado.");
    state.authUser = authData.user;
    form.reset();
    setLoginError("");
    await startApp();
  } catch (error) {
    reportAuthError(error, mode === "signup" ? "Erro ao criar acesso" : "Erro ao entrar");
  } finally {
    button.disabled = false;
    button.textContent = mode === "signup" ? "Criar acesso" : "Entrar";
  }
}

function setAuthMode(mode) {
  const form = $("#loginForm");
  if (!form) return;
  form.dataset.mode = mode;
  $("[data-auth-mode='signin']")?.classList.toggle("active", mode === "signin");
  $("[data-auth-mode='signup']")?.classList.toggle("active", mode === "signup");
  $("#authSubmitBtn").textContent = mode === "signup" ? "Criar acesso" : "Entrar";
  setLoginError("");
}

function bindAuthEvents() {
  $$("[data-auth-mode]").forEach((button) => {
    button.addEventListener("click", () => setAuthMode(button.dataset.authMode));
  });
  $("#loginForm")?.addEventListener("submit", (event) => {
    handleLogin(event).catch((error) => {
      reportAuthError(error, "Falha no formulário de autenticação");
    });
  });
  $("#logoutBtn")?.addEventListener("click", () => {
    supabaseClient?.auth.signOut().finally(() => window.location.reload());
  });
}

function countBy(items, keyFn) {
  return items.reduce((acc, item) => {
    const key = keyFn(item) || "Sem classificação";
    acc[key] = (acc[key] || 0) + 1;
    return acc;
  }, {});
}

function topEntry(map) {
  return Object.entries(map).sort((a, b) => b[1] - a[1])[0] || ["Sem dados", 0];
}

function role() {
  return state.roles.find((item) => item.id === state.activeRole) || state.roles[0];
}

function can(action) {
  const permissions = {
    admin: ["create", "edit", "approve", "delete", "export", "settings"],
    manager: ["create", "edit", "approve", "delete", "export"],
    technician: ["create", "edit", "export"],
    attendant: ["create", "export"],
    viewer: ["export"]
  };
  return (permissions[state.activeRole] || []).includes(action);
}

function statusClass(value) {
  const normalized = normalize(value);
  if (["resolvido", "validado", "disponivel"].includes(normalized)) return "status-resolved";
  if (["aberto", "em analise", "em teste", "aguardando cliente", "aguardando setor interno"].includes(normalized)) return "status-open";
  if (["com defeito", "em manutencao", "critico", "reaberto"].includes(normalized)) return "status-critical";
  if (["emprestado", "reservado", "aguardando compra", "aguardando peca"].includes(normalized)) return "status-loan";
  return "status-waiting";
}

function urgencyClass(value) {
  const normalized = normalize(value);
  if (normalized === "critica") return "critical";
  if (normalized === "alta") return "high";
  if (normalized === "media") return "medium";
  return "low";
}

function injectIcons(root = document) {
  $$("[data-icon]", root).forEach((element) => {
    const key = element.dataset.icon;
    element.innerHTML = ICONS[key] || "";
  });
}

function initTheme() {
  if (localStorage.getItem(THEME_KEY) === "light") {
    document.body.classList.add("light");
  }
}

function toggleTheme() {
  document.body.classList.toggle("light");
  localStorage.setItem(THEME_KEY, document.body.classList.contains("light") ? "light" : "dark");
}

function metrics() {
  const totalProblems = state.problems.length;
  const resolvedProblems = state.problems.filter((item) => ["Resolvido", "Validado", "Arquivado"].includes(item.status)).length;
  const pendingProblems = totalProblems - resolvedProblems;
  const urgentProblems = state.problems.filter((item) => ["Alta", "Crítica"].includes(item.urgency)).length;
  const totalSolutions = state.problems.filter((item) => item.solution).length;
  const averageTime = totalProblems ? Math.round(state.problems.reduce((sum, item) => sum + Number(item.timeSpent || 0), 0) / totalProblems) : 0;
  const topCategory = topEntry(countBy(state.problems, (item) => item.category))[0];
  const topClient = topEntry(countBy(state.problems, (item) => item.client))[0];
  const totalAssets = state.assets.reduce((sum, item) => sum + Number(item.quantity || 1), 0);
  const assetsInUse = state.assets.filter((item) => ["Em uso", "Emprestado"].includes(item.status)).length;
  const assetsAvailable = state.assets.reduce((sum, item) => sum + Number(item.available || (item.status === "Disponível" ? 1 : 0)), 0);
  const assetsAttention = state.assets.filter((item) => ["Com defeito", "Em manutenção", "Aguardando peça"].includes(item.status) || item.condition === "Crítico").length;
  const assetsMaintenance = state.assets.filter((item) => ["Em manutenção", "Com defeito", "Aguardando peça"].includes(item.status)).length;
  const lowStockAssets = state.assets.filter((item) => Number(item.available || 0) < Number(item.minStock || 0)).length;
  const sectorHotspot = topEntry(countBy(state.problems.filter((item) => !["Resolvido", "Validado", "Arquivado"].includes(item.status)), (item) => item.sector))[0];
  const problematicAsset = topEntry(countBy(state.problems.filter((item) => item.assetId), (item) => item.assetId))[0];
  const problematicAssetName = state.assets.find((asset) => asset.id === problematicAsset)?.name || "Sem histórico";
  const productivity = totalProblems ? Math.round((resolvedProblems / totalProblems) * 100) : 0;

  return {
    totalProblems,
    resolvedProblems,
    pendingProblems,
    urgentProblems,
    totalSolutions,
    averageTime,
    topCategory,
    topClient,
    totalAssets,
    assetsInUse,
    assetsAvailable,
    assetsAttention,
    assetsMaintenance,
    lowStockAssets,
    sectorHotspot,
    problematicAssetName,
    productivity
  };
}

function periodData() {
  const groups = countBy(state.problems, (item) => item.month || item.occurredAt?.slice(0, 7) || "Sem período");
  return Object.keys(groups).sort().map((month) => {
    const problems = state.problems.filter((item) => (item.month || item.occurredAt?.slice(0, 7)) === month);
    const solutions = problems.filter((item) => ["Resolvido", "Validado"].includes(item.status)).length;
    return {
      month,
      problems: problems.length,
      solutions,
      rate: problems.length ? Math.round((solutions / problems.length) * 100) : 0,
      category: topEntry(countBy(problems, (item) => item.category))[0],
      sector: topEntry(countBy(problems, (item) => item.sector))[0]
    };
  });
}

function pageHead(kicker, title, text, action = "") {
  return `
    <header class="page-head reveal">
      <div>
        <span class="panel-kicker">${escapeHtml(kicker)}</span>
        <h1>${escapeHtml(title)}</h1>
        <p>${escapeHtml(text)}</p>
      </div>
      <div class="inline-actions">${action}</div>
    </header>
  `;
}

function metricCard(label, value, hint, color, heights = [40, 68, 48, 82]) {
  return `
    <article class="kpi-card reveal" style="--accent:${color}">
      <span class="metric-label">${escapeHtml(label)}</span>
      <strong>${escapeHtml(value)}</strong>
      <small>${escapeHtml(hint)}</small>
      <div class="metric-spark" aria-hidden="true">${heights.map((height) => `<span style="height:${height}%"></span>`).join("")}</div>
    </article>
  `;
}

function renderDashboard() {
  const m = metrics();
  const monthly = periodData();
  const categoryMap = countBy(state.problems, (item) => item.category);
  const topCategories = Object.entries(categoryMap).sort((a, b) => b[1] - a[1]).slice(0, 5);
  const maxCat = Math.max(1, ...topCategories.map(([, value]) => value));
  const latest = [...state.problems].sort((a, b) => new Date(b.occurredAt) - new Date(a.occurredAt)).slice(0, 5);
  const solvedPct = m.totalProblems ? Math.round((m.resolvedProblems / m.totalProblems) * 100) : 0;
  const pendingPct = m.totalProblems ? solvedPct + Math.round((m.pendingProblems / m.totalProblems) * 100) : 0;

  $("#view-dashboard").innerHTML = `
    ${pageHead("central de comando", "Dashboard operacional", "Chamados, soluções, inventário e produtividade em um só painel.")}
    <section class="kpi-grid">
      ${metricCard("Problemas registrados", m.totalProblems, "Base completa", "var(--teal)")}
      ${metricCard("Soluções concluídas", m.resolvedProblems, `${m.productivity}% de resolução`, "var(--green)", [35, 88, 60, 96])}
      ${metricCard("Problemas em aberto", m.pendingProblems, "Ainda em fluxo", "var(--amber)", [42, 56, 48, 70])}
      ${metricCard("Urgentes", m.urgentProblems, "Alta ou crítica", "var(--red)", [64, 40, 78, 92])}
    </section>
    <section class="kpi-grid suite-kpis">
      ${metricCard("Total de recursos", m.totalAssets, "Inventário mapeado", "var(--blue)")}
      ${metricCard("Disponíveis", m.assetsAvailable, "Prontos para uso", "var(--green)")}
      ${metricCard("Em uso", m.assetsInUse, "Alocados ou emprestados", "var(--violet)")}
      ${metricCard("Em manutenção", m.assetsMaintenance, "Aguardando ação técnica", "var(--red)")}
    </section>
    <section class="kpi-grid suite-kpis">
      ${metricCard("Estoque baixo", m.lowStockAssets, "Reposição necessária", "var(--amber)")}
      ${metricCard("Setor com mais chamados", m.sectorHotspot, "Pendências abertas", "var(--blue)")}
      ${metricCard("Equipamento problemático", m.problematicAssetName, "Maior histórico vinculado", "var(--red)")}
      ${metricCard("Setores mapeados", state.inventorySectors.length, "Mapa físico ativo", "var(--teal)")}
    </section>
    <section class="dashboard-grid suite-dashboard">
      <article class="glass-panel reveal suite-chart-panel">
        <div class="panel-head">
          <div><span class="panel-kicker">evolução de chamados</span><h2>Registrados x resolvidos</h2></div>
          <span class="tag">Últimos 6 meses</span>
        </div>
        <div class="suite-combo-chart">
          ${monthly.map((row) => `
            <div class="suite-month">
              <span class="suite-bar registered" style="height:${Math.max(14, row.problems * 18)}px"></span>
              <span class="suite-bar resolved" style="height:${Math.max(12, row.solutions * 18)}px"></span>
              <small>${escapeHtml(row.month)}</small>
            </div>
          `).join("")}
        </div>
        <div class="suite-summary-list">
          <div><small>Total registrados</small><strong>${m.totalProblems}</strong><span>+12,5%</span></div>
          <div><small>Total resolvidos</small><strong>${m.resolvedProblems}</strong><span>+18,3%</span></div>
          <div><small>Taxa de resolução</small><strong>${m.productivity}%</strong><span>+4,1 p.p.</span></div>
        </div>
      </article>
      <article class="glass-panel reveal">
        <div class="panel-head">
          <div><span class="panel-kicker">status</span><h2>Resolução</h2></div>
        </div>
        <div class="donut-row">
          <div class="donut" style="--solved:${solvedPct}%;--pending:${pendingPct}%"></div>
          <div class="legend">
            <span><i style="background:var(--green)"></i>Resolvidos: ${m.resolvedProblems}</span>
            <span><i style="background:var(--amber)"></i>Pendentes: ${m.pendingProblems}</span>
            <span><i style="background:var(--red)"></i>Urgentes: ${m.urgentProblems}</span>
          </div>
        </div>
      </article>
    </section>
    <section class="content-grid suite-lower-grid">
      <article class="glass-panel reveal">
        <div class="panel-head"><div><span class="panel-kicker">evolução</span><h2>Chamados por mês</h2></div></div>
        <div class="chart-bars">
          ${monthly.map((row) => barRow(row.month, row.problems, Math.max(1, ...monthly.map((item) => item.problems)))).join("")}
        </div>
      </article>
      <article class="glass-panel reveal">
        <div class="panel-head"><div><span class="panel-kicker">recorrência</span><h2>Categorias problemáticas</h2></div></div>
        <div class="category-bars">
          ${topCategories.map(([label, value]) => barRow(label, value, maxCat)).join("")}
        </div>
      </article>
      <article class="glass-panel reveal">
        <div class="panel-head"><div><span class="panel-kicker">últimos registros</span><h2>Problemas adicionados</h2></div></div>
        <div class="list-stack">${latest.map(compactProblemRow).join("")}</div>
      </article>
      <article class="glass-panel reveal">
        <div class="panel-head"><div><span class="panel-kicker">acessos</span><h2>Soluções mais acessadas</h2></div></div>
        <div class="list-stack">${[...state.problems].sort((a, b) => b.accesses - a.accesses).slice(0, 5).map((item) => `
          <div class="compact-row">
            <div><h3>${escapeHtml(item.title)}</h3><p>${escapeHtml(item.category)} · ${item.accesses} acessos</p></div>
            <span class="status-chip ${statusClass(item.status)}">${escapeHtml(item.status)}</span>
          </div>
        `).join("")}</div>
      </article>
    </section>
  `;
}

function barRow(label, value, max) {
  const width = Math.max(8, Math.round((value / max) * 100));
  return `
    <div class="bar-row">
      <strong>${escapeHtml(label)}</strong>
      <span class="bar-track"><span class="bar-fill" style="--w:${width}%"></span></span>
      <b>${value}</b>
    </div>
  `;
}

function compactProblemRow(problem) {
  return `
    <button class="compact-row ripple-btn" type="button" data-open-problem="${problem.id}">
      <div><h3>${escapeHtml(problem.title)}</h3><p>${escapeHtml(problem.client)} · ${escapeHtml(problem.category)}</p></div>
      <span class="badge ${urgencyClass(problem.urgency)}">${escapeHtml(problem.urgency)}</span>
    </button>
  `;
}

function filterProblems(source = state.problems, filters = state.filters.problems) {
  const query = normalize([filters.query, state.globalQuery].filter(Boolean).join(" "));
  return source.filter((problem) => {
    const haystack = normalize([
      problem.title,
      problem.client,
      problem.sector,
      problem.category,
      problem.status,
      problem.urgency,
      problem.owner,
      problem.description,
      problem.symptoms,
      problem.solution,
      problem.probableCause,
      problem.confirmedCause,
      problem.tags?.join(" ")
    ].join(" "));
    return (!query || haystack.includes(query))
      && (filters.category === "Todos" || problem.category === filters.category)
      && (filters.status === "Todos" || problem.status === filters.status)
      && (filters.urgency === "Todos" || problem.urgency === filters.urgency)
      && (filters.sector === "Todos" || problem.sector === filters.sector)
      && (filters.approved === "Todos" || (filters.approved === "Sim" ? ["Aprovada", "Solução definitiva"].includes(problem.solutionState) : !["Aprovada", "Solução definitiva"].includes(problem.solutionState)));
  });
}

function renderProblems() {
  const filtered = filterProblems();
  const m = metrics();
  const resolvedRate = m.totalProblems ? Math.round((m.resolvedProblems / m.totalProblems) * 100) : 0;
  const topCategories = Object.entries(countBy(state.problems, (problem) => problem.category)).sort((a, b) => b[1] - a[1]).slice(0, 6);
  const maxCat = Math.max(1, ...topCategories.map(([, value]) => value));
  $("#view-problems").innerHTML = `
    ${pageHead("gestão de chamados", "Problemas e soluções", "Cada chamado resolvido vira memória coletiva da equipe.", `
      <button class="primary-btn ripple-btn" type="button" data-open-modal="problemModal"><span data-icon="plus"></span>Cadastrar problema</button>
    `)}
    <section class="kpi-grid suite-kpis">
      ${metricCard("Problemas registrados", m.totalProblems, "+12% vs. mês anterior", "var(--blue)")}
      ${metricCard("Em aberto", m.pendingProblems, "+8% vs. mês anterior", "var(--violet)", [35, 68, 50, 82])}
      ${metricCard("Solucionados", m.resolvedProblems, "+15% vs. mês anterior", "var(--green)", [48, 72, 84, 96])}
      ${metricCard("Urgentes", m.urgentProblems, "-5% vs. mês anterior", "var(--red)", [78, 52, 64, 46])}
    </section>
    ${problemToolbar()}
    <section class="board-layout suite-workspace">
      <article class="glass-panel reveal suite-table-panel">
        <div class="panel-head">
          <div><span class="panel-kicker">problemas registrados</span><h2>Registros detalhados <span class="tag">${filtered.length} resultados</span></h2></div>
          <button class="ghost-btn ripple-btn" type="button"><span data-icon="dashboard"></span>Visualização</button>
        </div>
        ${problemTable(filtered)}
      </article>
      <aside class="side-panel">
        <article class="glass-panel reveal">
          <div class="panel-head"><div><span class="panel-kicker">recorrência</span><h2>Problemas parecidos</h2></div></div>
          <div class="recurrence-list">${recurrenceItems().join("")}</div>
        </article>
        <article class="glass-panel reveal">
          <div class="panel-head"><div><span class="panel-kicker">checklist</span><h2>Resolução por categoria</h2></div></div>
          ${checklistBox(state.filters.problems.category === "Todos" ? "Rede e internet" : state.filters.problems.category)}
        </article>
        <article class="glass-panel reveal">
          <div class="panel-head"><div><span class="panel-kicker">categorias</span><h2>Mais recorrentes</h2></div></div>
          <div class="category-bars">${topCategories.map(([label, value]) => barRow(label, value, maxCat)).join("")}</div>
        </article>
      </aside>
    </section>
    <section class="content-grid suite-lower-grid">
      <article class="glass-panel reveal">
        <div class="panel-head"><div><span class="panel-kicker">evolução</span><h2>Evolução de problemas</h2></div></div>
        <div class="chart-bars">${periodData().map((row) => barRow(row.month, row.problems, Math.max(1, ...periodData().map((item) => item.problems)))).join("")}</div>
      </article>
      <article class="glass-panel reveal suite-score-card">
        <div class="panel-head"><div><span class="panel-kicker">resolução</span><h2>Taxa de resolução</h2></div></div>
        <div class="suite-ring" style="--value:${resolvedRate}%"><strong>${resolvedRate}%</strong><small>no prazo</small></div>
      </article>
      <article class="glass-panel reveal">
        <div class="panel-head"><div><span class="panel-kicker">sla</span><h2>SLA por categoria</h2></div></div>
        <div class="category-bars">${topCategories.map(([label, value]) => barRow(label, Math.max(65, 98 - value * 4), 100)).join("")}</div>
      </article>
    </section>
  `;
}

function problemToolbar() {
  return `
    <div class="toolbar-panel reveal">
      <label class="search-field">
        <span class="table-label">Palavra-chave</span>
        <input data-problem-filter="query" type="search" value="${escapeHtml(state.filters.problems.query)}" placeholder="cliente com problema no arquivo">
      </label>
      <div class="filter-row">
        ${selectFilter("Categoria", "category", ["Todos", ...state.categories], state.filters.problems.category, "problem")}
        ${selectFilter("Status", "status", ["Todos", "Aberto", "Em análise", "Aguardando cliente", "Aguardando setor interno", "Em teste", "Resolvido", "Validado", "Arquivado", "Reaberto"], state.filters.problems.status, "problem")}
        ${selectFilter("Urgência", "urgency", ["Todos", "Baixa", "Média", "Alta", "Crítica"], state.filters.problems.urgency, "problem")}
        ${selectFilter("Setor", "sector", ["Todos", ...state.sectors], state.filters.problems.sector, "problem")}
        ${selectFilter("Aprovada", "approved", ["Todos", "Sim", "Não"], state.filters.problems.approved, "problem")}
      </div>
    </div>
  `;
}

function selectFilter(label, key, options, value, namespace) {
  return `
    <label>
      <span class="table-label">${escapeHtml(label)}</span>
      <select data-${namespace}-filter="${key}">
        ${options.map((option) => `<option value="${escapeHtml(option)}" ${option === value ? "selected" : ""}>${escapeHtml(option)}</option>`).join("")}
      </select>
    </label>
  `;
}

function problemCard(problem) {
  const similar = similarProblems(problem).length;
  return `
    <article class="problem-card ${urgencyClass(problem.urgency)} reveal" data-problem-card="${problem.id}">
      <div class="card-title">
        <span class="card-eyebrow">${escapeHtml(problem.client)} · ${escapeHtml(problem.sector)}</span>
        <h3>${escapeHtml(problem.title)}</h3>
        <p>${escapeHtml(problem.description)}</p>
      </div>
      <div class="chip-row">
        <span class="badge ${urgencyClass(problem.urgency)}">${escapeHtml(problem.urgency)}</span>
        <span class="status-chip ${statusClass(problem.status)}">${escapeHtml(problem.status)}</span>
        <span class="tag">${escapeHtml(problem.category)}</span>
      </div>
      <div class="root-cause-mini">
        <div><small>Sintoma</small>${escapeHtml(problem.symptoms)}</div>
        <div><small>Causa</small>${escapeHtml(problem.confirmedCause || problem.probableCause)}</div>
      </div>
      <p class="card-text">${escapeHtml(problem.solution)}</p>
      <div class="chip-row">${problem.tags.slice(0, 4).map((tag) => `<span class="tag">${escapeHtml(tag)}</span>`).join("")}</div>
      <div class="inline-actions">
        <button class="ghost-btn ripple-btn" type="button" data-open-problem="${problem.id}"><span data-icon="eye"></span>Detalhes</button>
        <button class="copy-btn ripple-btn" type="button" data-copy-solution="${problem.id}"><span data-icon="copy"></span>Solução rápida</button>
        ${can("delete") ? `<button class="danger-btn ripple-btn" type="button" data-delete-problem="${problem.id}">Excluir</button>` : ""}
        ${similar ? `<span class="badge ${urgencyClass(problem.urgency)}">${similar} recorrente${similar > 1 ? "s" : ""}</span>` : ""}
      </div>
    </article>
  `;
}

function problemTable(problems) {
  return `
    <div class="table-wrap">
      <table>
        <thead><tr><th>ID</th><th>Data</th><th>Título</th><th>Cliente/Setor</th><th>Categoria</th><th>Status</th><th>Urgência</th><th>Responsável</th><th>Tempo</th><th>Ação</th></tr></thead>
        <tbody>
          ${problems.map((problem) => `
            <tr>
              <td>${escapeHtml(problem.id)}</td>
              <td>${formatDate(problem.occurredAt)}</td>
              <td>${escapeHtml(problem.title)}</td>
              <td>${escapeHtml(problem.client)} / ${escapeHtml(problem.sector)}</td>
              <td>${escapeHtml(problem.category)}</td>
              <td><span class="status-chip ${statusClass(problem.status)}">${escapeHtml(problem.status)}</span></td>
              <td><span class="badge ${urgencyClass(problem.urgency)}">${escapeHtml(problem.urgency)}</span></td>
              <td>${escapeHtml(problem.owner)}</td>
              <td>${problem.timeSpent} min</td>
              <td>
                <div class="table-actions">
                  <button class="mini-action ripple-btn" type="button" data-open-problem="${problem.id}"><span data-icon="eye"></span></button>
                  ${can("delete") ? `<button class="mini-action danger-mini ripple-btn" type="button" data-delete-problem="${problem.id}" aria-label="Excluir ${escapeHtml(problem.title)}">×</button>` : ""}
                </div>
              </td>
            </tr>
          `).join("")}
        </tbody>
      </table>
    </div>
  `;
}

function recurrenceItems() {
  const categoryCounts = Object.entries(countBy(state.problems, (problem) => problem.category))
    .filter(([, total]) => total > 1)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 5);
  return categoryCounts.map(([category, total]) => `
    <div class="alert-item">
      <strong>${escapeHtml(category)}</strong>
      <small>Este tipo já apareceu ${total} vezes na base.</small>
    </div>
  `);
}

function checklistBox(category) {
  const checklist = state.checklists[category] || ["Registrar evidências", "Identificar causa provável", "Testar solução", "Validar com o setor", "Documentar prevenção"];
  return `<div class="checklist-box">${checklist.map((item) => `<label class="switch-field"><span>${escapeHtml(item)}</span><input type="checkbox"></label>`).join("")}</div>`;
}

function similarProblems(problem) {
  const tags = new Set(problem.tags || []);
  return state.problems.filter((candidate) => {
    if (candidate.id === problem.id) return false;
    const sharedTags = (candidate.tags || []).filter((tag) => tags.has(tag)).length;
    return candidate.category === problem.category || sharedTags >= 2 || normalize(candidate.title).includes(normalize(problem.category));
  });
}

function renderKnowledge() {
  const filters = state.filters.knowledge;
  const query = normalize([filters.query, state.globalQuery].filter(Boolean).join(" "));
  const articles = state.problems.filter((problem) => ["Resolvido", "Validado", "Arquivado"].includes(problem.status))
    .filter((problem) => {
      const haystack = normalize([problem.title, problem.category, problem.solution, problem.confirmedCause, problem.tags.join(" ")].join(" "));
      return (!query || haystack.includes(query))
        && (filters.category === "Todos" || problem.category === filters.category)
        && (filters.urgency === "Todos" || problem.urgency === filters.urgency);
    });

  $("#view-knowledge").innerHTML = `
    ${pageHead("base de conhecimento", "Artigos internos", "Soluções aprovadas convertidas em referência operacional.")}
    <div class="toolbar-panel reveal">
      <label class="search-field"><span class="table-label">Buscar artigo</span><input data-knowledge-filter="query" value="${escapeHtml(filters.query)}" placeholder="erro na impressora"></label>
      <div class="filter-row">
        ${selectFilter("Categoria", "category", ["Todos", ...state.categories], filters.category, "knowledge")}
        ${selectFilter("Urgência", "urgency", ["Todos", "Baixa", "Média", "Alta", "Crítica"], filters.urgency, "knowledge")}
      </div>
    </div>
    <section class="knowledge-layout">
      <article class="glass-panel reveal suite-table-panel">
        <div class="panel-head">
          <div><span class="panel-kicker">biblioteca de artigos</span><h2>Artigos publicados <span class="tag">${articles.length} itens</span></h2></div>
        </div>
        <div class="table-wrap">
          <table>
            <thead><tr><th>Artigo</th><th>Categoria</th><th>Cliente</th><th>Responsável</th><th>Visualizações</th><th>Status</th><th>Urgência</th><th>Ação</th></tr></thead>
            <tbody>
              ${articles.map((problem) => `
                <tr>
                  <td><strong>${escapeHtml(problem.title)}</strong><br><small>${escapeHtml(problem.solution || "").slice(0, 82)}${String(problem.solution || "").length > 82 ? "..." : ""}</small></td>
                  <td>${escapeHtml(problem.category)}</td>
                  <td>${escapeHtml(problem.client)}</td>
                  <td>${escapeHtml(problem.owner)}</td>
                  <td>${problem.accesses}</td>
                  <td><span class="status-chip ${statusClass(problem.status)}">${escapeHtml(problem.status)}</span></td>
                  <td><span class="badge ${urgencyClass(problem.urgency)}">${escapeHtml(problem.urgency)}</span></td>
                  <td><button class="mini-action ripple-btn" type="button" data-open-problem="${problem.id}"><span data-icon="eye"></span></button></td>
                </tr>
              `).join("") || `<tr><td colspan="8">Nenhum artigo encontrado.</td></tr>`}
            </tbody>
          </table>
        </div>
      </article>
      <aside class="side-panel">
        <article class="glass-panel reveal">
          <div class="panel-head"><div><span class="panel-kicker">mais usadas</span><h2>Soluções rápidas</h2></div></div>
          <div class="list-stack">${[...articles].sort((a, b) => b.accesses - a.accesses).slice(0, 5).map(compactProblemRow).join("")}</div>
        </article>
        <article class="glass-panel reveal">
          <div class="panel-head"><div><span class="panel-kicker">tags</span><h2>Tags recorrentes</h2></div></div>
          <div class="chip-row">${unique(articles.flatMap((item) => item.tags || [])).slice(0, 10).map((tag) => `<span class="tag">${escapeHtml(tag)}</span>`).join("")}</div>
        </article>
      </aside>
    </section>
    <section class="content-grid suite-lower-grid">
      <article class="glass-panel reveal">
        <div class="panel-head"><div><span class="panel-kicker">acessos</span><h2>Artigos mais acessados</h2></div></div>
        <div class="category-bars">${[...articles].sort((a, b) => b.accesses - a.accesses).slice(0, 5).map((item) => barRow(item.title, item.accesses, Math.max(1, ...articles.map((article) => article.accesses)))).join("")}</div>
      </article>
      <article class="glass-panel reveal suite-score-card">
        <div class="panel-head"><div><span class="panel-kicker">distribuição</span><h2>Por categoria</h2></div></div>
        <div class="suite-ring" style="--value:82%"><strong>${articles.length}</strong><small>artigos</small></div>
      </article>
    </section>
  `;
}

function filterAssets() {
  const filters = state.filters.inventory;
  const query = normalize([filters.query, state.globalQuery].filter(Boolean).join(" "));
  return state.assets.filter((asset) => {
    const haystack = normalize([asset.name, asset.type, asset.code, asset.location, asset.deskRoom, asset.brand, asset.model, asset.sector, asset.user, asset.status, asset.condition, asset.notes].join(" "));
    const ownerMatches = filters.owner === "Todos"
      || (filters.owner === "Sem responsável" ? !asset.user : asset.user === filters.owner);
    return (!query || haystack.includes(query))
      && (filters.type === "Todos" || asset.type === filters.type)
      && (filters.sector === "Todos" || asset.sector === filters.sector)
      && (filters.status === "Todos" || asset.status === filters.status)
      && ownerMatches;
  });
}

function inventorySubnav() {
  const tabs = [
    ["resources", "Recursos"],
    ["sectors", "Setores"],
    ["map", "Mapa físico"],
    ["loans", "Empréstimos"],
    ["maintenance", "Manutenções"],
    ["lowStock", "Estoque baixo"]
  ];
  return `
    <nav class="inventory-tabs reveal" aria-label="Subáreas do inventário">
      ${tabs.map(([id, label]) => `<button class="tab-pill ${state.inventoryView === id ? "active" : ""}" type="button" data-inventory-view="${id}">${label}</button>`).join("")}
    </nav>
  `;
}

function inventorySummaryData() {
  const lowStock = state.assets.filter((asset) => Number(asset.available || 0) < Number(asset.minStock || 0));
  const maintenance = state.assets.filter((asset) => ["Em manutenção", "Com defeito", "Aguardando peça"].includes(asset.status) || asset.condition === "Crítico");
  const borrowed = state.assets.filter((asset) => asset.status === "Emprestado");
  const totalQty = state.assets.reduce((sum, asset) => sum + Number(asset.quantity || 1), 0);
  return { lowStock, maintenance, borrowed, totalQty };
}

function renderInventoryResources(filtered) {
  const { lowStock, maintenance, borrowed } = inventorySummaryData();
  return `
    <section class="inventory-layout">
      <article class="glass-panel reveal suite-table-panel">
        <div class="panel-head">
          <div><span class="panel-kicker">recursos cadastrados</span><h2>Mapa de ativos <span class="tag">${filtered.length} registros</span></h2></div>
          <button class="ghost-btn ripple-btn" type="button"><span data-icon="excel"></span>Exportar CSV</button>
        </div>
        ${assetTable(filtered)}
      </article>
      <aside class="side-panel">
        <article class="glass-panel reveal">
          <div class="panel-head"><div><span class="panel-kicker">alertas</span><h2>Inventário inteligente</h2></div></div>
          <div class="alert-list">${inventoryAlerts(lowStock, maintenance, borrowed).join("")}</div>
        </article>
      </aside>
    </section>
    <section class="content-grid suite-lower-grid">
      <article class="glass-panel reveal suite-score-card">
        <div class="panel-head"><div><span class="panel-kicker">distribuição</span><h2>Por categoria</h2></div></div>
        <div class="suite-ring" style="--value:76%"><strong>${state.assets.length}</strong><small>tipos</small></div>
      </article>
      <article class="glass-panel reveal">
        <div class="panel-head"><div><span class="panel-kicker">manutenção</span><h2>Manutenção por período</h2></div></div>
        <div class="chart-bars">${periodData().map((row) => barRow(row.month, Math.max(1, Math.round(row.problems / 2)), Math.max(1, ...periodData().map((item) => item.problems)))).join("")}</div>
      </article>
      <article class="glass-panel reveal">
        <div class="panel-head"><div><span class="panel-kicker">movimentações</span><h2>Movimentações recentes</h2></div></div>
        <div class="list-stack">${movementList(4)}</div>
      </article>
    </section>
  `;
}

function renderInventorySectors() {
  return `
    <section class="inventory-layout">
      <article class="glass-panel reveal">
        <div class="panel-head"><div><span class="panel-kicker">cadastro de setores</span><h2>Setores mapeados</h2></div></div>
        <form class="settings-form sector-form" id="sectorForm">
          <label class="form-group"><span>Nome do setor</span><input name="name" placeholder="Ex.: Produção" required></label>
          <label class="form-group"><span>Responsável pelo setor</span><input name="owner" placeholder="Nome do responsável"></label>
          <label class="form-group"><span>Localização física</span><input name="location" placeholder="Prédio, piso, sala ou área"></label>
          <label class="form-group full"><span>Descrição</span><textarea name="description" placeholder="Descreva a função do setor"></textarea></label>
          <button class="primary-btn ripple-btn" type="submit"><span data-icon="plus"></span>Novo setor</button>
        </form>
        <div class="sector-grid">${state.inventorySectors.map(sectorCard).join("")}</div>
      </article>
      <aside class="side-panel">
        <article class="glass-panel reveal">
          <div class="panel-head"><div><span class="panel-kicker">resumo</span><h2>Setorização</h2></div></div>
          <div class="list-stack">${state.inventorySectors.slice(0, 6).map((sector) => {
            const stats = inventorySectorStats(sector.name);
            return `<div class="compact-row"><div><h3>${escapeHtml(sector.name)}</h3><p>${stats.resources} recursos · ${stats.openProblems.length} chamados abertos</p></div><span class="tag">${escapeHtml(sector.owner)}</span></div>`;
          }).join("")}</div>
        </article>
      </aside>
    </section>
  `;
}

function sectorCard(sector) {
  const stats = inventorySectorStats(sector.name);
  const status = stats.lowStock.length ? "Crítico" : stats.maintenance.length ? "Atenção" : "Normal";
  return `
    <button class="sector-card reveal ripple-btn" type="button" data-select-sector="${escapeHtml(sector.name)}">
      <span class="sector-icon" data-icon="monitor"></span>
      <strong>${escapeHtml(sector.name)}</strong>
      <small>${escapeHtml(sector.location || "Sem localização")}</small>
      <div class="sector-stats">
        <span><b>${stats.resources}</b>Recursos</span>
        <span><b>${stats.openProblems.length}</b>Chamados</span>
        <span><b>${stats.maintenance.length}</b>Manutenção</span>
      </div>
      <em class="${status === "Normal" ? "status-resolved" : status === "Atenção" ? "status-loan" : "status-critical"}">${status}</em>
    </button>
  `;
}

function renderInventoryMap() {
  const selected = state.selectedInventorySector || topEntry(countBy(state.assets, (asset) => asset.sector))[0] || state.inventorySectors[0]?.name || "";
  const selectedStats = inventorySectorStats(selected);
  return `
    <section class="map-layout">
      <article class="glass-panel reveal physical-map-panel">
        <div class="panel-head">
          <div><span class="panel-kicker">mapa dos setores</span><h2>Mapa físico</h2></div>
          <span class="tag">Clique em um setor</span>
        </div>
        <div class="physical-map">
          ${state.inventorySectors.map(sectorCard).join("")}
        </div>
      </article>
      <aside class="side-panel">
        <article class="glass-panel reveal">
          <div class="panel-head"><div><span class="panel-kicker">setor selecionado</span><h2>${escapeHtml(selected || "Nenhum setor")}</h2></div></div>
          <div class="list-stack">
            ${selectedStats.assets.map((asset) => `<button class="compact-row ripple-btn" type="button" data-open-asset="${asset.id}"><div><h3>${escapeHtml(asset.name)}</h3><p>${escapeHtml(asset.type)} · ${escapeHtml(asset.location || asset.storage || asset.sector)}</p></div><span class="status-chip ${statusClass(asset.status)}">${escapeHtml(asset.status)}</span></button>`).join("") || `<div class="empty-state">Nenhum recurso vinculado.</div>`}
          </div>
        </article>
      </aside>
    </section>
  `;
}

function renderInventoryLoans() {
  const borrowed = state.assets.filter((asset) => asset.status === "Emprestado" || asset.loan);
  return `
    <article class="glass-panel reveal suite-table-panel">
      <div class="panel-head"><div><span class="panel-kicker">empréstimos</span><h2>Recursos emprestados <span class="tag">${borrowed.length} ativos</span></h2></div></div>
      <div class="table-wrap">
        <table>
          <thead><tr><th>Recurso</th><th>Patrimônio</th><th>Pessoa</th><th>Setor</th><th>Retirada</th><th>Devolução</th><th>Condição</th><th>Ação</th></tr></thead>
          <tbody>${borrowed.map((asset) => `<tr><td>${escapeHtml(asset.name)}</td><td>${escapeHtml(asset.code)}</td><td>${escapeHtml(asset.loan?.person || asset.user || "Sem responsável")}</td><td>${escapeHtml(asset.loan?.sector || asset.sector)}</td><td>${formatDate(asset.loan?.start || asset.registeredAt)}</td><td>${formatDate(asset.loan?.due || "")}</td><td>${escapeHtml(asset.loan?.outCondition || asset.condition)}</td><td><button class="mini-action ripple-btn" type="button" data-open-asset="${asset.id}"><span data-icon="eye"></span></button></td></tr>`).join("") || `<tr><td colspan="8">Nenhum empréstimo ativo.</td></tr>`}</tbody>
        </table>
      </div>
    </article>
  `;
}

function renderInventoryMaintenance() {
  return `
    <section class="inventory-layout">
      <article class="glass-panel reveal suite-table-panel">
        <div class="panel-head"><div><span class="panel-kicker">manutenções</span><h2>Ordens de manutenção <span class="tag">${state.assetMaintenances.length} registros</span></h2></div></div>
        ${maintenanceTable()}
      </article>
      <aside class="side-panel">
        <article class="glass-panel reveal">
          <div class="panel-head"><div><span class="panel-kicker">novo registro</span><h2>Enviar para manutenção</h2></div></div>
          <form class="settings-form" id="maintenanceForm">
            <label class="form-group"><span>Recurso</span><select name="assetId" required>${state.assets.map((asset) => `<option value="${asset.id}">${escapeHtml(asset.name)} - ${escapeHtml(asset.code)}</option>`).join("")}</select></label>
            <label class="form-group"><span>Problema relatado</span><input name="problem" required></label>
            <label class="form-group"><span>Técnico responsável</span><input name="technician" value="${escapeHtml(role().name)}"></label>
            <label class="form-group"><span>Data de entrada</span><input name="entryDate" type="date" value="${new Date().toISOString().slice(0, 10)}"></label>
            <label class="form-group"><span>Data de saída</span><input name="exitDate" type="date"></label>
            <label class="form-group"><span>Status</span><select name="status"><option>Em andamento</option><option>Aguardando peça</option><option>Concluída</option><option>Cancelada</option></select></label>
            <label class="form-group"><span>Custo</span><input name="cost" type="number" min="0" step="0.01" value="0"></label>
            <label class="form-group full"><span>Solução aplicada</span><textarea name="solution"></textarea></label>
            <button class="primary-btn ripple-btn" type="submit"><span data-icon="plus"></span>Registrar manutenção</button>
          </form>
        </article>
      </aside>
    </section>
  `;
}

function maintenanceTable() {
  return `
    <div class="table-wrap">
      <table>
        <thead><tr><th>Recurso</th><th>Problema</th><th>Técnico</th><th>Entrada</th><th>Saída</th><th>Status</th><th>Solução</th><th>Custo</th></tr></thead>
        <tbody>${state.assetMaintenances.map((item) => {
          const asset = state.assets.find((asset) => asset.id === item.assetId);
          return `<tr><td>${escapeHtml(asset?.name || item.assetName || "Recurso removido")}</td><td>${escapeHtml(item.problem)}</td><td>${escapeHtml(item.technician)}</td><td>${formatDate(item.entryDate)}</td><td>${formatDate(item.exitDate)}</td><td><span class="status-chip ${statusClass(item.status)}">${escapeHtml(item.status)}</span></td><td>${escapeHtml(item.solution || "-")}</td><td>${Number(item.cost || 0).toLocaleString("pt-BR", { style: "currency", currency: "BRL" })}</td></tr>`;
        }).join("") || `<tr><td colspan="8">Nenhuma manutenção registrada.</td></tr>`}</tbody>
      </table>
    </div>
  `;
}

function renderInventoryLowStock() {
  const lowStock = state.assets.filter((asset) => Number(asset.available || 0) < Number(asset.minStock || 0));
  return `
    <article class="glass-panel reveal suite-table-panel">
      <div class="panel-head"><div><span class="panel-kicker">estoque crítico</span><h2>Itens com estoque baixo <span class="tag">${lowStock.length} itens</span></h2></div></div>
      ${assetTable(lowStock)}
    </article>
  `;
}

function movementList(limit = 8, assetId = "") {
  const source = (assetId ? state.inventoryMovements.filter((item) => item.assetId === assetId) : state.inventoryMovements).slice(0, limit);
  return source.map((item) => `<div class="timeline-item"><strong>${escapeHtml(item.text)}</strong><small>${formatDate(item.createdAt)} · ${escapeHtml(item.actor || "Sistema")}</small>${escapeHtml(item.type || "Movimentação")}</div>`).join("") || `<div class="timeline-item"><strong>Sem movimentações</strong><small>Histórico vazio</small>Nenhum evento registrado ainda.</div>`;
}

function renderInventory() {
  const filtered = filterAssets();
  const { lowStock, maintenance, totalQty } = inventorySummaryData();
  const content = {
    resources: renderInventoryResources(filtered),
    sectors: renderInventorySectors(),
    map: renderInventoryMap(),
    loans: renderInventoryLoans(),
    maintenance: renderInventoryMaintenance(),
    lowStock: renderInventoryLowStock()
  }[state.inventoryView] || renderInventoryMap();

  $("#view-inventory").innerHTML = `
    ${pageHead("inventário de ti", "Mapeamento e setorização", "Mapa vivo dos setores, recursos, manutenção e distribuição dos ativos de TI.", `
      <button class="ghost-btn ripple-btn" type="button" data-inventory-view="sectors"><span data-icon="plus"></span>Novo setor</button>
      <button class="primary-btn ripple-btn" type="button" data-open-modal="assetModal"><span data-icon="plus"></span>Vincular recurso</button>
    `)}
    <section class="inventory-summary">
      ${metricCard("Setores mapeados", state.inventorySectors.length, "100% ativos", "var(--blue)")}
      ${metricCard("Recursos alocados", totalQty, "Recursos cadastrados", "var(--green)")}
      ${metricCard("Em manutenção", maintenance.length, "Itens em atenção", "var(--red)")}
      ${metricCard("Estoque crítico", lowStock.length, "Atenção necessária", "var(--amber)")}
    </section>
    <section class="inventory-summary inventory-compact-indicators">
      ${metricCard("Disponíveis", state.assets.reduce((sum, item) => sum + Number(item.available || 0), 0), "Prontos para uso", "var(--green)")}
      ${metricCard("Em uso", state.assets.filter((item) => ["Em uso", "Emprestado"].includes(item.status)).length, "Alocados ou emprestados", "var(--violet)")}
      ${metricCard("Setor com mais chamados", metrics().sectorHotspot, "Chamados abertos vinculados", "var(--blue)")}
      ${metricCard("Problemáticos", topEntry(countBy(state.problems.filter((problem) => problem.assetId), (problem) => problem.assetId))[1] || 0, metrics().problematicAssetName, "var(--red)")}
    </section>
    ${inventorySubnav()}
    <div class="toolbar-panel reveal">
      <label class="search-field"><span class="table-label">Buscar</span><input data-inventory-filter="query" value="${escapeHtml(state.filters.inventory.query)}" placeholder="setor, recurso, responsável ou localização"></label>
      <div class="filter-row">
        ${selectFilter("Tipo", "type", ["Todos", ...unique(state.assets.map((asset) => asset.type))], state.filters.inventory.type, "inventory")}
        ${selectFilter("Setor", "sector", ["Todos", ...unique(state.inventorySectors.map((sector) => sector.name))], state.filters.inventory.sector, "inventory")}
        ${selectFilter("Status", "status", ["Todos", "Disponível", "Em uso", "Em manutenção", "Com defeito", "Reservado", "Emprestado", "Descartado", "Aguardando compra", "Aguardando peça", "Substituído"], state.filters.inventory.status, "inventory")}
        ${selectFilter("Responsável", "owner", ["Todos", ...unique(state.assets.map((asset) => asset.user || "Sem responsável"))], state.filters.inventory.owner, "inventory")}
      </div>
    </div>
    ${content}
  `;
}

function assetCard(asset) {
  const linkedProblems = state.problems.filter((problem) => problem.assetId === asset.id || asset.linkedProblems.includes(problem.id));
  return `
    <article class="asset-card reveal">
      <div class="card-title">
        <span class="card-eyebrow">${escapeHtml(asset.type)} · ${escapeHtml(asset.code)}</span>
        <h3>${escapeHtml(asset.name)}</h3>
        <p>${escapeHtml(asset.brand)} ${escapeHtml(asset.model)} · ${escapeHtml(asset.sector)}</p>
      </div>
      <div class="chip-row">
        <span class="status-chip ${statusClass(asset.status)}">${escapeHtml(asset.status)}</span>
        <span class="badge ${asset.condition === "Crítico" ? "critical" : "low"}">${escapeHtml(asset.condition)}</span>
        <span class="tag">${linkedProblems.length} chamado${linkedProblems.length === 1 ? "" : "s"}</span>
      </div>
      <div class="root-cause-mini">
        <div><small>Responsável</small>${escapeHtml(asset.user || "Sem responsável")}</div>
        <div><small>Última verificação</small>${formatDate(asset.lastCheck)}</div>
      </div>
      <p class="card-text">${escapeHtml(asset.notes)}</p>
      <div class="inline-actions">
        <button class="ghost-btn ripple-btn" type="button" data-open-asset="${asset.id}"><span data-icon="eye"></span>Detalhes</button>
        <button class="copy-btn ripple-btn" type="button" data-create-ticket-from-asset="${asset.id}"><span data-icon="ticket"></span>Abrir chamado</button>
        <button class="danger-btn ripple-btn" type="button" data-delete-asset="${asset.id}">Excluir</button>
      </div>
    </article>
  `;
}

function assetTable(assets) {
  return `
    <div class="table-wrap">
      <table>
        <thead><tr><th>Tipo</th><th>Nome</th><th>Patrimônio</th><th>Setor</th><th>Localização</th><th>Mesa/Sala</th><th>Responsável</th><th>Status</th><th>Estado físico</th><th>Qtd.</th><th>Disp.</th><th>Últ. manutenção</th><th>Ação</th></tr></thead>
        <tbody>
          ${assets.map((asset) => `
            <tr>
              <td>${escapeHtml(asset.type)}</td>
              <td>${escapeHtml(asset.name)}</td>
              <td>${escapeHtml(asset.code)}</td>
              <td>${escapeHtml(asset.sector)}</td>
              <td>${escapeHtml(asset.location || asset.storage || asset.sector)}</td>
              <td>${escapeHtml(asset.deskRoom || "-")}</td>
              <td>${escapeHtml(asset.user || "Sem responsável")}</td>
              <td><span class="status-chip ${statusClass(asset.status)}">${escapeHtml(asset.status)}</span></td>
              <td>${escapeHtml(asset.condition)}</td>
              <td>${asset.quantity || 1}</td>
              <td>${asset.available || 0}</td>
              <td>${formatDate(asset.lastMaintenance || asset.lastCheck)}</td>
              <td>
                <div class="table-actions">
                  <button class="mini-action ripple-btn" type="button" data-open-asset="${asset.id}"><span data-icon="eye"></span></button>
                  <button class="mini-action ripple-btn" type="button" data-edit-asset="${asset.id}"><span data-icon="settings"></span></button>
                  <button class="mini-action danger-mini ripple-btn" type="button" data-delete-asset="${asset.id}" aria-label="Excluir ${escapeHtml(asset.name)}">×</button>
                </div>
              </td>
            </tr>
          `).join("")}
        </tbody>
      </table>
    </div>
  `;
}

function inventoryAlerts(lowStock, maintenance, borrowed) {
  const alerts = [];
  lowStock.forEach((asset) => alerts.push([asset.name, `Estoque disponível abaixo do mínimo: ${asset.available}/${asset.minStock}.`]));
  maintenance.forEach((asset) => alerts.push([asset.name, `Status ${asset.status} e estado ${asset.condition}.`]));
  borrowed.forEach((asset) => alerts.push([asset.name, `Emprestado para ${asset.loan?.person || asset.user || "responsável"} desde ${formatDate(asset.loan?.start)}.`]));
  state.assets.filter((asset) => !asset.user && asset.status !== "Disponível").forEach((asset) => alerts.push([asset.name, "Recurso sem responsável definido."]));
  return alerts.slice(0, 8).map(([title, text]) => `<div class="alert-item"><strong>${escapeHtml(title)}</strong><small>${escapeHtml(text)}</small></div>`);
}

function renderReports() {
  const m = metrics();
  $("#view-reports").innerHTML = `
    ${pageHead("relatórios", "Indicadores e exportação", "Resumo executivo, problemas, inventário e período em planilha profissional.", `
      <button class="primary-btn ripple-btn" type="button" data-open-modal="exportModal"><span data-icon="excel"></span>Exportar indicadores</button>
    `)}
    <section class="report-grid">
      ${reportCard("Problemas mais comuns", m.topCategory, "Categoria líder em ocorrências")}
      ${reportCard("Cliente com mais chamados", m.topClient, "Maior volume registrado")}
      ${reportCard("Tempo médio", `${m.averageTime} min`, "Resolução por chamado")}
      ${reportCard("Inventário", `${m.totalAssets} recursos`, "Equipamentos e itens de estoque")}
    </section>
    <section class="content-grid">
      <article class="glass-panel reveal">
        <div class="panel-head"><div><span class="panel-kicker">período</span><h2>Indicadores mensais</h2></div></div>
        ${problemTable(state.problems)}
      </article>
      <article class="glass-panel reveal">
        <div class="panel-head"><div><span class="panel-kicker">excel</span><h2>Abas geradas</h2></div></div>
        <div class="list-stack">
          ${["Resumo Geral", "Problemas e Soluções", "Recursos de TI", "Indicadores por Período"].map((name) => `<div class="compact-row"><div><h3>${name}</h3><p>Formatação, filtros, congelamento e cores por status.</p></div><span class="status-chip status-resolved">.xlsx</span></div>`).join("")}
        </div>
      </article>
    </section>
  `;
}

function reportCard(title, value, text) {
  return `<article class="report-card reveal"><span class="panel-kicker">${escapeHtml(title)}</span><h2>${escapeHtml(value)}</h2><p class="card-text">${escapeHtml(text)}</p></article>`;
}

function renderUsers() {
  $("#view-users").innerHTML = `
    ${pageHead("permissões", "Usuários e perfis", "Perfis preparados para uma operação com níveis de acesso.", `
      <button class="primary-btn ripple-btn" type="button" data-open-modal="userModal"><span data-icon="plus"></span>Cadastrar usuário</button>
    `)}
    <section class="user-grid">
      ${state.users.map((user) => `
        <article class="user-card reveal">
          <span class="card-eyebrow">${escapeHtml(user.area)}</span>
          <h3>${escapeHtml(user.name)}</h3>
          <p class="card-text">${escapeHtml(user.role)}</p>
          ${user.notes ? `<p class="card-text">${escapeHtml(user.notes)}</p>` : ""}
          <div class="chip-row">
            <span class="status-chip status-resolved">${escapeHtml(user.status)}</span>
            <span class="tag">${escapeHtml(user.area)}</span>
          </div>
          <div class="inline-actions">
            <button class="danger-btn ripple-btn" type="button" data-delete-profile="${escapeHtml(user.name)}">Excluir perfil</button>
          </div>
        </article>
      `).join("") || `<div class="empty-state">Nenhum perfil cadastrado.</div>`}
    </section>
    <article class="glass-panel reveal">
      <div class="panel-head"><div><span class="panel-kicker">matriz</span><h2>Níveis de permissão</h2></div></div>
      <div class="table-wrap">
        <table>
          <thead><tr><th>Perfil</th><th>Consultar</th><th>Registrar</th><th>Resolver</th><th>Aprovar</th><th>Configurar</th></tr></thead>
          <tbody>
            ${state.roles.map((item) => `<tr><td>${escapeHtml(item.name)}</td><td>Sim</td><td>${item.id === "viewer" ? "Não" : "Sim"}</td><td>${["admin", "manager", "technician"].includes(item.id) ? "Sim" : "Não"}</td><td>${["admin", "manager"].includes(item.id) ? "Sim" : "Não"}</td><td>${item.id === "admin" ? "Sim" : "Não"}</td></tr>`).join("")}
          </tbody>
        </table>
      </div>
    </article>
  `;
}

function categoryUsage(category) {
  return state.problems.filter((problem) => problem.category === category).length;
}

function categoryCards() {
  return state.categories.map((category) => {
    const total = categoryUsage(category);
    const checklist = state.checklists[category];
    const checklistLabel = Array.isArray(checklist)
      ? `${checklist.length} item${checklist.length === 1 ? "" : "s"} no checklist`
      : "sem modelo de checklist";
    return `
      <div class="category-manager-row">
        <div>
          <strong>${escapeHtml(category)}</strong>
          <small>${total} registro${total === 1 ? "" : "s"} vinculado${total === 1 ? "" : "s"} · ${checklistLabel}</small>
        </div>
        <div class="table-actions">
          <button class="ghost-btn ripple-btn" type="button" data-create-checklist-model="${escapeHtml(category)}">Modelo</button>
          <button class="mini-action danger-mini ripple-btn" type="button" data-delete-category="${escapeHtml(category)}" aria-label="Excluir categoria ${escapeHtml(category)}">×</button>
        </div>
      </div>
    `;
  }).join("") || `<div class="empty-state">Nenhuma categoria cadastrada.</div>`;
}

function checklistTemplateCards() {
  const entries = Object.entries(state.checklists).sort(([a], [b]) => a.localeCompare(b, "pt-BR"));
  return entries.map(([category, items]) => `
    <article class="checklist-template">
      <header>
        <div>
          <span class="panel-kicker">modelo</span>
          <h3>${escapeHtml(category)}</h3>
          <small>${items.length} item${items.length === 1 ? "" : "s"} · ${state.categories.includes(category) ? "categoria ativa" : "sem categoria vinculada"}</small>
        </div>
        <button class="mini-action danger-mini ripple-btn" type="button" data-delete-checklist-model="${escapeHtml(category)}" aria-label="Excluir modelo ${escapeHtml(category)}">×</button>
      </header>
      <div class="template-items">
        ${items.map((item, index) => `
          <div class="template-item">
            <span>${escapeHtml(item)}</span>
            <button class="mini-action danger-mini ripple-btn" type="button" data-delete-checklist-item-category="${escapeHtml(category)}" data-delete-checklist-item-index="${index}" aria-label="Remover item ${escapeHtml(item)}">×</button>
          </div>
        `).join("") || `<p class="detail-text">Nenhum item cadastrado neste modelo.</p>`}
      </div>
      <form class="inline-form" data-checklist-item-form="${escapeHtml(category)}">
        <input name="item" placeholder="Novo item do checklist" required>
        <button class="ghost-btn ripple-btn" type="submit"><span data-icon="plus"></span>Item</button>
      </form>
    </article>
  `).join("") || `<div class="empty-state">Nenhum modelo de checklist cadastrado.</div>`;
}

function refreshSettings() {
  renderSettings();
  buildProblemForm();
  injectIcons($("#view-settings"));
  observeReveals();
}

function defaultChecklistItems() {
  return ["Diagnosticar", "Testar", "Resolver", "Validar", "Documentar"];
}

function addCategory(category) {
  const name = category.trim();
  if (!name) return;
  const exists = state.categories.some((item) => normalize(item) === normalize(name));
  if (exists) {
    toast("Categoria já existe", name);
    return;
  }
  state.categories.push(name);
  state.categories = unique(state.categories);
  if (!state.checklists[name]) state.checklists[name] = defaultChecklistItems();
  saveState();
  refreshSettings();
  toast("Categoria adicionada", name);
}

function deleteCategory(category) {
  const total = categoryUsage(category);
  if (total > 0) {
    toast("Categoria em uso", `Existem ${total} registro${total === 1 ? "" : "s"} usando "${category}".`);
    return;
  }
  if (!window.confirm(`Excluir a categoria "${category}" e o modelo de checklist vinculado?`)) return;
  state.categories = state.categories.filter((item) => item !== category);
  delete state.checklists[category];
  if (state.filters.problems.category === category) state.filters.problems.category = "Todos";
  if (state.filters.knowledge.category === category) state.filters.knowledge.category = "Todos";
  saveState();
  refreshSettings();
  toast("Categoria removida", category);
}

function createChecklistModel(model, items = []) {
  const name = model.trim();
  if (!name) return;
  const categoryMatch = state.categories.find((item) => normalize(item) === normalize(name));
  const checklistMatch = Object.keys(state.checklists).find((item) => normalize(item) === normalize(name));
  const finalName = categoryMatch || checklistMatch || name;

  if (state.checklists[finalName]) {
    toast("Modelo já existe", finalName);
    return;
  }

  if (!categoryMatch) {
    state.categories.push(finalName);
    state.categories = unique(state.categories);
  }
  state.checklists[finalName] = items.length ? unique(items) : defaultChecklistItems();
  saveState();
  refreshSettings();
  toast("Modelo criado", finalName);
}

function deleteChecklistModel(category) {
  if (!state.checklists[category]) return;
  if (!window.confirm(`Excluir o modelo de checklist "${category}"? A categoria será mantida.`)) return;
  delete state.checklists[category];
  saveState();
  refreshSettings();
  toast("Modelo removido", category);
}

function addChecklistItem(category, item) {
  const text = item.trim();
  if (!text) return;
  state.checklists[category] = state.checklists[category] || [];
  if (state.checklists[category].some((existing) => normalize(existing) === normalize(text))) {
    toast("Item já existe", text);
    return;
  }
  state.checklists[category].push(text);
  saveState();
  refreshSettings();
  toast("Item adicionado", category);
}

function deleteChecklistItem(category, index) {
  if (!Array.isArray(state.checklists[category])) return;
  const removed = state.checklists[category][index];
  state.checklists[category].splice(index, 1);
  saveState();
  refreshSettings();
  toast("Item removido", removed || category);
}

function addInventorySector(input) {
  const name = String(input.name || "").trim();
  if (!name) return;
  const exists = state.inventorySectors.some((sector) => normalize(sector.name) === normalize(name));
  if (exists) {
    toast("Setor já existe", name);
    return;
  }
  const sector = {
    id: `SEC-${sectorSlug(name)}`,
    name,
    description: String(input.description || "").trim(),
    owner: String(input.owner || "").trim() || role().name,
    location: String(input.location || "").trim() || name,
    createdAt: new Date().toISOString().slice(0, 10)
  };
  state.inventorySectors.push(sector);
  state.sectors = unique([...state.sectors, name]);
  state.selectedInventorySector = name;
  saveState();
  renderInventory();
  injectIcons($("#view-inventory"));
  observeReveals();
  toast("Setor cadastrado", name);
}

function registerMaintenanceFromForm(form) {
  const data = new FormData(form);
  const asset = state.assets.find((item) => item.id === data.get("assetId"));
  if (!asset) return;
  const maintenance = {
    id: `MNT-${Date.now()}`,
    assetId: asset.id,
    assetName: asset.name,
    problem: String(data.get("problem") || "").trim(),
    technician: String(data.get("technician") || "").trim() || role().name,
    entryDate: data.get("entryDate"),
    exitDate: data.get("exitDate"),
    status: data.get("status"),
    solution: String(data.get("solution") || "").trim(),
    cost: Number(data.get("cost") || 0)
  };
  state.assetMaintenances.unshift(maintenance);
  asset.maintenance = ensureArray(asset.maintenance);
  asset.maintenance.unshift([maintenance.entryDate, maintenance.problem, maintenance.status]);
  asset.status = maintenance.status === "Concluída" ? "Disponível" : "Em manutenção";
  asset.lastMaintenance = maintenance.entryDate;
  addMovement(asset.id, "Manutenção", `${asset.name}: ${maintenance.problem}`, { maintenanceId: maintenance.id });
  saveState();
  renderInventory();
  injectIcons($("#view-inventory"));
  observeReveals();
  toast("Manutenção registrada", asset.name);
}

function renderSettings() {
  const totalModels = Object.keys(state.checklists).length;
  const totalItems = Object.values(state.checklists).reduce((sum, items) => sum + (Array.isArray(items) ? items.length : 0), 0);
  $("#view-settings").innerHTML = `
    ${pageHead("configurações", "Categorias e checklists", "Organize categorias e modelos de checklist para padronizar e otimizar os processos.")}
    <section class="settings-grid settings-designer">
      <article class="settings-card reveal settings-category-panel">
        <div class="panel-head"><div><span class="panel-kicker">categorias</span><h2>Cadastro de categorias</h2></div></div>
        <form class="settings-form" id="categoryForm">
          <label class="form-group"><span>Nome da categoria</span><input name="category" placeholder="Ex.: Backup, Telefonia, Acesso remoto, etc." required></label>
          <button class="primary-btn ripple-btn" type="submit"><span data-icon="plus"></span>Adicionar categoria</button>
        </form>
        <div class="category-manager">${categoryCards()}</div>
      </article>
      <article class="settings-card reveal settings-model-panel">
        <div class="panel-head"><div><span class="panel-kicker">checklists</span><h2>Novo modelo de checklist</h2></div></div>
        <div class="settings-empty-hero">
          <span data-icon="book"></span>
          <h3>Comece criando um modelo</h3>
          <p>Selecione uma categoria ou crie uma nova para adicionar itens e padronizar verificações.</p>
          <div class="chip-row">
            <span class="tag">${state.categories.length} categorias</span>
            <span class="tag">${totalModels} modelos</span>
            <span class="tag">${totalItems} itens</span>
          </div>
        </div>
        <form class="settings-form" id="checklistModelForm">
          <label class="form-group"><span>Nome do modelo ou categoria</span><input name="model" placeholder="Ex.: Checklist de Backup Diário" required></label>
          <label class="form-group full"><span>Itens iniciais</span><textarea name="items" placeholder="Um item por linha ou separado por vÃ­rgula"></textarea></label>
          <div class="inline-actions">
            <button class="primary-btn ripple-btn" type="submit"><span data-icon="plus"></span>Criar novo modelo</button>
            <button class="ghost-btn ripple-btn" type="reset">Cancelar</button>
          </div>
        </form>
      </article>
      <article class="settings-card reveal full-span">
        <div class="panel-head"><div><span class="panel-kicker">checklists</span><h2>Modelos cadastrados</h2></div></div>
        <div class="checklist-template-grid">${checklistTemplateCards()}</div>
      </article>
      <article class="settings-card reveal legacy-checklist-list">
        <div class="panel-head"><div><span class="panel-kicker">checklists</span><h2>Modelos</h2></div></div>
        <div class="list-stack">${Object.entries(state.checklists).map(([category, items]) => `<div class="compact-row"><div><h3>${escapeHtml(category)}</h3><p>${items.map(escapeHtml).join(" · ")}</p></div><span class="tag">${items.length} itens</span></div>`).join("")}</div>
      </article>
    </section>
  `;
}

function normalizeRoute(route) {
  return ["dashboard", "problems", "knowledge", "inventory", "reports", "users", "settings"].includes(route)
    ? route
    : "dashboard";
}

function renderRoute() {
  state.route = normalizeRoute(state.route);
  const renderers = {
    dashboard: renderDashboard,
    problems: renderProblems,
    knowledge: renderKnowledge,
    inventory: renderInventory,
    reports: renderReports,
    users: renderUsers,
    settings: renderSettings
  };

  $$(".view").forEach((view) => view.classList.toggle("active", view.dataset.view === state.route));
  $$(".nav-item").forEach((item) => item.classList.toggle("active", item.dataset.route === state.route));
  renderers[state.route]?.();
  injectIcons($(`#view-${state.route}`));
  observeReveals();
}

function buildProblemForm(prefill = {}) {
  const assetOptions = [`<option value="">Sem recurso vinculado</option>`, ...state.assets.map((asset) => `<option value="${asset.id}" ${prefill.assetId === asset.id ? "selected" : ""}>${escapeHtml(asset.name)} - ${escapeHtml(asset.code)}</option>`)].join("");
  $("#problemForm").innerHTML = `
    ${inputGroup("Título do problema", "title", prefill.title, "full", true)}
    ${inputGroup("Cliente relacionado", "client", prefill.client, "", true)}
    ${selectGroup("Setor afetado", "sector", state.sectors, prefill.sector || state.sectors[0], "", true)}
    ${selectGroup("Categoria", "category", state.categories, prefill.category || state.categories[0], "third", true)}
    ${selectGroup("Urgência", "urgency", ["Baixa", "Média", "Alta", "Crítica"], prefill.urgency || "Média", "third", true)}
    ${inputGroup("Impacto", "impact", prefill.impact, "third", true)}
    ${selectGroup("Status", "status", ["Aberto", "Em análise", "Aguardando cliente", "Aguardando setor interno", "Em teste", "Resolvido", "Validado", "Arquivado", "Reaberto"], prefill.status || "Aberto", "third", true)}
    ${inputGroup("Data do ocorrido", "occurredAt", prefill.occurredAt || new Date().toISOString().slice(0, 10), "third", true, "date")}
    ${inputGroup("Responsável", "owner", prefill.owner || role().name, "third")}
    ${textareaGroup("Descrição detalhada", "description", prefill.description, "full", true)}
    ${textareaGroup("Sintomas percebidos", "symptoms", prefill.symptoms, "full")}
    ${inputGroup("Sistema, máquina ou processo envolvido", "involved", prefill.involved, "full")}
    ${textareaGroup("Possível causa", "probableCause", prefill.probableCause, "full")}
    ${textareaGroup("Causa confirmada", "confirmedCause", prefill.confirmedCause, "full")}
    ${textareaGroup("Solução aplicada", "solution", prefill.solution, "full")}
    ${textareaGroup("Passo a passo da solução", "steps", Array.isArray(prefill.steps) ? prefill.steps.join("\\n") : prefill.steps, "full")}
    ${textareaGroup("O que não fazer", "dontDo", prefill.dontDo, "full")}
    ${textareaGroup("Ação preventiva", "prevention", prefill.prevention, "full")}
    ${inputGroup("Tempo gasto em minutos", "timeSpent", prefill.timeSpent || 30, "third", false, "number")}
    ${selectGroup("Estado da solução", "solutionState", ["Não testada", "Testada", "Aprovada", "Obsoleta", "Precisa revisar", "Solução definitiva", "Solução temporária"], prefill.solutionState || "Não testada", "third")}
    <label class="form-group third"><span>Recurso vinculado</span><select name="assetId">${assetOptions}</select></label>
    ${inputGroup("Tags", "tags", Array.isArray(prefill.tags) ? prefill.tags.join(", ") : prefill.tags, "third")}
    ${inputGroup("Problemas relacionados", "related", Array.isArray(prefill.related) ? prefill.related.join(", ") : prefill.related, "third")}
    ${inputGroup("Anexos", "attachments", Array.isArray(prefill.attachments) ? prefill.attachments.join(", ") : prefill.attachments, "third", false, "text", "nomes separados por vírgula")}
    ${textareaGroup("Observações importantes", "notes", prefill.notes, "full")}
    <label class="form-group switch-field"><span>Solução testada</span><input name="tested" type="checkbox" ${prefill.tested ? "checked" : ""}></label>
    <label class="form-group switch-field"><span>Pode acontecer novamente</span><input name="canRecur" type="checkbox" ${prefill.canRecur ? "checked" : ""}></label>
    <footer class="modal-actions form-group full">
      <button class="ghost-btn ripple-btn" type="button" data-close-modal="problemModal">Cancelar</button>
      <button class="primary-btn ripple-btn" type="submit"><span data-icon="plus"></span>Salvar problema</button>
    </footer>
  `;
  injectIcons($("#problemForm"));
}

function buildAssetForm(prefill = {}) {
  $("#assetForm").innerHTML = `
    ${inputGroup("Nome do recurso", "name", prefill.name, "", true)}
    ${selectGroup("Tipo de recurso", "type", ["Computador", "Notebook", "Monitor", "Mouse", "Teclado", "Headset", "Impressora", "Roteador", "Switch", "Nobreak", "Cabo HDMI", "Cabo VGA", "Cabo DisplayPort", "Cabo de força", "Fonte", "Adaptador", "HD externo", "SSD", "Memória RAM", "Placa de rede", "Placa de vídeo", "Equipamento de backup", "Peça reserva", "Outro"], prefill.type || "Computador")}
    ${inputGroup("Código interno ou patrimônio", "code", prefill.code, "third", true)}
    ${inputGroup("Número de série", "serial", prefill.serial, "third")}
    ${inputGroup("Marca", "brand", prefill.brand, "third")}
    ${inputGroup("Modelo", "model", prefill.model, "third")}
    ${selectGroup("Setor", "sector", unique(state.inventorySectors.map((sector) => sector.name).concat(state.sectors, "Estoque TI")), prefill.sector || "Gestão de TI", "third")}
    ${inputGroup("Localização física", "location", prefill.location || prefill.storage, "third", false, "text", "Prédio, área, rack ou almoxarifado")}
    ${inputGroup("Mesa ou sala", "deskRoom", prefill.deskRoom, "third", false, "text", "Ex: Mesa 12, Sala TI")}
    ${inputGroup("Responsável", "user", prefill.user || prefill.responsible, "third")}
    ${inputGroup("Data de cadastro", "registeredAt", prefill.registeredAt || new Date().toISOString().slice(0, 10), "third", false, "date")}
    ${inputGroup("Data de aquisição", "acquiredAt", prefill.acquiredAt || new Date().toISOString().slice(0, 10), "third", false, "date")}
    ${selectGroup("Estado atual", "condition", ["Novo", "Bom", "Regular", "Ruim", "Crítico", "Inutilizável"], prefill.condition || "Bom", "third")}
    ${selectGroup("Status", "status", ["Disponível", "Em uso", "Em manutenção", "Com defeito", "Reservado", "Emprestado", "Descartado", "Aguardando compra", "Aguardando peça", "Substituído"], prefill.status || "Disponível", "third")}
    ${inputGroup("Última manutenção", "lastMaintenance", prefill.lastMaintenance || prefill.lastCheck || new Date().toISOString().slice(0, 10), "third", false, "date")}
    ${inputGroup("Última verificação", "lastCheck", prefill.lastCheck || new Date().toISOString().slice(0, 10), "third", false, "date")}
    ${inputGroup("Previsão de troca", "replacementForecast", prefill.replacementForecast, "third", false, "date")}
    ${inputGroup("Quantidade total", "quantity", prefill.quantity || 1, "quarter", false, "number")}
    ${inputGroup("Quantidade disponível", "available", prefill.available || 0, "quarter", false, "number")}
    ${inputGroup("Quantidade em uso", "inUse", prefill.inUse || 0, "quarter", false, "number")}
    ${inputGroup("Quantidade com defeito", "defective", prefill.defective || 0, "quarter", false, "number")}
    ${inputGroup("Estoque mínimo", "minStock", prefill.minStock || 0, "third", false, "number")}
    ${inputGroup("Local de armazenamento", "storage", prefill.storage || prefill.location, "third")}
    ${inputGroup("Fotos do equipamento", "photos", Array.isArray(prefill.photos) ? prefill.photos.join(", ") : prefill.photos, "third")}
    ${inputGroup("Nota fiscal ou anexo", "invoice", prefill.invoice, "third")}
    ${textareaGroup("Observações", "notes", prefill.notes, "full")}
    <footer class="modal-actions form-group full">
      <button class="ghost-btn ripple-btn" type="button" data-close-modal="assetModal">Cancelar</button>
      <button class="primary-btn ripple-btn" type="submit"><span data-icon="plus"></span>Salvar recurso</button>
    </footer>
  `;
  injectIcons($("#assetForm"));
}

function buildUserForm(prefill = {}) {
  $("#userForm").innerHTML = `
    ${inputGroup("Nome do usuário", "name", prefill.name, "", true)}
    ${selectGroup("Perfil", "role", state.roles.map((item) => item.name), prefill.role || "Técnico", "", true)}
    ${selectGroup("Setor ou área", "area", state.sectors, prefill.area || "Gestão de TI", "", true)}
    ${selectGroup("Status", "status", ["Ativo", "Em treinamento", "Inativo", "Afastado"], prefill.status || "Ativo", "", true)}
    ${inputGroup("E-mail ou identificação interna", "contact", prefill.contact, "full", false, "text", "opcional")}
    ${textareaGroup("Observações", "notes", prefill.notes, "full")}
    <footer class="modal-actions form-group full">
      <button class="ghost-btn ripple-btn" type="button" data-close-modal="userModal">Cancelar</button>
      <button class="primary-btn ripple-btn" type="submit"><span data-icon="plus"></span>Salvar usuário</button>
    </footer>
  `;
  injectIcons($("#userForm"));
}

function inputGroup(label, name, value = "", width = "", required = false, type = "text", placeholder = "") {
  return `<label class="form-group ${width}"><span>${escapeHtml(label)}</span><input name="${name}" type="${type}" value="${escapeHtml(value ?? "")}" placeholder="${escapeHtml(placeholder)}" ${required ? "required" : ""}></label>`;
}

function textareaGroup(label, name, value = "", width = "", required = false) {
  return `<label class="form-group ${width}"><span>${escapeHtml(label)}</span><textarea name="${name}" ${required ? "required" : ""}>${escapeHtml(value ?? "")}</textarea></label>`;
}

function selectGroup(label, name, options, selected, width = "", required = false) {
  return `<label class="form-group ${width}"><span>${escapeHtml(label)}</span><select name="${name}" ${required ? "required" : ""}>${options.map((option) => `<option value="${escapeHtml(option)}" ${option === selected ? "selected" : ""}>${escapeHtml(option)}</option>`).join("")}</select></label>`;
}

function formToProblem(form) {
  const data = new FormData(form);
  const id = `PRB-${new Date().getFullYear()}-${String(Date.now()).slice(-5)}`;
  return {
    id,
    title: data.get("title").trim(),
    client: data.get("client").trim(),
    sector: data.get("sector"),
    category: data.get("category"),
    urgency: data.get("urgency"),
    impact: data.get("impact").trim(),
    status: data.get("status"),
    occurredAt: data.get("occurredAt"),
    owner: data.get("owner").trim() || role().name,
    description: data.get("description").trim(),
    symptoms: data.get("symptoms").trim(),
    involved: data.get("involved").trim(),
    probableCause: data.get("probableCause").trim(),
    confirmedCause: data.get("confirmedCause").trim(),
    solution: data.get("solution").trim(),
    steps: listFromText(data.get("steps")),
    dontDo: data.get("dontDo").trim(),
    prevention: data.get("prevention").trim(),
    timeSpent: Number(data.get("timeSpent") || 0),
    notes: data.get("notes").trim(),
    tags: listFromText(data.get("tags")),
    related: listFromText(data.get("related")),
    solutionState: data.get("solutionState"),
    tested: data.get("tested") === "on",
    canRecur: data.get("canRecur") === "on",
    assetId: data.get("assetId"),
    accesses: 0,
    timeline: [
      ["Registrado", new Date().toLocaleString("pt-BR"), "Problema cadastrado no SolveDesk Pro."]
    ],
    comments: [],
    attachments: listFromText(data.get("attachments")),
    history: [`Criado por ${role().name}`],
    month: new Intl.DateTimeFormat("pt-BR", { month: "short", year: "numeric" }).format(new Date(`${data.get("occurredAt")}T00:00:00`)).replace(".", "")
  };
}

function formToAsset(form) {
  const data = new FormData(form);
  return {
    id: `AST-${String(Date.now()).slice(-5)}`,
    name: data.get("name").trim(),
    type: data.get("type"),
    code: data.get("code").trim(),
    serial: data.get("serial").trim(),
    brand: data.get("brand").trim(),
    model: data.get("model").trim(),
    sector: data.get("sector"),
    location: data.get("location").trim(),
    deskRoom: data.get("deskRoom").trim(),
    user: data.get("user").trim(),
    responsible: data.get("user").trim(),
    registeredAt: data.get("registeredAt"),
    acquiredAt: data.get("acquiredAt"),
    condition: data.get("condition"),
    physicalState: data.get("condition"),
    status: data.get("status"),
    notes: data.get("notes").trim(),
    photos: listFromText(data.get("photos")),
    invoice: data.get("invoice").trim(),
    maintenance: [],
    linkedProblems: [],
    tickets: [],
    lastCheck: data.get("lastCheck"),
    lastMaintenance: data.get("lastMaintenance"),
    replacementForecast: data.get("replacementForecast"),
    quantity: Number(data.get("quantity") || 1),
    available: Number(data.get("available") || 0),
    inUse: Number(data.get("inUse") || 0),
    defective: Number(data.get("defective") || 0),
    minStock: Number(data.get("minStock") || 0),
    storage: data.get("storage").trim(),
    movementHistory: []
  };
}

function formToUser(form) {
  const data = new FormData(form);
  return {
    name: data.get("name").trim(),
    role: data.get("role"),
    area: data.get("area"),
    status: data.get("status"),
    contact: data.get("contact").trim(),
    notes: data.get("notes").trim()
  };
}

function openProblemDetail(id) {
  const problem = state.problems.find((item) => item.id === id);
  if (!problem) return;
  problem.accesses += 1;
  saveState();
  const asset = state.assets.find((item) => item.id === problem.assetId);
  const related = similarProblems(problem);
  $("#problemDetailContent").innerHTML = `
    <header class="modal-header">
      <div>
        <small>${escapeHtml(problem.id)} · ${escapeHtml(problem.category)}</small>
        <h2>${escapeHtml(problem.title)}</h2>
        <div class="chip-row" style="margin-top:10px">
          <span class="badge ${urgencyClass(problem.urgency)}">${escapeHtml(problem.urgency)}</span>
          <span class="status-chip ${statusClass(problem.status)}">${escapeHtml(problem.status)}</span>
          <span class="tag">${escapeHtml(problem.solutionState)}</span>
        </div>
      </div>
      <button class="icon-button ripple-btn" type="button" data-close-modal="problemDetailModal" aria-label="Fechar">×</button>
    </header>
    <div class="detail-grid">
      <div class="list-stack">
        ${detailSection("O que aconteceu", problem.description)}
        ${detailSection("Onde aconteceu", `${problem.client} · ${problem.sector} · ${problem.involved}`)}
        ${detailSection("Quem foi afetado", `${problem.client} / ${problem.sector}. Impacto: ${problem.impact}`)}
        ${detailSection("Como identificar", problem.symptoms)}
        ${detailSection("Causa raiz", `
          <div class="root-cause-mini">
            <div><small>Sintoma</small>${escapeHtml(problem.symptoms)}</div>
            <div><small>Causa provável</small>${escapeHtml(problem.probableCause)}</div>
            <div><small>Causa confirmada</small>${escapeHtml(problem.confirmedCause)}</div>
            <div><small>Prevenção</small>${escapeHtml(problem.prevention)}</div>
          </div>
        `, true)}
        ${detailSection("Como resolver", problem.solution)}
        <section class="detail-section"><h3>Passo a passo técnico</h3><ol class="step-list">${problem.steps.map((step) => `<li>${escapeHtml(step)}</li>`).join("")}</ol></section>
        ${detailSection("O que não fazer", problem.dontDo || "Nenhum alerta registrado.")}
        ${detailSection("Como evitar novamente", problem.prevention || "Sem ação preventiva registrada.")}
        ${detailSection("Observações finais", problem.notes || "Sem observações.")}
      </div>
      <aside class="list-stack">
        <section class="detail-section">
          <h3>Informações principais</h3>
          <p class="detail-text">Responsável: ${escapeHtml(problem.owner)}<br>Data: ${formatDate(problem.occurredAt)}<br>Tempo: ${problem.timeSpent} min<br>Testada: ${problem.tested ? "Sim" : "Não"}<br>Reincidência: ${problem.canRecur ? "Pode acontecer" : "Baixo risco"}</p>
        </section>
        ${asset ? detailSection("Recurso vinculado", `${asset.name} - ${asset.code}<br>${asset.sector} · ${asset.status}`, true) : ""}
        <section class="detail-section">
          <h3>Linha do tempo</h3>
          <ol class="timeline-list">${problem.timeline.map(([title, date, text], index) => `<li class="timeline-item" style="animation-delay:${index * 80}ms"><strong>${escapeHtml(title)}</strong><small>${escapeHtml(date)}</small>${escapeHtml(text)}</li>`).join("")}</ol>
        </section>
        <section class="detail-section">
          <h3>Comentários da equipe</h3>
          <div class="list-stack">${problem.comments.map(commentCard).join("") || `<p class="detail-text">Sem comentários.</p>`}</div>
          <form class="comment-actions" data-comment-form="${problem.id}">
            <input name="comment" placeholder="Adicionar comentário">
            <button class="mini-action ripple-btn" type="submit"><span data-icon="plus"></span></button>
          </form>
        </section>
        <section class="detail-section">
          <h3>Anexos e tags</h3>
          <p class="detail-text">${problem.attachments.length ? problem.attachments.map(escapeHtml).join("<br>") : "Sem anexos."}</p>
          <div class="chip-row">${problem.tags.map((tag) => `<span class="tag">${escapeHtml(tag)}</span>`).join("")}</div>
        </section>
        <section class="detail-section">
          <h3>Relacionados</h3>
          <div class="list-stack">${related.slice(0, 4).map((item) => `<button class="compact-row ripple-btn" type="button" data-open-problem="${item.id}"><div><h3>${escapeHtml(item.title)}</h3><p>${escapeHtml(item.category)}</p></div><span class="badge ${urgencyClass(item.urgency)}">${escapeHtml(item.urgency)}</span></button>`).join("") || `<p class="detail-text">Nenhum problema parecido encontrado.</p>`}</div>
        </section>
        <section class="detail-section">
          <h3>Ações</h3>
          <button class="copy-btn ripple-btn" type="button" data-copy-solution="${problem.id}"><span data-icon="copy"></span>Copiar solução</button>
          <button class="copy-btn ripple-btn" type="button" data-summary="${problem.id}"><span data-icon="spark"></span>Gerar resumo rápido</button>
          <button class="copy-btn ripple-btn" type="button" data-learning="${problem.id}"><span data-icon="book"></span>Modo aprendizado</button>
          ${can("approve") ? `<button class="primary-btn ripple-btn" type="button" data-validate="${problem.id}">Marcar como validada</button>` : ""}
          ${can("delete") ? `<button class="danger-btn ripple-btn" type="button" data-delete-problem="${problem.id}">Excluir problema</button>` : ""}
        </section>
      </aside>
    </div>
  `;
  injectIcons($("#problemDetailContent"));
  $("#problemDetailModal").showModal();
}

function detailSection(title, content, isHtml = false) {
  return `<section class="detail-section"><h3>${escapeHtml(title)}</h3>${isHtml ? content : `<p class="detail-text">${escapeHtml(content)}</p>`}</section>`;
}

function commentCard(comment) {
  return `<article class="comment-card"><strong>${escapeHtml(comment.author)} · ${escapeHtml(comment.role)}</strong><p>${escapeHtml(comment.text)}</p><span class="status-chip status-open">${escapeHtml(comment.status)}</span></article>`;
}

function openAssetDetail(id) {
  const asset = state.assets.find((item) => item.id === id);
  if (!asset) return;
  const linked = state.problems.filter((problem) => problem.assetId === asset.id || asset.linkedProblems.includes(problem.id));
  const maintenances = state.assetMaintenances.filter((item) => item.assetId === asset.id);
  $("#assetDetailContent").innerHTML = `
    <header class="modal-header">
      <div>
        <small>${escapeHtml(asset.type)} · ${escapeHtml(asset.code)}</small>
        <h2>${escapeHtml(asset.name)}</h2>
        <div class="chip-row" style="margin-top:10px"><span class="status-chip ${statusClass(asset.status)}">${escapeHtml(asset.status)}</span><span class="badge ${asset.condition === "Crítico" ? "critical" : "low"}">${escapeHtml(asset.condition)}</span></div>
      </div>
      <button class="icon-button ripple-btn" type="button" data-close-modal="assetDetailModal" aria-label="Fechar">×</button>
    </header>
    <div class="detail-grid">
      <div class="list-stack">
        ${detailSection("Dados do recurso", `Tipo: ${asset.type}<br>Marca/modelo: ${asset.brand} ${asset.model}<br>Patrimônio: ${asset.code}<br>Série: ${asset.serial || "Sem série"}<br>Setor: ${asset.sector}<br>Localização: ${asset.location || asset.storage || asset.sector}<br>Mesa/Sala: ${asset.deskRoom || "-"}<br>Responsável: ${asset.user || "Sem responsável"}<br>Cadastro: ${formatDate(asset.registeredAt)}<br>Última manutenção: ${formatDate(asset.lastMaintenance || asset.lastCheck)}`, true)}
        ${detailSection("Observações", asset.notes || "Sem observações.")}
        <section class="detail-section"><h3>Histórico de chamados</h3><div class="list-stack">${linked.map(compactProblemRow).join("") || `<p class="detail-text">Nenhum chamado vinculado.</p>`}</div></section>
        <section class="detail-section"><h3>Histórico de manutenção</h3><ol class="timeline-list">${
          maintenances.map((item, index) => `<li class="timeline-item" style="animation-delay:${index * 80}ms"><strong>${escapeHtml(item.problem)}</strong><small>${formatDate(item.entryDate)} · ${escapeHtml(item.technician)}</small>${escapeHtml(item.status)}${item.solution ? ` · ${escapeHtml(item.solution)}` : ""}</li>`).join("")
          || asset.maintenance.map(([date, text, status], index) => `<li class="timeline-item" style="animation-delay:${index * 80}ms"><strong>${escapeHtml(text)}</strong><small>${formatDate(date)}</small>${escapeHtml(status)}</li>`).join("")
          || `<li class="timeline-item"><strong>Sem manutenção registrada</strong><small>${formatDate(asset.lastCheck)}</small>Última verificação concluída.</li>`
        }</ol></section>
        <section class="detail-section"><h3>Linha do tempo de movimentação</h3><div class="timeline-list">${movementList(12, asset.id)}</div></section>
      </div>
      <aside class="list-stack">
        ${detailSection("Estoque", `Total: ${asset.quantity || 1}<br>Disponível: ${asset.available || 0}<br>Em uso: ${asset.inUse || 0}<br>Defeito: ${asset.defective || 0}<br>Estoque mínimo: ${asset.minStock || 0}`, true)}
        ${asset.loan ? detailSection("Empréstimo", `Pessoa: ${asset.loan.person}<br>Setor: ${asset.loan.sector}<br>Retirada: ${formatDate(asset.loan.start)}<br>Devolução prevista: ${formatDate(asset.loan.due)}<br>Condição: ${asset.loan.outCondition}`, true) : ""}
        <section class="detail-section">
          <h3>Ações rápidas</h3>
          <button class="primary-btn ripple-btn" type="button" data-create-ticket-from-asset="${asset.id}"><span data-icon="ticket"></span>Abrir chamado</button>
          <button class="copy-btn ripple-btn" type="button" data-edit-asset="${asset.id}">Editar recurso</button>
          <button class="copy-btn ripple-btn" type="button" data-asset-maintenance="${asset.id}">Registrar manutenção</button>
          <button class="copy-btn ripple-btn" type="button" data-asset-transfer="${asset.id}">Transferir setor</button>
          <button class="danger-btn ripple-btn" type="button" data-asset-discard="${asset.id}">Marcar descartado</button>
          <button class="danger-btn ripple-btn" type="button" data-delete-asset="${asset.id}">Excluir recurso</button>
        </section>
      </aside>
    </div>
  `;
  injectIcons($("#assetDetailContent"));
  $("#assetDetailModal").showModal();
}

function openDeleteProblemConfirm(id) {
  const problem = state.problems.find((item) => item.id === id);
  if (!problem) return;
  state.pendingDeleteProblemId = id;
  $("#confirmDeleteBody").innerHTML = `
    <p>Você está prestes a excluir permanentemente este problema:</p>
    <strong>${escapeHtml(problem.title)}</strong>
    <small>${escapeHtml(problem.id)} · ${escapeHtml(problem.client)} · ${escapeHtml(problem.category)}</small>
    <p>Os vínculos com recursos do inventário também serão removidos.</p>
  `;
  $("#confirmDeleteModal").showModal();
}

function deleteProblem(id) {
  const problem = state.problems.find((item) => item.id === id);
  if (!problem) return;
  state.problems = state.problems
    .filter((item) => item.id !== id)
    .map((item) => ({
      ...item,
      related: (item.related || []).filter((relatedId) => relatedId !== id)
    }));
  state.assets = state.assets.map((asset) => ({
    ...asset,
    linkedProblems: (asset.linkedProblems || []).filter((problemId) => problemId !== id),
    tickets: (asset.tickets || []).filter((problemId) => problemId !== id)
  }));
  state.pendingDeleteProblemId = "";
  saveState();
  ["problemDetailModal", "confirmDeleteModal"].forEach((modalId) => {
    const modal = $(`#${modalId}`);
    if (modal?.open) modal.close();
  });
  renderRoute();
  toast("Problema excluído", `"${problem.title}" foi removido da base.`);
}

function openDeleteProfileConfirm(name) {
  const profile = state.users.find((user) => user.name === name);
  if (!profile) return;
  state.pendingDeleteProfileName = name;
  $("#confirmProfileDeleteBody").innerHTML = `
    <p>Você está prestes a excluir este perfil de usuário:</p>
    <strong>${escapeHtml(profile.name)}</strong>
    <small>${escapeHtml(profile.role)} · ${escapeHtml(profile.area)} · ${escapeHtml(profile.status)}</small>
    <p>Essa ação remove apenas o perfil da lista de usuários; os papéis-base do sistema continuam disponíveis.</p>
  `;
  $("#confirmProfileDeleteModal").showModal();
}

function deleteProfile(name) {
  const profile = state.users.find((user) => user.name === name);
  if (!profile) return;
  state.users = state.users.filter((user) => user.name !== name);
  state.pendingDeleteProfileName = "";
  saveState();
  const modal = $("#confirmProfileDeleteModal");
  if (modal?.open) modal.close();
  renderRoute();
  toast("Perfil excluído", `"${profile.name}" foi removido da lista de usuários.`);
}

function openDeleteAssetConfirm(id) {
  const asset = state.assets.find((item) => item.id === id);
  if (!asset) return;
  const linked = state.problems.filter((problem) => problem.assetId === id || (asset.linkedProblems || []).includes(problem.id));
  state.pendingDeleteAssetId = id;
  $("#confirmAssetDeleteBody").innerHTML = `
    <p>Você está prestes a excluir este recurso de TI:</p>
    <strong>${escapeHtml(asset.name)}</strong>
    <small>${escapeHtml(asset.code)} · ${escapeHtml(asset.type)} · ${escapeHtml(asset.sector)}</small>
    <p>${linked.length ? `${linked.length} chamado${linked.length === 1 ? "" : "s"} será${linked.length === 1 ? "" : "ão"} desvinculado${linked.length === 1 ? "" : "s"} desse recurso.` : "Nenhum chamado está vinculado a esse recurso."}</p>
  `;
  $("#confirmAssetDeleteModal").showModal();
}

function deleteAsset(id) {
  const asset = state.assets.find((item) => item.id === id);
  if (!asset) return;
  state.assets = state.assets.filter((item) => item.id !== id);
  state.problems = state.problems.map((problem) => ({
    ...problem,
    assetId: problem.assetId === id ? "" : problem.assetId
  }));
  state.pendingDeleteAssetId = "";
  saveState();
  ["assetDetailModal", "confirmAssetDeleteModal"].forEach((modalId) => {
    const modal = $(`#${modalId}`);
    if (modal?.open) modal.close();
  });
  renderRoute();
  toast("Recurso excluído", `"${asset.name}" foi removido do inventário.`);
}

function buildExportOptions() {
  const options = [
    ["all", "Exportar tudo"],
    ["problems", "Apenas problemas e soluções"],
    ["assets", "Apenas recursos de TI"],
    ["period", "Indicadores por período"],
    ["category", "Por categoria atual"],
    ["sector", "Por setor atual"],
    ["attention", "Itens pendentes ou críticos"]
  ];
  $("#exportOptions").innerHTML = options.map(([value, label]) => `
    <label class="export-option"><input name="exportScope" type="radio" value="${value}" ${state.exportScope === value ? "checked" : ""}><span>${escapeHtml(label)}</span></label>
  `).join("");
}

function exportPayload() {
  let problems = [...state.problems];
  let assets = [...state.assets];
  if (state.exportScope === "problems") assets = [];
  if (state.exportScope === "assets") problems = [];
  if (state.exportScope === "attention") {
    problems = problems.filter((item) => !["Resolvido", "Validado", "Arquivado"].includes(item.status) || item.urgency === "Crítica");
    assets = assets.filter((item) => ["Em manutenção", "Com defeito", "Aguardando peça", "Emprestado"].includes(item.status) || Number(item.available || 0) < Number(item.minStock || 0));
  }
  if (state.exportScope === "category" && state.filters.problems.category !== "Todos") {
    problems = problems.filter((item) => item.category === state.filters.problems.category);
  }
  if (state.exportScope === "sector" && state.filters.problems.sector !== "Todos") {
    problems = problems.filter((item) => item.sector === state.filters.problems.sector);
    assets = assets.filter((item) => item.sector === state.filters.problems.sector);
  }
  return { metrics: metrics(), problems, assets, periods: periodData() };
}

function copySolution(id) {
  const problem = state.problems.find((item) => item.id === id);
  if (!problem) return;
  const text = `Solução rápida - ${problem.title}\nCausa: ${problem.confirmedCause || problem.probableCause}\nSolução: ${problem.solution}\nPassos: ${problem.steps.join(" > ")}`;
  copyText(text);
  toast("Solução rápida copiada", "Resumo pronto para enviar a outro colaborador.");
}

function learningText(problem) {
  return `Tutorial interno - ${problem.title}\n\n1. Identifique: ${problem.symptoms}\n2. Confirme a causa: ${problem.confirmedCause || problem.probableCause}\n3. Aplique: ${problem.solution}\n4. Siga os passos:\n${problem.steps.map((step, index) => `   ${index + 1}. ${step}`).join("\n")}\n5. Previna: ${problem.prevention || "registre ação preventiva."}`;
}

function copyText(text) {
  if (navigator.clipboard?.writeText) {
    navigator.clipboard.writeText(text).catch(() => fallbackCopy(text));
  } else {
    fallbackCopy(text);
  }
}

function fallbackCopy(text) {
  const area = document.createElement("textarea");
  area.value = text;
  document.body.appendChild(area);
  area.select();
  document.execCommand("copy");
  area.remove();
}

function toast(title, text = "") {
  const node = document.createElement("div");
  node.className = "toast";
  node.innerHTML = `<strong>${escapeHtml(title)}</strong>${text ? `<p>${escapeHtml(text)}</p>` : ""}`;
  $("#toastStack").appendChild(node);
  setTimeout(() => node.remove(), 3600);
}

function observeReveals() {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.08 });
  $$(".reveal:not(.visible)").forEach((item) => observer.observe(item));
}

let filterRenderTimer;

function rerenderFiltered(route, delay = 0) {
  window.clearTimeout(filterRenderTimer);
  filterRenderTimer = window.setTimeout(() => {
    if (route === "problems") renderProblems();
    if (route === "inventory") renderInventory();
    if (route === "knowledge") renderKnowledge();
    injectIcons($(`#view-${route}`));
    observeReveals();
  }, delay);
}

function addRipple(event) {
  const target = event.target.closest(".ripple-btn");
  if (!target) return;
  const rect = target.getBoundingClientRect();
  const ripple = document.createElement("span");
  ripple.className = "ripple";
  ripple.style.left = `${event.clientX - rect.left}px`;
  ripple.style.top = `${event.clientY - rect.top}px`;
  target.appendChild(ripple);
  ripple.addEventListener("animationend", () => ripple.remove(), { once: true });
}

function bindEvents() {
  document.addEventListener("click", addRipple);
  window.addEventListener("pointermove", (event) => {
    document.body.classList.add("pointer-active");
    document.documentElement.style.setProperty("--cursor-x", `${event.clientX}px`);
    document.documentElement.style.setProperty("--cursor-y", `${event.clientY}px`);
    document.documentElement.style.setProperty("--cursor-scale", event.target.closest(".glass-panel, .problem-card, .asset-card, .user-card, .report-card, .knowledge-card") ? "1.08" : "0.92");
  });
  window.addEventListener("pointerleave", () => {
    document.body.classList.remove("pointer-active");
  });
  $("#themeToggle").addEventListener("click", toggleTheme);
  $("#mobileMenuBtn").addEventListener("click", () => document.body.classList.toggle("sidebar-open"));
  $("#sidebarToggle").addEventListener("click", () => document.body.classList.remove("sidebar-open"));
  $("#quickProblemBtn").addEventListener("click", () => $("#problemModal").showModal());
  $("#exportIndicatorsBtn").addEventListener("click", () => {
    buildExportOptions();
    $("#exportModal").showModal();
  });

  $("#globalSearch").addEventListener("input", (event) => {
    state.globalQuery = event.target.value;
    renderRoute();
  });

  document.addEventListener("click", (event) => {
    const routeButton = event.target.closest("[data-route], [data-route-jump]");
    if (routeButton) {
      state.route = normalizeRoute(routeButton.dataset.route || routeButton.dataset.routeJump);
      document.body.classList.remove("sidebar-open");
      renderRoute();
      return;
    }

    const inventoryViewButton = event.target.closest("[data-inventory-view]");
    if (inventoryViewButton) {
      state.inventoryView = inventoryViewButton.dataset.inventoryView;
      state.route = "inventory";
      renderRoute();
      return;
    }

    const sectorButton = event.target.closest("[data-select-sector]");
    if (sectorButton) {
      state.selectedInventorySector = sectorButton.dataset.selectSector;
      state.inventoryView = "map";
      state.filters.inventory.sector = sectorButton.dataset.selectSector;
      renderInventory();
      injectIcons($("#view-inventory"));
      observeReveals();
      return;
    }

    const modalButton = event.target.closest("[data-open-modal]");
    if (modalButton) {
      if (modalButton.dataset.openModal === "problemModal") buildProblemForm();
      if (modalButton.dataset.openModal === "assetModal") {
        state.editingAssetId = "";
        buildAssetForm();
      }
      if (modalButton.dataset.openModal === "userModal") buildUserForm();
      if (modalButton.dataset.openModal === "exportModal") buildExportOptions();
      $(`#${modalButton.dataset.openModal}`).showModal();
      return;
    }

    const closeButton = event.target.closest("[data-close-modal]");
    if (closeButton) {
      $(`#${closeButton.dataset.closeModal}`).close();
      return;
    }

    const problemButton = event.target.closest("[data-open-problem]");
    if (problemButton) {
      openProblemDetail(problemButton.dataset.openProblem);
      return;
    }

    const assetButton = event.target.closest("[data-open-asset]");
    if (assetButton) {
      openAssetDetail(assetButton.dataset.openAsset);
      return;
    }

    const editAssetButton = event.target.closest("[data-edit-asset]");
    if (editAssetButton) {
      const asset = state.assets.find((item) => item.id === editAssetButton.dataset.editAsset);
      if (!asset) return;
      state.editingAssetId = asset.id;
      buildAssetForm(asset);
      const detailModal = $("#assetDetailModal");
      if (detailModal?.open) detailModal.close();
      $("#assetModal").showModal();
      return;
    }

    const deleteAssetButton = event.target.closest("[data-delete-asset]");
    if (deleteAssetButton) {
      openDeleteAssetConfirm(deleteAssetButton.dataset.deleteAsset);
      return;
    }

    const copyButton = event.target.closest("[data-copy-solution]");
    if (copyButton) {
      copySolution(copyButton.dataset.copySolution);
      return;
    }

    const learningButton = event.target.closest("[data-learning]");
    if (learningButton) {
      const problem = state.problems.find((item) => item.id === learningButton.dataset.learning);
      copyText(learningText(problem));
      toast("Modo aprendizado gerado", "Tutorial interno copiado.");
      return;
    }

    const summaryButton = event.target.closest("[data-summary]");
    if (summaryButton) {
      copySolution(summaryButton.dataset.summary);
      return;
    }

    const deleteButton = event.target.closest("[data-delete-problem]");
    if (deleteButton) {
      if (!can("delete")) {
        toast("Permissão insuficiente", "O perfil atual não pode excluir problemas.");
        return;
      }
      openDeleteProblemConfirm(deleteButton.dataset.deleteProblem);
      return;
    }

    const deleteProfileButton = event.target.closest("[data-delete-profile]");
    if (deleteProfileButton) {
      openDeleteProfileConfirm(deleteProfileButton.dataset.deleteProfile);
      return;
    }

    const createChecklistButton = event.target.closest("[data-create-checklist-model]");
    if (createChecklistButton) {
      const category = createChecklistButton.dataset.createChecklistModel;
      if (state.checklists[category]) {
        toast("Modelo já existe", category);
      } else {
        state.checklists[category] = defaultChecklistItems();
        saveState();
        refreshSettings();
        toast("Modelo criado", category);
      }
      return;
    }

    const deleteCategoryButton = event.target.closest("[data-delete-category]");
    if (deleteCategoryButton) {
      deleteCategory(deleteCategoryButton.dataset.deleteCategory);
      return;
    }

    const deleteChecklistModelButton = event.target.closest("[data-delete-checklist-model]");
    if (deleteChecklistModelButton) {
      deleteChecklistModel(deleteChecklistModelButton.dataset.deleteChecklistModel);
      return;
    }

    const deleteChecklistItemButton = event.target.closest("[data-delete-checklist-item-category]");
    if (deleteChecklistItemButton) {
      deleteChecklistItem(
        deleteChecklistItemButton.dataset.deleteChecklistItemCategory,
        Number(deleteChecklistItemButton.dataset.deleteChecklistItemIndex)
      );
      return;
    }

    const validateButton = event.target.closest("[data-validate]");
    if (validateButton) {
      const problem = state.problems.find((item) => item.id === validateButton.dataset.validate);
      problem.status = "Validado";
      problem.solutionState = "Aprovada";
      problem.tested = true;
      problem.timeline.push(["Validado", new Date().toLocaleString("pt-BR"), `${role().name} validou a solução.`]);
      saveState();
      toast("Solução validada", "A base de conhecimento foi atualizada.");
      openProblemDetail(problem.id);
      renderRoute();
      return;
    }

    const ticketButton = event.target.closest("[data-create-ticket-from-asset]");
    if (ticketButton) {
      const asset = state.assets.find((item) => item.id === ticketButton.dataset.createTicketFromAsset);
      buildProblemForm({
        title: `Chamado relacionado a ${asset.name}`,
        client: asset.sector,
        sector: asset.sector,
        category: ["Monitor", "Mouse", "Teclado", "Notebook", "Computador"].includes(asset.type) ? "Hardware" : "Rede e internet",
        urgency: "Média",
        impact: "Aguardando diagnóstico",
        involved: `${asset.name} - ${asset.code}`,
        assetId: asset.id,
        tags: [asset.type, asset.code]
      });
      $("#assetDetailModal").close();
      $("#problemModal").showModal();
      return;
    }

    const maintenanceButton = event.target.closest("[data-asset-maintenance]");
    if (maintenanceButton) {
      const asset = state.assets.find((item) => item.id === maintenanceButton.dataset.assetMaintenance);
      const maintenance = {
        id: `MNT-${Date.now()}`,
        assetId: asset.id,
        assetName: asset.name,
        problem: "Manutenção registrada pela equipe",
        technician: role().name,
        entryDate: new Date().toISOString().slice(0, 10),
        exitDate: "",
        status: "Em andamento",
        solution: "",
        cost: 0
      };
      state.assetMaintenances.unshift(maintenance);
      asset.maintenance.unshift([maintenance.entryDate, maintenance.problem, maintenance.status]);
      asset.status = "Em manutenção";
      asset.lastMaintenance = maintenance.entryDate;
      addMovement(asset.id, "Manutenção", `${asset.name} enviado para manutenção.`);
      saveState();
      toast("Manutenção registrada", asset.name);
      openAssetDetail(asset.id);
      renderRoute();
      return;
    }

    const transferButton = event.target.closest("[data-asset-transfer]");
    if (transferButton) {
      const asset = state.assets.find((item) => item.id === transferButton.dataset.assetTransfer);
      const from = asset.sector;
      asset.sector = asset.sector === "Gestão de TI" ? "Pré-impressão" : "Gestão de TI";
      addMovement(asset.id, "Transferência", `${asset.name} movido de ${from} para ${asset.sector}.`, { fromSector: from, toSector: asset.sector });
      saveState();
      toast("Setor alterado", `${asset.name} transferido para ${asset.sector}.`);
      openAssetDetail(asset.id);
      renderRoute();
      return;
    }

    const discardButton = event.target.closest("[data-asset-discard]");
    if (discardButton) {
      const asset = state.assets.find((item) => item.id === discardButton.dataset.assetDiscard);
      asset.status = "Descartado";
      asset.condition = "Inutilizável";
      addMovement(asset.id, "Descarte", `${asset.name} marcado como descartado.`);
      saveState();
      toast("Recurso descartado", asset.name);
      openAssetDetail(asset.id);
      renderRoute();
    }
  });

  document.addEventListener("input", (event) => {
    const problemFilter = event.target.closest("[data-problem-filter]");
    if (problemFilter) {
      state.filters.problems[problemFilter.dataset.problemFilter] = problemFilter.value;
      rerenderFiltered("problems", problemFilter.dataset.problemFilter === "query" ? 260 : 0);
    }

    const inventoryFilter = event.target.closest("[data-inventory-filter]");
    if (inventoryFilter) {
      state.filters.inventory[inventoryFilter.dataset.inventoryFilter] = inventoryFilter.value;
      rerenderFiltered("inventory", inventoryFilter.dataset.inventoryFilter === "query" ? 260 : 0);
    }

    const knowledgeFilter = event.target.closest("[data-knowledge-filter]");
    if (knowledgeFilter) {
      state.filters.knowledge[knowledgeFilter.dataset.knowledgeFilter] = knowledgeFilter.value;
      rerenderFiltered("knowledge", knowledgeFilter.dataset.knowledgeFilter === "query" ? 260 : 0);
    }
  });

  document.addEventListener("change", (event) => {
    const problemFilter = event.target.closest("[data-problem-filter]");
    if (problemFilter) {
      state.filters.problems[problemFilter.dataset.problemFilter] = problemFilter.value;
      rerenderFiltered("problems");
    }

    const inventoryFilter = event.target.closest("[data-inventory-filter]");
    if (inventoryFilter) {
      state.filters.inventory[inventoryFilter.dataset.inventoryFilter] = inventoryFilter.value;
      rerenderFiltered("inventory");
    }

    const knowledgeFilter = event.target.closest("[data-knowledge-filter]");
    if (knowledgeFilter) {
      state.filters.knowledge[knowledgeFilter.dataset.knowledgeFilter] = knowledgeFilter.value;
      rerenderFiltered("knowledge");
    }
  });

  $("#roleSelect").addEventListener("change", (event) => {
    state.activeRole = event.target.value;
    $("#roleHint").textContent = role().hint;
    saveState();
    toast("Perfil alterado", role().name);
  });

  $("#problemForm").addEventListener("submit", (event) => {
    event.preventDefault();
    if (!can("create")) {
      toast("Permissão insuficiente", "O perfil atual não pode registrar problemas.");
      return;
    }
    const problem = formToProblem(event.currentTarget);
    state.problems.unshift(problem);
    const asset = state.assets.find((item) => item.id === problem.assetId);
    if (asset) {
      asset.linkedProblems = unique([...(asset.linkedProblems || []), problem.id]);
      asset.tickets = unique([...(asset.tickets || []), problem.id]);
      addMovement(asset.id, "Chamado vinculado", `${problem.id} vinculado ao recurso ${asset.name}.`, { problemId: problem.id });
    }
    saveState();
    $("#problemModal").close();
    event.currentTarget.reset();
    state.route = "problems";
    renderRoute();
    toast("Problema salvo", "Registro transformado em artigo de conhecimento.");
  });

  $("#assetForm").addEventListener("submit", (event) => {
    event.preventDefault();
    const asset = formToAsset(event.currentTarget);
    if (state.editingAssetId) {
      const current = state.assets.find((item) => item.id === state.editingAssetId);
      if (current) {
        const fromSector = current.sector;
        const updated = normalizeAsset({
          ...asset,
          id: current.id,
          maintenance: current.maintenance,
          linkedProblems: current.linkedProblems,
          tickets: current.tickets,
          movementHistory: current.movementHistory,
          loan: current.loan
        });
        state.assets = state.assets.map((item) => item.id === current.id ? updated : item);
        addMovement(current.id, "Edição", `${updated.name} atualizado no inventário.`, { fromSector, toSector: updated.sector });
        if (fromSector !== updated.sector) {
          addMovement(current.id, "Transferência", `${updated.name} movido de ${fromSector} para ${updated.sector}.`, { fromSector, toSector: updated.sector });
        }
      }
      state.editingAssetId = "";
    } else {
      state.assets.unshift(asset);
      addMovement(asset.id, "Criação", `${asset.name} cadastrado no setor ${asset.sector}.`);
      if (asset.status === "Emprestado") {
        addMovement(asset.id, "Empréstimo", `${asset.name} marcado como emprestado para ${asset.user || "responsável não informado"}.`);
      }
    }
    saveState();
    $("#assetModal").close();
    event.currentTarget.reset();
    state.route = "inventory";
    renderRoute();
    toast("Recurso salvo", "Inventário atualizado.");
  });

  $("#userForm").addEventListener("submit", (event) => {
    event.preventDefault();
    const user = formToUser(event.currentTarget);
    const exists = state.users.some((item) => normalize(item.name) === normalize(user.name));
    if (exists) {
      toast("Usuário já cadastrado", "Já existe um perfil com esse nome.");
      return;
    }
    state.users.unshift(user);
    saveState();
    $("#userModal").close();
    event.currentTarget.reset();
    state.route = "users";
    renderRoute();
    toast("Usuário cadastrado", `${user.name} foi adicionado aos perfis.`);
  });

  document.addEventListener("submit", (event) => {
    const commentForm = event.target.closest("[data-comment-form]");
    if (!commentForm) return;
    event.preventDefault();
    const problem = state.problems.find((item) => item.id === commentForm.dataset.commentForm);
    const text = new FormData(commentForm).get("comment").trim();
    if (!text) return;
    problem.comments.push({
      author: role().name,
      role: role().name,
      text,
      status: "Revisão",
      createdAt: new Date().toLocaleString("pt-BR")
    });
    problem.history.push(`Comentário adicionado por ${role().name}`);
    saveState();
    openProblemDetail(problem.id);
    toast("Comentário adicionado", "Histórico atualizado.");
  });

  document.addEventListener("change", (event) => {
    if (event.target.name === "exportScope") {
      state.exportScope = event.target.value;
    }
  });

  $("#runExportBtn").addEventListener("click", () => {
    const animation = $("#exportAnimation");
    animation.classList.add("running");
    setTimeout(() => {
      window.SolveDeskExcel.downloadWorkbook(exportPayload(), `solvedesk-pro-${new Date().toISOString().slice(0, 10)}.xlsx`);
      animation.classList.remove("running");
      $("#exportModal").close();
      toast("Relatório gerado com sucesso", "Arquivo Excel baixado no computador.");
    }, 1300);
  });

  $("#confirmDeleteProblemBtn").addEventListener("click", () => {
    if (state.pendingDeleteProblemId) {
      deleteProblem(state.pendingDeleteProblemId);
    }
  });

  $("#confirmDeleteProfileBtn").addEventListener("click", () => {
    if (state.pendingDeleteProfileName) {
      deleteProfile(state.pendingDeleteProfileName);
    }
  });

  $("#confirmDeleteAssetBtn").addEventListener("click", () => {
    if (state.pendingDeleteAssetId) {
      deleteAsset(state.pendingDeleteAssetId);
    }
  });

  document.addEventListener("submit", (event) => {
    const sectorForm = event.target.closest("#sectorForm");
    if (sectorForm) {
      event.preventDefault();
      const data = new FormData(sectorForm);
      addInventorySector({
        name: data.get("name"),
        owner: data.get("owner"),
        location: data.get("location"),
        description: data.get("description")
      });
      sectorForm.reset();
      return;
    }

    const maintenanceForm = event.target.closest("#maintenanceForm");
    if (maintenanceForm) {
      event.preventDefault();
      registerMaintenanceFromForm(maintenanceForm);
      maintenanceForm.reset();
      return;
    }

    const categoryForm = event.target.closest("#categoryForm");
    if (categoryForm) {
      event.preventDefault();
      addCategory(new FormData(categoryForm).get("category"));
      categoryForm.reset();
      return;
    }

    const checklistModelForm = event.target.closest("#checklistModelForm");
    if (checklistModelForm) {
      event.preventDefault();
      const data = new FormData(checklistModelForm);
      createChecklistModel(data.get("model"), listFromText(data.get("items")));
      checklistModelForm.reset();
      return;
    }

    const checklistItemForm = event.target.closest("[data-checklist-item-form]");
    if (checklistItemForm) {
      event.preventDefault();
      addChecklistItem(checklistItemForm.dataset.checklistItemForm, new FormData(checklistItemForm).get("item"));
      checklistItemForm.reset();
    }
  });
}

function initRoles() {
  $("#roleSelect").innerHTML = state.roles.map((item) => `<option value="${item.id}" ${item.id === state.activeRole ? "selected" : ""}>${escapeHtml(item.name)}</option>`).join("");
  $("#roleHint").textContent = role().hint;
}

function subscribeWorkspace() {
  if (!supabaseClient || !state.authUser || state.remoteChannel) return;
  state.remoteChannel = supabaseClient
    .channel(`solvedesk-workspace-${state.authUser.id}`)
    .on("postgres_changes", {
      event: "UPDATE",
      schema: "public",
      table: SUPABASE_WORKSPACE_TABLE,
      filter: `user_id=eq.${state.authUser.id}`
    }, (payload) => {
      if (!payload.new?.data) return;
      applyWorkspaceData(payload.new.data);
      renderRoute();
      initRoles();
      buildProblemForm();
      buildAssetForm();
      buildUserForm();
      buildExportOptions();
      injectIcons();
      toast("Dados sincronizados", "Atualização recebida do Supabase.");
    })
    .subscribe();
}

async function startApp() {
  if (appStarted) {
    unlockApp();
    return;
  }
  await persistProfile();
  await loadState();
  appStarted = true;
  initRoles();
  buildProblemForm();
  buildAssetForm();
  buildUserForm();
  buildExportOptions();
  injectIcons();
  bindEvents();
  subscribeWorkspace();
  renderRoute();
  unlockApp();
}

async function init() {
  initTheme();
  bindAuthEvents();
  injectIcons($("#loginScreen"));
  if (!supabaseClient) {
    showLogin();
    setTimeout(() => $("#bootScreen").classList.add("hide"), 700);
    return;
  }
  const { data } = await supabaseClient.auth.getSession();
  if (data.session?.user) {
    state.authUser = data.session.user;
    await startApp().catch((error) => {
      showLogin();
      setLoginError(error.message || "Não foi possível carregar seus dados.");
    });
  } else {
    showLogin();
  }
  setTimeout(() => $("#bootScreen").classList.add("hide"), 700);
}

init().catch((error) => {
  showLogin();
  setLoginError(error.message || "Não foi possível iniciar o Supabase.");
  setTimeout(() => $("#bootScreen").classList.add("hide"), 700);
});
