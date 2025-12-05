export interface Game {
  title: string;
  src: string;
  description: string;
  link?: string;
  rating?: number;
  playtime?: string;
  funFact?: string;
  genre?: string[];
  madeBy?: string;
  madeByLogo?: string;
}

export const games: Game[] = [
  {
    title: 'Control',
    src: 'https://cdn.prod.website-files.com/64630b03551142e3347ae3da/67cacfac6b531f63531e1984_Control_main_2-p-1080.jpg',
    description: 'A mind-bending action-adventure game set in the mysterious Federal Bureau of Control. Telekinesis powers, shifting architecture, and an incredible atmosphere.',
    link: 'https://www.epicgames.com/store/en-US/p/control',
    rating: 9,
    playtime: '25+ hours',
    funFact: 'The Oldest House shifts and changes - no two playthroughs feel the same!',
    genre: ['Action-Adventure', 'Supernatural Thriller'],
    madeBy: 'Remedy Entertainment',
    madeByLogo: '/games/remedy.png',
  },
  {
    title: 'Witcher 3',
    src: '/games/witcher.png',
    description: 'The next chapter in Geralt\'s epic saga. Prepare for monsters, magic, and morally gray choices that actually matter.',
    link: 'https://www.thewitcher.com/',
    rating: 10,
    playtime: '100+ hours',
    funFact: 'Geralt\'s beard grows in real-time. Yes, really!',
    genre: ['RPG', 'Fantasy'],
    madeBy: 'CD Projekt RED',
    // madeByLogo: '/games/wolf.png',
  },
  {
    title: 'GTA 5',
    src: '/games/gta.jpg',
    description: 'Three criminals, one city, infinite chaos. Still the gold standard for open-world mayhem after all these years.',
    link: 'https://www.rockstargames.com/gta-v',
    rating: 9,
    playtime: '50+ hours',
    funFact: 'I\'ve probably spent more time customizing cars than doing missions.',
    genre: ['Action', 'Open World'],
    madeBy: 'Rockstar Games',
    madeByLogo: '/games/rockstar.png',
  },
  {
    title: 'RDR 2',
    src: '/games/rdr.jpg',
    description: 'A cinematic masterpiece. The most immersive western experience ever created. Arthur Morgan\'s story will break your heart.',
    link: 'https://www.rockstargames.com/reddeadredemption2/',
    rating: 10,
    playtime: '80+ hours',
    funFact: 'The horse bonding system is so good, I named my horse and cried when... well, you know.',
    genre: ['Action-Adventure', 'Western'],
    madeBy: 'Rockstar Games',
    madeByLogo: '/games/rockstar.png',

  },
  {
    title: 'Alan Wake 2',
    src: '/games/aw2.jpg',
    description: 'A psychological horror masterpiece. Remedy\'s best work yet - mind-bending narrative meets survival horror perfection.',
    link: 'https://www.alanwake.com/',
    rating: 10,
    playtime: '20+ hours',
    funFact: 'The live-action sequences are so well integrated, you\'ll question what\'s real.',
    genre: ['Survival Horror', 'Psychological Thriller'],
    madeBy: 'Remedy Entertainment',
    madeByLogo: '/games/remedy.png',
  },
];

