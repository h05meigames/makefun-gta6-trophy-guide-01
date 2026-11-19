// Leonida Trophy Guide — bootstrap: load the trophy data, wire the controls,
// keep the checklist, guide panel and roadmap in sync, and serve deterministic
// screenshot scenes from query params (?shot=checklist|roadmap|guide|spoiler).

import { loadEarned, saveEarned, toggleEarned, exportEarned, parseImportedProgress } from './state.js';
import { filterTrophies } from './filters.js';
import { renderProgress, renderChecklist, renderGuidePanel, renderRoadmap } from './render.js';

const listEl = document.getElementById('trophyList');
const metaEl = document.getElementById('listMeta');
const panelEl = document.getElementById('guidePanel');
const roadmapEl = document.getElementById('roadmapView');
const searchBox = document.getElementById('searchBox');
const kindFilter = document.getElementById('kindFilter');
const gradeFilter = document.getElementById('gradeFilter');
const spoilerToggle = document.getElementById('spoilerToggle');
const earnedOnly = document.getElementById('earnedOnly');
const importFile = document.getElementById('importFile');

const doc = await (await fetch('data/trophies.json')).json();
const trophies = doc.trophies;

let earned = loadEarned();
const ui = { spoiler: false, selectedId: null, view: 'checklist' };

function currentFilters() {
  return {
    query: searchBox.value,
    kind: kindFilter.value,
    grade: gradeFilter.value,
    earnedOnly: earnedOnly.checked,
    earned,
  };
}

function refresh() {
  renderProgress(trophies, earned);
  const visible = filterTrophies(trophies, currentFilters());
  renderChecklist(listEl, metaEl, visible, earned, ui, {
    onToggle: (id) => { toggleEarned(earned, id); refresh(); },
    onSelect: (id) => { ui.selectedId = id; refresh(); },
  });
  const selected = trophies.find((trophy) => trophy.id === ui.selectedId) ?? null;
  renderGuidePanel(panelEl, selected, earned, ui.spoiler);
  renderRoadmap(roadmapEl, trophies, earned);
}

function showView(view) {
  ui.view = view;
  const checklist = view === 'checklist';
  listEl.hidden = !checklist;
  metaEl.hidden = !checklist;
  roadmapEl.hidden = checklist;
  document.getElementById('viewChecklist').classList.toggle('active', checklist);
  document.getElementById('viewRoadmap').classList.toggle('active', !checklist);
}

document.getElementById('viewChecklist').addEventListener('click', () => showView('checklist'));
document.getElementById('viewRoadmap').addEventListener('click', () => showView('roadmap'));
searchBox.addEventListener('input', refresh);
kindFilter.addEventListener('change', refresh);
gradeFilter.addEventListener('change', refresh);
spoilerToggle.addEventListener('change', () => { ui.spoiler = spoilerToggle.checked; refresh(); });
earnedOnly.addEventListener('change', refresh);

document.getElementById('exportBtn').addEventListener('click', () => exportEarned(earned));
document.getElementById('importBtn').addEventListener('click', () => importFile.click());
importFile.addEventListener('change', async () => {
  const file = importFile.files[0];
  if (!file) return;
  try {
    earned = parseImportedProgress(await file.text());
    saveEarned(earned);
    refresh();
  } catch (error) {
    alert(`Could not import that file: ${error.message}`);
  }
  importFile.value = '';
});
document.getElementById('resetBtn').addEventListener('click', () => {
  if (confirm('Clear all earned trophies?')) {
    earned = new Set();
    saveEarned(earned);
    refresh();
  }
});

function applyShotScene() {
  const params = new URLSearchParams(location.search);
  const shot = params.get('shot');
  if (!shot) return;
  if (shot === 'roadmap') {
    showView('roadmap');
  } else if (shot === 'spoiler') {
    ui.spoiler = true;
    spoilerToggle.checked = true;
  } else if (shot === 'guide') {
    const id = Number(params.get('id'));
    if (Number.isInteger(id)) ui.selectedId = id;
  } else if (shot === 'checklist') {
    showView('checklist');
  }
}

applyShotScene();
refresh();
window.__shotReady = true;
