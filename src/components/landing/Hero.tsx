import ImageWithPlaceholder from '@/components/common/ImageWithPlaceholder';
import { heroConfig, skillComponents, socialLinks } from '@/config/Hero';
import { parseTemplate } from '@/lib/hero';
import { cn } from '@/lib/utils';
import { Link } from 'next-view-transitions';
import React from 'react';

import Container from '../common/Container';
import Skill from '../common/Skill';
import { FlipSentences } from '../flip-sentences';
import CV from '../svgs/CV';
import Chat from '../svgs/Chat';
import { Button } from '../ui/button';
import { Tooltip, TooltipContent, TooltipTrigger } from '../ui/tooltip';
import SpotifyNowPlaying from './SpotifyNowPlaying';

const buttonIcons = {
  CV: CV,
  Chat: Chat,
};

export default function Hero() {
  const { name, avatar, skills, description, buttons, flipSentences } =
    heroConfig;

  const renderDescription = () => {
    const parts = parseTemplate(description.template, skills);

    return parts.map((part) => {
      if (part.type === 'skill' && 'skill' in part && part.skill) {
        const SkillComponent =
          skillComponents[part.skill.component as keyof typeof skillComponents];
        return (
          <Skill key={part.key} name={part.skill.name} href={part.skill.href}>
            <SkillComponent />
          </Skill>
        );
      } else if (part.type === 'bold' && 'text' in part) {
        return (
          <b key={part.key} className="whitespace-pre-wrap text-primary">
            {part.text}
          </b>
        );
      } else if (part.type === 'text' && 'text' in part) {
        return (
          <span key={part.key} className="whitespace-pre-wrap">
            {part.text}
          </span>
        );
      }
      return null;
    });
  };

  return (
    <Container className="mx-auto max-w-5xl px-0 md:px-4">
      {/* Text Area */}
      <div className="mt-8 flex flex-col gap-2">
        <div className="flex items-center gap-4 md:gap-8">
          {/* Image */}
          <ImageWithPlaceholder
            src={avatar}
            alt="hero"
            width={100}
            height={100}
            unoptimized={process.env.NODE_ENV === 'development'}
            className="object-cover size-24 rounded-full dark:bg-yellow-300 bg-blue-300"
          />
          <h1 className="text-3xl font-bold">
            Hi, I&apos;m {name}
            <div className="text-secondary text-base md:text-lg">
            <FlipSentences
              className=" font-mono text-secondary font-normal"
              variants={{
                initial: { y: -10, opacity: 0 },
                animate: { y: -1, opacity: 1 },
                exit: { y: 10, opacity: 0 },
              }}
            >
              {flipSentences}
            </FlipSentences>
            </div>
   
          </h1>
        </div>

        <div className="mt-4 flex flex-wrap items-center gap-x-1 gap-y-2 text-sm md:text-lg text-muted-foreground ">
          {renderDescription()}
        </div>
      </div>

      {/* Buttons */}
      <div className="mt-8 flex gap-4">
        {buttons.map((button, index) => {
          const IconComponent =
            buttonIcons[button.icon as keyof typeof buttonIcons];
          return (
            <Button
              key={index}
              variant={button.variant as 'outline' | 'default'}
              className={cn(
                button.variant === 'outline' && 'inset-shadow-indigo-500',
                button.variant === 'default' && 'inset-shadow-indigo-500',
              )}
            >
              {IconComponent && <IconComponent />}
              <Link href={button.href}>{button.text}</Link>
            </Button>
          );
        })}
      </div>

      {/* Social Links */}
      <div className="mt-8 flex gap-2">
        {socialLinks.map((link) => (
          <Tooltip key={link.name} delayDuration={0}>
            <TooltipTrigger asChild>
              <Link
                href={link.href}
                key={link.name}
                className="text-secondary flex items-center gap-2"
              >
                <span className="size-6">{link.icon}</span>
              </Link>
            </TooltipTrigger>
            <TooltipContent>
              <p>{link.name}</p>
            </TooltipContent>
          </Tooltip>
        ))}
      </div>

      {/* Spotify Now Playing */}
      <SpotifyNowPlaying />

    </Container>
  );
}
