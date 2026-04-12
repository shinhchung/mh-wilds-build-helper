import { builds, skills } from '../data';
import { Build, Playstyle, Skill } from '../types';

export type BuildRecommendation = {
  build: Build;
  highlightedSkills: Skill[];
};

export function recommendBuild(playstyle: Playstyle): BuildRecommendation {
  const build = builds.find((entry) => entry.playstyle === playstyle);

  if (!build) {
    throw new Error(`No build configured for playstyle: ${playstyle}`);
  }

  const highlightedSkills = build.highlightedSkillIds
    .map((id) => skills.find((skill) => skill.id === id))
    .filter((skill): skill is Skill => Boolean(skill));

  return {
    build,
    highlightedSkills,
  };
}
