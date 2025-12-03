import { type Experience } from '@/config/Experience';
import React from 'react';

import { ExperienceCard } from './ExperienceCard';
import { BlurFade } from '../Blur-fade';

interface ExperienceListProps {
  experiences: Experience[];
}

export function ExperienceList({ experiences }: ExperienceListProps) {
  if (experiences.length === 0) {
    return (
      <div className="text-center py-8">
        <p className="text-muted-foreground">No work experiences found.</p>
      </div>
    );
  }

  return (
    <BlurFade staggerChildren={0.1} delayChildren={0.02} className="flex flex-col gap-8">
      {experiences.map((experience: Experience) => (
        <ExperienceCard key={experience.company} experience={experience} />
      ))}
    </BlurFade>
  );
}
