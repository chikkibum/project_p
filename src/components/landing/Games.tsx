'use client';

import { games, type Game } from '@/config/Games';
import { useScroll, useTransform, motion, type MotionValue } from 'motion/react';
import React, { useRef } from 'react';

import Container from '../common/Container';
import SectionHeading from '../common/SectionHeading';
import ImageWithPlaceholder from '../common/ImageWithPlaceholder';
import { Button } from '../ui/button';
import Link from 'next/link';
import ArrowUpRight from '../svgs/ArrowUpRight';
import { Badge } from '../ui/badge';

interface StickyCardProps {
  i: number;
  game: Game;
  progress: MotionValue<number>;
  range: [number, number];
  targetScale: number;
}

const StickyCard = ({
  i,
  game,
  progress,
  range,
  targetScale,
}: StickyCardProps) => {
  const container = useRef<HTMLDivElement>(null);
  const scale = useTransform(progress, range, [1, targetScale]);

  return (
    <div
      ref={container}
      className="sticky top-16 md:top-20 flex items-start justify-center w-full min-h-[400px]"
    >
      <motion.div
        style={{
          scale,
          top: `calc(-5vh + ${i * 20 + 80}px)`,
        }}
        className="rounded-4xl bg-card border border-border flex flex-col lg:flex-row items-start gap-4 md:gap-6 w-full max-w-6xl px-4 py-6 lg:py-8 origin-top overflow-hidden group z-10 shadow-lg"
        variants={{
          default: {},
          hover: {},
        }}
        initial="default"
        whileHover="hover"
      >
        {/* Left Side - Image */}
        <div className="relative h-[250px] w-full max-w-[400px] sm:h-[300px] sm:max-w-[500px] lg:max-w-[450px] flex-shrink-0 rounded-2xl overflow-hidden">
          <ImageWithPlaceholder
            src={game.src}
            alt={game.title}
            width={400}
            height={250}
            sizes="(max-width: 640px) 100vw, 500px"
            unoptimized={process.env.NODE_ENV === 'development'}
            className="object-cover h-full w-full"
          />
          <motion.div
            variants={{
              default: {
                y: '100%',
                opacity: 0,
              },
              hover: {
                y: 0,
                opacity: 1,
                transition: {
                  duration: 0.3,
                  ease: 'easeOut',
                },
              },
            }}
            className="absolute w-full rounded-b-2xl bottom-0 left-0 right-0 p-4 bg-black/70 backdrop-blur-sm text-white"
          >
            <h3 className="text-white text-lg font-bold">{game.title}</h3>
            <p className="text-white text-sm line-clamp-2">{game.description}</p>
          </motion.div>
        </div>

        {/* Right Side - Info Panel */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: i * 0.1 }}
          className="flex-1 space-y-4 lg:max-w-md items-start"
        >
          <div className="space-y-2 ">
            <div className="flex items-center gap-3 flex-wrap">
              <h3 className="text-2xl md:text-3xl font-bold text-foreground">{game.title}</h3>
              {game.genre && game.genre.length > 0 && (
                <div className="flex items-center gap-2 flex-wrap">
                  {game.genre.map((g, idx) => (
                    <p key={idx}  className="text-xs text-muted-foreground font-mono">
                      {g}
                    </p>
                  ))}
                </div>
              )}
              <div className="flex items-center gap-2">
       

              {game.rating && (
                <div className="flex items-center gap-1 px-2 py-1 bg-primary/10 rounded-md">
                  <span className="text-sm font-bold text-primary">★</span>
                  <span className="text-sm font-semibold text-foreground">{game.rating}/10</span>
                </div>
              )}
              {
                game.playtime && (
                  <div className="flex items-center gap-1 px-2 py-1 bg-primary/10 rounded-md">
                    <span className="text-sm font-bold text-primary">⏱️</span>
                    <span className="text-sm font-semibold text-foreground">{game.playtime}</span>
                  </div>
                )
              }
              </div>
  
            </div>
       
          </div>

          {/* <p className="text-foreground leading-relaxed opacity-100">{game.description}</p> */}

          {game.madeBy && (
            <div className="flex items-center gap-2">

            <Badge variant="outline" className="flex text-xs items-center gap-2 px-3 py-1.5 w-fit">

              {game.madeByLogo && (
                <ImageWithPlaceholder
                  src={game.madeByLogo}
                  alt={game.madeBy}
                  width={16}
                  height={16}
                  className="object-contain h-4 w-4"
                  unoptimized={process.env.NODE_ENV === 'development'}
                />
              )}
              <span className="text-sm font-medium">{game.madeBy}</span>
            </Badge>
            </div>
          )}

          {/* {game.funFact && (
            <div className="px-4 py-2 bg-muted/50 rounded-lg border border-border">
              <p className="text-sm font-semibold mb-1 text-primary"> Fun Fact</p>
              <p className="text-sm text-foreground">{game.funFact}</p>
            </div>
          )} */}

          {game.link && (
            <Button
              variant="outline"
              className="peer w-full sm:w-auto"
              asChild
            >
              <Link
                href={game.link}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2"
              >
                <span>Play Now</span>
                <ArrowUpRight className="w-4 h-4 transition-transform peer-hover:translate-x-1 peer-hover:-translate-y-1" />
              </Link>
            </Button>
          )}
        </motion.div>
      </motion.div>
    </div>
  );
};

export default function Games() {
  const container = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: container,
    offset: ['start start', 'end end'],
  });

  return (
    <Container className="px-0 md:px-4">
      <SectionHeading subHeading="Entertainment" heading="My Favourite Games" />
      <div className="">
        <main
          ref={container}
          className="relative flex w-full flex-col gap-4 md:gap-0 items-center justify-center pb-[10vh] mt-8 "
        >
          {games.map((game, i) => {
            const targetScale = Math.max(
              0.8,
              1 - (games.length - i - 1) * 0.1,
            );

            return (
              <StickyCard
                key={`game_${i}`}
                i={i}
                game={game}
                progress={scrollYProgress}
                range={[i * 0.25, 1]}
                targetScale={targetScale}
              />
            );
          })}
        </main>
        <div className="flex justify-center">
        <Button variant="outline">
          <Link href="/games">Show all games</Link>
        </Button>
      </div>
      </div>
    </Container>
  );
}

