// ============== DADOS DA COPA ==============
const GROUPS_DATA = {
  A: [
    { name: "Catar",       flag: "🇶🇦", power: 65 },
    { name: "Equador",     flag: "🇪🇨", power: 72 },
    { name: "Senegal",     flag: "🇸🇳", power: 76 },
    { name: "Holanda",     flag: "🇳🇱", power: 85 },
  ],
  B: [
    { name: "Inglaterra",  flag: "🏴󠁧󠁢󠁥󠁮󠁧󠁿", power: 86 },
    { name: "Irã",         flag: "🇮🇷", power: 70 },
    { name: "EUA",         flag: "🇺🇸", power: 75 },
    { name: "País de Gales", flag: "🏴󠁧󠁢󠁷󠁬󠁳󠁿", power: 73 },
  ],
  C: [
    { name: "Argentina",   flag: "🇦🇷", power: 90 },
    { name: "Arábia Saudita", flag: "🇸🇦", power: 66 },
    { name: "México",      flag: "🇲🇽", power: 76 },
    { name: "Polônia",     flag: "🇵🇱", power: 78 },
  ],
  D: [
    { name: "França",      flag: "🇫🇷", power: 89 },
    { name: "Austrália",   flag: "🇦🇺", power: 70 },
    { name: "Dinamarca",   flag: "🇩🇰", power: 80 },
    { name: "Tunísia",     flag: "🇹🇳", power: 71 },
  ],
  E: [
    { name: "Espanha",     flag: "🇪🇸", power: 87 },
    { name: "Costa Rica",  flag: "🇨🇷", power: 68 },
    { name: "Alemanha",    flag: "🇩🇪", power: 85 },
    { name: "Japão",       flag: "🇯🇵", power: 77 },
  ],
  F: [
    { name: "Bélgica",     flag: "🇧🇪", power: 84 },
    { name: "Canadá",      flag: "🇨🇦", power: 72 },
    { name: "Marrocos",    flag: "🇲🇦", power: 79 },
    { name: "Croácia",     flag: "🇭🇷", power: 83 },
  ],
  G: [
    { name: "Brasil",      flag: "🇧🇷", power: 92 },
    { name: "Sérvia",      flag: "🇷🇸", power: 77 },
    { name: "Suíça",       flag: "🇨🇭", power: 78 },
    { name: "Camarões",    flag: "🇨🇲", power: 71 },
  ],
  H: [
    { name: "Portugal",    flag: "🇵🇹", power: 86 },
    { name: "Gana",        flag: "🇬🇭", power: 70 },
    { name: "Uruguai",     flag: "🇺🇾", power: 81 },
    { name: "Coreia do Sul", flag: "🇰🇷", power: 75 },
  ],
};

// ============== ESTADO ==============
let state = {
  groups: {},        // { A: [{team, P, J, V, E, D, GP, GC, SG}, ...] }
  matches: {},       // { A: [{home, away, hScore, aScore, played}, ...] }
  knockout: {
    r16:    Array(8).fill(null),
    quarts: Array(4).fill(null),
    semis:  Array(2).fill(null),
    final:  [null],
    third:  [null],
  },
  champion: null,
};

function initState() {
  state = {
    groups: {},
    matches: {},
    knockout: {
      r16:    Array(8).fill(null),
      quarts: Array(4).fill(null),
      semis:  Array(2).fill(null),
      final:  [null],
      third:  [null],
    },
    champion: null,
  };
  for (const g of Object.keys(GROUPS_DATA)) {
    state.groups[g] = GROUPS_DATA[g].map(t => ({
      ...t, P: 0, J: 0, V: 0, E: 0, D: 0, GP: 0, GC: 0, SG: 0
    }));
    // round-robin: 6 jogos por grupo (0v1, 2v3, 0v2, 1v3, 0v3, 1v2)
    state.matches[g] = [
      { home: 0, away: 1, hScore: null, aScore: null, played: false },
      { home: 2, away: 3, hScore: null, aScore: null, played: false },
      { home: 0, away: 2, hScore: null, aScore: null, played: false },
      { home: 1, away: 3, hScore: null, aScore: null, played: false },
      { home: 0, away: 3, hScore: null, aScore: null, played: false },
      { home: 1, away: 2, hScore: null, aScore: null, played: false },
    ];
  }
}

// ============== SIMULAÇÃO ==============
function simulateScore(powerA, powerB) {
  // poisson-ish baseado na força
  const diff = powerA - powerB;
  const baseA = 1.3 + diff * 0.04 + Math.random() * 1.2;
  const baseB = 1.3 - diff * 0.04 + Math.random() * 1.2;
  return [Math.max(0, Math.round(baseA + (Math.random() - 0.5))),
          Math.max(0, Math.round(baseB + (Math.random() - 0.5)))];
}

function simulateMatch(teamA, teamB, allowDraw = true) {
  let [a, b] = simulateScore(teamA.power, teamB.power);
  if (!allowDraw && a === b) {
    // decisão nos pênaltis: força + sorte
    const winA = (teamA.power + Math.random() * 30) > (teamB.power + Math.random() * 30);
    if (winA) a += 1; else b += 1;
  }
  return [a, b];
}

function applyMatch(group, idx) {
  const m = state.matches[group][idx];
  if (m.played) return;
  const teams = state.groups[group];
  const home = teams[m.home];
  const away = teams[m.away];
  const [h, a] = simulateMatch(home, away, true);
  m.hScore = h; m.aScore = a; m.played = true;

  home.J++; away.J++;
  home.GP += h; home.GC += a; home.SG = home.GP - home.GC;
  away.GP += a; away.GC += h; away.SG = away.GP - away.GC;
  if (h > a)      { home.V++; home.P += 3; away.D++; }
  else if (h < a) { away.V++; away.P += 3; home.D++; }
  else            { home.E++; home.P += 1; away.E++; away.P += 1; }
}

function sortGroup(g) {
  return [...state.groups[g]].sort((a, b) =>
    b.P - a.P || b.SG - a.SG || b.GP - a.GP || a.name.localeCompare(b.name)
  );
}

// ============== RENDER GRUPOS ==============
function renderGroups() {
  const container = document.getElementById("groups-container");
  container.innerHTML = "";
  for (const g of Object.keys(state.groups)) {
    const sorted = sortGroup(g);
    const card = document.createElement("div");
    card.className = "group-card";
    card.innerHTML = `
      <div class="group-title"><span>Grupo ${g}</span><span style="font-size:13px;color:var(--muted)">${state.matches[g].filter(m=>m.played).length}/6 jogos</span></div>
      <table class="standings">
        <thead>
          <tr><th>Time</th><th>P</th><th>J</th><th>V</th><th>E</th><th>D</th><th>SG</th></tr>
        </thead>
        <tbody>
          ${sorted.map((t, i) => `
            <tr class="${i < 2 && state.matches[g].every(m=>m.played) ? "qualified" : ""}" data-team="${t.name}">
              <td><span class="flag">${t.flag}</span>${t.name}</td>
              <td><strong>${t.P}</strong></td>
              <td>${t.J}</td><td>${t.V}</td><td>${t.E}</td><td>${t.D}</td>
              <td>${t.SG > 0 ? "+" : ""}${t.SG}</td>
            </tr>`).join("")}
        </tbody>
      </table>
      <div class="matches" id="matches-${g}">
        ${state.matches[g].map((m, idx) => {
          const home = state.groups[g][m.home];
          const away = state.groups[g][m.away];
          const scoreStr = m.played ? `${m.hScore} × ${m.aScore}` : "— × —";
          return `
            <div class="match-row" data-group="${g}" data-idx="${idx}">
              <span class="home">${home.name} <span class="flag">${home.flag}</span></span>
              <span class="score ${m.played ? "" : "pending"}" id="score-${g}-${idx}">${scoreStr}</span>
              <span class="away"><span class="flag">${away.flag}</span> ${away.name}</span>
            </div>`;
        }).join("")}
      </div>
    `;
    container.appendChild(card);
  }
}

// ============== ANIMAÇÃO DE PLACAR ==============
async function animateGroupSimulation() {
  const btn = document.getElementById("btn-simular-grupos");
  btn.disabled = true;
  toast("Simulando jogos...");

  // joga rodada a rodada, todos os grupos em paralelo visual
  for (let rodada = 0; rodada < 6; rodada++) {
    for (const g of Object.keys(state.groups)) {
      const m = state.matches[g][rodada];
      if (m.played) continue;
      applyMatch(g, rodada);
      const cell = document.getElementById(`score-${g}-${rodada}`);
      if (cell) {
        cell.textContent = `${m.hScore} × ${m.aScore}`;
        cell.classList.remove("pending");
        cell.classList.add("flash");
        setTimeout(() => cell.classList.remove("flash"), 600);
      }
    }
    await sleep(450);
    renderGroups(); // atualiza classificação
  }
  // marca quem avançou com animação
  document.querySelectorAll("tr.qualified").forEach(tr => tr.classList.add("advancing"));
  setTimeout(() => document.querySelectorAll(".advancing").forEach(tr => tr.classList.remove("advancing")), 1200);

  // monta R16
  buildR16();
  renderBracket();
  toast("Fase de grupos concluída! Vá para Mata-Mata.");
  btn.disabled = false;
}

// ============== MONTA MATA-MATA ==============
function buildR16() {
  const top2 = {};
  for (const g of Object.keys(state.groups)) {
    const s = sortGroup(g);
    top2[g] = [s[0], s[1]];
  }
  // formato: 1A x 2B, 1C x 2D, 1E x 2F, 1G x 2H, 1B x 2A, 1D x 2C, 1F x 2E, 1H x 2G
  const pairs = [
    [top2.A[0], top2.B[1]],
    [top2.C[0], top2.D[1]],
    [top2.E[0], top2.F[1]],
    [top2.G[0], top2.H[1]],
    [top2.B[0], top2.A[1]],
    [top2.D[0], top2.C[1]],
    [top2.F[0], top2.E[1]],
    [top2.H[0], top2.G[1]],
  ];
  state.knockout.r16 = pairs.map(([h, a]) => ({
    home: h, away: a, hScore: null, aScore: null, played: false, winner: null,
  }));
}

function playKnockoutMatch(m) {
  const [h, a] = simulateMatch(m.home, m.away, false);
  m.hScore = h; m.aScore = a; m.played = true;
  m.winner = h > a ? m.home : m.away;
}

// avança uma fase do mata-mata: r16 -> quarts -> semis -> final
async function simulateNextKnockoutRound() {
  const ko = state.knockout;
  let round, nextRound, label;
  if (ko.r16.some(m => m && !m.played))         { round = ko.r16;    nextRound = "quarts"; label = "Oitavas"; }
  else if (ko.quarts.some(m => !m || !m.played)){ round = ko.quarts; nextRound = "semis";  label = "Quartas"; }
  else if (ko.semis.some(m => !m || !m.played)) { round = ko.semis;  nextRound = "final";  label = "Semifinais"; }
  else if (!ko.final[0] || !ko.final[0].played) { round = ko.final;  nextRound = null;     label = "Final"; }
  else { toast("Torneio finalizado!"); return; }

  // se proximo round vazio, gerar a partir do anterior
  if (label === "Quartas" && ko.quarts.every(m => !m)) {
    state.knockout.quarts = pairWinners(ko.r16);
    round = state.knockout.quarts;
  }
  if (label === "Semifinais" && ko.semis.every(m => !m)) {
    state.knockout.semis = pairWinners(ko.quarts);
    round = state.knockout.semis;
  }
  if (label === "Final" && !ko.final[0]) {
    state.knockout.final = pairWinners(ko.semis);
    state.knockout.third = [{ home: ko.semis[0].home === ko.semis[0].winner ? ko.semis[0].away : ko.semis[0].home,
                              away: ko.semis[1].home === ko.semis[1].winner ? ko.semis[1].away : ko.semis[1].home,
                              hScore: null, aScore: null, played: false, winner: null }];
    round = state.knockout.final;
  }

  toast(`Simulando ${label}...`);
  const btn = document.getElementById("btn-simular-fase");
  btn.disabled = true;

  for (let i = 0; i < round.length; i++) {
    const m = round[i];
    if (!m || m.played) continue;
    // pulse no card
    const card = document.querySelector(`[data-ko="${label}"][data-idx="${i}"]`);
    if (card) card.classList.add("playing");
    await sleep(700);
    playKnockoutMatch(m);
    if (label === "Final" && state.knockout.third[0] && !state.knockout.third[0].played) {
      playKnockoutMatch(state.knockout.third[0]);
    }
    renderBracket();
    const newCard = document.querySelector(`[data-ko="${label}"][data-idx="${i}"]`);
    if (newCard) {
      newCard.classList.remove("playing");
      newCard.classList.add("played");
      // anim no vencedor
      const winnerEl = newCard.querySelector(".bracket-team.winner");
      if (winnerEl) {
        winnerEl.classList.add("advance-anim");
        setTimeout(() => winnerEl.classList.remove("advance-anim"), 1200);
      }
    }
    await sleep(400);
  }

  if (label === "Final") {
    state.champion = state.knockout.final[0].winner;
    renderChampion();
    toast(`🏆 ${state.champion.name} é o campeão!`);
  } else {
    toast(`${label} concluída!`);
  }
  btn.disabled = false;
}

function pairWinners(prevRound) {
  const winners = prevRound.map(m => m.winner);
  const out = [];
  for (let i = 0; i < winners.length; i += 2) {
    out.push({ home: winners[i], away: winners[i+1], hScore: null, aScore: null, played: false, winner: null });
  }
  return out;
}

async function simulateAllKnockout() {
  while (!state.champion) {
    await simulateNextKnockoutRound();
    await sleep(300);
  }
}

// ============== RENDER MATA-MATA ==============
function renderBracket() {
  const el = document.getElementById("bracket");
  const ko = state.knockout;

  const renderMatch = (m, roundLabel, idx) => {
    if (!m) return `
      <div class="bracket-match" data-ko="${roundLabel}" data-idx="${idx}">
        <div class="bracket-team placeholder"><span class="team-name">Aguardando...</span><span class="bteam-score">-</span></div>
        <div class="bracket-team placeholder"><span class="team-name">Aguardando...</span><span class="bteam-score">-</span></div>
      </div>`;
    const winH = m.played && m.winner === m.home;
    const winA = m.played && m.winner === m.away;
    return `
      <div class="bracket-match ${m.played ? "played" : ""}" data-ko="${roundLabel}" data-idx="${idx}">
        <div class="bracket-team ${winH ? "winner" : (m.played ? "loser" : "")}">
          <span class="team-name"><span class="flag">${m.home.flag}</span>${m.home.name}</span>
          <span class="bteam-score">${m.played ? m.hScore : "-"}</span>
        </div>
        <div class="bracket-team ${winA ? "winner" : (m.played ? "loser" : "")}">
          <span class="team-name"><span class="flag">${m.away.flag}</span>${m.away.name}</span>
          <span class="bteam-score">${m.played ? m.aScore : "-"}</span>
        </div>
      </div>`;
  };

  el.innerHTML = `
    <div class="bracket-round">
      <h3>Oitavas</h3>
      ${ko.r16.map((m, i) => renderMatch(m, "Oitavas", i)).join("")}
    </div>
    <div class="bracket-round">
      <h3>Quartas</h3>
      ${(ko.quarts.length ? ko.quarts : Array(4).fill(null)).map((m, i) => renderMatch(m, "Quartas", i)).join("")}
    </div>
    <div class="bracket-round">
      <h3>Semifinais</h3>
      ${(ko.semis.length ? ko.semis : Array(2).fill(null)).map((m, i) => renderMatch(m, "Semifinais", i)).join("")}
    </div>
    <div class="bracket-round">
      <h3>Final</h3>
      ${renderMatch(ko.final[0], "Final", 0)}
      <h3 style="margin-top:24px">3º Lugar</h3>
      ${renderMatch(ko.third[0], "Terceiro", 0)}
    </div>
  `;
}

// ============== CAMPEÃO ==============
function renderChampion() {
  const el = document.getElementById("champion-area");
  if (!state.champion) {
    el.innerHTML = `<p class="empty-msg">O campeão será revelado quando a final for jogada.</p>`;
    return;
  }
  const c = state.champion;
  const ko = state.knockout;
  el.innerHTML = `
    <div class="champion-trophy">🏆</div>
    <div class="champion-label">Campeão Mundial</div>
    <div class="champion-name"><span class="flag">${c.flag}</span> ${c.name}</div>
    <div style="margin-top:32px;color:var(--muted);font-size:14px">
      <p>Final: ${ko.final[0].home.name} ${ko.final[0].hScore} × ${ko.final[0].aScore} ${ko.final[0].away.name}</p>
      ${ko.third[0] && ko.third[0].played ? `<p style="margin-top:8px">3º lugar: ${ko.third[0].home.name} ${ko.third[0].hScore} × ${ko.third[0].aScore} ${ko.third[0].away.name} → 🥉 ${ko.third[0].winner.name}</p>` : ""}
    </div>
  `;
  fireConfetti();
}

function fireConfetti() {
  const colors = ["#ffd700", "#00c853", "#ef4444", "#3b82f6", "#f59e0b", "#a855f7"];
  for (let i = 0; i < 80; i++) {
    const c = document.createElement("div");
    c.className = "confetti";
    c.style.left = Math.random() * 100 + "vw";
    c.style.background = colors[Math.floor(Math.random() * colors.length)];
    c.style.animationDuration = (2 + Math.random() * 2) + "s";
    c.style.animationDelay = Math.random() + "s";
    document.body.appendChild(c);
    setTimeout(() => c.remove(), 5000);
  }
}

// ============== UTIL ==============
function sleep(ms) { return new Promise(r => setTimeout(r, ms)); }
function toast(msg) {
  const t = document.getElementById("toast");
  t.textContent = msg;
  t.classList.add("show");
  clearTimeout(toast._t);
  toast._t = setTimeout(() => t.classList.remove("show"), 2400);
}

// ============== TABS ==============
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

// ============== BOOT ==============
function boot() {
  initState();
  renderGroups();
  renderBracket();
  renderChampion();
  setupTabs();

  document.getElementById("btn-simular-grupos").addEventListener("click", animateGroupSimulation);
  document.getElementById("btn-simular-fase").addEventListener("click", simulateNextKnockoutRound);
  document.getElementById("btn-simular-tudo").addEventListener("click", async () => {
    if (state.knockout.r16.every(m => !m)) {
      toast("Simule a fase de grupos primeiro.");
      return;
    }
    document.getElementById("btn-simular-tudo").disabled = true;
    await simulateAllKnockout();
    document.getElementById("btn-simular-tudo").disabled = false;
  });
  document.getElementById("btn-reset").addEventListener("click", () => {
    initState();
    renderGroups();
    renderBracket();
    renderChampion();
    toast("Torneio reiniciado.");
  });
}

document.addEventListener("DOMContentLoaded", boot);
