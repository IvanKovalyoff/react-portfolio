import { Course } from '../models/studyingProcess/Course';
import { ComplexCourse } from '../models/studyingProcess/ComplexCourse';
import { StudyingProcess } from '../models/studyingProcess/StudyingProcess';
import type { Project } from '../models/studyingProcess/types';
import landingPage from '../assets/myProjects/Landing_page.webp';
import game2048 from '../assets/myProjects/Game_2048.webp';
import gadgetStore from '../assets/myProjects/Gadget_Store.webp';
import chatAppBroken from '../assets/myProjects/chat_first_attempt.webp';
import learningTailwindCSS from '../assets/myProjects/Learning_TailwindCSS.webp';
import brogram from '../assets/myProjects/Brogram.webp';
import ivKoffStore from '../assets/myProjects/ivkoff_store.webp';
import expenny from '../assets/myProjects/Expenny.webp';
import chatApp from '../assets/myProjects/Chat_app.webp';

// --- Projects ---

const landingPageProject: Project = {
  name: 'projects.landingPage.name',
  description: 'projects.landingPage.description',
  stack: ['HTML', 'SCSS', 'JavaScript'],
  liveUrl: 'https://IvanKovalyoff.github.io/Landing-page/',
  repoUrl: 'https://github.com/IvanKovalyoff/Landing-page',
  imageUrl: landingPage,
};

const game2048Project: Project = {
  name: 'projects.game2048.name',
  description: 'projects.game2048.description',
  stack: ['JavaScript', 'HTML', 'CSS'],
  liveUrl: 'https://IvanKovalyoff.github.io/Game-2048/',
  repoUrl: 'https://github.com/IvanKovalyoff/Game-2048',
  imageUrl: game2048,
};

const gadgetStoreProject: Project = {
  name: 'projects.gadgetStore.name',
  description: 'projects.gadgetStore.description',
  stack: ['React', 'TypeScript', 'SCSS', 'React Router', 'Storybook'],
  liveUrl: 'https://ivankovalyoff.github.io/Gadget-store/',
  repoUrl: 'https://github.com/IvanKovalyoff/Gadget-store',
  imageUrl: gadgetStore,
};

const chatAppInitialAttempt: Project = {
  name: 'projects.chatAppInitialAttempt.name',
  description: 'projects.chatAppInitialAttempt.description',
  stack: ['TypeScript', 'React', 'Node.js', 'Express', 'Socket.IO'],
  liveUrl: '-',
  repoUrl: '-',
  imageUrl: chatAppBroken,
};

const tailwindFestival: Project = {
  name: 'projects.tailwindFestival.name',
  description: 'projects.tailwindFestival.description',
  stack: ['Tailwind CSS', 'HTML', 'JavaScript'],
  liveUrl: 'https://ivankovalyoff.github.io/Learning-Tailwind-CSS/',
  repoUrl: 'https://github.com/IvanKovalyoff/Learning-Tailwind-CSS',
  imageUrl: learningTailwindCSS,
};

const brogramProject: Project = {
  name: 'projects.brogram.name',
  description: 'projects.brogram.description',
  stack: ['React', 'Vite'],
  liveUrl: 'https://brogram-training.netlify.app',
  repoUrl: 'https://github.com/IvanKovalyoff/Brogram',
  imageUrl: brogram,
};

const ivkoffStore: Project = {
  name: 'projects.ivkoffStore.name',
  description: 'projects.ivkoffStore.description',
  summary: 'projects.ivkoffStore.summary',
  stack: ['Next.js', 'Stripe', 'Resend'],
  liveUrl: 'https://ivkoff-store.netlify.app',
  repoUrl: 'https://github.com/IvanKovalyoff/IvKoff_Store',
  imageUrl: ivKoffStore,
};

const expennyProject: Project = {
  name: 'projects.expenny.name',
  description: 'projects.expenny.description',
  summary: 'projects.expenny.summary',
  stack: ['Next.js', 'Firebase', 'GSAP'],
  liveUrl: 'https://expenny-tracker.netlify.app',
  repoUrl: 'https://github.com/IvanKovalyoff/expenny',
  imageUrl: expenny,
};

const chatAppCompleted: Project = {
  name: 'projects.chatAppCompleted.name',
  description: 'projects.chatAppCompleted.description',
  summary: 'projects.chatAppCompleted.summary',
  stack: ['TypeScript', 'React', 'Node.js', 'Express', 'Socket.IO', 'PostgreSQL', 'Prisma'],
  liveUrl: 'https://chat-for-everyone-app.netlify.app',
  repoUrl: 'https://github.com/IvanKovalyoff/chat-app',
  imageUrl: chatApp,
};

/** The projects a recruiter should see first, shown above the learning timeline. */
export const featuredProjects: Project[] = [chatAppCompleted, ivkoffStore, expennyProject];

// --- Courses ---

const frontEndCourse = new Course(
  'courses.frontEnd.title',
  'courses.frontEnd.introduction',
  'courses.frontEnd.conclusion',
  63
);
frontEndCourse.addProject(landingPageProject);
frontEndCourse.addProject(game2048Project);
frontEndCourse.addProject(gadgetStoreProject);

const fullStackMateCourse = new Course(
  'courses.fullStackMate.title',
  'courses.fullStackMate.introduction',
  'courses.fullStackMate.conclusion',
  69
);
fullStackMateCourse.addProject(chatAppInitialAttempt);

const tailwindCourse = new Course(
  'courses.tailwind.title',
  'courses.tailwind.introduction',
  'courses.tailwind.conclusion',
  100
);
tailwindCourse.addProject(tailwindFestival);

const smoljamesCourse = new Course(
  'courses.smoljames.title',
  'courses.smoljames.introduction',
  'courses.smoljames.conclusion',
  100
);
smoljamesCourse.addProject(brogramProject);
smoljamesCourse.addProject(ivkoffStore);
smoljamesCourse.addProject(expennyProject);

const fullStackMateResolvedCourse = new Course(
  'courses.fullStackMateResolved.title',
  'courses.fullStackMateResolved.introduction',
  'courses.fullStackMateResolved.conclusion',
  69
);
fullStackMateResolvedCourse.addProject(chatAppCompleted);

const nextjsAdvancedCourse = new Course(
  'courses.nextjsAdvanced.title',
  'courses.nextjsAdvanced.introduction',
  'courses.nextjsAdvanced.conclusion',
  0
);
// No projects yet — course in progress.

// --- Complex Course ---

const mateAcademyComplex = new ComplexCourse(
  'complexCourses.mateAcademy.title',
  'complexCourses.mateAcademy.introduction',
  'complexCourses.mateAcademy.conclusion'
);
mateAcademyComplex.addCourse(frontEndCourse);
mateAcademyComplex.addCourse(fullStackMateCourse);

// --- Studying Process ---

export const studyingProcess = new StudyingProcess('studyingProcess.futurePlans');
studyingProcess.addEntry(mateAcademyComplex);
studyingProcess.addEntry(tailwindCourse);
studyingProcess.addEntry(smoljamesCourse);
studyingProcess.addEntry(fullStackMateResolvedCourse);
studyingProcess.addEntry(nextjsAdvancedCourse);
