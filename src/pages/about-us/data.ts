import aleksAvatar from './imgs/ALEKS.png';
import daniarAvatar from './imgs/DANIAR.png';
import elenaAvatar from './imgs/LENA.png';

const COLLABORATION = [
  'Our team demonstrated outstanding collaboration throughout the project, combining dedication, discipline, and a shared commitment to success. Despite starting as complete strangers, we quickly formed a motivated and cohesive unit, working 5-8 hours daily to ensure steady progress.',

  'To maintain efficiency, we adopted Kanban methodology, tracking tasks and milestones meticulously. This helped us stay organized, prioritize effectively, and monitor our collective progress. We held regular sync calls every 2-3 days to discuss blockers, align on goals, and refine our strategy. Whenever challenges arose, team members proactively offered assistance, ensuring no one was stuck for long.',

  'A key factor in our success was the positive and conflict-free dynamic—everyone remained professional, open to feedback, and focused on solutions rather than personal differences. We actively consulted mentors, studied documentation, and shared knowledge, allowing us to tackle complex tasks with confidence. By combining our diverse skills—frontend development, state management, UI/UX, and backend integration—we delivered a polished, fully functional e-commerce platform.',

  'Ultimately, our teamwork, discipline, and willingness to learn transformed an ambitious idea into a successful project. 🚀🎉',
];

const MOTTOS = [
  {
    text: 'My code works, but I don’t know why — the important thing is it passes tests (sometimes). If you stare at TypeScript errors long enough, they might disappear on their own!',
  },
  {
    text: 'We’re a young team united by a grand mission — to build a project that actually runs for everyone *simultaneously*. Git conflicts? Just our way of bonding!',
  },
  {
    text: 'React.useEffect() is magic, but we pretend we get it. Clean code is when console.logs are neatly formatted. And if you reload the page 100 times, the bug might vanish!',
  },
];

const DEVELOPERS = [
  {
    name: 'Aleksei Gomeniuk',
    role: 'Frontend/React Developer',
    bio: 'Experienced React developer specializing in state management and UI implementation.',
    img: aleksAvatar,
    gitHub: 'https://github.com/aleksgoodomens',
    discord: 'https://discordapp.com/users/300176264033992705',
    contributions: [
      'Implemented Kanban board functionality',
      'Managed Git branches and resolved merge conflicts',
      'Set up application routing between pages',
      'Configured Redux store for state management',
      'Implemented theme switching functionality',
      'Configured Material UI components',
      'Created About Us page',
      'Developed user profile page with editable user data functionality',
      'Implemented form validation for profile editing',
      'Set up React Query for server interactions',
      'Established server communication architecture',
      'Connected profile page with backend API',
    ],
  },
  {
    name: 'Elena Khadasevich',
    role: 'Frontend Developer',
    bio: 'Skilled in form handling and user authentication flows.',
    img: elenaAvatar,
    gitHub: 'https://github.com/lena523',
    discord: 'https://discordapp.com/users/673890828262834207',
    contributions: [
      'Developed registration and login pages',
      'Implemented form validation systems',
      'Created shopping cart functionality (add/remove products)',
      'Ensured cart component responsiveness',
      'Implemented server interaction with Ecommerce platform',
      'Populated all products in Ecommerce Tools database',
      'Managed cart state and user flow',
    ],
  },
  {
    name: 'Daniyar Hapurzhonau',
    role: 'Team Lead',
    bio: 'Full-stack oriented developer with strong leadership skills.',
    img: daniarAvatar,
    gitHub: 'https://github.com/hapurzhonau',
    discord: 'https://discordapp.com/users/447842256532275220',
    contributions: [
      'Developed header component including burger menu',
      'Implemented shop page with category sidebar',
      'Created product filtering functionality',
      'Designed breadcrumbs navigation system',
      'Managed timely project deployment',
      'Built Ecommerce Tools store platform',
      'Oversaw project architecture decisions',
      'Coordinated team workflow and task distribution',
    ],
  },
];
export { COLLABORATION, DEVELOPERS, MOTTOS };
