// ====== CONFIG API ======
// TheSportsDB v1 free API (chave "3" pública). League 4429 = FIFA World Cup.
const API_BASE = "https://www.thesportsdb.com/api/v1/json/3";
const LEAGUE_ID = 4429;
const SEASON = "2026";

// ====== MAPEAMENTO DE BANDEIRAS / NOMES PT ======
// Cobre as 48 seleções que podem estar na Copa 2026.
// API costuma retornar nomes em inglês; mapeamos para PT + emoji.
const TEAM_INFO = {
  // Anfitriões
  "USA": { pt: "EUA", flag: "🇺🇸", power: 78 },
  "United States": { pt: "EUA", flag: "🇺🇸", power: 78 },
  "Canada": { pt: "Canadá", flag: "🇨🇦", power: 74 },
  "Mexico": { pt: "México", flag: "🇲🇽", power: 78 },
  // Conmebol
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
  // UEFA
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
  "Russia": { pt: "Rússia", flag: "🇷🇺", power: 76 },
  "Finland": { pt: "Finlândia", flag: "🇫🇮", power: 70 },
  // CAF
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
  "Burkina Faso": { pt: "Burquina Faso", flag: "🇧🇫", power: 70 },
  "DR Congo": { pt: "Rep. Dem. Congo", flag: "🇨🇩", power: 72 },
  // AFC
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
  "United Arab Emirates": { pt: "Emirados Árabes", flag: "🇦🇪", power: 67 },
  // CONCACAF
  "Costa Rica": { pt: "Costa Rica", flag: "🇨🇷", power: 71 },
  "Panama": { pt: "Panamá", flag: "🇵🇦", power: 71 },
  "Jamaica": { pt: "Jamaica", flag: "🇯🇲", power: 70 },
  "Honduras": { pt: "Honduras", flag: "🇭🇳", power: 67 },
  // OFC
  "New Zealand": { pt: "Nova Zelândia", flag: "🇳🇿", power: 68 },
};

function getInfo(name) {
  return TEAM_INFO[name] || { pt: name, flag: "🏳️", power: 70 };
}

// ====== ESTADO ======
let state = {
  groups: {},       // { "A": { teams: [...], matches: [...] } }
  knockout: { r32: [], r16: [], qf: [], sf: [], final: [], third: [] },
  champion: null,
  lastUpdate: null,
  loading: false,
  source: null,     // "api" | "sim"
};

// ====== FETCH API ======
async function fetchRealData() {
  state.loading = true;
  setLastUpdate("Buscando dados na API...");
  toggleButtons(true);
  try {
    const url = `${API_BASE}/eventsseason.php?id=${LEAGUE_ID}&s=${SEASON}`;
    const res = await fetch(url);
    if (!res.ok) throw new Error("HTTP " + res.status);
    const data = await res.json();
    const events = Array.isArray(data.events) ? data.events : [];
    if (events.length === 0) {
      toast("A API ainda não tem jogos publicados para a Copa 2026. Tente novamente mais tarde.");
      setLastUpdate("Sem dados na API");
      return;
    }
    parseEvents(events);
    state.source = "api";
    state.lastUpdate = new Date();
    const played = events.filter(e => isPlayed(e)).length;
    setLastUpdate(`✓ Atualizado ${state.lastUpdate.toLocaleString("pt-BR")} — ${played}/${events.length} jogos com resultado`);
    toast(`Atualizado! ${played} jogos disputados.`);
  } catch (err) {
    console.error(err);
    toast("Erro ao buscar dados: " + err.message);
    setLastUpdate("Falha na atualização — " + err.message);
  } finally {
    state.loading = false;
    toggleButtons(false);
    renderAll();
  }
}

function isPlayed(ev) {
  const h = ev.intHomeScore;
  const a = ev.intAwayScore;
  return h != null && h !== "" && a != null && a !== "";
}

function num(v) { const n = Number(v); return Number.isFinite(n) ? n : null; }

function parseEvents(events) {
  const groups = {};
  const ko = { r32: [], r16: [], qf: [], sf: [], final: [], third: [] };

  for (const ev of events) {
    const groupStr = (ev.strGroup || "").trim();
    const roundStr = (ev.strRound || "").toString();
    const round = inferRound(ev);

    const baseMatch = {
      home: ev.strHomeTeam,
      away: ev.strAwayTeam,
      hScore: isPlayed(ev) ? num(ev.intHomeScore) : null,
      aScore: isPlayed(ev) ? num(ev.intAwayScore) : null,
      date: ev.dateEvent || ev.strTimestamp || "",
      played: isPlayed(ev),
      winner: null,
    };
    if (baseMatch.played) {
      baseMatch.winner = baseMatch.hScore > baseMatch.aScore ? baseMatch.home
                       : baseMatch.hScore < baseMatch.aScore ? baseMatch.away
                       : null;
    }

    if (/group/i.test(groupStr) || (round === "group")) {
      const letter = (groupStr.match(/group\s*([A-L])/i)?.[1] || "?").toUpperCase();
      if (letter === "?") continue;
      groups[letter] ??= { teamSet: new Set(), matches: [] };
      groups[letter].teamSet.add(ev.strHomeTeam);
      groups[letter].teamSet.add(ev.strAwayTeam);
      groups[letter].matches.push(baseMatch);
    } else if (round && ko[round]) {
      ko[round].push(baseMatch);
    }
  }

  // calcula classificação de cada grupo
  for (const letter in groups) {
    const g = groups[letter];
    const teams = [...g.teamSet].map(name => ({
      name, info: getInfo(name),
      P:0, J:0, V:0, E:0, D:0, GP:0, GC:0, SG:0,
    }));
    const byName = Object.fromEntries(teams.map(t => [t.name, t]));
    for (const m of g.matches) {
      if (!m.played) continue;
      const h = byName[m.home], a = byName[m.away];
      if (!h || !a) continue;
      h.J++; a.J++;
      h.GP += m.hScore; h.GC += m.aScore;
      a.GP += m.aScore; a.GC += m.hScore;
      h.SG = h.GP - h.GC; a.SG = a.GP - a.GC;
      if (m.hScore > m.aScore) { h.V++; h.P += 3; a.D++; }
      else if (m.hScore < m.aScore) { a.V++; a.P += 3; h.D++; }
      else { h.E++; a.E++; h.P++; a.P++; }
    }
    teams.sort((x,y) => y.P-x.P || y.SG-x.SG || y.GP-x.GP || x.name.localeCompare(y.name));
    g.teams = teams;
    g.matches.sort((a,b) => (a.date||"").localeCompare(b.date||""));
    delete g.teamSet;
  }

  state.groups = groups;
  state.knockout = ko;
  state.champion = ko.final[0]?.winner ? ko.final[0].winner : null;
}

function inferRound(ev) {
  const r = (ev.strRound || "").toString().toLowerCase();
  const n = parseInt(ev.intRound, 10);
  if (r.includes("final") && !r.includes("semi") && !r.includes("quarter") && !r.includes("3rd")) return "final";
  if (r.includes("3rd") || r.includes("third place") || r.includes("3º")) return "third";
  if (r.includes("semi")) return "sf";
  if (r.includes("quarter")) return "qf";
  if (r.includes("round of 16") || r.includes("16th")) return "r16";
  if (r.includes("round of 32") || r.includes("32nd")) return "r32";
  if (r === "1" || r === "2" || r === "3" || (n >= 1 && n <= 3)) return "group";
  // códigos numéricos típicos do TheSportsDB
  if (n === 125) return "r32";
  if (n === 128 || n === 150) return "r16";
  if (n === 200) return "qf";
  if (n === 500) return "sf";
  if (n === 1000) return "final";
  if (n === 160) return "third";
  return null;
}

// ====== SIMULAÇÃO (para jogos sem resultado real) ======
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
    toast("Carregue os jogos primeiro com Atualizar Resultados.");
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
      // atualiza UI parcial
      const cell = document.querySelector(`[data-match="${letter}-${i}"] .score`);
      if (cell) {
        cell.textContent = `${h} × ${a}`;
        cell.classList.remove("pending");
        cell.classList.add("flash");
        setTimeout(() => cell.classList.remove("flash"), 600);
      }
      await sleep(120);
    }
    recalcStandings(letter);
  }
  state.source = state.source === "api" ? "api+sim" : "sim";
  toggleButtons(false);
  renderAll();
  toast("Jogos pendentes simulados.");
}

function recalcStandings(letter) {
  const g = state.groups[letter];
  for (const t of g.teams) { t.P=t.J=t.V=t.E=t.D=t.GP=t.GC=t.SG=0; }
  const byName = Object.fromEntries(g.teams.map(t => [t.name, t]));
  for (const m of g.matches) {
    if (!m.played) continue;
    const h = byName[m.home], a = byName[m.away];
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

// ====== MATA-MATA: construção a partir dos grupos (modo 2026 simplificado) ======
function buildKnockoutFromGroups() {
  const letters = Object.keys(state.groups).sort();
  if (letters.length < 12) {
    toast(`São esperados 12 grupos, encontrados ${letters.length}. Não dá pra montar o mata-mata.`);
    return false;
  }
  // pega top 2 de cada grupo + 8 melhores 3º colocados → 32 times
  const first = [], second = [], thirds = [];
  for (const l of letters) {
    const g = state.groups[l];
    if (!g.teams[0] || !g.teams[1]) return false;
    first.push({ ...g.teams[0], group: l, rank: 1 });
    second.push({ ...g.teams[1], group: l, rank: 2 });
    if (g.teams[2]) thirds.push({ ...g.teams[2], group: l, rank: 3 });
  }
  thirds.sort((a,b) => b.P-a.P || b.SG-a.SG || b.GP-a.GP);
  const bestThirds = thirds.slice(0, 8);

  // chaveamento simples 1ºs vs 3ºs/2ºs alternados
  const slots = [];
  for (let i = 0; i < 12; i++) slots.push(first[i]);
  for (let i = 0; i < 12; i++) slots.push(second[i]);
  for (let i = 0; i < 8; i++) slots.push(bestThirds[i]);
  // emparelha 1 vs último, 2 vs penúltimo, etc.
  const matches = [];
  for (let i = 0; i < 16; i++) {
    const home = slots[i];
    const away = slots[31 - i];
    matches.push({
      home: home.name, away: away.name,
      hScore: null, aScore: null, played: false, winner: null,
    });
  }
  state.knockout.r32 = matches;
  state.knockout.r16 = [];
  state.knockout.qf = [];
  state.knockout.sf = [];
  state.knockout.final = [];
  state.knockout.third = [];
  return true;
}

async function simulateNextKnockoutRound() {
  const ko = state.knockout;
  // se não tem r32, monta a partir dos grupos
  if (!ko.r32.length) {
    const ok = buildKnockoutFromGroups();
    if (!ok) return;
  }
  // descobre próxima fase pendente
  const order = ["r32","r16","qf","sf","final"];
  const labels = { r32:"Round of 32", r16:"Oitavas", qf:"Quartas", sf:"Semifinais", final:"Final" };
  let currentKey = null;
  for (const key of order) {
    const round = ko[key];
    if (!round.length || round.some(m => !m.played)) { currentKey = key; break; }
  }
  if (!currentKey) { toast("Torneio finalizado!"); return; }

  // se a fase atual está vazia, monta a partir da anterior
  if (!ko[currentKey].length) {
    const prevKey = order[order.indexOf(currentKey) - 1];
    const winners = ko[prevKey].map(m => m.winner).filter(Boolean);
    const pairs = [];
    for (let i = 0; i < winners.length; i += 2) {
      pairs.push({ home: winners[i], away: winners[i+1], hScore: null, aScore: null, played: false, winner: null });
    }
    ko[currentKey] = pairs;
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
    await sleep(550);
    const [h, a] = simulateMatch(m.home, m.away, false);
    m.hScore = h; m.aScore = a; m.played = true;
    m.winner = h > a ? m.home : m.away;
    renderBracket();
    const c2 = document.querySelector(`[data-ko="${currentKey}"][data-idx="${i}"]`);
    if (c2) {
      c2.classList.remove("playing"); c2.classList.add("played");
      const w = c2.querySelector(".bracket-team.winner");
      if (w) { w.classList.add("advance-anim"); setTimeout(()=>w.classList.remove("advance-anim"), 1200); }
    }
    await sleep(300);
  }

  // 3º lugar após semis
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
}

function teamLine(name) {
  const i = getInfo(name);
  return `<span class="flag">${i.flag}</span>${i.pt}`;
}

function renderGroups() {
  const container = document.getElementById("groups-container");
  const letters = Object.keys(state.groups).sort();
  if (letters.length === 0) {
    container.innerHTML = `<div class="empty-state">Clique em <strong>Atualizar Resultados</strong> para carregar os dados reais da Copa 2026.</div>`;
    return;
  }
  container.innerHTML = "";
  for (const letter of letters) {
    const g = state.groups[letter];
    const playedCount = g.matches.filter(m=>m.played).length;
    const card = document.createElement("div");
    card.className = "group-card";
    card.innerHTML = `
      <div class="group-title"><span>Grupo ${letter}</span><span style="font-size:12px;color:var(--muted)">${playedCount}/${g.matches.length} jogos</span></div>
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

function renderBracket() {
  const el = document.getElementById("bracket");
  const ko = state.knockout;
  if (!ko.r32.length && !ko.r16.length && !ko.qf.length) {
    el.innerHTML = `<div class="empty-state">O chaveamento aparece após carregar a fase de grupos.<br>Use <strong>Atualizar Resultados</strong> ou <strong>Simular Próxima Fase</strong>.</div>`;
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

function boot() {
  setupTabs();
  document.getElementById("btn-atualizar").addEventListener("click", fetchRealData);
  document.getElementById("btn-atualizar-ko").addEventListener("click", fetchRealData);
  document.getElementById("btn-simular-grupos").addEventListener("click", simulatePendingGroups);
  document.getElementById("btn-simular-fase").addEventListener("click", simulateNextKnockoutRound);
  document.getElementById("btn-simular-tudo").addEventListener("click", simulateAllKnockout);
  document.getElementById("btn-reset").addEventListener("click", () => {
    state = { groups:{}, knockout:{r32:[],r16:[],qf:[],sf:[],final:[],third:[]}, champion:null, lastUpdate:null, loading:false, source:null };
    setLastUpdate("Aguardando primeira atualização...");
    renderAll();
    toast("App reiniciado.");
  });

  // tenta carregar automaticamente ao abrir
  fetchRealData();
}

document.addEventListener("DOMContentLoaded", boot);
