import { render, screen } from '@testing-library/react';
import i18n from '../../../i18n/i18n';
import type { Project } from '../../../models/studyingProcess/types';
import { ProjectCard } from './ProjectCard';

const project: Project = {
  name: 'projects.expenny.name',
  description: 'projects.expenny.description',
  summary: 'projects.expenny.summary',
  stack: ['Next.js', 'Firebase', 'GSAP'],
  liveUrl: 'https://example.com/live',
  repoUrl: 'https://github.com/example/repo',
  imageUrl: 'shot.webp',
};

beforeAll(async () => {
  await i18n.changeLanguage('en');
});

describe('ProjectCard', () => {
  it('shows the name, the stack and safe external links', () => {
    render(<ProjectCard project={project} />);

    expect(screen.getByRole('heading', { name: i18n.t(project.name) })).toBeInTheDocument();
    for (const tech of project.stack) {
      expect(screen.getByText(tech)).toBeInTheDocument();
    }

    const live = screen.getByRole('link', { name: 'Live' });
    expect(live).toHaveAttribute('href', 'https://example.com/live');
    expect(live).toHaveAttribute('target', '_blank');
    expect(live).toHaveAttribute('rel', expect.stringContaining('noopener'));
    expect(screen.getByRole('link', { name: 'GitHub' })).toHaveAttribute(
      'href',
      'https://github.com/example/repo'
    );
  });

  it('hides the buttons for links that do not exist ("-")', () => {
    render(<ProjectCard project={{ ...project, liveUrl: '-', repoUrl: '-' }} />);

    expect(screen.queryByRole('link')).not.toBeInTheDocument();
  });

  it('tells the full story by default and the one-line summary in compact mode', () => {
    const { rerender } = render(<ProjectCard project={project} />);
    expect(screen.getByText(i18n.t(project.description))).toBeInTheDocument();

    rerender(<ProjectCard project={project} variant="compact" />);
    expect(screen.getByText(i18n.t(project.summary!))).toBeInTheDocument();
    expect(screen.queryByText(i18n.t(project.description))).not.toBeInTheDocument();
  });

  it('describes its screenshot and loads it lazily with a reserved size', () => {
    render(<ProjectCard project={project} />);

    const image = screen.getByRole('img');
    expect(image).toHaveAttribute('alt', `Screenshot of ${i18n.t(project.name)}`);
    expect(image).toHaveAttribute('loading', 'lazy');
    expect(image).toHaveAttribute('width');
    expect(image).toHaveAttribute('height');
  });
});
