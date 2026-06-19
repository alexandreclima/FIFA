// ====== CONFIG ======
// ESPN hidden API (sem chave, CORS habilitado). Slug fifa.world = Copa do Mundo.
const ESPN_BASE = "https://site.api.espn.com/apis/site/v2/sports/soccer/fifa.world";
const WC_START = "20260611"; // 11 jun 2026
const WC_END   = "20260719"; // 19 jul 2026
const STORAGE_KEY = "fifa2026.userGroups";

// Modelo padrão de grupos — EDITE PARA REFLETIR O SORTEIO REAL DA COPA 2026.
// Cada linha: "Letra: Time1, Time2, Time3, Time4".
const DEFAULT_GROUPS_TEXT = `A: México, Time A2, Time A3, Time A4
B: Canadá, Time B2, Time B3, Time B4
C: Time C1, Time C2, Time C3, Time C4
D: EUA, Time D2, Time D3, Time D4
E: Time E1, Time E2, Time E3, Time E4
F: Time F1, Time F2, Time F3, Time F4
G: Time G1, Time G2, Time G3, Time G4
H: Time H1, Time H2, Time H3, Time H4
I: Time I1, Time I2, Time I3, Time I4
J: Time J1, Time J2, Time J3, Time J4
K: Time K1, Time K2, Time K3, Time K4
L: Time L1, Time L2, Time L3, Time L4`;

// ====== TEAM INFO (PT + bandeira + força) ======
const TEAM_INFO = {
  "USA": { pt: "EUA", flag: "🇺🇸", power: 78 },
  "United States": { pt: "EUA", flag: "🇺🇸", power: 78 },
  "Canada": { pt: "Canadá", flag: "🇨🇦", power: 74 },
  "Mexico": { pt: "México", flag: "🇲🇽", power: 78 },
  "Brazil": { pt: "Brasil", flag: "🇧🇷", power: 92 },
  "Argentina": { pt: "Argentina", flag: "🇦🇷", power: 92 },
  "Uruguay": { pt: "Uruguai", flag: "🇺🇾", power: 83 },
  "Colombia": { pt: "Colômbia", flag: "🇨🇴", power: 82 },
  "Ecuador": { pt: "Equador", flag: "🇪🇨", power: 75 },
  "Paraguay": { pt: "Paraguai", flag: "🇵🇾", power: 74 },
  "Venezuela": { pt: "Venezuela", flag: "🇻🇪", power: 71 },
  "Bolivia": { pt: "Bolívia", flag: "🇧🇴", power: 65 },
  "Chile": { pt: "Chile", flag: "🇨🇱", power: 73 },
  "Peru": { pt: "Peru", flag: "🇵🇪", power: 71 },
  "France": { pt: "França", flag: "🇫🇷", power: 91 },
  "Spain": { pt: "Espanha", flag: "🇪🇸", power: 89 },
  "England": { pt: "Inglaterra", flag: "🏴󠁧󠁢󠁥󠁮󠁧󠁿", power: 88 },
  "Portugal": { pt: "Portugal", flag: "🇵🇹", power: 88 },
  "Germany": { pt: "Alemanha", flag: "🇩🇪", power: 86 },
  "Netherlands": { pt: "Holanda", flag: "🇳🇱", power: 85 },
  "Italy": { pt: "Itália", flag: "🇮🇹", power: 84 },
  "Belgium": { pt: "Bélgica", flag: "🇧🇪", power: 83 },
  "Croatia": { pt: "Croácia", flag: "🇭🇷", power: 82 },
  "Switzerland": { pt: "Suíça", flag: "🇨🇭", power: 79 },
  "Denmark": { pt: "Dinamarca", flag: "🇩🇰", power: 80 },
  "Austria": { pt: "Áustria", flag: "🇦🇹", power: 78 },
  "Turkey": { pt: "Turquia", flag: "🇹🇷", power: 78 },
  "Türkiye": { pt: "Turquia", flag: "🇹🇷", power: 78 },
  "Poland": { pt: "Polônia", flag: "🇵🇱", power: 76 },
  "Norway": { pt: "Noruega", flag: "🇳🇴", power: 78 },
  "Sweden": { pt: "Suécia", flag: "🇸🇪", power: 75 },
  "Serbia": { pt: "Sérvia", flag: "🇷🇸", power: 77 },
  "Ukraine": { pt: "Ucrânia", flag: "🇺🇦", power: 75 },
  "Czech Republic": { pt: "Tchéquia", flag: "🇨🇿", power: 75 },
  "Czechia": { pt: "Tchéquia", flag: "🇨🇿", power: 75 },
  "Scotland": { pt: "Escócia", flag: "🏴󠁧󠁢󠁳󠁣󠁴󠁿", power: 73 },
  "Wales": { pt: "País de Gales", flag: "🏴󠁧󠁢󠁷󠁬󠁳󠁿", power: 73 },
  "Republic of Ireland": { pt: "Irlanda", flag: "🇮🇪", power: 72 },
  "Ireland": { pt: "Irlanda", flag: "🇮🇪", power: 72 },
  "Hungary": { pt: "Hungria", flag: "🇭🇺", power: 74 },
  "Greece": { pt: "Grécia", flag: "🇬🇷", power: 73 },
  "Romania": { pt: "Romênia", flag: "🇷🇴", power: 72 },
  "Albania": { pt: "Albânia", flag: "🇦🇱", power: 71 },
  "Slovakia": { pt: "Eslováquia", flag: "🇸🇰", power: 72 },
  "Slovenia": { pt: "Eslovênia", flag: "🇸🇮", power: 72 },
  "Morocco": { pt: "Marrocos", flag: "🇲🇦", power: 81 },
  "Senegal": { pt: "Senegal", flag: "🇸🇳", power: 77 },
  "Tunisia": { pt: "Tunísia", flag: "🇹🇳", power: 73 },
  "Algeria": { pt: "Argélia", flag: "🇩🇿", power: 76 },
  "Egypt": { pt: "Egito", flag: "🇪🇬", power: 75 },
  "Nigeria": { pt: "Nigéria", flag: "🇳🇬", power: 78 },
  "Ghana": { pt: "Gana", flag: "🇬🇭", power: 72 },
  "Cameroon": { pt: "Camarões", flag: "🇨🇲", power: 73 },
  "Cape Verde": { pt: "Cabo Verde", flag: "🇨🇻", power: 70 },
  "Cote d'Ivoire": { pt: "Costa do Marfim", flag: "🇨🇮", power: 76 },
  "Ivory Coast": { pt: "Costa do Marfim", flag: "🇨🇮", power: 76 },
  "Mali": { pt: "Mali", flag: "🇲🇱", power: 71 },
  "South Africa": { pt: "África do Sul", flag: "🇿🇦", power: 72 },
  "DR Congo": { pt: "Rep. Dem. Congo", flag: "🇨🇩", power: 72 },
  "Japan": { pt: "Japão", flag: "🇯🇵", power: 80 },
  "Korea Republic": { pt: "Coreia do Sul", flag: "🇰🇷", power: 78 },
  "South Korea": { pt: "Coreia do Sul", flag: "🇰🇷", power: 78 },
  "Iran": { pt: "Irã", flag: "🇮🇷", power: 75 },
  "Australia": { pt: "Austrália", flag: "🇦🇺", power: 73 },
  "Saudi Arabia": { pt: "Arábia Saudita", flag: "🇸🇦", power: 70 },
  "Qatar": { pt: "Catar", flag: "🇶🇦", power: 68 },
  "Uzbekistan": { pt: "Uzbequistão", flag: "🇺🇿", power: 70 },
  "Jordan": { pt: "Jordânia", flag: "🇯🇴", power: 69 },
  "Iraq": { pt: "Iraque", flag: "🇮🇶", power: 68 },
  "Costa Rica": { pt: "Costa Rica", flag: "🇨🇷", power: 71 },
  "Panama": { pt: "Panamá", flag: "🇵🇦", power: 71 },
  "Jamaica": { pt: "Jamaica", flag: "🇯🇲", power: 70 },
  "Honduras": { pt: "Honduras", flag: "🇭🇳", power: 67 },
  "New Zealand": { pt: "Nova Zelândia", flag: "🇳🇿", power: 68 },
};

// Constrói índice reverso: PT (sem acento, minúsculo) → canonical English
const NAME_INDEX = (() => {
  const idx = {};
  const norm = s => s.toLowerCase().normalize("NFD").replace(/[̀-ͯ]/g,"").trim();
  for (const eng in TEAM_INFO) {
    idx[norm(eng)] = eng;
    idx[norm(TEAM_INFO[eng].pt)] = eng;
  }
  return idx;
})();

function canonical(name) {
  if (!name) return name;
  const norm = name.toLowerCase().normalize("NFD").replace(/[̀-ͯ]/g,"").trim();
  return NAME_INDEX[norm] || name;
}
function getInfo(name) {
  const k = canonical(name);
  return TEAM_INFO[k] || { pt: name, flag: "🏳️", power: 70 };
}

// ====== ESTADO ======
let state = {
  groups: {},     // { "A": { teams:[...], matches:[...] } }
  knockout: { r32:[], r16:[], qf:[], sf:[], final:[], third:[] },
  champion: null,
  lastApiEvents: [],
  lastUpdate: null,
};

// ====== USER CONFIG (localStorage) ======
function loadUserGroups() {
  const raw = localStorage.getItem(STORAGE_KEY);
  if (raw) {
    try { return JSON.parse(raw); } catch {}
  }
  return null;
}
function saveUserGroups(obj) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(obj));
}
function parseGroupsText(text) {
  const out = {};
  for (const line of text.split(/\r?\n/)) {
    const m = line.match(/^\s*([A-L])\s*[:\-]\s*(.+)$/i);
    if (!m) continue;
    const letter = m[1].toUpperCase();
    const teams = m[2].split(/[,;|]/).map(s => s.trim()).filter(Boolean);
    if (teams.length === 4) out[letter] = teams.map(canonical);
  }
  return out;
}
function groupsToText(userGroups) {
  if (!userGroups) return "";
  return Object.keys(userGroups).sort().map(letter => {
    const teams = userGroups[letter].map(t => getInfo(t).pt);
    return `${letter}: ${teams.join(", ")}`;
  }).join("\n");
}

// gera os 6 jogos do round-robin
function genMatches(teams) {
  const [a, b, c, d] = teams;
  return [
    { home:a, away:b }, { home:c, away:d },
    { home:a, away:c }, { home:b, away:d },
    { home:a, away:d }, { home:b, away:c },
  ].map(m => ({ ...m, hScore:null, aScore:null, played:false, winner:null }));
}

function buildGroupsFromUserConfig() {
  const ug = loadUserGroups();
  if (!ug) { state.groups = {}; return; }
  const groups = {};
  for (const letter in ug) {
    const teamNames = ug[letter];
    const teams = teamNames.map(name => ({
      name, info:getInfo(name),
      P:0, J:0, V:0, E:0, D:0, GP:0, GC:0, SG:0,
    }));
    groups[letter] = { teams, matches: genMatches(teamNames) };
  }
  state.groups = groups;
}

// ====== API (ESPN) ======
function num(v){ const n=Number(v); return Number.isFinite(n)?n:null; }

async function fetchRealData() {
  setLastUpdate("Buscando dados na ESPN...");
  toggleButtons(true);
  try {
    const url = `${ESPN_BASE}/scoreboard?dates=${WC_START}-${WC_END}&limit=200`;
    const res = await fetch(url);
    if (!res.ok) throw new Error("HTTP " + res.status);
    const data = await res.json();
    const events = Array.isArray(data.events) ? data.events : [];
    state.lastApiEvents = events;

    if (events.length === 0) {
      toast("ESPN ainda sem jogos da Copa 2026 nesse intervalo.");
      setLastUpdate("API sem dados ainda — tente mais tarde.");
    } else {
      const parsed = parseEspnEvents(events);
      const espnGroupCount = Object.keys(parsed.groups).length;

      if (espnGroupCount > 0) {
        // ESPN identificou os grupos — usa como fonte da verdade
        state.groups = parsed.groups;
        state.knockout = parsed.knockout;
        state.champion = parsed.knockout.final[0]?.winner || null;
      } else if (loadUserGroups()) {
        // ESPN retornou jogos mas sem agrupamento — usa config manual e preenche placares
        buildGroupsFromUserConfig();
        fillScoresFromEspn(events);
      }

      state.lastUpdate = new Date();
      const groupCount = Object.keys(state.groups).length;
      const played = events.filter(e => isEspnPlayed(e)).length;
      toast(`ESPN: ${events.length} jogos, ${played} disputados, ${groupCount} grupos.`);
      setLastUpdate(`✓ ${state.lastUpdate.toLocaleString("pt-BR")} — ${played}/${events.length} jogos disputados`);
    }
  } catch (err) {
    console.error(err);
    toast("Erro na ESPN: " + err.message);
    setLastUpdate("Falha na atualização — " + err.message);
  } finally {
    toggleButtons(false);
    renderAll();
  }
}

function isEspnPlayed(ev) {
  return ev.competitions?.[0]?.status?.type?.completed === true;
}

function parseEspnEvents(events) {
  const groups = {};
  const ko = { r32:[], r16:[], qf:[], sf:[], final:[], third:[] };

  for (const ev of events) {
    const comp = ev.competitions?.[0];
    if (!comp || !comp.competitors || comp.competitors.length < 2) continue;
    const homeC = comp.competitors.find(c => c.homeAway === "home") || comp.competitors[0];
    const awayC = comp.competitors.find(c => c.homeAway === "away") || comp.competitors[1];

    const home = homeC.team?.displayName || homeC.team?.name || "?";
    const away = awayC.team?.displayName || awayC.team?.name || "?";
    const hScore = num(homeC.score);
    const aScore = num(awayC.score);
    const played = comp.status?.type?.completed === true;

    const match = {
      home, away,
      hScore: played ? hScore : null,
      aScore: played ? aScore : null,
      played,
      date: ev.date,
      winner: played ? (hScore > aScore ? home : aScore > hScore ? away : null) : null,
    };

    // detectar rodada/grupo via "notes", "name" ou "season.slug"
    const headline = (comp.notes?.[0]?.headline || comp.notes?.[0]?.text || "").toLowerCase();
    const eventName = (ev.name || "").toLowerCase();
    const round = inferEspnRound(headline + " " + eventName);

    if (round?.type === "group") {
      const letter = round.letter;
      groups[letter] ??= { teamSet: new Set(), matches: [] };
      groups[letter].teamSet.add(home);
      groups[letter].teamSet.add(away);
      groups[letter].matches.push(match);
    } else if (round?.type && ko[round.type]) {
      ko[round.type].push(match);
    } else {
      // fallback: assume grupo "?" ou ignora
    }
  }

  // monta teams + standings por grupo
  for (const letter in groups) {
    const g = groups[letter];
    const teams = [...g.teamSet].map(name => ({
      name, info: getInfo(name),
      P:0, J:0, V:0, E:0, D:0, GP:0, GC:0, SG:0,
    }));
    g.teams = teams;
    delete g.teamSet;
  }
  for (const letter in groups) {
    state.groups = groups;
    recalcStandings(letter);
  }
  state.groups = groups;

  // ordena partidas por data
  for (const letter in groups) {
    groups[letter].matches.sort((a,b) => (a.date||"").localeCompare(b.date||""));
  }
  for (const k of Object.keys(ko)) {
    ko[k].sort((a,b) => (a.date||"").localeCompare(b.date||""));
  }
  return { groups, knockout: ko };
}

function fillScoresFromEspn(events) {
  let count = 0;
  for (const ev of events) {
    if (!isEspnPlayed(ev)) continue;
    const c = ev.competitions?.[0];
    const homeC = c?.competitors?.find(x=>x.homeAway==="home") || c?.competitors?.[0];
    const awayC = c?.competitors?.find(x=>x.homeAway==="away") || c?.competitors?.[1];
    if (!homeC || !awayC) continue;
    const home = canonical(homeC.team.displayName);
    const away = canonical(awayC.team.displayName);
    const hScore = num(homeC.score);
    const aScore = num(awayC.score);
    let matched = false;
    for (const letter in state.groups) {
      const g = state.groups[letter];
      for (const m of g.matches) {
        const mh = canonical(m.home), ma = canonical(m.away);
        if (mh === home && ma === away) {
          m.hScore = hScore; m.aScore = aScore; m.played = true;
          m.winner = hScore > aScore ? m.home : (hScore < aScore ? m.away : null);
          matched = true;
        } else if (mh === away && ma === home) {
          m.hScore = aScore; m.aScore = hScore; m.played = true;
          m.winner = m.hScore > m.aScore ? m.home : (m.hScore < m.aScore ? m.away : null);
          matched = true;
        }
      }
    }
    if (matched) count++;
  }
  for (const letter in state.groups) recalcStandings(letter);
  return count;
}

function inferEspnRound(text) {
  const t = text.toLowerCase();
  const gm = t.match(/group\s*([a-l])\b/);
  if (gm) return { type: "group", letter: gm[1].toUpperCase() };
  if (t.includes("third place") || t.includes("3rd place") || t.includes("third-place")) return { type: "third" };
  if (t.includes("final") && !t.includes("semi") && !t.includes("quarter")) return { type: "final" };
  if (t.includes("semifinal") || t.includes("semi-final")) return { type: "sf" };
  if (t.includes("quarterfinal") || t.includes("quarter-final")) return { type: "qf" };
  if (t.includes("round of 16")) return { type: "r16" };
  if (t.includes("round of 32")) return { type: "r32" };
  return null;
}

function recalcStandings(letter) {
  const g = state.groups[letter];
  for (const t of g.teams) { t.P=t.J=t.V=t.E=t.D=t.GP=t.GC=t.SG=0; }
  const byName = Object.fromEntries(g.teams.map(t => [canonical(t.name), t]));
  for (const m of g.matches) {
    if (!m.played) continue;
    const h = byName[canonical(m.home)], a = byName[canonical(m.away)];
    if (!h || !a) continue;
    h.J++; a.J++;
    h.GP += m.hScore; h.GC += m.aScore;
    a.GP += m.aScore; a.GC += m.hScore;
    h.SG = h.GP - h.GC; a.SG = a.GP - a.GC;
    if (m.hScore > m.aScore) { h.V++; h.P += 3; a.D++; }
    else if (m.hScore < m.aScore) { a.V++; a.P += 3; h.D++; }
    else { h.E++; a.E++; h.P++; a.P++; }
  }
  g.teams.sort((x,y) => y.P-x.P || y.SG-x.SG || y.GP-x.GP || x.name.localeCompare(y.name));
}

// ====== SIMULAÇÃO ======
function simScore(pA, pB) {
  const diff = pA - pB;
  const a = Math.max(0, Math.round(1.3 + diff*0.04 + Math.random()*1.2 + (Math.random()-0.5)));
  const b = Math.max(0, Math.round(1.3 - diff*0.04 + Math.random()*1.2 + (Math.random()-0.5)));
  return [a, b];
}
function simulateMatch(homeName, awayName, allowDraw=true) {
  const pH = getInfo(homeName).power, pA = getInfo(awayName).power;
  let [h, a] = simScore(pH, pA);
  if (!allowDraw && h === a) {
    const winH = (pH + Math.random()*30) > (pA + Math.random()*30);
    if (winH) h++; else a++;
  }
  return [h, a];
}

async function simulatePendingGroups() {
  if (Object.keys(state.groups).length === 0) {
    toast("Configure os grupos antes de simular.");
    return;
  }
  toggleButtons(true);
  toast("Simulando jogos pendentes...");
  for (const letter of Object.keys(state.groups).sort()) {
    const g = state.groups[letter];
    for (let i = 0; i < g.matches.length; i++) {
      const m = g.matches[i];
      if (m.played) continue;
      const [h, a] = simulateMatch(m.home, m.away, true);
      m.hScore = h; m.aScore = a; m.played = true;
      m.winner = h>a ? m.home : (h<a ? m.away : null);
      const cell = document.querySelector(`[data-match="${letter}-${i}"] .score`);
      if (cell) {
        cell.textContent = `${h} × ${a}`;
        cell.classList.remove("pending");
        cell.classList.add("flash");
        setTimeout(() => cell.classList.remove("flash"), 600);
      }
      await sleep(80);
    }
    recalcStandings(letter);
  }
  toggleButtons(false);
  renderAll();
  toast("Pendentes simulados!");
}

// ====== MATA-MATA ======
function buildKnockoutFromGroups() {
  const letters = Object.keys(state.groups).sort();
  if (letters.length < 12) {
    toast(`Esperados 12 grupos, encontrados ${letters.length}. Verifique a config.`);
    return false;
  }
  const first=[], second=[], thirds=[];
  for (const l of letters) {
    const g = state.groups[l];
    if (!g.teams[0] || !g.teams[1]) return false;
    first.push({ ...g.teams[0], group:l, rank:1 });
    second.push({ ...g.teams[1], group:l, rank:2 });
    if (g.teams[2]) thirds.push({ ...g.teams[2], group:l, rank:3 });
  }
  thirds.sort((a,b) => b.P-a.P || b.SG-a.SG || b.GP-a.GP);
  const slots = [...first, ...second, ...thirds.slice(0,8)];
  const matches = [];
  for (let i = 0; i < 16; i++) {
    matches.push({
      home: slots[i].name, away: slots[31-i].name,
      hScore:null, aScore:null, played:false, winner:null,
    });
  }
  state.knockout = { r32: matches, r16:[], qf:[], sf:[], final:[], third:[] };
  return true;
}

async function simulateNextKnockoutRound() {
  const ko = state.knockout;
  if (!ko.r32.length) {
    if (!buildKnockoutFromGroups()) return;
  }
  const order = ["r32","r16","qf","sf","final"];
  const labels = { r32:"Round of 32", r16:"Oitavas", qf:"Quartas", sf:"Semifinais", final:"Final" };
  let currentKey = null;
  for (const key of order) {
    const r = ko[key];
    if (!r.length || r.some(m => !m.played)) { currentKey = key; break; }
  }
  if (!currentKey) { toast("Torneio finalizado!"); return; }
  if (!ko[currentKey].length) {
    const prevKey = order[order.indexOf(currentKey)-1];
    const winners = ko[prevKey].map(m => m.winner).filter(Boolean);
    ko[currentKey] = [];
    for (let i = 0; i < winners.length; i += 2) {
      ko[currentKey].push({ home: winners[i], away: winners[i+1], hScore:null, aScore:null, played:false, winner:null });
    }
    renderBracket();
    await sleep(300);
  }
  toggleButtons(true);
  toast(`Simulando ${labels[currentKey]}...`);
  const round = ko[currentKey];
  for (let i = 0; i < round.length; i++) {
    const m = round[i];
    if (m.played) continue;
    const card = document.querySelector(`[data-ko="${currentKey}"][data-idx="${i}"]`);
    if (card) card.classList.add("playing");
    await sleep(500);
    const [h, a] = simulateMatch(m.home, m.away, false);
    m.hScore=h; m.aScore=a; m.played=true; m.winner = h>a?m.home:m.away;
    renderBracket();
    const c2 = document.querySelector(`[data-ko="${currentKey}"][data-idx="${i}"]`);
    if (c2) {
      c2.classList.remove("playing"); c2.classList.add("played");
      const w = c2.querySelector(".bracket-team.winner");
      if (w) { w.classList.add("advance-anim"); setTimeout(()=>w.classList.remove("advance-anim"), 1200); }
    }
    await sleep(250);
  }
  if (currentKey === "sf" && ko.sf.every(m=>m.played) && !ko.third.length) {
    const losers = ko.sf.map(m => m.winner === m.home ? m.away : m.home);
    ko.third = [{ home: losers[0], away: losers[1], hScore:null, aScore:null, played:false, winner:null }];
  }
  if (currentKey === "final" && ko.third[0] && !ko.third[0].played) {
    const t = ko.third[0];
    const [h, a] = simulateMatch(t.home, t.away, false);
    t.hScore=h; t.aScore=a; t.played=true; t.winner = h>a?t.home:t.away;
  }
  if (currentKey === "final" && ko.final[0]?.played) {
    state.champion = ko.final[0].winner;
    renderChampion();
  }
  toggleButtons(false);
  renderAll();
}

async function simulateAllKnockout() {
  while (!state.champion) {
    const before = JSON.stringify(state.knockout);
    await simulateNextKnockoutRound();
    if (JSON.stringify(state.knockout) === before) break;
    await sleep(200);
  }
}

// ====== RENDER ======
function renderAll() {
  renderGroups();
  renderBracket();
  renderChampion();
  renderApiEvents();
}

function teamLine(name) {
  const i = getInfo(name);
  return `<span class="flag">${i.flag}</span>${i.pt}`;
}

function renderGroups() {
  const container = document.getElementById("groups-container");
  const letters = Object.keys(state.groups).sort();
  if (letters.length === 0) {
    container.innerHTML = `<div class="empty-state">
      Nenhum grupo configurado.<br>
      Clique em <strong>⚙️ Configurar Grupos</strong> acima para definir os 12 grupos da Copa 2026.
    </div>`;
    return;
  }
  container.innerHTML = "";
  for (const letter of letters) {
    const g = state.groups[letter];
    const played = g.matches.filter(m=>m.played).length;
    const card = document.createElement("div");
    card.className = "group-card";
    card.innerHTML = `
      <div class="group-title"><span>Grupo ${letter}</span><span style="font-size:12px;color:var(--muted)">${played}/${g.matches.length} jogos</span></div>
      <table class="standings">
        <thead><tr><th>Time</th><th>P</th><th>J</th><th>V</th><th>E</th><th>D</th><th>SG</th></tr></thead>
        <tbody>
          ${g.teams.map((t, i) => `
            <tr class="${i < 2 ? "qualified" : ""}">
              <td>${teamLine(t.name)}</td>
              <td><strong>${t.P}</strong></td>
              <td>${t.J}</td><td>${t.V}</td><td>${t.E}</td><td>${t.D}</td>
              <td>${t.SG>0?"+":""}${t.SG}</td>
            </tr>`).join("")}
        </tbody>
      </table>
      <div class="matches">
        ${g.matches.map((m, idx) => `
          <div class="match-row" data-match="${letter}-${idx}">
            <span class="home">${teamLine(m.home)}</span>
            <span class="score ${m.played?"":"pending"}">${m.played ? `${m.hScore} × ${m.aScore}` : "— × —"}</span>
            <span class="away">${teamLine(m.away)}</span>
          </div>`).join("")}
      </div>
    `;
    container.appendChild(card);
  }
}

function renderApiEvents() {
  const el = document.getElementById("api-events");
  const evs = state.lastApiEvents;
  if (!evs.length) { el.innerHTML = ""; return; }
  const fmtDate = d => {
    if (!d) return "?";
    try { return new Date(d).toLocaleDateString("pt-BR", { day:"2-digit", month:"2-digit" }); }
    catch { return d.substring(0,10); }
  };
  const espnRow = ev => {
    const c = ev.competitions?.[0];
    const home = c?.competitors?.find(x=>x.homeAway==="home") || c?.competitors?.[0];
    const away = c?.competitors?.find(x=>x.homeAway==="away") || c?.competitors?.[1];
    if (!home || !away) return "";
    const played = c?.status?.type?.completed;
    return `<div class="api-row">
      <span class="api-date">${fmtDate(ev.date)}</span>
      <span class="api-teams">${teamLine(home.team.displayName)} <strong>${played ? `${home.score}×${away.score}` : "vs"}</strong> ${teamLine(away.team.displayName)}</span>
    </div>`;
  };
  const finished = evs.filter(isEspnPlayed).sort((a,b) => (b.date||"").localeCompare(a.date||""));
  const upcoming = evs.filter(e => !isEspnPlayed(e)).sort((a,b) => (a.date||"").localeCompare(b.date||""));
  el.innerHTML = `
    <h3 class="section-title">Últimos resultados da ESPN <small>(${evs.length} jogos no intervalo)</small></h3>
    ${finished.length ? `<div class="api-block"><h4>✅ Disputados</h4>${finished.slice(0,15).map(espnRow).join("")}</div>` : ""}
    ${upcoming.length ? `<div class="api-block"><h4>📅 Próximos</h4>${upcoming.slice(0,15).map(espnRow).join("")}</div>` : ""}
  `;
}

function renderBracket() {
  const el = document.getElementById("bracket");
  const ko = state.knockout;
  if (!ko.r32.length && !ko.r16.length && !ko.qf.length) {
    el.innerHTML = `<div class="empty-state">O chaveamento aparece quando você simular o mata-mata.<br>Use o botão <strong>Simular Próxima Fase</strong>.</div>`;
    return;
  }
  const drawMatch = (m, key, idx) => {
    if (!m) return `<div class="bracket-match" data-ko="${key}" data-idx="${idx}">
      <div class="bracket-team placeholder"><span class="team-name">A definir</span><span class="bteam-score">-</span></div>
      <div class="bracket-team placeholder"><span class="team-name">A definir</span><span class="bteam-score">-</span></div>
    </div>`;
    const winH = m.played && m.winner === m.home;
    const winA = m.played && m.winner === m.away;
    return `<div class="bracket-match ${m.played?"played":""}" data-ko="${key}" data-idx="${idx}">
      <div class="bracket-team ${winH?"winner":(m.played?"loser":"")}">
        <span class="team-name">${teamLine(m.home)}</span>
        <span class="bteam-score">${m.played ? m.hScore : "-"}</span>
      </div>
      <div class="bracket-team ${winA?"winner":(m.played?"loser":"")}">
        <span class="team-name">${teamLine(m.away)}</span>
        <span class="bteam-score">${m.played ? m.aScore : "-"}</span>
      </div>
    </div>`;
  };
  const round = (label, key, fillN) => {
    const list = ko[key]?.length ? ko[key] : Array(fillN).fill(null);
    return `<div class="bracket-round"><h3>${label}</h3>${list.map((m,i)=>drawMatch(m,key,i)).join("")}</div>`;
  };
  el.innerHTML = `
    ${round("Round of 32", "r32", 16)}
    ${round("Oitavas", "r16", 8)}
    ${round("Quartas", "qf", 4)}
    ${round("Semifinais", "sf", 2)}
    <div class="bracket-round"><h3>Final</h3>${drawMatch(ko.final[0], "final", 0)}
      <h3 style="margin-top:24px">3º Lugar</h3>${drawMatch(ko.third[0], "third", 0)}
    </div>
  `;
}

function renderChampion() {
  const el = document.getElementById("champion-area");
  if (!state.champion) {
    el.innerHTML = `<p class="empty-msg">O campeão será revelado quando a final for jogada.</p>`;
    return;
  }
  const c = getInfo(state.champion);
  const ko = state.knockout;
  el.innerHTML = `
    <div class="champion-trophy">🏆</div>
    <div class="champion-label">Campeão Mundial</div>
    <div class="champion-name"><span class="flag">${c.flag}</span> ${c.pt}</div>
    <div style="margin-top:32px;color:var(--muted);font-size:14px">
      ${ko.final[0] ? `<p>Final: ${getInfo(ko.final[0].home).pt} ${ko.final[0].hScore} × ${ko.final[0].aScore} ${getInfo(ko.final[0].away).pt}</p>` : ""}
      ${ko.third[0]?.played ? `<p style="margin-top:8px">3º lugar: ${getInfo(ko.third[0].home).pt} ${ko.third[0].hScore} × ${ko.third[0].aScore} ${getInfo(ko.third[0].away).pt} → 🥉 ${getInfo(ko.third[0].winner).pt}</p>` : ""}
    </div>`;
  fireConfetti();
}

function fireConfetti() {
  const colors = ["#ffd700","#00c853","#ef4444","#3b82f6","#f59e0b","#a855f7"];
  for (let i = 0; i < 80; i++) {
    const c = document.createElement("div");
    c.className = "confetti";
    c.style.left = Math.random()*100 + "vw";
    c.style.background = colors[Math.floor(Math.random()*colors.length)];
    c.style.animationDuration = (2 + Math.random()*2) + "s";
    c.style.animationDelay = Math.random() + "s";
    document.body.appendChild(c);
    setTimeout(() => c.remove(), 5000);
  }
}

// ====== UI HELPERS ======
function sleep(ms){ return new Promise(r=>setTimeout(r,ms)); }
function toast(msg) {
  const t = document.getElementById("toast");
  t.textContent = msg;
  t.classList.add("show");
  clearTimeout(toast._t);
  toast._t = setTimeout(()=>t.classList.remove("show"), 2800);
}
function setLastUpdate(txt) { document.getElementById("last-update").textContent = txt; }
function toggleButtons(disabled) {
  document.querySelectorAll("button").forEach(b => { b.disabled = disabled; });
}
function setupTabs() {
  document.querySelectorAll(".tab-btn").forEach(btn => {
    btn.addEventListener("click", () => {
      document.querySelectorAll(".tab-btn").forEach(b => b.classList.remove("active"));
      document.querySelectorAll(".tab-panel").forEach(p => p.classList.remove("active"));
      btn.classList.add("active");
      document.getElementById(btn.dataset.tab).classList.add("active");
    });
  });
}

function openConfig() {
  const panel = document.getElementById("config-panel");
  const ta = document.getElementById("config-textarea");
  const ug = loadUserGroups();
  ta.value = ug ? groupsToText(ug) : DEFAULT_GROUPS_TEXT;
  panel.open = true;
  panel.scrollIntoView({ behavior: "smooth", block: "start" });
}

function saveConfig() {
  const ta = document.getElementById("config-textarea");
  const parsed = parseGroupsText(ta.value);
  const letters = Object.keys(parsed);
  if (letters.length === 0) {
    toast("Não consegui ler nenhum grupo. Verifique o formato.");
    return;
  }
  saveUserGroups(parsed);
  buildGroupsFromUserConfig();
  renderAll();
  toast(`${letters.length} grupos salvos!`);
  document.getElementById("config-panel").open = false;
  // depois de salvar, busca placares
  fetchRealData();
}

function boot() {
  setupTabs();
  buildGroupsFromUserConfig();

  document.getElementById("btn-atualizar").addEventListener("click", fetchRealData);
  document.getElementById("btn-atualizar-ko").addEventListener("click", fetchRealData);
  document.getElementById("btn-simular-grupos").addEventListener("click", simulatePendingGroups);
  document.getElementById("btn-simular-fase").addEventListener("click", simulateNextKnockoutRound);
  document.getElementById("btn-simular-tudo").addEventListener("click", simulateAllKnockout);
  document.getElementById("btn-config").addEventListener("click", openConfig);
  document.getElementById("btn-save-config").addEventListener("click", saveConfig);
  document.getElementById("btn-load-default").addEventListener("click", () => {
    document.getElementById("config-textarea").value = DEFAULT_GROUPS_TEXT;
  });
  document.getElementById("btn-reset").addEventListener("click", () => {
    if (!confirm("Apagar tudo (grupos configurados e placares)?")) return;
    localStorage.removeItem(STORAGE_KEY);
    state = { groups:{}, knockout:{r32:[],r16:[],qf:[],sf:[],final:[],third:[]}, champion:null, lastApiEvents:[], lastUpdate:null };
    setLastUpdate("App reiniciado.");
    renderAll();
    toast("Tudo limpo.");
  });

  // sempre tenta buscar da ESPN primeiro — ela é fonte da verdade
  fetchRealData();
}

document.addEventListener("DOMContentLoaded", boot);
