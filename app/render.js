// Rendering: the checklist, the guide panel, the roadmap view and the progress header.

import { gradeCounts } from './state.js';
import { spoilerHidden } from './filters.js';
import { roadmapStagesFor } from './roadmap.js';

export function renderProgress(trophies, earned) {
  const total = trophies.length;
  const done = earned.size;
  const percent = total ? Math.round((done / total) * 100) : 0;
  document.getElementById('earnedCount').textContent = String(done);
  document.getElementById('progressText').textContent = `${percent}% earned — ${done} of ${total} trophies`;
  document.getElementById('progressFill').style.width = `${percent}%`;
  const counts = gradeCounts(trophies, earned);
  document.getElementById('gradeCounts').textContent =
    `Platinum ${counts.platinum[0]}/${counts.platinum[1]} · Gold ${counts.gold[0]}/${counts.gold[1]} · Silver ${counts.silver[0]}/${counts.silver[1]} · Bronze ${counts.bronze[0]}/${counts.bronze[1]}`;
}

export function trophyTags(trophy) {
  const tags = [{ label: trophy.grade, cls: `grade-${trophy.grade}` }];
  if (trophy.kind && trophy.kind !== 'platinum') tags.push({ label: trophy.kind, cls: '' });
  if (trophy.hidden) tags.push({ label: 'Hidden', cls: 'hidden' });
  if (trophy.missable) tags.push({ label: 'Missable', cls: 'missable' });
  if (trophy.count) tags.push({ label: `×${trophy.count}`, cls: '' });
  return tags;
}

export function renderChecklist(listEl, metaEl, trophies, earned, ui, callbacks) {
  listEl.replaceChildren();
  metaEl.textContent = `Showing ${trophies.length} of 55 trophies` +
    (ui.spoiler ? ' · spoiler setting on: story trophies hidden until earned' : '');
  for (const trophy of trophies) {
    const hidden = spoilerHidden(trophy, ui.spoiler, earned);
    const item = document.createElement('li');
    item.className = 'trophy-card' + (earned.has(trophy.id) ? ' earned' : '') +
      (ui.selectedId === trophy.id ? ' selected' : '');
    const box = document.createElement('input');
    box.type = 'checkbox';
    box.checked = earned.has(trophy.id);
    box.setAttribute('aria-label', `Earned: ${trophy.name}`);
    box.addEventListener('change', () => callbacks.onToggle(trophy.id));
    const body = document.createElement('div');
    const name = document.createElement('h3');
    name.className = 'trophy-name';
    name.textContent = hidden ? 'Hidden story trophy — earn it to reveal' : trophy.name;
    const desc = document.createElement('p');
    desc.className = 'trophy-desc';
    desc.textContent = hidden ? 'Story trophy hidden by the spoiler setting.' : trophy.description;
    const tags = document.createElement('div');
    tags.className = 'trophy-tags';
    for (const tag of trophyTags(trophy)) {
      const span = document.createElement('span');
      span.className = `tag ${tag.cls}`.trim();
      span.textContent = tag.label;
      tags.append(span);
    }
    body.append(name, desc, tags);
    const link = document.createElement('button');
    link.type = 'button';
    link.className = 'trophy-guide-link';
    link.textContent = 'Read guide';
    link.addEventListener('click', () => callbacks.onSelect(trophy.id));
    item.append(box, body, link);
    listEl.append(item);
  }
}

export function renderGuidePanel(panelEl, trophy, earned, spoilerOn) {
  if (!trophy) {
    panelEl.innerHTML = '<p class="guide-empty">Select a trophy to read its full guide and sources.</p>';
    return;
  }
  const hidden = spoilerHidden(trophy, spoilerOn, earned);
  panelEl.replaceChildren();
  const heading = document.createElement('h2');
  heading.textContent = hidden ? 'Hidden story trophy' : trophy.name;
  const desc = document.createElement('p');
  desc.className = 'trophy-desc';
  desc.textContent = hidden ? 'Story trophy hidden by the spoiler setting.' : trophy.description;
  const tags = document.createElement('div');
  tags.className = 'trophy-tags';
  for (const tag of trophyTags(trophy)) {
    const span = document.createElement('span');
    span.className = `tag ${tag.cls}`.trim();
    span.textContent = tag.label;
    tags.append(span);
  }
  const body = document.createElement('p');
  body.className = 'guide-body';
  body.textContent = hidden
    ? 'Earn this trophy to reveal its guide. The spoiler setting hides story trophies until they are earned.'
    : trophy.guide;
  const sources = document.createElement('p');
  sources.className = 'guide-sources';
  const strong = document.createElement('strong');
  strong.textContent = 'Sources: ';
  sources.append(strong, document.createTextNode((trophy.sources ?? []).join(' · ')));
  panelEl.append(heading, desc, tags, body, sources);
}

export function renderRoadmap(roadmapEl, trophies, earned) {
  const stages = roadmapStagesFor(trophies);
  roadmapEl.replaceChildren();
  const heading = document.createElement('h2');
  heading.textContent = 'Roadmap to the Platinum';
  const intro = document.createElement('p');
  intro.textContent = 'Six stages, built from the official trophy descriptions: story first, then the missable moments, then stranger strands, collectibles, activity grinds, and finally 100% completion. Trophies you have earned are ticked.';
  roadmapEl.append(heading, intro);
  for (const stage of stages) {
    const block = document.createElement('section');
    block.className = 'roadmap-stage';
    const title = document.createElement('h3');
    title.textContent = stage.title;
    const body = document.createElement('p');
    body.textContent = stage.body;
    const list = document.createElement('ul');
    for (const trophy of stage.trophies) {
      const item = document.createElement('li');
      const mark = earned.has(trophy.id) ? '✓ ' : '○ ';
      item.textContent = `${mark}${trophy.name} — ${trophy.grade}` +
        (trophy.missable ? ' — MISSABLE' : '') +
        (trophy.count ? ` (×${trophy.count})` : '');
      list.append(item);
    }
    block.append(title, body, list);
    roadmapEl.append(block);
  }
}
