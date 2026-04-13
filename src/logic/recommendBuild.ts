import { builds, skills } from '../data';
import { Build, Playstyle, Skill } from '../types';

export type BuildRecommendation = {
  build: Build;
  highlightedSkills: Skill[];
};

export function recommendBuilds(playstyle: Playstyle): BuildRecommendation[] {
  const matching = builds.filter((b) => b.playstyle === playstyle);
  if (!matching.length) throw new Error(`No builds for playstyle: ${playstyle}`);
  return matching.map((build) => ({
    build,
    highlightedSkills: build.highlightedSkillIds
      .map((id) => skills.find((s) => s.id === id))
      .filter((s): s is Skill => Boolean(s)),
  }));
}
