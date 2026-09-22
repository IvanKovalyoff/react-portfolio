import { Skills } from '../models/skills/Skills';
import { Category } from '../models/skills/Category';
import type { Skill } from '../models/skills/skill';

import javascript from '../assets/mySkillsIMG/javascript.svg';
import typescript from '../assets/mySkillsIMG/typescript.svg';
import html from '../assets/mySkillsIMG/html.svg';
import css from '../assets/mySkillsIMG/css.svg';

import react from '../assets/mySkillsIMG/react.svg';
import nextjs from '../assets/mySkillsIMG/nextjs.svg';
import tailwindcss from '../assets/mySkillsIMG/tailwindcss.svg';
import scss from '../assets/mySkillsIMG/scss.svg';
import reactRouter from '../assets/mySkillsIMG/react-router.svg';
import zustand from '../assets/mySkillsIMG/zustand.webp';
import mui from '../assets/mySkillsIMG/mui.svg';
import bulma from '../assets/mySkillsIMG/bulma.svg';
import i18next from '../assets/mySkillsIMG/i18next.svg';

import nodejs from '../assets/mySkillsIMG/nodejs.svg';
import express from '../assets/mySkillsIMG/express.svg';
import socketio from '../assets/mySkillsIMG/socketio.svg';
import jwt from '../assets/mySkillsIMG/jwt.svg';
import bcrypt from '../assets/mySkillsIMG/bcrypt.svg';
import websocket from '../assets/mySkillsIMG/websocket.svg';

import postgresql from '../assets/mySkillsIMG/postgresql.svg';
import prisma from '../assets/mySkillsIMG/prisma.svg';
import firebase from '../assets/mySkillsIMG/firebase.svg';
import sequelize from '../assets/mySkillsIMG/sequelize.svg';

import stripe from '../assets/mySkillsIMG/stripe.svg';
import resend from '../assets/mySkillsIMG/resend.svg';
import formspree from '../assets/mySkillsIMG/formspree.svg';
import nodemailer from '../assets/mySkillsIMG/nodemailer.svg';

import gsap from '../assets/mySkillsIMG/gsap.svg';
import canva from '../assets/mySkillsIMG/canva.svg';
import fontawesome from '../assets/mySkillsIMG/fontawesome.svg';
import reactTransitionGroup from '../assets/mySkillsIMG/react-transition-group.svg';

import git from '../assets/mySkillsIMG/git.svg';
import eslint from '../assets/mySkillsIMG/eslint.svg';
import vite from '../assets/mySkillsIMG/vite.svg';
import postman from '../assets/mySkillsIMG/postman.svg';
import dbeaver from '../assets/mySkillsIMG/dbeaver.svg';
import docker from '../assets/mySkillsIMG/docker.svg';
import prettier from '../assets/mySkillsIMG/prettier.svg';
import pnpm from '../assets/mySkillsIMG/pnpm.svg';

import netlify from '../assets/mySkillsIMG/netlify.svg';
import railway from '../assets/mySkillsIMG/railway.svg';
import githubPages from '../assets/mySkillsIMG/github-pages.svg';

import jest from '../assets/mySkillsIMG/jest.svg';

const addAll = (category: Category, skillsToAdd: Skill[]) => {
  skillsToAdd.forEach((skill) => category.addSkill(skill));
};

const languages = new Category('skills.categories.languages');
addAll(languages, [
  { title: 'JavaScript', image: javascript },
  { title: 'TypeScript', image: typescript },
  { title: 'HTML', image: html },
  { title: 'CSS', image: css },
]);

const frontend = new Category('skills.categories.frontend');
addAll(frontend, [
  { title: 'React', image: react },
  { title: 'Next.js', image: nextjs },
  { title: 'Tailwind CSS', image: tailwindcss },
  { title: 'SCSS', image: scss },
  { title: 'React Router', image: reactRouter },
  { title: 'Zustand', image: zustand },
  { title: 'Material UI', image: mui },
  { title: 'Bulma', image: bulma },
  { title: 'i18next', image: i18next },
]);

const backend = new Category('skills.categories.backend');
addAll(backend, [
  { title: 'Node.js', image: nodejs },
  { title: 'Express', image: express },
  { title: 'Socket.IO', image: socketio },
  { title: 'JWT', image: jwt },
  { title: 'bcrypt', image: bcrypt },
  { title: 'WebSocket (ws)', image: websocket },
]);

const database = new Category('skills.categories.database');
addAll(database, [
  { title: 'PostgreSQL', image: postgresql },
  { title: 'Prisma', image: prisma },
  { title: 'Firebase', image: firebase },
  { title: 'Sequelize', image: sequelize },
]);

const servicesAndApis = new Category('skills.categories.servicesAndApis');
addAll(servicesAndApis, [
  { title: 'Stripe', image: stripe },
  { title: 'Resend', image: resend },
  { title: 'Formspree', image: formspree },
  { title: 'Nodemailer', image: nodemailer },
]);

const design = new Category('skills.categories.design');
addAll(design, [
  { title: 'GSAP', image: gsap },
  { title: 'Canva', image: canva },
  { title: 'Font Awesome', image: fontawesome },
  { title: 'React Transition Group', image: reactTransitionGroup },
]);

const developerTooling = new Category('skills.categories.developerTooling');
addAll(developerTooling, [
  { title: 'Git', image: git },
  { title: 'ESLint', image: eslint },
  { title: 'Vite', image: vite },
  { title: 'Postman', image: postman },
  { title: 'DBeaver', image: dbeaver },
  { title: 'Docker', image: docker },
  { title: 'Prettier', image: prettier },
  { title: 'pnpm', image: pnpm },
]);

const deploymentAndHosting = new Category('skills.categories.deploymentAndHosting');
addAll(deploymentAndHosting, [
  { title: 'Netlify', image: netlify },
  { title: 'Railway', image: railway },
  { title: 'GitHub Pages', image: githubPages },
]);

const testing = new Category('skills.categories.testing');
addAll(testing, [{ title: 'Jest', image: jest }]);

export const skills = new Skills();
skills.addCategory(languages);
skills.addCategory(frontend);
skills.addCategory(backend);
skills.addCategory(database);
skills.addCategory(servicesAndApis);
skills.addCategory(design);
skills.addCategory(developerTooling);
skills.addCategory(deploymentAndHosting);
skills.addCategory(testing);
