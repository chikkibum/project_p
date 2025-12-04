import ExpressJs from '@/components/technologies/ExpressJs';
import Figma from '@/components/technologies/Figma';
import MongoDB from '@/components/technologies/MongoDB';
import Motion from '@/components/technologies/Motion';
import NextJs from '@/components/technologies/NextJs';
import NodeJs from '@/components/technologies/NodeJs';
import Postman from '@/components/technologies/Postman';
import ReactIcon from '@/components/technologies/ReactIcon';
import Strapi from '@/components/technologies/Strapi';
import TailwindCss from '@/components/technologies/TailwindCss';
import TypeScript from '@/components/technologies/TypeScript';
import Vercel from '@/components/technologies/Vercel';
import Zustand from '@/components/technologies/Zustand';

export interface Technology {
  name: string;
  href: string;
  icon: React.ReactNode;
}

export interface Experience {
  company: string;
  position: string;
  location: string;
  image: string;
  description: string[];
  startDate: string;
  endDate: string;
  website: string;
  x?: string;
  linkedin?: string;
  github?: string;
  technologies?: Technology[];
  isCurrent: boolean;
  isBlur?: boolean;
}

export const experiences: Experience[] = [
  {
    isCurrent: true,
    isBlur: false,
    company: 'Adda247(Career247)',
    position: 'SDE (Full Stack)',
    location: 'Gurgaon, India (On-Site)',
    image: '/company/Adda.png',
    description: [
      "Developed high-performance web pages with Next.js and TypeScript, utilizing SSR, SSG, ISR, and dynamic routing for fast, SEO-friendly, scalable experiences.",
      "Created a seamless signup-login-payment flow, prioritizing authentication ease, usability, and data security.",
      "Enhanced form handling and reduced errors by implementing real-time validation with Formik.",
      "Optimized marketing campaign tracking and user engagement through UTM parameters.",
      "Implemented Zustand for efficient global state management across complex modules.",
      "Built a dynamic, high-traffic CMS with Strapi for the learning platform.",
      "Optimized Next.js builds by refining code structure and enabling image optimization and environment-based configurations.",
      "Developed advanced admin features like coupon management, multi-level filters, and smart search.",
      "Integrated Enterprise SSO with Edmingle LMS, enabling secure, seamless access for thousands of users."
    ],
    startDate: 'June 2025',
    endDate: 'Present',
    technologies: [
      {
        name: 'Next.js',
        href: 'https://nextjs.org/',
        icon: <NextJs />,
      },
      {
        name: 'Tailwind CSS',
        href: 'https://tailwindcss.com/',
        icon: <TailwindCss />,
      },
      {
        name: 'Strapi',
        href: 'https://strapi.io/',
        icon: <Strapi />,
      },
      {
        name: 'TypeScript',
        href: 'https://typescriptlang.org/',
        icon: <TypeScript />,
      },
      {
        name: 'React',
        href: 'https://react.dev/',
        icon: <ReactIcon />,
      },
      {
        name:"Motion",
        href: 'https://motion.dev/',
        icon: <Motion />,
      },

      {
        name: 'Figma',
        href: 'https://figma.com/',
        icon: <Figma />,
      },
      {
        name: 'Vercel',
        href: 'https://vercel.com/',
        icon: <Vercel />,
      },
      {
        name: 'Postman',
        href: 'https://www.postman.com/',
        icon: <Postman />,
      },

      {
        name: 'Node.js',
        href: 'https://nodejs.org/',
        icon: <NodeJs />,
      },

      {
        name: 'Zustand',
        href: 'https://zustand.dev/',
        icon: <Zustand />,
      },
      {
        name: 'Express.js',
        href: 'https://expressjs.com/',
        icon: <ExpressJs />,
      },

      {
        name:"mongodb",
        href: 'https://mongodb.com/',
        icon: <MongoDB />,
      }

    ],
    website: 'https://www.adda247.com/',
    x: 'https://x.com/adda247live',
  },
  {
    isCurrent: false,
    company: 'Chariot Web Solutions',
    position: 'Full Stack Developer Intern',
    location: 'Remote, India (Remote)',
    image: '/company/Chariot.png',
    description: [
      "Developed Beautiful and Fast pages using Next.js and TypeScript, utilizing SSR, SSG, ISR, and dynamic routing for fast, SEO-friendly, scalable experiences.",
      "Added Dynamic and Responsive UI/UX design using Tailwind CSS.",
      "Enhanced form handling and reduced errors by implementing real-time validation with Formik.",
      "Optimized marketing campaign tracking and user engagement through UTM parameters.",
    ],
    startDate: 'February 2025',
    endDate: 'June 2025',
    technologies: [
      {
        name: 'Next.js',
        href: 'https://nextjs.org/',
        icon: <NextJs />,
      },
      {
        name: 'Tailwind CSS',
        href: 'https://tailwindcss.com/',
        icon: <TailwindCss />,
      },
      {
        name: 'TypeScript',
        href: 'https://typescriptlang.org/',
        icon: <TypeScript />,
      },
      {
        name: 'React',
        href: 'https://react.dev/',
        icon: <ReactIcon />,
      },
      {
        name: 'Figma',
        href: 'https://figma.com/',
        icon: <Figma />,
      },
    ],
    website: 'https://chariotwebsolutions.com/',
  },
  {
    "isCurrent": false,
    "company": "Freelance Experience",
    "position": "Freelancer",
    "location": "Remote",
    "image": "/company/freelance.png",
    "description": [
      "Worked with various clients on multiple projects, including resume builders, e-commerce platforms, and custom web applications.",
      "Collaborated closely with clients to understand their requirements and delivered high-quality, scalable solutions on time.",
      "Managed full project lifecycles from initial consultation, planning, and design to development and final delivery.",
      "Utilized modern technologies such as MERN stack, Next.js, and WordPress to build custom solutions tailored to client needs.",
      "Provided ongoing support, updates, and maintenance for completed projects, ensuring seamless operation and client satisfaction."
    ],
    "startDate": "June 2024",
    "endDate": "January 2025",
    "website": "https://www.yourfreelanceportfolio.com/",
    "github": "https://github.com/yourusername",
    "x": "https://x.com/yourusername",  
    "linkedin": "https://www.linkedin.com/in/yourusername/",
    technologies: [
      {
        name: 'Next.js',
        href: 'https://nextjs.org/',
        icon: <NextJs />,
      },
      {
        name: 'Tailwind CSS',
        href: 'https://tailwindcss.com/',
        icon: <TailwindCss />,
      },
      {
        name: 'TypeScript',
        href: 'https://typescriptlang.org/',
        icon: <TypeScript />,
      },
      {
        name: 'React',
        href: 'https://react.dev/',
        icon: <ReactIcon />,
      },
      {
        name:"Motion",
        href: 'https://motion.dev/',
        icon: <Motion />,
      },

      {
        name: 'Figma',
        href: 'https://figma.com/',
        icon: <Figma />,
      },
      {
        name: 'Postman',
        href: 'https://www.postman.com/',
        icon: <Postman />,
      },

      {
        name: 'Node.js',
        href: 'https://nodejs.org/',
        icon: <NodeJs />,
      },
      {
        name: 'Express.js',
        href: 'https://expressjs.com/',
        icon: <ExpressJs />,
      },

      {
        name:"mongodb",
        href: 'https://mongodb.com/',
        icon: <MongoDB />,
      }

    ],
  },
  {
    isCurrent: false,
    company: 'Oppia Foundation',
    position: 'Translation Team Lead',
    location: 'Remote',
    image: '/company/Oppia.png',
    description: [
      "Led and managed a team of volunteers to ensure the accurate and high-quality translation of educational lessons for children.",
      "Collaborated with content creators and educators to ensure the cultural relevance and clarity of translations.",
      "Monitored and improved the translation process to enhance efficiency, ensuring timely delivery of content in multiple languages.",
      "Provided training and guidance to new volunteers, fostering a collaborative and productive environment.",
      "Ensured consistent quality and language standards across all translated materials, enhancing the learning experience for children worldwide."
    ],
    startDate: 'January 2023',
    endDate: 'May 2024',
    website: 'https://www.oppiafoundation.org/',
    github: 'https://github.com/oppia',
    x: 'https://x.com/oppiaorg',
    linkedin: 'https://www.linkedin.com/company/oppia-org/',
    technologies:[]
  },

]
