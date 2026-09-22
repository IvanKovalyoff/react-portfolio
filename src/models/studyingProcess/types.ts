export interface Project {
  name: string;
  description: string;
  /** One-line pitch used by the compact "featured" cards (translation key). */
  summary?: string;
  stack: string[];
  imageUrl: string;
  liveUrl: string;
  repoUrl: string;
}
