// Filtering: by kind, by grade, by text, and earned-only. Spoiler hiding is separate (render.js).

export function filterTrophies(trophies, options) {
  const query = (options.query ?? '').trim().toLowerCase();
  return trophies.filter((trophy) => {
    if (options.kind !== 'all') {
      if (options.kind === 'missable') {
        if (!trophy.missable) return false;
      } else if (options.kind === 'online') {
        return false; // This list holds no online trophies.
      } else if (trophy.kind !== options.kind) {
        return false;
      }
    }
    if (options.grade !== 'all' && trophy.grade !== options.grade) return false;
    if (options.earnedOnly && !options.earned.has(trophy.id)) return false;
    if (query) {
      const haystack = `${trophy.name} ${trophy.description} ${trophy.guide}`.toLowerCase();
      if (!haystack.includes(query)) return false;
    }
    return true;
  });
}

export function spoilerHidden(trophy, spoilerOn, earned) {
  return spoilerOn && trophy.kind === 'story' && !earned.has(trophy.id);
}
