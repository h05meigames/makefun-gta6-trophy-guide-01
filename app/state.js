// Tracker state: which trophies are earned, saved in localStorage, exportable and importable.

export const STORAGE_KEY = 'leonida-trophy-guide-earned-v1';

export function loadEarned() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    const parsed = raw ? JSON.parse(raw) : [];
    return new Set(Array.isArray(parsed) ? parsed.filter((id) => Number.isInteger(id)) : []);
  } catch {
    return new Set();
  }
}

export function saveEarned(earned) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify([...earned].sort((a, b) => a - b)));
}

export function toggleEarned(earned, id) {
  if (earned.has(id)) earned.delete(id);
  else earned.add(id);
  saveEarned(earned);
  return earned;
}

export function exportEarned(earned) {
  const payload = { app: 'leonida-trophy-guide', version: 1, earned: [...earned].sort((a, b) => a - b) };
  const blob = new Blob([JSON.stringify(payload, null, 2)], { type: 'application/json' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = 'leonida-trophy-progress.json';
  link.click();
  URL.revokeObjectURL(url);
}

export function parseImportedProgress(text) {
  const parsed = JSON.parse(text);
  const list = Array.isArray(parsed) ? parsed : parsed.earned;
  if (!Array.isArray(list)) throw new Error('No earned list found in that file.');
  return new Set(list.filter((id) => Number.isInteger(id)));
}

export function gradeCounts(trophies, earned) {
  const counts = { platinum: [0, 0], gold: [0, 0], silver: [0, 0], bronze: [0, 0] };
  for (const trophy of trophies) {
    const bucket = counts[trophy.grade];
    if (!bucket) continue;
    bucket[1] += 1;
    if (earned.has(trophy.id)) bucket[0] += 1;
  }
  return counts;
}
