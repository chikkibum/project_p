import { about, mySkills } from '@/config/About';
import React from 'react';
import ImageWithPlaceholder from '@/components/common/ImageWithPlaceholder';

import Container from '../common/Container';
import SectionHeading from '../common/SectionHeading';
import { Tooltip, TooltipContent, TooltipTrigger } from '../ui/tooltip';

export default function About() {
  return (
    <Container className='px-0 md:px-4'>
      <SectionHeading subHeading="About" heading="Me" />
      {/* About me */}
      <div className="mt-8 flex flex-col gap-4 md:flex-row">
        <ImageWithPlaceholder
          src="/assets/logo.jpeg"
          alt="About"
          width={100}
          quality={100}
          height={100}
          className="border-secondary  object-cover size-60 rounded-md border-2 bg-blue-300 dark:bg-yellow-300"
        />
        <div className=" font-mono">
          <h3 className="text-2xl font-bold">{about.name}</h3>
          <p className="text-secondary mt-4">{about.description}</p>
          <p className="text-secondary mt-8 font-bold">Skills</p>
          <div className="flex flex-wrap gap-2">
            {mySkills.map((skill) => (
              <Tooltip key={skill.key}>
                <TooltipTrigger asChild>
                  <div className="mt-4 size-6 hover:cursor-pointer">{skill}</div>
                </TooltipTrigger>
                <TooltipContent>{skill.key}</TooltipContent>
              </Tooltip>
            ))}
          </div>
        </div>
      </div>
    </Container>
  );
}
