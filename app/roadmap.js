// Roadmap to the platinum: six stages built from the official trophy descriptions.
// Stage 1 story chapters and named missions in order, stage 2 the missable moments
// before any point of no return, stage 3 the stranger strands, stage 4 collectibles
// and exploration, stage 5 activities and grinds, stage 6 the 100% finish and platinum.

export const ROADMAP_STAGES = [
  {
    stage: 1,
    title: 'Stage 1 — Play the story in order',
    body: 'Chapters 1 to 4, then the final mission. Every chapter trophy and every named-mission trophy unlocks by finishing the story content in order, so do not rush past missions.',
    trophyIds: [2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13],
  },
  {
    stage: 2,
    title: 'Stage 2 — Missables before the point of no return',
    body: 'Do these while your partner is beside you and before story choices close. Keep a manual save before major story choices: the descriptions do not say whether missions can be replayed.',
    trophyIds: [33, 34, 48],
  },
  {
    stage: 3,
    title: 'Stage 3 — Stranger strands',
    body: 'Finish the side-character strands one at a time — Andy, Kenton, Billy, Randy, Tyrone — plus Bret\u2019s hunt. Eight finished strands earn the silver Strangers & Freaks trophy.',
    trophyIds: [22, 23, 24, 26, 27, 29, 25],
  },
  {
    stage: 4,
    title: 'Stage 4 — Collectibles and exploring Leonida',
    body: 'Sweep the state region by region: meditation spots, card sets, WAiNK locations, vehicles, areas, garage properties and gang operations.',
    trophyIds: [28, 30, 31, 35, 42, 43, 44, 54, 55],
  },
  {
    stage: 5,
    title: 'Stage 5 — Activities, grinds and money',
    body: 'Races, the shooting range, challenges, robberies, stunts and the economy trophies. The 42 gold shooting-range medals are the longest grind — save them for after the story.',
    trophyIds: [15, 16, 17, 18, 19, 20, 21, 32, 36, 37, 38, 39, 40, 41, 45, 46, 47, 49, 50, 51, 52, 53],
  },
  {
    stage: 6,
    title: 'Stage 6 — 100% completion and the platinum',
    body: 'Mop up whatever the in-game completion percentage still shows as unfinished, earn 100% completion (gold), and the platinum unlocks with it.',
    trophyIds: [14, 1],
  },
];

export function roadmapStagesFor(trophies) {
  const byId = new Map(trophies.map((trophy) => [trophy.id, trophy]));
  return ROADMAP_STAGES.map((stage) => ({
    ...stage,
    trophies: stage.trophyIds.map((id) => byId.get(id)).filter(Boolean),
  }));
}
